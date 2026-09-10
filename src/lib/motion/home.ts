/** Only the hero stays sticky; all following sections scroll in normal flow. */
const preference = window.matchMedia('(prefers-reduced-motion: no-preference)');
const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
const revealed = new WeakSet<Element>();
let motion: { revert: () => void } | undefined;
let loading = false;
let disposed = false;
const allowed = () => !disposed && !document.hidden && preference.matches && !connection?.saveData;

async function syncMotion() {
  if (!allowed()) { motion?.revert(); motion = undefined; return; }
  if (loading || motion || document.readyState === 'loading') return;
  loading = true;
  try {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
    if (!allowed()) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    motion = media;
    media.add({ animate: '(prefers-reduced-motion: no-preference)' }, context => {
      if (!context.conditions?.animate) return;
      const revealTargets = Array.from(document.querySelectorAll('[data-reveal]')).filter(element => !revealed.has(element));
      if (revealTargets.length) ScrollTrigger.batch(revealTargets, {
        start: 'top 88%', once: true,
        onEnter: elements => {
          context.add(() => {
            elements.forEach(element => revealed.add(element));
            gsap.from(elements, { y: 26, duration: 0.8, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity' });
          });
        },
      });
      const main = document.querySelector<HTMLElement>('.home-stack');
      if (!main) return;
      const panels = Array.from(main.querySelectorAll<HTMLElement>(':scope > section'));
      const hero = main.querySelector<HTMLElement>(':scope > .hero');
      if (!hero) return;
      const header = document.querySelector<HTMLElement>('.site-header');
      const headerOffset = () => (header?.offsetHeight ?? 78) + 12;
      gsap.set(main, { isolation: 'isolate' });
      gsap.set(hero, { position: 'sticky', top: 0, zIndex: 1 });
      gsap.set(panels.filter(panel => panel !== hero), { position: 'relative', zIndex: 2 });
      const updateOffsets = () => {
        // A tall hero can still be read to its bottom on short/mobile viewports.
        hero.style.top = `${Math.min(0, window.innerHeight - hero.offsetHeight)}px`;
      };
      updateOffsets();
      const observer = new ResizeObserver(updateOffsets);
      observer.observe(hero);
      window.addEventListener('resize', updateOffsets);
      // Keyboard focus can return to hero links even after it has been covered.
      const onFocus = (event: FocusEvent) => {
        const target = event.target;
        if (!(target instanceof HTMLElement) || !target.matches(':focus-visible')) return;
        const rect = target.getBoundingClientRect();
        const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        if (rect.top >= headerOffset() && rect.bottom <= innerHeight && hit && target.contains(hit)) return;
        const relativeBottom = rect.bottom - hero.getBoundingClientRect().top;
        const extra = Math.max(0, relativeBottom - (innerHeight - headerOffset() - 24));
        window.scrollTo({ top: main.getBoundingClientRect().top + scrollY + extra, behavior: 'instant' });
      };
      hero.addEventListener('focusin', onFocus);
      main.setAttribute('data-parallax', 'hero-fixed');
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', updateOffsets);
        hero.removeEventListener('focusin', onFocus);
        main.removeAttribute('data-parallax');
      };
    });
    ScrollTrigger.refresh();
  } catch {
    motion?.revert();
    motion = undefined;
    // Static content remains usable if optional animation chunks fail to load.
  } finally { loading = false; }
}

preference.addEventListener('change', syncMotion);
connection?.addEventListener('change', syncMotion);
document.addEventListener('visibilitychange', syncMotion);
document.addEventListener('DOMContentLoaded', syncMotion, { once: true });
window.addEventListener('pageshow', syncMotion);
window.addEventListener('load', syncMotion, { once: true });
window.addEventListener('pagehide', function onHide(event: PageTransitionEvent) {
  motion?.revert();
  motion = undefined;
  if (event.persisted) return;
  disposed = true;
  preference.removeEventListener('change', syncMotion);
  connection?.removeEventListener('change', syncMotion);
  document.removeEventListener('visibilitychange', syncMotion);
  document.removeEventListener('DOMContentLoaded', syncMotion);
  window.removeEventListener('pageshow', syncMotion);
  window.removeEventListener('load', syncMotion);
  window.removeEventListener('pagehide', onHide);
});
void syncMotion();
