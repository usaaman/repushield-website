# RepuShield — Antigravity Prompt Library

Use one prompt at a time. Review the output before moving to the next prompt. Never ask an agent to rewrite the entire project without a specific reason.

## Prompt 1 — Inspect only (first prompt)

You are the senior engineer responsible for the RepuShield website project.

First inspect the currently open project folder, files, installed tools, and environment. Do not create, edit, delete, rename, or install anything yet.

Read `README.md`, `docs/DESIGN_SYSTEM.md`, and `docs/PROJECT_CHECKLIST.md` if they exist.

Report:
1. Current folder and files.
2. Whether this is an empty folder or an existing application.
3. Available Node.js and package manager versions.
4. Existing framework and dependencies, if any.
5. Whether React, Vite, TypeScript, Tailwind, routing, and animation packages are already configured.
6. Any risks or conflicts.
7. A recommended step-by-step implementation plan.

The project must follow the RepuShield design system. The admin dashboard is a frontend prototype only. Do not change anything until I approve your plan.

## Prompt 2 — Project setup (use only after approving inspection)

Set up the RepuShield frontend foundation based on the approved inspection report.

Requirements:
- Use React + Vite + TypeScript unless the existing project has a suitable working alternative.
- Use a compatible Tailwind CSS setup for the installed version.
- Add React Router.
- Add Lucide React.
- Add a suitable motion library only after checking current compatibility.
- Add charting only if needed for the dashboard prototype.
- Create a clean, maintainable folder structure.
- Add route placeholders for Home, About, Services, Pricing, Case Studies, Contact, FAQ, Ads Landing, and Admin.
- Add a not-found page.
- Add global design tokens from `docs/DESIGN_SYSTEM.md`.
- Configure the font system.
- Do not build all page designs yet.

Do not overwrite working configuration without explaining why. After setup, run the development server and production build. Report exact commands, changed files, and test results.

## Prompt 3 — Design system and shared components

Implement the RepuShield design system from `docs/DESIGN_SYSTEM.md`.

Create reusable:
- Site container and section wrappers.
- Typography styles.
- Primary/secondary buttons.
- Header and responsive navigation.
- Footer.
- Card styles.
- CTA section.
- Form fields.
- FAQ accordion.
- Motion/reduced-motion helpers.

Use the official colors:
Navy #0F2C3D, Ocean #0A789B, Teal #14B8A6, Background #F4F8FA, White #FFFFFF, Secondary text #5A7383.

Use Plus Jakarta Sans as the preferred font, with a sensible fallback. Script font is decorative only.

Public-site glassmorphism must be selective. Use stronger glassmorphism only in the admin prototype. Keep contrast and readability high.

Do not use fake testimonials or fake statistics. Test desktop and mobile. Run build and report results.

## Prompt 4 — Homepage

Build the complete RepuShield homepage using the approved shared design system.

Include:
- Premium responsive navigation.
- Deep navy hero with an elegant curved/wave transition into the light section.
- Headline: “Your Online Reputation Deserves Protection.”
- Supporting copy explaining policy-focused Google review reporting and appeal assistance.
- Primary CTA: Request Assistance.
- Secondary CTA: Explore Services.
- A distinctive, relevant hero visual.
- Floating glass information badge/cards where appropriate.
- Service overview.
- How it works.
- Why choose RepuShield.
- Industries served, without unsupported claims.
- Transparency section.
- FAQ preview.
- Final CTA and footer.

Use refined animation, not excessive motion. Make every CTA meaningful. Do not claim Google affiliation or guaranteed removal. Do not invent results, customer counts, testimonials, or years of experience.

Test mobile/tablet/desktop and run the build.

## Prompt 5 — About and Services pages

Build About Us and Services pages with consistent visual identity.

About:
- Company introduction without invented history.
- Mission, values, transparency, and process.
- No fake employee/team profiles or credentials.

Services:
- Google review policy assessment.
- Reporting assistance.
- Appeal process guidance.
- Online reputation consultation.
- Reputation monitoring guidance only if the client actually offers it; otherwise mark it as a future/optional service and do not present it as currently available.

Explain limitations clearly. Google makes the final decision. Use relevant visuals and tasteful motion. Test all links and responsive layouts.

## Prompt 6 — Pricing and Case Studies pages

Build Pricing and Case Studies pages.

Pricing:
- Do not invent prices or discounts.
- Use “Request a Quote” until actual prices are confirmed.
- Make pricing content easy to update later.

Case Studies:
- Do not invent real clients, results, screenshots, or metrics.
- Use clearly labelled “Case study coming soon” placeholders or an editorial explanation that verified examples will be published with client approval.
- Never present fictional demo content as actual results.

Keep design premium and responsive.

## Prompt 7 — Contact and FAQ pages

Build Contact Us and FAQ pages.

Contact information:
- WhatsApp: +92 340 6523353
- WhatsApp URL: https://wa.me/923406523353
- Email: usamahameedahmadani@gmail.com

Contact form fields:
- Name
- Email
- Business name
- Country
- Service required
- Message

For now, build proper frontend validation and clear loading/success/error UI. Do not pretend form data is stored or emailed until a real form provider/backend is configured.

FAQ should explain what RepuShield does, eligible review concerns, reporting and appeal assistance, realistic expectations, timelines (without inventing guarantees), and how to contact the business.

## Prompt 8 — Google Ads landing page

Build a separate conversion-focused Google Ads landing page with a focused layout and consistent branding.

Include:
- Strong, honest headline.
- Clear service explanation.
- Benefits without unsupported claims.
- Process explanation.
- Trust/transparency section.
- Short inquiry form.
- WhatsApp CTA.
- Relevant FAQ.
- Strong final CTA.

Avoid unnecessary navigation distractions. Do not promise removal or imply Google affiliation. Ensure the page works on mobile and is suitable for future campaign tracking.

## Prompt 9 — Admin dashboard visual prototype

Build a separate `/admin` frontend-only dashboard prototype.

Visual direction:
- Premium glassmorphism.
- Frosted translucent panels.
- Deep navy and ocean/teal accents.
- Blurred background layers.
- Subtle gradients, soft borders and shadows.
- Animated sidebar and transitions.
- Strong readability and responsive behaviour.

Include:
- Sidebar: Overview, Inquiries, Services, Case Studies, Website Content, Analytics, Settings.
- Top bar: search UI, notification UI, profile UI, date, mobile sidebar toggle.
- Statistic cards: Total Inquiries, New Inquiries, Pending Inquiries, Website Visitors.
- Demo charts: inquiry trend, traffic, country distribution, service interest.
- Recent inquiries table.
- Recent activity timeline.
- Settings visual interface.

All records and chart values must be labelled sample/demo data. Do not build authentication, database persistence, real lead management, real analytics ingestion, or client monitoring. Do not imply the dashboard is production-ready.

## Prompt 10 — Contact form integration

Before implementing, explain the available integration choices and any required account/API keys. Recommend a suitable low-cost option.

Then, only after approval:
- Connect the contact form to the selected real provider/backend.
- Store secrets in environment variables where applicable.
- Never expose secret keys in browser code.
- Validate fields on client and server/provider as applicable.
- Implement loading, success, and error states.
- Prevent accidental duplicate submissions where practical.
- Test with a real test submission and confirm where it arrives.

Do not claim success unless the submission is verified.

## Prompt 11 — SEO, accessibility and performance review

Audit the full site:
- Unique page titles and meta descriptions.
- Semantic heading order.
- Image alt text.
- Open Graph metadata.
- Sitemap and robots.txt preparation.
- Lazy loading and image sizing.
- Keyboard navigation.
- Focus states.
- Form labels and errors.
- Color contrast.
- Reduced motion.
- Responsive layout.
- Console errors and production build.

Fix only identified issues. Report what changed and what still needs external configuration.

## Prompt 12 — Final QA and deployment preparation

Perform a full release audit without changing unrelated code.

Check:
- All 8 public pages and `/admin`.
- Every navigation item and CTA.
- WhatsApp and email destinations.
- Actual contact form submission if configured.
- Desktop/tablet/mobile layouts.
- Images and fonts.
- Animations and reduced-motion preference.
- SEO metadata.
- Privacy/Terms content availability.
- Google independence disclaimer.
- No fabricated testimonials, metrics, case studies, or guarantees.
- No console/build errors.

Then provide:
1. A pass/fail checklist.
2. Remaining blockers.
3. Environment variables required (names only; never reveal values).
4. Deployment steps for the selected host.
5. Domain/DNS steps that require the client's registrar access.

Do not deploy or change DNS without explicit approval.
