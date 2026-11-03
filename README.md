# Сервис Юг — design concept

Buildless static HTML/CSS/JavaScript. Open through a local HTTP server, for example `python3 -m http.server 8000`, or deploy the repository root to GitHub Pages. All paths are relative and `.nojekyll` is included. This is an independent, noindex concept, not the official company website.

## Files

- `company.js`: company facts, contact URLs, service copy and diagram mapping.
- `index.html`: semantic content, SEO fallback, contact form, accessible game controls and original SVG drawings.
- `style.css`: responsive design, selection treatment, interaction and reduced-motion variants.
- `app.js`: menu, service tabs, game, honest non-sending form and motion.
- `assets/`: generated conceptual car, local fonts, provenance and licenses.

## Behavior

The header and “Контакты” button stay visible. Services are native buttons with tab semantics and keyboard navigation. The pit-stop game is played with mouse, touch or keyboard; correct sequence is suspension, brakes, electronics. Correct rounds advance after 950 ms; rapid input is locked and reset cancels timers. The footer motion toggle is not persisted. Form input is validated then discarded, with a truthful demo success state. There is no network submission, personal-data storage, analytics or live booking integration.

## Verification selectors

- Menu: `.menu-toggle`, `#mobile-menu`.
- Services: `[data-service]`, `#service-title`, `.mechanism-scene[data-zone]`.
- Game: `#game-start`, `[data-answer="suspension"]`, `[data-answer="brakes"]`, `[data-answer="electronics"]`; allow 950 ms after correct actions. `#game-finish`, `#game-restart`, `#game-restart-active`.
- Form: `#customer-name`, `#customer-phone`, `#customer-car`, `#service-choice`, `#booking-form`; result `#form-success`, reset `#form-reset`.
- Motion: `#motion-toggle`, `html[data-motion-off]`.

Browser QA and deployment are performed by the parent task; this source package's syntax checks use `node --check app.js` and `node --check company.js`.

## Real data limitations

Phone, email, address, working hours and service categories come from the public business card read on 4 November 2026. Publication of those facts was checked; the team did not call, email or confirm current business activity. Hours and entrance should be checked before a visit. No prices, reviews, ratings, awards, guarantees, business age, real workshop photos or staff portraits are invented.

## Replication

Preserve all interaction and accessibility requirements while replacing `company.js`, static HTML fallbacks, provenance and assets. Adapt service options to verified capabilities. Keep demo notices unless a real, authorized booking backend has been integrated and tested.
