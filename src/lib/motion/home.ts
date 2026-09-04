const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const updateHeader = () => {
  document.querySelector<HTMLElement>('[data-header]')?.classList.toggle('is-scrolled', window.scrollY > 90);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

async function enableMotion() {
  if (reducedMotion.matches) return;

  try {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]);

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 26,
          duration: 0.8,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
      },
    });
  } catch { /* Static content remains available when motion cannot load. */ }
}

if (document.readyState === 'complete') {
  void enableMotion();
} else {
  window.addEventListener('load', () => {
    void enableMotion();
  }, { once: true });
}
