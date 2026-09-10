/** A lighter desktop wheel response, without moving the page into a fake scroller. */
export function enableGentleScroll() {
  const eligible = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
  const root = document.documentElement;
  const speed = 0.65;
  let enabled = false;
  let frame = 0;
  let target = scrollY;
  let written = scrollY;
  let previousTime = 0;
  let direction = 0;
  const limit = () => Math.max(0, root.scrollHeight - innerHeight);
  const clamp = (value: number) => Math.max(0, Math.min(limit(), value));

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    target = written = scrollY;
    previousTime = 0;
    direction = 0;
  }
  function tick(time: number) {
    if (document.hidden || document.body.classList.contains('menu-open')) { stop(); return; }
    const deltaTime = previousTime ? Math.min(48, time - previousTime) : 16;
    previousTime = time;
    target = clamp(target);
    const distance = target - scrollY;
    const done = Math.abs(distance) < 1;
    const movement = distance * (1 - Math.exp(-deltaTime / 90));
    // Keep making progress on engines that round scroll offsets to whole pixels.
    written = done ? target : scrollY + (Math.abs(movement) < 1 ? Math.sign(distance) : movement);
    window.scrollTo({ top: written, behavior: 'instant' });
    written = scrollY; // Browsers may round to whole CSS pixels.
    if (done || Math.abs(target - scrollY) < 1) { stop(); return; }
    frame = requestAnimationFrame(tick);
  }
  function usesNativeScroll(event: WheelEvent) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return true;
    if (document.body.classList.contains('menu-open')) return true;
    for (const node of event.composedPath()) {
      if (!(node instanceof HTMLElement) || node === document.body || node === root) continue;
      if (node.matches('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="dialog"]')) return true;
      if (node.scrollHeight > node.clientHeight + 1 && /auto|scroll|overlay/.test(getComputedStyle(node).overflowY)) return true;
    }
    return false;
  }
  function onWheel(event: WheelEvent) {
    if (event.defaultPrevented || !event.cancelable || !event.deltaY || usesNativeScroll(event)) { stop(); return; }
    const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? innerHeight : 1;
    const nextDirection = Math.sign(event.deltaY);
    if (!frame || direction !== nextDirection) target = scrollY;
    direction = nextDirection;
    target = clamp(target + event.deltaY * unit * speed);
    if (!frame && Math.abs(target - scrollY) < 1) return;
    event.preventDefault();
    if (!frame) frame = requestAnimationFrame(tick);
  }
  function onNativeScroll() {
    // Let anchors, browser search, scrollbar dragging and programmatic scrolling
    // take over immediately instead of pulling the user back toward an old target.
    if (frame && Math.abs(scrollY - written) > 2) stop();
  }
  function sync() {
    stop();
    const next = eligible.matches && !connection?.saveData;
    if (next === enabled) return;
    enabled = next;
    if (enabled) {
      window.addEventListener('wheel', onWheel, { passive: false });
      root.dataset.wheelScroll = 'gentle';
    } else {
      window.removeEventListener('wheel', onWheel);
      delete root.dataset.wheelScroll;
    }
  }
  eligible.addEventListener('change', sync);
  connection?.addEventListener('change', sync);
  window.addEventListener('scroll', onNativeScroll, { passive: true });
  window.addEventListener('pointerdown', stop, { passive: true });
  window.addEventListener('keydown', stop);
  window.addEventListener('resize', stop);
  document.addEventListener('visibilitychange', stop);
  window.addEventListener('pageshow', sync);
  const onHide = (event: PageTransitionEvent) => {
    stop();
    if (event.persisted) return;
    window.removeEventListener('wheel', onWheel);
    eligible.removeEventListener('change', sync);
    connection?.removeEventListener('change', sync);
    window.removeEventListener('scroll', onNativeScroll);
    window.removeEventListener('pointerdown', stop);
    window.removeEventListener('keydown', stop);
    window.removeEventListener('resize', stop);
    document.removeEventListener('visibilitychange', stop);
    window.removeEventListener('pageshow', sync);
    window.removeEventListener('pagehide', onHide);
    delete root.dataset.wheelScroll;
  };
  window.addEventListener('pagehide', onHide);
  sync();
}
