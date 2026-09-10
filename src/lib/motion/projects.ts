/** Optional, bounded editorial motion; HTML stays visible before enhancement. */
export function enableProjectsMotion(page: HTMLElement) {
  const preference = matchMedia('(prefers-reduced-motion: no-preference)');
  const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
  const revealed = new WeakSet<Element>();
  let context: { revert: () => void } | undefined;
  let loading = false;
  let disposed = false;
  let near = false;
  const allowed = () => near && !disposed && !document.hidden && preference.matches && !connection?.saveData;

  async function sync() {
    if (!allowed()) { context?.revert(); context = undefined; return; }
    if (loading || context) return;
    loading = true;
    try {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (!allowed()) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const media = gsap.matchMedia();
        media.add({ desktop: '(hover: hover) and (pointer: fine) and (min-width: 961px)', mobile: '(max-width: 960px), (hover: none), (pointer: coarse)' }, conditions => {
          const targets = [...page.querySelectorAll<HTMLElement>('[data-project-reveal]')].filter(el => !revealed.has(el));
          targets.forEach(el => {
            ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => {
              revealed.add(el);
              conditions.add(() => { gsap.fromTo(el, { y: conditions.conditions?.desktop ? 24 : 14, opacity: 0.85 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', clearProps: 'transform,opacity' }); });
            } });
          });
          if (conditions.conditions?.desktop) page.querySelectorAll<HTMLElement>('[data-project-media]').forEach(frame => {
            const img = frame.querySelector('img');
            if (img) gsap.fromTo(img, { yPercent: -2, scale: 1.06 }, { yPercent: 2, scale: 1.06, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
          });
        });
      }, page);
      ScrollTrigger.refresh();
    } catch {
      context?.revert(); context = undefined;
    } finally { loading = false; }
  }
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { near = true; observer.disconnect(); void sync(); }
  }, { rootMargin: '160px' });
  const first = page.querySelector('[data-project-reveal]');
  if (first) observer.observe(first);
  const refresh = () => { void sync(); };
  const onToggle = () => { context && void import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh()).catch(() => {}); };
  page.addEventListener('toggle', onToggle, true);
  preference.addEventListener('change', refresh);
  connection?.addEventListener('change', refresh);
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('pageshow', refresh);
  const teardown = (event: PageTransitionEvent) => {
    context?.revert(); context = undefined;
    if (event.persisted) return;
    disposed = true;
    observer.disconnect();
    page.removeEventListener('toggle', onToggle, true);
    preference.removeEventListener('change', refresh);
    connection?.removeEventListener('change', refresh);
    document.removeEventListener('visibilitychange', refresh);
    window.removeEventListener('pageshow', refresh);
    window.removeEventListener('pagehide', teardown);
  };
  window.addEventListener('pagehide', teardown);
}
