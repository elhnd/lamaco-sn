/** Small raster map: browser caching, visible tiles only, no SDK or API key. */
export function enableContactMap(root: HTMLElement) {
  const viewport = root.querySelector<HTMLElement>('[data-map-viewport]')!;
  const tiles = root.querySelector<HTMLElement>('[data-map-tiles]')!;
  const marker = root.querySelector<HTMLElement>('[data-map-marker]')!;
  const status = root.querySelector<HTMLElement>('[data-map-status]')!;
  const controls = root.querySelector<HTMLElement>('[data-map-controls]')!;
  const latitude = Number(root.dataset.latitude);
  const longitude = Number(root.dataset.longitude);
  const tileUrl = root.dataset.tileUrl!;
  let zoom = 15;
  const minZoom = 12;
  const maxZoom = 18;
  const sin = Math.sin(latitude * Math.PI / 180);
  const location = { x: (longitude + 180) / 360, y: 0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI) };
  let center = { ...location };
  let visible = false;
  let generation = 0;

  function render() {
    if (!visible) return;
    const version = ++generation;
    const size = 256 * 2 ** zoom;
    const left = center.x * size - viewport.clientWidth / 2;
    const top = center.y * size - viewport.clientHeight / 2;
    marker.style.left = `${location.x * size - left}px`;
    marker.style.top = `${location.y * size - top}px`;
    const previous = new Map(Array.from(tiles.querySelectorAll('img')).map(img => [img.dataset.key!, img]));
    const images: HTMLImageElement[] = [];
    for (let y = Math.floor(top / 256); y <= Math.floor((top + viewport.clientHeight - 1) / 256); y++) {
      for (let x = Math.floor(left / 256); x <= Math.floor((left + viewport.clientWidth - 1) / 256); x++) {
        const key = `${zoom}/${x}/${y}`;
        const img = previous.get(key) ?? new Image(256, 256);
        previous.delete(key);
        img.alt = '';
        img.draggable = false;
        img.dataset.key = key;
        img.style.left = `${x * 256 - left}px`;
        img.style.top = `${y * 256 - top}px`;
        img.referrerPolicy = 'strict-origin-when-cross-origin';
        if (!img.src) img.src = tileUrl.replace('{z}', String(zoom)).replace('{x}', String(x)).replace('{y}', String(y));
        tiles.append(img);
        images.push(img);
      }
    }
    previous.forEach(img => img.remove());
    status.hidden = false;
    status.textContent = 'Chargement de la carte…';
    const settle = () => {
      if (version !== generation) return;
      const failed = images.some(img => img.complete && img.naturalWidth === 0);
      status.hidden = !failed && images.every(img => img.complete);
      if (failed) status.textContent = 'Carte indisponible. Ouvrez Google Maps ci-dessous.';
    };
    images.forEach(img => { img.onload = settle; img.onerror = settle; });
    settle();
    root.querySelectorAll<HTMLButtonElement>('[data-map-zoom]').forEach(button => {
      button.disabled = Number(button.dataset.mapZoom) > 0 ? zoom === maxZoom : zoom === minZoom;
    });
  }

  controls.hidden = false;
  root.querySelectorAll<HTMLButtonElement>('[data-map-zoom]').forEach(button => {
    button.addEventListener('click', () => { zoom = Math.max(minZoom, Math.min(maxZoom, zoom + Number(button.dataset.mapZoom))); render(); });
  });
  root.querySelector('[data-map-reset]')!.addEventListener('click', () => { center = { ...location }; zoom = 15; render(); });
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport) return;
    const offsets: Record<string, [number, number]> = { ArrowLeft: [-80, 0], ArrowRight: [80, 0], ArrowUp: [0, -80], ArrowDown: [0, 80] };
    const offset = offsets[event.key];
    if (!offset) return;
    event.preventDefault();
    center.x += offset[0] / (256 * 2 ** zoom);
    center.y += offset[1] / (256 * 2 ** zoom);
    render();
  });

  // Mouse/pen drag; touch keeps native page scrolling and uses explicit controls.
  let drag: { x: number; y: number; id: number } | null = null;
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || event.button !== 0 || (event.target as Element).closest('a, button')) return;
    drag = { x: event.clientX, y: event.clientY, id: event.pointerId };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', event => {
    if (!drag) return;
    const transform = `translate(${event.clientX - drag.x}px, ${event.clientY - drag.y}px)`;
    tiles.style.transform = transform;
    marker.style.translate = `${event.clientX - drag.x}px ${event.clientY - drag.y}px`;
  });
  function endDrag(event: PointerEvent) {
    if (!drag) return;
    if (event.type === 'pointerup') {
      center.x -= (event.clientX - drag.x) / (256 * 2 ** zoom);
      center.y -= (event.clientY - drag.y) / (256 * 2 ** zoom);
    }
    drag = null;
    tiles.style.transform = '';
    marker.style.translate = '';
    viewport.classList.remove('is-dragging');
    render();
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('lostpointercapture', endDrag);
  new ResizeObserver(() => render()).observe(viewport);
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) render();
  });
  observer.observe(viewport);
}
