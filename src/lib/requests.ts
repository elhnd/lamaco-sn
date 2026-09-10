import { brandArrowMarkup } from './brand-arrow';
type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function enableRequestForm(page: HTMLElement) {
  const form = page.querySelector<HTMLFormElement>('[data-request-form]')!;
  const gate = form.querySelector<HTMLFieldSetElement>('[data-gate]')!;
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>('[data-step]')];
  const progress = page.querySelector<HTMLElement>('[data-progress]')!;
  const markers = [...progress.querySelectorAll<HTMLButtonElement>('[data-go]')];
  const next = form.querySelector<HTMLButtonElement>('[data-next]')!;
  const back = form.querySelector<HTMLButtonElement>('[data-back]')!;
  const result = page.querySelector<HTMLElement>('[data-result]')!;
  const message = result.querySelector<HTMLTextAreaElement>('[data-message]')!;
  const copyStatus = result.querySelector<HTMLElement>('[data-copy-status]')!;
  const fields = [...form.querySelectorAll<Field>('input[name], select[name], textarea[name]')];
  let current = 0;
  let furthest = 0;

  const value = (name: string) => {
    const field = fields.find(item => item.name === name && (!(item instanceof HTMLInputElement) || item.type !== 'radio' || item.checked));
    if (!field || field.closest<HTMLElement>('[data-conditional]')?.hidden) return '';
    return field.value.trim();
  };
  const displayValue = (name: string) => {
    const field = fields.find(item => item.name === name && (!(item instanceof HTMLInputElement) || item.type !== 'radio' || item.checked));
    if (!field || !value(name)) return '';
    if (field instanceof HTMLSelectElement) return field.selectedOptions[0]?.textContent?.trim() ?? '';
    return field.dataset.choiceLabel ?? value(name);
  };
  const syncConditional = () => {
    form.querySelectorAll<HTMLElement>('[data-conditional]').forEach(panel => {
      panel.hidden = panel.dataset.conditional !== value('besoin');
      panel.querySelectorAll<Field>('input, select, textarea').forEach(field => { field.disabled = Boolean(panel.hidden); });
    });
  };
  const recap = () => {
    page.querySelectorAll<HTMLElement>('[data-recap]').forEach(el => { el.textContent = displayValue(el.dataset.recap!) || 'À préciser'; });
  };

  function show(index: number, focus = true) {
    current = index;
    furthest = Math.max(furthest, index);
    steps.forEach((step, i) => { step.hidden = i !== index; step.disabled = i !== index; });
    markers.forEach((marker, i) => {
      if (i === index) marker.setAttribute('aria-current', 'step');
      else marker.removeAttribute('aria-current');
      marker.disabled = i > furthest;
      marker.classList.toggle('is-complete', i < index);
    });
    page.querySelector<HTMLElement>('[data-progress-fill]')!.style.width = `${(index + 1) / steps.length * 100}%`;
    back.hidden = index === 0;
    next.innerHTML = index === 2 ? `Préparer ma demande <span aria-hidden="true">${brandArrowMarkup('↗')}</span>` : `${index === 0 ? (page.dataset.mode === 'devis' ? 'Le chantier' : 'Le contexte') : 'Mes coordonnées'} <span aria-hidden="true">${brandArrowMarkup('→')}</span>`;
    recap();
    if (focus) steps[index].querySelector<HTMLElement>('legend')?.focus({ preventScroll: true });
    if (focus) page.querySelector('#demande')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }

  function invalidField(index: number): Field | undefined {
    const step = steps[index];
    const wasDisabled = step.disabled;
    step.disabled = false;
    const candidates = [...step.querySelectorAll<Field>('input, select, textarea')].filter(field => !field.disabled);
    candidates.forEach(field => {
      field.setCustomValidity('');
      if (field instanceof HTMLSelectElement || (field instanceof HTMLInputElement && field.type === 'radio')) return;
      const content = field.value.trim();
      if (field.required && !content) field.setCustomValidity('Merci de renseigner ce champ.');
      else if (content && field.minLength > 0 && content.length < field.minLength) field.setCustomValidity(`Précisez votre réponse (${field.minLength} caractères minimum).`);
      if (field.name === 'telephone' && content && (!/^[+\d\s().-]+$/.test(content) || content.replace(/\D/g, '').length < 8 || content.replace(/\D/g, '').length > 15)) {
        field.setCustomValidity('Indiquez un numéro valide contenant 8 à 15 chiffres, avec l’indicatif du pays si nécessaire.');
      }
    });
    const invalid = candidates.find(field => !field.checkValidity());
    step.disabled = wasDisabled;
    return invalid;
  }
  function canProceed(end: number) {
    for (let index = 0; index <= end; index++) {
      const invalid = invalidField(index);
      if (invalid) { show(index); invalid.reportValidity(); return false; }
    }
    return true;
  }
  function prepareMessage() {
    const lines = [
      `Bonjour LAMACO, je souhaite ${page.dataset.mode === 'devis' ? 'un devis' : 'un conseil'} pour mon chantier.`,
      '',
      ...[
        ['besoin', 'Besoin'], ['materiau', 'Matériau'], ['engin', 'Engin'], ['travaux', 'Travaux'],
        ['quantite', 'Quantité / dimensions / durée'], ['question', 'Ma question'],
        ['localisation', 'Chantier'], ['delai', 'Horizon'], ['acces', 'Accès'], ['precisions', 'Précisions'],
        ['nom', 'Nom'], ['telephone', 'Téléphone'],
      ].flatMap(([name, label]) => displayValue(name) ? [`${label} : ${displayValue(name)}`] : []),
      '', 'Merci de me préciser les prochaines étapes.',
    ];
    message.value = lines.join('\n');
    const sms = result.querySelector<HTMLAnchorElement>('[data-sms]')!;
    // Standards-based SMS URI. The copy action remains available on unsupported devices.
    sms.href = `sms:${page.dataset.phone}?body=${encodeURIComponent(message.value)}`;
    form.hidden = true;
    progress.hidden = true;
    result.hidden = false;
    copyStatus.textContent = '';
    result.querySelector<HTMLElement>('h2')!.focus({ preventScroll: true });
    page.querySelector('#demande')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!canProceed(current)) return;
    if (current < 2) show(current + 1);
    else prepareMessage();
  });
  back.addEventListener('click', () => show(Math.max(0, current - 1)));
  markers.forEach((marker, index) => marker.addEventListener('click', () => {
    if (index <= current || canProceed(index - 1)) show(index);
  }));
  form.addEventListener('input', event => {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) field.setCustomValidity('');
    syncConditional();
    recap();
  });
  result.querySelector('[data-edit]')!.addEventListener('click', () => {
    result.hidden = true;
    form.hidden = false;
    progress.hidden = false;
    show(2);
  });
  result.querySelector('[data-copy]')!.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message.value);
      copyStatus.textContent = 'Demande copiée. Vous pouvez la coller dans votre message à LAMACO.';
    } catch {
      message.focus();
      message.select();
      copyStatus.textContent = 'La copie automatique n’est pas disponible. Le texte est sélectionné : utilisez la commande Copier de votre appareil.';
    }
  });
  const query = new URLSearchParams(window.location.search);
  const requestedMaterial = query.get('materiau');
  const material = form.querySelector<HTMLSelectElement>('[name="materiau"]');
  if (requestedMaterial && material && [...material.options].some(option => option.value === requestedMaterial)) {
    material.value = requestedMaterial;
    form.querySelector<HTMLInputElement>('input[value="materiaux"]')!.checked = true;
  }
  const requestedEquipment = query.get('engin');
  const equipmentSelect = form.querySelector<HTMLSelectElement>('[name="engin"]');
  const equipmentOption = requestedEquipment && equipmentSelect
    ? [...equipmentSelect.options].find(option => option.dataset.equipment === requestedEquipment)
    : undefined;
  if (equipmentOption && equipmentSelect) {
    equipmentSelect.value = equipmentOption.value;
    form.querySelector<HTMLInputElement>('input[value="engins"]')!.checked = true;
  }
  syncConditional();
  gate.disabled = false;
  show(0, false);
  form.hidden = false;
  progress.hidden = false;
  page.querySelector<HTMLElement>('[data-startup]')!.hidden = true;
}
