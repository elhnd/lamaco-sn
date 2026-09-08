// One bounded point buffer, one draw call. Positions evolve in the vertex shader;
// JavaScript only writes particles born along the latest pointer segment.
const CAPACITY = 7200;
const STRIDE = 9;
const MAX_LIFE = 2.8;

const vertexSource = `
precision highp float;
attribute vec2 a_origin;
attribute vec2 a_velocity;
attribute vec4 a_life; // birth, duration, size, seed
attribute float a_dust;
uniform vec2 u_view;
uniform float u_time;
uniform float u_dpr;
varying float v_age;
varying float v_seed;
varying float v_dust;
void main() {
  float age = u_time - a_life.x;
  v_age = age / max(a_life.y, 0.001);
  v_seed = a_life.w;
  v_dust = a_dust;
  if (age < 0.0 || age > a_life.y || a_life.y == 0.0) {
    gl_Position = vec4(2.0, 2.0, 0.0, 1.0);
    gl_PointSize = 1.0;
    return;
  }
  float seed = a_life.w;
  float drag = mix(2.1, 1.35, a_dust);
  float travel = (1.0 - exp(-drag * age)) / drag;
  float gravity = mix(200.0 + seed * 180.0, 32.0, a_dust);
  vec2 p = a_origin + a_velocity * travel;
  p.y += gravity * (age - travel) / drag;
  // Small eddies broaden the wake, while grains still settle under gravity.
  float swirl = sin(age * 3.7 + seed * 18.0) - sin(seed * 18.0);
  p.x += swirl * (7.0 + seed * 13.0) * travel;
  p.y += (cos(age * 3.0 + seed * 12.0) - cos(seed * 12.0)) * 8.0 * travel;
  gl_Position = vec4(p.x / u_view.x * 2.0 - 1.0, 1.0 - p.y / u_view.y * 2.0, 0.0, 1.0);
  gl_PointSize = a_life.z * u_dpr * mix(1.0, 1.0 + age * 0.6, a_dust);
}
`;

const fragmentSource = `
precision mediump float;
varying float v_age;
varying float v_seed;
varying float v_dust;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float fade = 1.0 - smoothstep(0.38, 1.0, v_age);
  vec3 ochre = vec3(0.47, 0.31, 0.14);
  vec3 sand = vec3(0.87, 0.72, 0.46);
  vec3 color = mix(ochre, sand, v_seed);
  float alpha;
  if (v_dust > 0.5) {
    float radius = length(p);
    alpha = exp(-radius * radius * 5.0) * (1.0 - smoothstep(0.65, 1.0, radius)) * 0.055 * fade;
    color = vec3(0.65, 0.44, 0.23);
  } else {
    float angle = v_seed * 6.283;
    vec2 q = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p;
    float edge = max(abs(q.x) * 0.9 + abs(q.y) * 0.4, abs(q.y) * 0.96 + q.x * 0.18);
    alpha = (1.0 - smoothstep(0.48, 0.93, edge)) * fade * 0.92;
    color *= 0.88 + (1.0 - q.y) * 0.12;
  }
  gl_FragColor = vec4(color * alpha, alpha);
}
`;

export function createSandScene(hero: HTMLElement, canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, stencil: false, premultipliedAlpha: true, powerPreference: 'low-power' });
  if (!gl) { canvas.dataset.state = 'unavailable'; return null; }
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    return shader;
  };
  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  if (!vertex || !fragment || !program || !buffer) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    if (program) gl.deleteProgram(program);
    if (buffer) gl.deleteBuffer(buffer);
    canvas.dataset.state = 'unavailable';
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
    canvas.dataset.state = 'unavailable';
    return null;
  }
  gl.useProgram(program);
  const particles = new Float32Array(CAPACITY * STRIDE);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, particles.byteLength, gl.DYNAMIC_DRAW);
  for (const [name, size, offset] of [['a_origin', 2, 0], ['a_velocity', 2, 2], ['a_life', 4, 4], ['a_dust', 1, 8]] as const) {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, STRIDE * 4, offset * 4);
  }
  const viewUniform = gl.getUniformLocation(program, 'u_view');
  const timeUniform = gl.getUniformLocation(program, 'u_time');
  const dprUniform = gl.getUniformLocation(program, 'u_dpr');
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  let bounds = hero.getBoundingClientRect();
  let frame = 0;
  let active = false;
  let disposed = false;
  let contextLost = false;
  let dirty = false;
  let index = 0;
  let clock = 0;
  let lastFrame = 0;
  let lastBirth = -MAX_LIFE;
  let pointerX = 0;
  let pointerY = 0;
  let previousX = 0;
  let previousY = 0;
  let pointerTime = 0;
  let previousTime = 0;
  let tracking = false;
  let pending = false;

  function clear() {
    tracking = false;
    pending = false;
    lastFrame = 0;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    particles.fill(0);
    index = 0;
    dirty = true;
    lastBirth = -MAX_LIFE;
    if (!contextLost) gl!.clear(gl!.COLOR_BUFFER_BIT);
  }
  function resize() {
    bounds = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(bounds.width * dpr);
    canvas.height = Math.round(bounds.height * dpr);
    if (!contextLost) {
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.uniform2f(viewUniform, bounds.width, bounds.height);
      gl!.uniform1f(dprUniform, dpr);
    }
    clear();
  }
  function spawn(x: number, y: number, vx: number, vy: number, spread: number, dust: boolean) {
    const offset = index * STRIDE;
    index = (index + 1) % CAPACITY;
    const angle = Math.random() * Math.PI * 2;
    const radial = Math.sqrt(Math.random());
    particles[offset] = x + Math.cos(angle) * radial * spread;
    particles[offset + 1] = y + Math.sin(angle) * radial * spread;
    particles[offset + 2] = vx * 0.13 + Math.cos(angle) * (25 + radial * 110);
    particles[offset + 3] = vy * 0.1 + Math.sin(angle) * (25 + radial * 95) - 32;
    particles[offset + 4] = clock;
    particles[offset + 5] = dust ? 2.4 : 1.2 + Math.random() * 1.6;
    particles[offset + 6] = dust ? 22 + Math.random() * 34 : 0.85 + Math.random() * 1.55;
    particles[offset + 7] = Math.random();
    particles[offset + 8] = dust ? 1 : 0;
    dirty = true;
  }
  function render(now: number) {
    frame = 0;
    if (!active || disposed || contextLost) return;
    clock += lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 1 / 60;
    lastFrame = now;
    if (pending) {
      const dx = pointerX - previousX;
      const dy = pointerY - previousY;
      const distance = Math.hypot(dx, dy);
      const dt = Math.max((pointerTime - previousTime) / 1000, 1 / 120);
      const vx = Math.max(-2200, Math.min(2200, dx / dt));
      const vy = Math.max(-2200, Math.min(2200, dy / dt));
      // Interpolate the pointer path to avoid isolated blobs or gaps on fast sweeps.
      const count = Math.min(650, Math.ceil(distance * 6));
      const spread = Math.min(18, 4 + Math.hypot(vx, vy) * 0.005);
      for (let i = 0; i < count; i++) {
        const t = Math.random();
        const x = previousX + dx * t;
        const y = previousY + dy * t;
        spawn(x, y, vx, vy, spread, false);
        if (i % 32 === 0) spawn(x, y, vx * 0.7, vy * 0.6, spread, true);
      }
      if (count) lastBirth = clock;
      previousX = pointerX;
      previousY = pointerY;
      previousTime = pointerTime;
      pending = false;
    }
    if (dirty) {
      gl!.bufferSubData(gl!.ARRAY_BUFFER, 0, particles);
      dirty = false;
    }
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    if (clock - lastBirth < MAX_LIFE) {
      gl!.uniform1f(timeUniform, clock);
      gl!.drawArrays(gl!.POINTS, 0, CAPACITY);
      canvas.dataset.state = 'active';
      frame = requestAnimationFrame(render);
    } else {
      canvas.dataset.state = 'idle';
      lastFrame = 0;
    }
  }
  function onPointer(event: PointerEvent) {
    if (!active || event.pointerType !== 'mouse' || disposed || contextLost) return;
    // Never retain coordinates across scrolling or a pause/re-entry.
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    if (!tracking || event.timeStamp - pointerTime > 180) {
      previousX = x;
      previousY = y;
      previousTime = event.timeStamp;
      tracking = true;
    }
    pointerX = x;
    pointerY = y;
    pointerTime = event.timeStamp;
    pending = true;
    if (!frame) frame = requestAnimationFrame(render);
  }
  const onLeave = () => { tracking = false; pending = false; };
  const onScroll = () => { bounds = hero.getBoundingClientRect(); onLeave(); };
  const onContextLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    clear();
    canvas.dataset.state = 'unavailable';
  };
  const onContextRestored = () => {
    // Keep the static fallback after a GPU reset; no render loop survives the loss.
    canvas.dataset.state = 'unavailable';
  };
  const observer = new ResizeObserver(resize);
  observer.observe(hero);
  hero.addEventListener('pointermove', onPointer, { passive: true });
  hero.addEventListener('pointerleave', onLeave, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  canvas.addEventListener('webglcontextlost', onContextLost);
  canvas.addEventListener('webglcontextrestored', onContextRestored);
  resize();
  canvas.dataset.state = 'idle';

  return {
    resume() {
      if (disposed || contextLost || active) return;
      active = true;
      bounds = hero.getBoundingClientRect();
      canvas.dataset.state = 'idle';
    },
    pause() {
      active = false;
      clear();
      canvas.dataset.state = 'suspended';
    },
    dispose() {
      if (disposed) return;
      active = false;
      clear();
      disposed = true;
      observer.disconnect();
      hero.removeEventListener('pointermove', onPointer);
      hero.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      gl!.deleteBuffer(buffer);
      gl!.deleteProgram(program);
      canvas.dataset.state = 'disabled';
    },
  };
}
