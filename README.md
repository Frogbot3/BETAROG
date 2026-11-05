# BETAROG

A complete Next.js website for **BETAROG — AI & Software Innovation Studio**. Dark editorial design, an original geometric identity, interactive orbital sculpture, project portfolio, founder profile, journal infrastructure, and a protected inquiry endpoint.

## Run locally

Requires Node.js 24.x and npm, matching the Vercel runtime.

```powershell
npm ci
npm run dev
```

Open **http://127.0.0.1:3000**. No credentials are required to explore the site. Optional settings can be copied into `.env.local`:

```powershell
Copy-Item .env.example .env.local
```

Production verification:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

In another terminal, run `npm run test:e2e`. The browser suite uses installed Microsoft Edge on Windows and Chromium elsewhere. On other systems, install the test browser with `npx playwright install chromium`. The suite can also start the built server itself.

## Project structure

```text
src/
  app/
    page.tsx                    Homepage
    services/                   Services page
    work/[slug]/                Portfolio and four case studies
    about/                      Studio and founder
    insights/[slug]/            Journal and gated article template
    contact/                    Inquiry page
    api/contact/route.ts        Validated server-side submission
    privacy/, terms/            Clearly marked legal review templates
    layout.tsx, globals.css     Fonts, metadata, layout, design system
    error.tsx, not-found.tsx     Error states
    loading.tsx, template.tsx   Loading and page transitions
    sitemap.ts, robots.ts       Search metadata
    opengraph-image.tsx         Generated sharing card
  components/                   Focused UI, section, form, and motion modules
  content/journal.ts            Typed article blocks and publication status
  lib/
    site.ts                     Brand and navigation
    social.ts                   Official brand and personal founder links
    content.ts                  Projects, services, process, technologies
    contact-schema.ts           Shared validation and budget options
    contact-config.ts           Configuration readiness
    rate-limit.ts               Production Redis / local development limiter
public/
  brand/                        Original SVG identity variants
  images/                       Optimized local WebP assets
design/                         Five visual concepts and design-system.md
tests/                          API, content, and browser tests
.env.example                    All settings with no credentials
vercel.json                     Next.js deployment configuration
```

## What is implemented

- Home, services, filtered work, four project stories, about, insights, contact, privacy, terms, and custom 404/error states.
- Desktop and mobile navigation, keyboard-accessible service dialogs, service-to-inquiry selection, persistent light/dark theme, visible focus, skip link, and responsive layouts from 320px.
- Lazy React Three Fiber sculpture with independently rotating rings, orbiting light trails, a breathing core, sparse particles, and cursor response. Offscreen/hidden-tab pause, bounded device pixel ratio, and an image fallback protect mobile, reduced-motion, unavailable WebGL, and constrained-device experiences.
- Masked headline entrances, staggered section and project reveals, a lifting footer wordmark, and animated menu/dialog entrances. Project filters replay the entrance for their new results.
- Cursor-responsive project tilt and lighting, magnetic buttons with a hover sheen, a floating mobile sculpture, drifting hero atmosphere, orbiting research particles, and a native scroll-progress line in supporting browsers. Pointer updates are batched to animation frames; ambient loops pause offscreen or in hidden tabs. Reduced-motion changes take effect immediately, and data-saving visitors skip ambient and pointer effects. Existing GSAP sequences preserve native scrolling.
- Centralized, truthful project status. TECH AI uses a real storefront screenshot captured from the supplied deployed site. Mosque Suite is in development; security work is experimental; no individual completed ML experiments are invented.
- Client/server form validation, origin checking, capped request bodies, honeypot, minimum completion time, rate limiting, optional Turnstile in development and mandatory Turnstile for production delivery, provider timeouts, plain-text email, and idempotency keys.
- SEO metadata, per-route canonical URLs, organization data using only supplied information, sitemap, robots, favicon, Open Graph/Twitter image, security headers, and local optimized images/fonts.

## Brand and personal social links

Edit **`src/lib/social.ts`** or the corresponding public environment variables. The separation is intentional:

| Setting                            | Placement                   | Default                              |
| ---------------------------------- | --------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_INSTAGRAM_URL`        | Official BETAROG links      | `https://www.instagram.com/betarog/` |
| `NEXT_PUBLIC_BRAND_GITHUB_URL`     | Official BETAROG links      | Hidden                               |
| `NEXT_PUBLIC_BRAND_LINKEDIN_URL`   | Official BETAROG links      | Hidden                               |
| `NEXT_PUBLIC_FOUNDER_GITHUB_URL`   | Founder’s personal profiles | Hidden                               |
| `NEXT_PUBLIC_FOUNDER_LINKEDIN_URL` | Founder’s personal profiles | Hidden                               |

Personal founder URLs will never be silently presented as official company accounts. A founder portrait, domain, and business email have not been invented. The AMP typographic treatment is used until a portrait is supplied.

## Contact delivery configuration

**Email delivery is disabled. Live provider credentials and the business mailbox have not been supplied or tested.** The form displays this state, and the endpoint cannot return a successful delivery response without actual provider acceptance. Mocked test results are not evidence of real email delivery.

Set the following in the appropriate deployment environment:

| Variable                                                  | Purpose                                                |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                                    | Canonical HTTPS site origin; local example is loopback |
| `NEXT_PUBLIC_CONTACT_EMAIL`                               | Optional public business email, once finalized         |
| `CONTACT_ENABLED`                                         | Set `true` only when setting up and testing delivery   |
| `RESEND_API_KEY`                                          | Server-only Resend key                                 |
| `CONTACT_FROM_EMAIL`                                      | Sender on a verified sending domain                    |
| `CONTACT_TO_EMAIL`                                        | Business inquiry destination                           |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`     | Distributed production rate limiter                    |
| `RATE_LIMIT_SECRET`                                       | Private random secret for keyed IP hashes              |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Browser challenge and private verification key         |

Production delivery requires all security settings and an HTTPS site URL. Missing configuration fails closed. Development can use a process-local rate limiter; it is not used as a production substitute. Vercel’s trusted forwarding header supplies the production IP. Other hosts use a conservative shared bucket until trusted proxy handling is explicitly implemented.

Workflow when ready:

1. Finalize the business email and sending domain. Configure provider credentials securely in Vercel or a local ignored environment file; never paste private keys into committed source.
2. Configure Redis and Turnstile with the intended site/preview hostnames. Use separate test and production credentials.
3. Rebuild after environment changes, especially public values and contact readiness.
4. In a protected preview, submit a real authorized test inquiry. Confirm provider acceptance **and receipt in the destination mailbox**; test reply-to, error handling, rate limiting, and expired challenges.
5. Leave `CONTACT_ENABLED=false` until the deployment is ready for the business workflow.

The app does not store inquiry contents in a database. Successful responses confirm provider acceptance, not guaranteed inbox delivery. On uncertain network failures, the same submission ID is retained for safe retry.

Provider references: [Resend email endpoint](https://resend.com/docs/api-reference/emails/send-email), [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/), [Upstash REST API](https://upstash.com/docs/redis/features/restapi).

## Authoring projects and articles

Projects live in `src/lib/content.ts`. Each has a typed slug, stage, category, description, technology stack, visual, and story sections. Add verified details and real assets here.

Articles use a simple typed block format in `src/content/journal.ts`, with heading IDs, paragraphs, and optional code. Two draft articles are provided. They have no public article links, return 404 in production, and are excluded from the sitemap. To review them locally, set `ENABLE_DRAFT_PREVIEWS=true` and run `npm run dev`. Preview URLs:

- `/insights/designing-for-life-offline`
- `/insights/practical-intelligent-products`

To publish after review, change `status` to `published` and supply a real `publishedAt` ISO date. The shared template includes metadata, table of contents, code styling, and related published articles.

## Analytics and privacy

Analytics is off by default. If `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is supplied, the footer offers an explicit opt-in control. No analytics script is loaded until opt-in. Turning it off reloads the page to remove the script. Theme and consent preferences are stored locally.

Privacy and terms are explicitly marked review templates and have `noindex` metadata. Confirm the legal operator, contact, jurisdiction, provider settings, retention policy, and actual practices before final publication. No certifications or invented legal guarantees are asserted.

## Verification

- TypeScript, ESLint, and optimized production build pass.
- 22 unit/integration tests cover validation, origin checks, request-size limits, spam checks, unavailable delivery, rate limiting, provider failures, mocked success, draft isolation, and social-account boundaries.
- Seven passing browser tests cover navigation, filtering, case-study entry, keyboard dialog dismissal, inquiry preselection, invalid forms, unavailable delivery, input preservation, mocked confirmation/reset, theme persistence, routes, metadata, draft 404s, and custom 404.
- Responsive widths: 320, 390, 768, 1440; desktop visual comparison at 1536×1024. Automated axe checks cover the homepage in both themes and the contact page. These checks support accessibility; they do not constitute a full manual WCAG certification.
- Real WebGL canvas initialization was verified in desktop Edge; mobile and reduced-motion contexts use the lightweight image. Captured browser run reported no JavaScript or console errors.
- The animation update was checked with motion enabled: staggered reveals, filter re-entry, project tilt/reset, moving research particles, scroll progress, mobile floating artwork, offscreen pause, and changing reduced motion during a visit. The latter leaves zero running browser animations. All seven browser checks, including both-theme accessibility and mobile navigation, passed after the reduced-motion refinements.
- Browser/IAB was unavailable (`The browser access host is unavailable`), so Playwright with installed Microsoft Edge was used. Safari/Firefox, real mobile hardware, deployed Vercel behavior, and live email receipt have not been tested. No Lighthouse score is claimed.
- `npm audit --omit=dev` found zero vulnerabilities. Full audit currently reports moderate minimatch advisories inherited through development-only ESLint tooling. Current compatible ESLint plugins do not support the latest ESLint major; force-upgrading or forcing an incompatible minimatch major was avoided.

The generated reference set is in `design/`. Visual checks compare copy, type hierarchy, palette, section spacing, media treatment, responsive layout, and motion/fallback behavior. The mobile sculpture overlap and local production origin mismatch found in QA were corrected.

## GitHub and Vercel deployment

The source is tracked in [Frogbot3/BETAROG](https://github.com/Frogbot3/BETAROG), with `main` as the production branch. Vercel project `betarog` belongs to `anas-projects-1337ad89` and is connected to that repository. Its canonical production domain is [betarog.vercel.app](https://betarog.vercel.app).

The project uses Node.js 24.x, matching the tested local runtime, with the Next.js framework preset, `npm ci`, `npm run build`, and a 30-second contact function limit. Production and preview have `NEXT_PUBLIC_SITE_URL=https://betarog.vercel.app`, `CONTACT_ENABLED=false`, `ENABLE_DRAFT_PREVIEWS=false`, and the official Instagram URL configured. Email delivery still requires the provider setup and real receipt test above.

For updates, run the verification commands, commit the changes, and push to `main`. Vercel builds the connected branch. Use a feature branch for preview deployments and verify the deployment before merging. Environment changes require a new build. When a custom domain is finalized, add it in Vercel and update `NEXT_PUBLIC_SITE_URL` before rebuilding.

The local `.vercel/project.json` link is excluded from Git, as are secrets, dependencies, build output, and test artifacts. See [Vercel deployments](https://vercel.com/docs/deployments) and [environment variables](https://vercel.com/docs/environment-variables).

## Remaining owner-supplied details

- Final domain and business inquiry mailbox; email, Redis, and Turnstile configuration and real receipt test.
- Exact personal GitHub and LinkedIn profile URLs, later official brand accounts if desired.
- Optional founder portrait and actual Mosque Suite/security project screenshots, repository details, and verified outcomes.
- Reviewed article content and publication dates.
- Confirmed legal operator, privacy contact, jurisdiction, and retention details.
