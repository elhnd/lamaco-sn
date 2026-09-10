export type ArrowGlyph = '→' | '↗' | '←' | '↳';

/** Trusted UI markup only: the original glyph invisibly retains its font metrics. */
export function brandArrowMarkup(glyph: ArrowGlyph = '→') {
  const direction = glyph === '←' ? 'left' : glyph === '↗' ? 'diagonal' : 'right';
  return `<span class="brand-arrow" data-direction="${direction}" aria-hidden="true"><span class="brand-arrow__measure">${glyph}</span><svg class="brand-arrow__art" viewBox="0 0 100 56" focusable="false"><use href="/brand/arrow.svg#arrow"></use></svg></span>`;
}
