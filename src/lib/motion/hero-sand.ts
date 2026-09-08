/** Load the decorative GPU scene only after a mouse interacts with the hero. */
export function enableHeroSand(hero: HTMLElement) {
  const canvas = hero.querySelector<HTMLCanvasElement>('[data-hero-sand]');
  if (!canvas) return;
  const eligible = window.matchMedia('(min-width: 961px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
  let scene: { resume: () => void; pause: () => void; dispose: () => void } | undefined;
  let loading = false;
  let failed = false;
  let disposed = false;
  let inView = hero.getBoundingClientRect().bottom > 0;
  let hasInteracted = false;
  const allowed = () => eligible.matches && !connection?.saveData;
  const visible = () => inView && !document.hidden;

  async function start() {
    if (disposed || failed || loading || scene || !hasInteracted || !allowed() || !visible() || document.readyState !== 'complete') return;
    loading = true;
    try {
      const { createSandScene } = await import('../three/sand-cursor');
      if (disposed || !allowed() || !visible()) return;
      scene = createSandScene(hero, canvas!) ?? undefined;
      failed = !scene;
      scene?.resume();
    } catch {
      failed = true;
      canvas!.dataset.state = 'unavailable';
    } finally {
      loading = false;
    }
  }

  function sync() {
    if (!allowed()) {
      scene?.dispose();
      scene = undefined;
    } else if (!visible()) {
      scene?.pause();
    } else if (scene) {
      scene.resume();
    } else {
      void start();
    }
  }
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    hasInteracted = true;
    void start();
  };
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  });
  observer.observe(hero);
  hero.addEventListener('pointerenter', onPointer, { passive: true });
  hero.addEventListener('pointermove', onPointer, { passive: true });
  eligible.addEventListener('change', sync);
  connection?.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('load', sync, { once: true });
  // Persisted pages keep their listeners and recreate a cleared scene on return.
  const onPageHide = (event: PageTransitionEvent) => {
    if (event.persisted) { scene?.pause(); return; }
    disposed = true;
    observer.disconnect();
    scene?.dispose();
    hero.removeEventListener('pointerenter', onPointer);
    hero.removeEventListener('pointermove', onPointer);
    eligible.removeEventListener('change', sync);
    connection?.removeEventListener('change', sync);
    document.removeEventListener('visibilitychange', sync);
    window.removeEventListener('load', sync);
    window.removeEventListener('pageshow', sync);
    window.removeEventListener('pagehide', onPageHide);
  };
  window.addEventListener('pagehide', onPageHide);
  window.addEventListener('pageshow', sync);
}
