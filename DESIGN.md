# Сервис Юг — автомобиль снова в порядке

## Product and design intent

Independent website concept for a Moscow car service. Real published contact facts and listed service categories are used; no invented testimonials, prices, ratings, guarantees or business age. The primary action is to discuss the car by phone. The website request form is an explicitly non-sending demonstration.

The visual idea is an illuminated automotive studio: a procedural three-dimensional car, diagnostic drawings and parts that assemble as the reader reaches the section. Large, restrained Manrope typography leaves room around the object. Warm light service surfaces alternate with layered graphite-blue workshop sections. The warm action colour is reserved for primary calls to action and active mechanical details.

## Plan, considered before implementation

The first idea, a dark hero with a generic performance statistics strip, was rejected. No trustworthy statistics exist in the source. Instead, the hero is a single large automotive composition. The rest of the page progressively explains real service directions, how to begin, an optional mechanical game, practical questions and contact methods. Service choices use an editorial list and one linked diagram instead of identical marketing cards.

Updated palette: graphite petrol `#14232b`, deep studio `#0a151d`, light metal `#eeeee7`, warm paper `#faf8f0`, copper action `#f8976f`, deep selection `#aa421e`. Manrope now carries both body and large sentence-case displays, with medium rather than heavy weight. Locally served fonts include Cyrillic coverage and OFL licenses. Body is approximately 18 px; controls and field labels at least 16 px. Secondary explanatory metadata is 14 px minimum.

Layout: broad left-aligned headline and car scene; alternating two-column service/diagram section; central exploded assembly plus three actual process steps; dashboard and game; FAQ; two-column contacts and demo form. Mobile preserves the sequence and uses horizontal native-scrolling service tabs, then a full-width explanation. No custom cursor or scroll hijacking.

## References and deliberate adaptations

- [Pravah / Refero](https://styles.refero.design/style/30a8b128-a5bb-4d86-85eb-743b78091596): engineering subject as graphic language, diagram lines and surface inversions. No reference palette or tiny labels copied. Our branded accent, 18 px body and larger controls meet the user's preferences.
- [Warp / Refero](https://styles.refero.design/style/d4c51049-58eb-404a-9fcb-f195928b1c99): clear depth between closely related dark surfaces. Adapted to a workshop rather than a software terminal.
- [21st Spotlight collection](https://21st.dev/community/components/explore/spotlight-buttons), [Spotlight preview](https://21st.dev/@ibelick/components/spotlight/border-only), [MIT source](https://raw.githubusercontent.com/ibelick/motion-primitives/main/components/core/spotlight.tsx): section-local pointer coordinates driving non-intercepting light. Implemented originally in plain JS/CSS; no component source copied and no React dependency introduced.
- [MotionSites scroll lesson](https://motionsites.ai/lesson/build-scroll-animated-website-with-ai): a thematic visual scene changes with native scroll while text remains HTML. Adapted as a small vector parts assembly, without video caches, page pinning or paid prompts.
- [Adam Lippes / Refero](https://styles.refero.design/style/cdc4a162-cefa-49a1-81e7-4857e421ae24): the premium revision adapts the balance of a large object and generous surrounding space, rather than copying its fashion content or layout.
- [21st Animated Feature Spotlight 3D](https://21st.dev/@ruixen.ui/components/animated-feature-spotlight3d): separate levels of light, object and grounding shadow informed the studio layers and technical panel. Original plain CSS/JS implementation; no React component code copied.
- [MotionSites 3D scroll lesson](https://motionsites.ai/lesson/build-3d-scroll-animated-website-with-ai): the revision applies the principle of changing viewpoint and lighting with scroll to actual procedural geometry. Text and controls remain native HTML and the page retains normal scrolling.

Reference reading is not a claim to have tested external demos. Source/visual previews were reviewed in the parent task; browser validation concerns our actual pages.

## Interaction map

| Section | Input and effect | Bound and fallback |
| --- | --- | --- |
| Hero | Pointer and native scroll change the procedural car's view and light; independent CSS light and floor layers add depth | No bitmap, video, downloaded model or transform applied to the complete canvas. Text and CTA stay fixed. Reduced motion renders a still view. |
| Services | Hover/touch shifts technical grid and diagram; click or arrow keys chooses a service and highlights relevant area | Controls stay fixed. Native tabs, Arrow keys, Home/End, no pointer-only content. |
| Approach | Native scroll draws the guide and brings the tyre, brake, spring and hub in from separated edges; pointer changes their overall view slightly | Assembly progress is measured from the actual artwork's entrance, starts at the viewport bottom and is reversible. No pinning. Reduced motion uses a readable still exploded diagram. |
| Pit stop | Pointer lights the instrument panel; correct answers fill gauge and indicators | Native buttons; all controls stable. Reduced motion preserves immediate state/result. |
| Questions | Cursor and scroll rotate a decorative wheel; native details disclose answers | Reading text stays fixed; no decorative false buttons. |
| Contact | Pointer moves a subdued schematic road drawing; fields remain stationary | Touch tap produces bounded feedback. Reduced motion keeps the scene still. |

DOM motion uses one on-demand scroll animation frame, IntersectionObserver to limit work to visible sections, geometry reads before style writes and requestAnimationFrame coalescing. Pointer bounds refresh when the viewport scrolls or resizes. The separate car module owns its render loop, resize handling and visibility limits. `prefers-reduced-motion` always has priority; the footer “Анимация” button lets the user pause motion without persisting any setting. When the OS requests reduced motion, the disabled button explicitly reflects that setting.

All interface arrows use a single SVG, initially northeast, rotated only by hover or keyboard focus to point east. Scroll never touches arrow transforms. Native text selection is preserved; background remains transparent on light, dark and CTA surfaces. Different letter colours maintain contrast on each surface.

## Separate game

“Ваш пит-стоп” has three fictional situations. Select ходовая, тормоза, then компьютерная диагностика. Correct answers lock input briefly, then advance; wrong answers stay available for another attempt. Completing three rounds shows a result and a replay button. Restart cancels pending progression, including rapid actions. Native buttons support mouse, touch, Tab and Enter. The game explicitly says it is not diagnosis of the visitor's vehicle; real symptoms can have several causes.

The revision fixes browser back/forward-cache restoration during a correct-answer transition: pending work is completed without stealing focus. Animation-frame IDs are cleared when leaving and scheduling resumes on return.

## Booking demonstration

The form validates name and a Russian phone number, rejecting letters and characters outside standard phone formatting rather than silently stripping arbitrary characters. It shows field-level errors, then explicitly states that no data was sent and no real booking exists. Successful input is cleared immediately. Repeating the form preserves the selected service; the service CTA reopens the form after success. No backend, fetch, analytics, storage, console logging or PII persistence is used. The actual contact actions are phone and email links.

## Assets

The visible car is created entirely in `car-scene.js` from geometry and materials, using a local Three.js module. The module includes an original inline SVG fallback. It does not load a raster car, video, texture or external model. It is a conceptual unbranded vehicle, not a photograph or model of company property. Earlier generated artwork is no longer referenced by the page. Technical drawings and icons are original SVG code. Fonts include source URLs and OFL licenses in `assets/fonts/`; the Three.js license accompanies the local vendor files.

## Copying the template

Change company facts and service descriptions in `company.js`, then replace static SEO/brand/address fallback strings in `index.html` and revise `SOURCE.json`. Recheck actual services before retaining any selector option. Keep the game and accessibility behaviors unless the new company's profile makes them misleading. Never copy contact facts or add invented business proof.
