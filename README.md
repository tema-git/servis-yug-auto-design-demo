# Сервис Юг — design concept

Buildless static HTML/CSS/JavaScript. Open through a local HTTP server, for example `python3 -m http.server 8000`, or deploy the repository root to GitHub Pages. All paths are relative and `.nojekyll` is included. This is an independent, noindex concept, not the official company website.

## Files

- `company.js`: company facts, contact URLs, service copy and diagram mapping.
- `index.html`: semantic content, SEO fallback, contact form, accessible service-guide controls and original SVG drawings.
- `style.css`: base layout, interaction and accessibility rules.
- `premium.css`: automotive studio art direction, refined typography, layered lighting and responsive scene composition.
- `app.js`: menu, service tabs, service guide, accessible custom select, honest non-sending form and motion.
- `car-scene.js`: procedural 3D car, local SVG fallback, bounded pointer/scroll scene and rendering lifecycle.
- `vendor/`: locally served Three.js modules and their license.
- `assets/`: local fonts, provenance and licenses. The older generated car is not displayed.

## Behavior

The header and “Контакты” button stay visible. Its magnetic effect moves only an internal visual span by at most 4 px. Services are native buttons with tab semantics and keyboard navigation. The separate situation guide maps four common situations to service categories, explains what to discuss and offers a repeat action. The form service selector is a progressively enhanced select-only combobox with native fallback. System reduced motion is respected automatically; no visible animation toggle is shown. Form input is validated then discarded, with a truthful demo success state. Repeating the form retains its selected service. There is no network submission, personal-data storage, analytics or live booking integration.

The large vehicle is rendered from code, without car images, downloaded 3D models or video. Native scroll changes its view and lighting; the separate SVG mechanical assembly draws its guide and brings parts together as the artwork enters the viewport. All text and action targets stay still.

## Verification selectors

- Menu: `.menu-toggle`, `#mobile-menu`.
- Services: `[data-service]`, `#service-title`, `.mechanism-scene[data-zone]`.
- Guide: `[data-symptom="suspension"]`, `[data-symptom="diagnostics"]`, `[data-symptom="climate"]`, `[data-symptom="maintenance"]`; result `#guide-result`, action `#guide-book`, repeat `#guide-reset`.
- Custom select: `#service-select-trigger`, `#service-options [role="option"][data-value]`; synchronized native value `#service-choice`.
- Form: `#customer-name`, `#customer-phone`, `#customer-car`, `#service-choice`, `#booking-form`; result `#form-success`, reset `#form-reset`.
- Motion: OS `prefers-reduced-motion`, `html[data-motion-off]`; thematic cursor `.inspection-zone`, magnetic visual `.magnet-visual`.
- Procedural scene: `[data-car-scene="service"] canvas`; assembly progress: `.approach-section` custom property `--assembly-progress`.

Browser QA and deployment are performed by the parent task; this source package's syntax checks use `node --check app.js` and `node --check company.js`.

Regression checks for this revision: every guide result and repeat; select open/close, Arrow keys, Home/End, typeahead, Enter/Space/Tab, Escape cancellation, outside click and touch; service/guide/form synchronization; invalid and valid form then repeat; fixed Contacts hitbox; ordinary cursor on text and controls; OS reduced motion; footer text selection; 320 px layout. Browser QA is handled in the parent task.

## Real data limitations

Phone, email, address, working hours and service categories come from the public business card read on 4 November 2026. Publication of those facts was checked; the team did not call, email or confirm current business activity. Hours and entrance should be checked before a visit. No prices, reviews, ratings, awards, guarantees, business age, real workshop photos or staff portraits are invented.

## Replication

Preserve all interaction and accessibility requirements while replacing `company.js`, static HTML fallbacks, provenance and assets. Adapt service options to verified capabilities. Keep demo notices unless a real, authorized booking backend has been integrated and tested.


### Updated procedural car

The hero now imports the shared four-door model from `car-geometry.js` through `car-scene.js`. Both files and their cache hashes must travel together when updating a company copy. Preserve the company's HTML/branding and update only the module reference and inline fallback; see the propagation notes in `DESIGN.md`. No new package or remote asset is required.
