import { brandArrowMarkup } from './brand-arrow';
export function enableContactForm(section: HTMLElement) {
  const form = section.querySelector<HTMLFormElement>('[data-contact-form]')!;
  const fields = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, select, textarea')];
  const body = form.querySelector<HTMLTextAreaElement>('[name="message"]')!;
  const subject = form.querySelector<HTMLSelectElement>('[name="sujet"]')!;
  const context = form.querySelector<HTMLElement>('[data-contact-context]')!;
  const result = section.querySelector<HTMLElement>('[data-contact-result]')!;
  const preview = result.querySelector<HTMLTextAreaElement>('[data-contact-preview]')!;
  const status = result.querySelector<HTMLElement>('[data-contact-copy-status]')!;

  function sync() {
    form.querySelector<HTMLElement>('[data-contact-count]')!.textContent = `${body.value.length.toLocaleString('fr-FR')} / 2 000 caractères`;
    const destinations: Record<string, { href: string; label: string }> = {
      'Demande de devis': { href: '/demande-de-devis/', label: 'Pour détailler les matériaux ou les engins, utilisez aussi notre parcours devis' },
      'Demande de conseil': { href: '/demande-de-conseil/', label: 'Besoin d’être guidé ? Découvrez notre parcours conseil' },
    };
    const destination = destinations[subject.value];
    context.replaceChildren();
    context.hidden = !destination;
    if (destination) {
      const link = document.createElement('a');
      link.href = destination.href;
      const label = document.createElement('span');
      label.textContent = `${destination.label} `;
      label.insertAdjacentHTML('beforeend', brandArrowMarkup('↗'));
      link.append(label);
      context.append(link);
    }
  }
  form.addEventListener('input', event => {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) field.setCustomValidity('');
    sync();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    fields.forEach(field => {
      field.setCustomValidity('');
      const value = field.value.trim();
      if (field.required && !value) field.setCustomValidity('Merci de renseigner ce champ.');
      else if (!(field instanceof HTMLSelectElement) && value && field.minLength > 0 && value.length < field.minLength) field.setCustomValidity(`Merci de préciser votre réponse (${field.minLength} caractères minimum).`);
      if (field.name === 'telephone' && value && (!/^[+\d\s().-]+$/.test(value) || value.replace(/\D/g, '').length < 8 || value.replace(/\D/g, '').length > 15)) field.setCustomValidity('Indiquez un numéro valide contenant 8 à 15 chiffres, avec votre indicatif si nécessaire.');
    });
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(fields.map(field => [field.name, field.value.trim()]));
    preview.value = [
      'Bonjour LAMACO,', '', `Sujet : ${values.sujet}`, '', values.message, '',
      `Nom : ${values.nom}`, `Téléphone : ${values.telephone}`,
      ...(values.email ? [`E-mail : ${values.email}`] : []),
    ].join('\n');
    result.querySelector<HTMLAnchorElement>('[data-contact-sms]')!.href = `sms:${section.dataset.phone}?body=${encodeURIComponent(preview.value)}`;
    form.hidden = true;
    result.hidden = false;
    status.textContent = '';
    result.querySelector<HTMLElement>('h3')!.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  result.querySelector('[data-contact-edit]')!.addEventListener('click', () => {
    result.hidden = true;
    form.hidden = false;
    body.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  result.querySelector('[data-contact-copy]')!.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(preview.value);
      status.textContent = 'Message copié. Collez-le dans votre échange avec LAMACO.';
    } catch {
      preview.focus(); preview.select();
      status.textContent = 'Copie automatique indisponible. Le texte est sélectionné : utilisez la commande Copier de votre appareil.';
    }
  });
  sync();
  form.querySelector<HTMLFieldSetElement>('[data-contact-gate]')!.disabled = false;
  form.hidden = false;
  section.querySelector<HTMLElement>('[data-contact-fallback]')!.hidden = true;
}
