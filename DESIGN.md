# Сервис Юг — автомобиль снова в порядке

## Product and design intent

Independent website concept for a Moscow car service. Real published contact facts and listed service categories are used; no invented testimonials, prices, ratings, guarantees or business age. The primary action is to discuss the car by phone. The website request form is an explicitly non-sending demonstration.

The visual idea is a precision workshop: a graphite car, diagnostic drawings and parts that assemble as the reader reaches the section. Large narrow Cyrillic typography occupies physical space, like a garage sign. Light service surfaces alternate with petrol-blue workshop sections. The warm action colour is deliberately reserved for primary calls to action and active mechanical details.

## Plan, considered before implementation

The first idea, a dark hero with a generic performance statistics strip, was rejected. No trustworthy statistics exist in the source. Instead, the hero is a single large automotive composition. The rest of the page progressively explains real service directions, how to begin, an optional mechanical game, practical questions and contact methods. Service choices use an editorial list and one linked diagram instead of identical marketing cards.

Palette: workshop petrol `#122e35`, deep bay `#092129`, light metal `#e9ece5`, paper `#f5f5ed`, signal coral `#ff7959`, deep action/selection `#b93416`. Body text uses Manrope; large displays use Oswald. Both have Cyrillic support and are locally served under their OFL licenses. Body is 18 px; controls and field labels at least 16 px. Secondary explanatory metadata is 14 px minimum.

Layout: broad left-aligned headline and car scene; alternating two-column service/diagram section; central exploded assembly plus three actual process steps; dashboard and game; FAQ; two-column contacts and demo form. Mobile preserves the sequence and uses horizontal native-scrolling service tabs, then a full-width explanation. No custom cursor or scroll hijacking.

## References and deliberate adaptations

- [Pravah / Refero](https://styles.refero.design/style/30a8b128-a5bb-4d86-85eb-743b78091596): engineering subject as graphic language, diagram lines and surface inversions. No reference palette or tiny labels copied. Our branded accent, 18 px body and larger controls meet the user's preferences.
- [Warp / Refero](https://styles.refero.design/style/d4c51049-58eb-404a-9fcb-f195928b1c99): clear depth between closely related dark surfaces. Adapted to a workshop rather than a software terminal.
- [21st Spotlight collection](https://21st.dev/community/components/explore/spotlight-buttons), [Spotlight preview](https://21st.dev/@ibelick/components/spotlight/border-only), [MIT source](https://raw.githubusercontent.com/ibelick/motion-primitives/main/components/core/spotlight.tsx): section-local pointer coordinates driving non-intercepting light. Implemented originally in plain JS/CSS; no component source copied and no React dependency introduced.
- [MotionSites scroll lesson](https://motionsites.ai/lesson/build-scroll-animated-website-with-ai): a thematic visual scene changes with native scroll while text remains HTML. Adapted as a small vector parts assembly, without video caches, page pinning or paid prompts.

Reference reading is not a claim to have tested external demos. Source/visual previews were reviewed in the parent task; browser validation concerns our actual pages.

## Interaction map

| Section | Input and effect | Bound and fallback |
| --- | --- | --- |
| Hero | Cursor/touch shifts car, guide labels and scan arc at different speeds; scroll subtly changes car height | Art only, 7–30 px; CTA and text stay fixed. Reduced motion returns still composition. |
| Services | Hover/touch shifts technical grid and diagram; click or arrow keys chooses a service and highlights relevant area | Controls stay fixed. Native tabs, Arrow keys, Home/End, no pointer-only content. |
| Approach | Native scroll assembles the tyre, brake, spring and hub from visibly separated starting positions; pointer changes their overall view slightly | Starts as soon as section enters the viewport bottom, reversible; no pinning. Reduced motion fully assembles immediately. |
| Pit stop | Pointer lights the instrument panel; correct answers fill gauge and indicators | Native buttons; all controls stable. Reduced motion preserves immediate state/result. |
| Questions | Cursor and scroll rotate a decorative wheel; native details disclose answers | Reading text stays fixed; no decorative false buttons. |
| Contact | Pointer moves a subdued schematic road drawing; fields remain stationary | Touch tap produces bounded feedback. Reduced motion keeps the scene still. |

Motion uses one on-demand scroll animation frame, IntersectionObserver to limit work to visible sections, cached pointer bounds and requestAnimationFrame coalescing. Nothing loops continuously offscreen. `prefers-reduced-motion` is honoured; the footer “Анимация” button lets the user pause motion without persisting any setting.

All interface arrows use a single SVG, initially northeast, rotated only by hover or keyboard focus to point east. Scroll never touches arrow transforms. Native text selection is preserved; background remains transparent on light, dark and CTA surfaces. Different letter colours maintain contrast on each surface.

## Separate game

“Ваш пит-стоп” has three fictional situations. Select ходовая, тормоза, then компьютерная диагностика. Correct answers lock input briefly, then advance; wrong answers stay available for another attempt. Completing three rounds shows a result and a replay button. Restart cancels pending progression, including rapid actions. Native buttons support mouse, touch, Tab and Enter. The game explicitly says it is not diagnosis of the visitor's vehicle; real symptoms can have several causes.

## Booking demonstration

The form validates name and a Russian phone number, shows field-level errors, then explicitly states that no data was sent and no real booking exists. Successful input is cleared immediately. No backend, fetch, analytics, storage, console logging or PII persistence is used. The actual contact actions are phone and email links.

## Assets

`assets/hero-car.webp` is an AI-generated conceptual product visual, not a photograph of this business or its work. The built-in image generation tool was used by the parent task. Exact prompt and origin are in `assets/image-provenance.json`. Technical drawings and icons are original SVG code. Fonts include source URLs and OFL licenses in `assets/fonts/`.

## Copying the template

Change company facts and service descriptions in `company.js`, then replace static SEO/brand/address fallback strings in `index.html` and revise `SOURCE.json`. Recheck actual services before retaining any selector option. Keep the game and accessibility behaviors unless the new company's profile makes them misleading. Never copy contact facts or add invented business proof.
