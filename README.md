# RepuShield Website

Premium, responsive business website for RepuShield, an independent online reputation management assistance service.

## Project goals

- Present RepuShield's services professionally to audiences in the USA, Canada, and Pakistan.
- Explain policy-focused Google review reporting and appeal assistance transparently.
- Generate genuine customer inquiries through WhatsApp, email, and a contact form.
- Provide a separate Google Ads landing page.
- Include a visually polished admin dashboard **frontend prototype** using clearly labelled sample data.

## Important business and compliance rules

- RepuShield is independent and is not affiliated with Google.
- Google makes the final decision about whether a review violates its policies and whether it is removed.
- Never promise guaranteed review removal.
- Never suggest that genuine negative reviews can simply be removed.
- Do not invent testimonials, case studies, customer counts, success rates, certifications, or company history.
- Pricing must remain quote-based or clearly marked pending until the client confirms actual prices.
- The admin dashboard is a frontend visual prototype only unless a separately approved backend scope is agreed.

## Brand and design system

See [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

Core palette:
- Deep Navy: `#0F2C3D`
- Ocean Teal: `#0A789B`
- Accent Teal: `#14B8A6`
- Soft Background: `#F4F8FA`
- White: `#FFFFFF`
- Secondary Text: `#5A7383`

Typography:
- Primary: Plus Jakarta Sans (preferred), with Inter/DM Sans fallback.
- Script accent: Caveat or Reenie Beanie, used sparingly.

Design direction:
- Premium corporate/SaaS.
- Curved hero transition.
- Rounded cards, soft shadows, subtle borders.
- Selective glassmorphism on the public site.
- More expressive glassmorphism in the admin prototype.
- Smooth, purposeful animations with reduced-motion support.

## Planned public pages

1. Home
2. About Us
3. Services
4. Pricing
5. Case Studies
6. Contact Us
7. FAQ
8. Google Ads Landing Page

Admin prototype route: `/admin`.

## Confirmed contact details

- WhatsApp: `+92 340 6523353`
- WhatsApp URL: `https://wa.me/923406523353`
- Email: `usamahameedahmadani@gmail.com`

## Recommended stack

Use the current stable, mutually compatible versions selected by the project setup:
- React
- Vite
- TypeScript (recommended)
- Tailwind CSS
- React Router
- Lucide React
- Framer Motion (or Motion, depending on current package compatibility)
- Recharts (only if needed for dashboard demo charts)

Do not blindly install packages or replace working configuration. Inspect the current project first.

## Development rules

1. Work in small, reviewable phases.
2. Inspect before editing.
3. Do not overwrite or delete existing files without explaining why and receiving approval.
4. Keep components reusable and code maintainable.
5. Do not add fake backend functionality.
6. Do not claim a form is connected until a real submission has been tested.
7. Run the relevant checks after each milestone.
8. Keep secrets and API keys out of frontend source code and Git.
9. Commit to Git at stable milestones.
10. Keep the site responsive and accessible.

## Start here

Follow [`docs/PROJECT_CHECKLIST.md`](docs/PROJECT_CHECKLIST.md) in order. Use prompts from [`docs/AI_PROMPTS.md`](docs/AI_PROMPTS.md) at the matching phases.
