# BETAROG design specification

Concepts: `01-hero.png`, `02-services.png`, `03-work.png`, `04-studio.png`, `05-journal-contact.png`.

The user supplied the brand, required copy, technology stack, content boundaries, and sections. These generated concepts establish the visual direction; they were not submitted for a blocking approval step.

## Visual system

- Current palette (November 5 motion/color update): midnight #050810, secondary #0B1120, surface #121C2D, cool white #F2F7FF. Light mode uses #F4F7FC with dark blue text #111D32.
- Electric violet #9869FF, icy cyan #7CE9F5, lavender #BCA4FF, and a restrained lilac #DFABFF. Muted text #A0AEC5. Headline and footer use these colors in gradients; original product imagery stays intact.
- Space Grotesk for headings, Inter for body and UI, JetBrains Mono for small labels. Fonts are bundled through Next.js.
- 1,392px maximum content width; 60px desktop gutters, 24px mobile, 18px on the narrowest screens.
- 6px buttons, 9px project media, fine low-contrast dividers. No nested card grid.
- Motion uses cubic-bezier(.16,1,.3,1): 350–1000ms for interactions and depth reveals, up to 1200ms for the headline and footer. Grouped entrances stagger by 100ms, capped at 400ms. The hero combines independently rotating gyroscopic rings, orbiting light trails, a breathing pearl, a sparse particle field, aurora light, and a shifting headline gradient. Ambient effects pause offscreen/in hidden tabs and skip data-saving visitors. Reduced-motion changes cancel animation immediately.

## Opening composition and allowed copy

BETAROG; Home / Services / Work / About / Insights / Contact; Let's Talk; INNOVATION IN MOTION; WE BUILD / WHAT'S NEXT.; the supplied supporting paragraph; Explore Our Work; Start a Project; AI & SOFTWARE INNOVATION STUDIO; Scroll to explore. No client names, invented statistics, or additional claims.

The orbital sculpture is an isolated transparent asset and a lazy Three.js scene. Violet/cyan atmosphere and thin energy arcs sit behind the object. Mobile and reduced-motion visitors receive the original image, with its own row between heading and paragraph. The November 5 update changes only animation and colors: route text matches the saved baseline, and the checked hero/grid geometry remains unchanged within 0.5px.

## Section architecture

1. Hero: open editorial type, right-hand sculpture, bottom rule.
2. Perspective: oversize statement, scroll-linked opacity.
3. Services: six open cells on a ruled grid; dialogs expose details and a project inquiry link.
4. Work: two large asymmetric previews plus two compact exploration rows. Working category filters and four case-study routes.
5. Studio: philosophy, typographic founder identity, separate optional personal profiles.
6. Process: connected five-stage desktop timeline; stacked connected steps on mobile.
7. Toolkit: five typographic columns, responsive two-column continuation.
8. Research: abstract orbital diagram and explicit areas of exploration.
9. Journal: editorial rows with unpublished draft labels.
10. Contact: editorial headline and real validated form; configuration state is explicit.
11. Footer: oversize wordmark, navigation, official social links, legal templates, theme control.

## Intentional differences from generated concepts

- Original supplied navigation is preserved instead of inconsistent AI-generated navigation on secondary concepts.
- Real TECH AI storefront capture replaces speculative concept artwork.
- Cybersecurity copy describes security-minded engineering and experiments; generated unverified protection claims were rejected.
- Founder copy, process descriptions, and project statuses follow the supplied brief exactly where the concept deviated.
- Official Instagram is included based on the user's later instruction; missing GitHub and LinkedIn accounts remain hidden.
- Live 3D uses physically lit geometry rather than an exact raster reproduction. Static mobile art preserves the approved visual direction.
- Mobile stacks imagery in normal flow, and extends section spacing for touch use and readability.

## Components

Shared Logo, Eyebrow, SectionHeading, ButtonLink, Chips; Header and Footer; Hero/visual/Three.js scene; service dialogs; project artwork/cards; studio/process/toolkit/research; journal and article template; contact form and server handler; motion utilities.

Lucide outline icons use 1.35–2px strokes, with consistent arrow sizing. Interface text and all controls are native HTML. Original brand symbols are SVG. The architectural project study is explicitly conceptual art, never presented as a product screenshot.

## Implementation comparison — 2026-11-04

The reference images and current Playwright screenshots were opened with `view_image` in the same visual QA pass. The opening view was inspected at the concept's 1536×1024 dimensions. Additional widths were 320, 390, 768, and 1440px; both themes were checked.

| Comparison point | Render evidence and resolution |
|---|---|
| Hero copy and hierarchy | Supplied heading, description, navigation, status, and both CTAs are present. No new above-the-fold claims were added. Case and apostrophes follow typographic styling. |
| Typography | Actual bundled Space Grotesk, Inter, and JetBrains Mono were checked. The headline was enlarged after initial comparison. The requested real font metrics take precedence over the generated concept's approximate lettering. |
| Palette and atmosphere | Exact dark base, cool white, lavender emphasis, restrained violet atmosphere, and fine dividers are retained. Light mode uses its own tested contrast tokens. |
| Hero art | Static asset keeps the reference sculpture; desktop renders a responsive Three.js interpretation with smooth metallic bands. Real-time reflections intentionally differ from the offline image. |
| Service structure | Six open cells, outline icons, restrained hover field, and modal details retain the concept structure. User-supplied scope replaces generated unverified service claims. |
| Project media | The verified TECH AI screenshot replaces speculative art; Mosque Suite uses clearly labeled conceptual architecture. Project state labels and four case-study routes are working. |
| Section rhythm | Open studio/founder section, connected process, grouped toolkit, editorial journal, and split contact layout were visually inspected. |
| Mobile | Sculpture moved into normal document flow to eliminate overlap; navigation closes on desktop resize; filters, form, and theme controls remain usable. |
| Interaction proof | Filters update cards; project links open case studies; service dialogs dismiss with Escape and preselect inquiries; real unavailable-delivery responses preserve input; mocked acceptance exercises confirmation/reset only. |

No unresolved content clipping, horizontal overflow, missing imagery, or broken tested control remains. This is a faithful implementation of the design system with the intentional content, font, and real-time-rendering differences documented above; it is not claimed to be a pixel-identical copy of the generated raster concepts.
