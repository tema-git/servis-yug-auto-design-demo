> Current model, approved 2026-11-07: Porsche 911 Carrera 4S by Karol Miklas / Lionsharp Studios (CC BY-SA 4.0), with approved runtime adaptations. Transfer all model/decoder assets and retain the attribution. The earlier Panamera design and propagation notes below are historical and superseded. Smaller car scenes and the wash game now reuse the same approved 3D geometry.

# Сервис Юг — автомобиль снова в порядке

## Product and design intent

Independent website concept for a Moscow car service. Real published contact facts and listed service categories are used; no invented testimonials, prices, ratings, guarantees or business age. The primary action is to discuss the car by phone. The website request form is an explicitly non-sending demonstration.

The visual idea is an illuminated automotive studio: a procedural three-dimensional car, diagnostic drawings and parts that assemble as the reader reaches the section. Large, restrained Manrope typography leaves room around the object. Warm light service surfaces alternate with layered graphite-blue workshop sections. The warm action colour is reserved for primary calls to action and active mechanical details.

## Plan, considered before implementation

The first idea, a dark hero with a generic performance statistics strip, was rejected. No trustworthy statistics exist in the source. Instead, the hero is a single large automotive composition. The shortened page explains real service directions, offers a useful situation-to-service guide, keeps the mechanical assembly and ends with contact methods. Service choices use an editorial list and one linked diagram instead of identical marketing cards.

Updated palette: graphite petrol `#14232b`, deep studio `#0a151d`, light metal `#eeeee7`, warm paper `#faf8f0`, copper action `#f8976f`, deep selection `#aa421e`. Manrope now carries both body and large sentence-case displays, with medium rather than heavy weight. Locally served fonts include Cyrillic coverage and OFL licenses. Body is approximately 18 px; controls and field labels at least 16 px. Secondary explanatory metadata is 14 px minimum.

Layout: broad left-aligned headline and car scene; alternating two-column service/diagram section; a compact service guide; central exploded assembly plus three actual process steps; two-column contacts and demo form. Mobile preserves the sequence and uses horizontal native-scrolling service tabs, then a full-width explanation. Native scrolling is preserved. A thematic inspection cursor is restricted to the non-text diagram area; text, actions and fields retain normal cursors.

## References and deliberate adaptations

- [Pravah / Refero](https://styles.refero.design/style/30a8b128-a5bb-4d86-85eb-743b78091596): engineering subject as graphic language, diagram lines and surface inversions. No reference palette or tiny labels copied. Our branded accent, 18 px body and larger controls meet the user's preferences.
- [Warp / Refero](https://styles.refero.design/style/d4c51049-58eb-404a-9fcb-f195928b1c99): clear depth between closely related dark surfaces. Adapted to a workshop rather than a software terminal.
- [21st Spotlight collection](https://21st.dev/community/components/explore/spotlight-buttons), [Spotlight preview](https://21st.dev/@ibelick/components/spotlight/border-only), [MIT source](https://raw.githubusercontent.com/ibelick/motion-primitives/main/components/core/spotlight.tsx): section-local pointer coordinates driving non-intercepting light. Implemented originally in plain JS/CSS; no component source copied and no React dependency introduced.
- [MotionSites scroll lesson](https://motionsites.ai/lesson/build-scroll-animated-website-with-ai): a thematic visual scene changes with native scroll while text remains HTML. Adapted as a small vector parts assembly, without video caches, page pinning or paid prompts.
- [Adam Lippes / Refero](https://styles.refero.design/style/cdc4a162-cefa-49a1-81e7-4857e421ae24): the premium revision adapts the balance of a large object and generous surrounding space, rather than copying its fashion content or layout.
- [21st Animated Feature Spotlight 3D](https://21st.dev/@ruixen.ui/components/animated-feature-spotlight3d): separate levels of light, object and grounding shadow informed the studio layers and technical panel. Original plain CSS/JS implementation; no React component code copied.
- [MotionSites 3D scroll lesson](https://motionsites.ai/lesson/build-3d-scroll-animated-website-with-ai): the revision applies the principle of changing viewpoint and lighting with scroll to actual procedural geometry. Text and controls remain native HTML and the page retains normal scrolling.

- [WAI APG select-only combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/): used as the accessibility reference for keyboard navigation, active-descendant focus, cancellation and typeahead. The actual control is an original vanilla implementation over the existing native select.

Reference reading is not a claim to have tested external demos. Source/visual previews were reviewed in the parent task; browser validation concerns our actual pages.

## Interaction map

| Section | Input and effect | Bound and fallback |
| --- | --- | --- |
| Hero | Pointer and native scroll change the procedural car's view and light; independent CSS light and floor layers add depth | No bitmap, video, downloaded model or transform applied to the complete canvas. Text and CTA stay fixed. Reduced motion renders a still view. |
| Services | Hover/touch shifts technical grid and diagram; click or arrow keys chooses a service and highlights relevant area | Controls stay fixed. Native tabs, Arrow keys, Home/End, no pointer-only content. |
| Approach | Native scroll draws the guide and brings the tyre, brake, spring and hub in from separated edges; pointer changes their overall view slightly | Assembly progress is measured from the actual artwork's entrance, starts at the viewport bottom and is reversible. No pinning. Reduced motion uses a readable still exploded diagram. |
| Service guide | Choose one of four situations; the site shows a useful direction, explanation, highlights the corresponding schematic area and prepares the form | Native buttons work with pointer, touch and keyboard. Result has a described action and a repeat button; motion is not necessary to use it. |
| Header | Pointer attracts only the inner visual span of “Контакты” by at most 4 px | Link hitbox, background and anchor position stay fixed. Fine pointers only; system reduced motion disables the displacement. |
| Diagram | A small inspection cursor follows the pointer only over the non-text illustration zone | No pointer interception on text or controls, no touch replacement, disabled for reduced motion. |
| Contact | Pointer moves a subdued schematic road drawing; fields remain stationary | Touch tap produces bounded feedback. Reduced motion keeps the scene still. |

DOM motion uses one on-demand scroll animation frame, IntersectionObserver to limit work to visible sections, geometry reads before style writes and requestAnimationFrame coalescing. Pointer bounds refresh when the viewport scrolls or resizes. The separate car module owns its render loop, resize handling and visibility limits. `prefers-reduced-motion` determines the still view automatically. There is no visible animation control or saved preference.

All interface arrows use a single SVG, initially northeast, rotated only by hover or keyboard focus to point east. Scroll never touches arrow transforms. Native text selection is preserved; background remains transparent on light, dark and CTA surfaces. Different letter colours maintain contrast on each surface.

## Useful interactive guide

The “С чего начать?” tool is integrated under the real services. Four situations map to verified service categories: a knock on uneven roads → suspension; engine indicator → computer diagnostics; weak cooling → climate service; scheduled maintenance → technical maintenance. Each result explains what information to prepare for the conversation, highlights the corresponding schematic area and sets the form choice. It does not diagnose an actual vehicle. “Другая ситуация” restores the choices and keyboard focus; immediate actions have no timers or locked state. The old quiz and FAQ sections were removed to shorten the page.

## Booking demonstration

The form validates name and a Russian phone number, rejecting letters and characters outside standard phone formatting rather than silently stripping arbitrary characters. It shows field-level errors, then explicitly states that no data was sent and no real booking exists. Successful input is cleared immediately. Repeating the form preserves the selected service; the service CTA reopens the form after success. No backend, fetch, analytics, storage, console logging or PII persistence is used. The actual contact actions are phone and email links.

The service field progressively enhances the native select into a select-only combobox. DOM focus remains on the button while Arrow keys, Home/End and typeahead change the active option; Enter, Space or Tab commit, Escape cancels. Pointer choices commit directly. The dark copper-accent popup uses a fixed portal directly under body to avoid clipping by the contact artwork. Placement tracks the visual viewport, sticky header, scrolling and keyboard resize; it opens upward when necessary, keeps visible scrollbar and option padding, scrolls the active option into view and stays synchronized with service tabs, guide results and form reset. Without JavaScript the native control is visible. No technical keyboard help is displayed in the site.

## Assets

The visible car is the approved 911 Carrera 4S model by Karol Miklas / Lionsharp Studios, CC BY-SA 4.0, hosted locally at `models/reference-911.glb`. Paint, carbon inserts and the wing are adapted in `car-geometry.js`; source and licence details are retained in `models/LICENSE.html`. It does not represent company property. Earlier generated artwork is no longer referenced by the page. Technical drawings and icons are original SVG code. Fonts include source URLs and OFL licenses in `assets/fonts/`; the Three.js license accompanies the local vendor files.

## Copying the template

Change company facts and service descriptions in `company.js`, then replace static SEO/brand/address fallback strings in `index.html` and revise `SOURCE.json`. Recheck actual services before retaining any selector option. Keep the useful guide and accessibility behaviors unless the new company's profile makes them misleading. Never copy contact facts or add invented business proof.

## Final voice review

Removed visible animation toggles, input-device hints, redundant hero labels, the upper service link, and the public footer date. The exact service heading is “Внимание каждой детали” with no forced line break. Active service rows have consistent inner padding. Footer lettering has extra right-side room so the final letter remains visible during selection. “Spoki Studio” is a plain text credit with no invented URL. Contact facts, the independent-concept disclosure and truthful demo-form disclosure remain.


### Coupe geometry and resilience — voice audit, 4 November 2026
The hero car is now a compact fastback coupe, inspired by the low bonnet, oval lamps and wide rear shoulders of the [official 911 reference](https://www.porsche.com/international/models/911/carrera-models/911-carrera/). It is an original, unbranded procedural model; no photograph, imported model, video or texture is used. Body panels, conforming lamp lenses, roof arc, intakes, wheels, brake discs and fixed calipers are generated in JavaScript. Static meshes are merged by material, reducing the observed desktop renderer from 239 to 75 draw calls (including the shadow pass). Rendering remains event-driven and pauses offscreen.

The procedural PMREM lighting environment is regenerated after WebGL context restoration. Local UI tests explicitly lost and restored the context on both sites: SVG fallback appeared during loss, and the 3D model and metallic reflections returned after restoration. System prefers-reduced-motion still controls decorative motion; no manual toggle is exposed.


## Four-door sports saloon — 4 November 2026

Replaced the short coupé with an original procedural four-door fastback in `car-geometry.js`. The dimensional reference is the Panamera technical sheet: length 5.052 m, body width 1.937 m, height 1.423 m, wheelbase 2.950 m, tracks 1.680/1.651 m. Wheel centres and tyre diameter follow those proportions; overhang split, body surfaces and details are original visual approximations, not factory CAD.

Official visual references (reference only; no photography or manufacturer model is shipped):
- https://newsroom.porsche.com/dam/jcr:f70ca2d1-f5a5-4d16-a497-82d83f717aae/pag-panamera-td-en.pdf.PDF
- https://newsroom.porsche.com/en/press-kits/panamera/exterior-design.html
- https://newsroom.porsche.com/en/2023/products/porsche-panamera-world-premiere-shanghai-34450.html

The new body has a longer cabin, four separate doors, surface-conforming seams, distinct B-pillars and quarter-lights, a panoramic roof, swept four-module lamps, a continuous rear light bar, recessed intake panels, shaped tyre sidewalls, drilled brake discs and ten alloy spokes. Upper and side skin share boundary normals. Side window edging uses separate open curves to avoid folded triangles at sharp ends. No marque badge or affiliation claim is added.

`car-scene.js` preserves the existing cursor/scroll camera response, automatic viewport fitting, local Three.js 0.187.0 dependency, system reduced motion, offscreen suspension, context-loss fallback/recovery and disposal. The procedural studio lighting uses narrower reflections. Static meshes are batched by material: measured 59 draw calls and 319,046 submitted triangles including the shadow pass. There is no continuous idle render loop. The new four-door SVG fallback is embedded in the HTML and the runtime scene.

Visual QA inspected front three-quarter, side, rear three-quarter and front views, desktop 1440 and narrow 390 screenshots, and widths 320/800/1024. No horizontal page overflow was observed. Forms, service selection and interactive blocks were exercised after the change. Tests use browser viewports; physical iOS/Android devices and the live OS reduced-motion setting were not tested.

### Propagation to company copies

Copy `car-geometry.js` and `car-scene.js` together, retaining their relative paths and the hashed geometry import. In each company HTML, update only the `car-scene.js?v=…` query and the inline SVG inside `[data-car-scene]`. Preserve `data-car-scene="service"` or `"wash"`, `company.js`, contacts, brand text, palette and all company-specific content. Do not replace a copy's entire HTML. Three.js/vendor has not changed. Water and foam-game modules are independent and remain untouched. Verify the new module returns HTTP 200 and the host reaches `data-render-state="ready"`; fallback alone does not prove the model loaded.
