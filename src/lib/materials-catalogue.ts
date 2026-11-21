export function enableMaterialsCatalogue(catalogue: HTMLElement) {
  const filters = catalogue.querySelector<HTMLElement>('[data-filters]');
  const buttons = catalogue.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = catalogue.querySelectorAll<HTMLElement>('[data-material]');
  const count = catalogue.querySelector<HTMLElement>('[data-count]');
  if (!filters || !buttons.length || !cards.length || !count) return;

  filters.inert = false;
  filters.removeAttribute('data-filters-pending');
  const applyFilter = (filter: string) => {
    let total = 0;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    cards.forEach(card => {
      card.hidden = filter !== 'tous' && card.dataset.material !== filter;
      if (!card.hidden) total++;
    });
    count.textContent = `${total} ${total === 1 ? 'référence' : 'références'}`;
  };
  const readFilter = () => {
    const requested = new URLSearchParams(location.search).get('famille');
    const filter = requested && [...buttons].some(button => button.dataset.filter === requested) ? requested : 'tous';
    applyFilter(filter);
  };

  buttons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter ?? 'tous';
    const url = new URL(location.href);
    if (filter === 'tous') url.searchParams.delete('famille');
    else url.searchParams.set('famille', filter);
    history.pushState(null, '', url);
    applyFilter(filter);
  }));
  window.addEventListener('popstate', readFilter);
  readFilter();
}
