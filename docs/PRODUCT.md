# Product & Content Source of Truth

## Company
LAMACO is a growing Senegalese company in construction/BTP and related services. The site must present the current business credibly, not pretend LAMACO is already a large industrial group.

## Current offers
- Construction sand
- Concrete, gravel, silex/flint, limestone and basalt
- Delivery of materials to worksites
- Construction equipment rental
- Earthworks and land cleaning
- Advice on material needs

## Current resources
- 1 dump truck
- 1 excavator
- 1 outdoor depot/storage/display area
- Team: about 4 people

Do not present future categories (hardware store, marketplace, digital tools, simulator, AI, etc.) as active services unless explicitly requested.

## Audience
Individuals, self-builders, artisans, BTP companies, developers/investors and Senegalese diaspora. The diaspora angle can emphasize visibility, reliable delivery and remote project coordination, without unsupported promises.

## Contact
Website: `https://lamaco-sn.com`
Phones:
- `+221 77 276 06 21`
- `+221 77 639 27 96`

## V1 pages
- `/` — brand, core offers, materials, equipment, process, strong contact CTA
- `/materiaux` — real material categories and available variants only
- `/engins` — current equipment only
- `/services` — delivery, rental, earthworks, cleaning, material advice
- `/realisations` — only documented real projects; otherwise use a restrained empty/coming-content state
- `/a-propos` — company story, positioning, operating approach
- `/contact` — phones + static contact information; no fake working form until backend exists

## Content rules
- French is primary.
- Tone: direct, professional, concrete, Senegal-relevant.
- Avoid generic corporate filler.
- No fabricated metrics such as “500+ projects”, “15 years”, “1M tonnes”.
- Store repeated content in `src/data/`; components render it.
- Unknown data stays absent or marked TODO in source, never guessed in UI.
