# RepuShield Design System

This is the approved starting design system. It is a consistent direction, not permission to sacrifice usability for decoration.

## 1. Brand personality

- Trustworthy
- Professional
- Modern
- Transparent
- Calm and confident
- International business audience

The design should feel like a premium, carefully art-directed SaaS/business brand rather than a generic AI template.

## 2. Color palette

| Token | Hex | Intended use |
|---|---|---|
| Primary Deep Navy | `#0F2C3D` | Headlines, primary buttons, dark hero/footer |
| Ocean Teal | `#0A789B` | Links, highlights, active states |
| Accent Teal | `#14B8A6` | Accent buttons, checks, subtle emphasis |
| Soft Background | `#F4F8FA` | Main light page background |
| White | `#FFFFFF` | Cards and clean sections |
| Primary Text | `#0F2C3D` | Body/headings on light backgrounds |
| Secondary Text | `#5A7383` | Supporting copy |
| Light Text | `#FFFFFF` | Text on dark surfaces |
| Muted Light Text | `#D1E3EC` | Supporting copy on dark surfaces |

### Suggested CSS variables

```css
:root {
  --color-navy: #0F2C3D;
  --color-ocean: #0A789B;
  --color-teal: #14B8A6;
  --color-bg: #F4F8FA;
  --color-white: #FFFFFF;
  --color-text: #0F2C3D;
  --color-muted: #5A7383;
  --color-on-dark: #FFFFFF;
  --color-on-dark-muted: #D1E3EC;
}
```

Use contrast checks. Do not use teal text on a light background if the contrast is too weak. Use navy for important text.

## 3. Typography

- Preferred primary font: Plus Jakarta Sans.
- Acceptable alternatives: Inter or DM Sans.
- Script accent: Caveat or Reenie Beanie, only for tiny decorative notes such as “Policy First”.
- Never use script fonts for paragraphs, navigation, forms, or important information.

### Hierarchy guidance

- H1: bold/extra-bold, clear and confident.
- H2: bold, distinct section headings.
- H3: semibold.
- Body: readable, relaxed line height.
- Supporting text: secondary color with sufficient contrast.

Use italic accent words selectively, not in every heading.

## 4. Shape and layout language

- Hero: deep navy with a smooth curved/wave transition into the light section.
- Cards: generous rounded corners, approximately 24–32px where appropriate.
- Borders: thin, low-contrast blue-grey borders.
- Shadows: soft and diffused; avoid harsh black shadows.
- Buttons: rounded or pill-shaped, with clear hierarchy.
- Filter controls: pill-shaped only where filters are genuinely interactive.
- Spacing: consistent section rhythm and generous whitespace.

## 5. Glassmorphism rules

### Public website

Use glass selectively:
- Floating hero information cards.
- Navigation overlay where suitable.
- Small feature panels.
- Decorative visual layers.

Do not put every card and every section behind blur. Body text must remain easy to read.

### Admin dashboard prototype

Use a stronger glassmorphism style:
- Frosted translucent panels.
- Background blur.
- Subtle translucent borders.
- Layered surfaces.
- Soft gradients and restrained glow.
- Clear active navigation states.
- Readable tables and charts.

Avoid excessive transparency that makes labels or data difficult to read.

## 6. Motion and transitions

Use motion to clarify hierarchy and interaction:
- Short page/section entrance transitions.
- Scroll reveal for selected sections.
- Button and card hover states.
- Smooth accordion open/close.
- Sidebar and mobile navigation transitions.
- Dashboard chart entrance animations.
- Subtle floating decorative elements.

Rules:
- Prefer restrained durations, generally around 180–450ms for UI interactions.
- Avoid constant motion and excessive parallax.
- Do not animate every element.
- Respect `prefers-reduced-motion`.
- Avoid animation that delays access to content.
- Keep performance smooth on mid-range mobile devices.

## 7. Imagery

Use relevant, high-quality visuals:
- Realistic business environments.
- Business owners and service professionals.
- Reputation, trust, review, and digital protection concepts.
- Custom abstract shapes and diagrams where useful.

Avoid:
- Random unrelated stock photography.
- Cartoonish AI illustrations.
- Generic robot imagery.
- Low-resolution images.
- Unlicensed brand logos or Google's logo used in a way that implies affiliation.

## 8. Responsive rules

Design mobile-first and verify:
- Small phones
- Large phones
- Tablets
- Desktop
- Wide desktop

No horizontal overflow. Navigation, forms, cards, tables, and dashboard sidebar must adapt appropriately.

## 9. Accessibility

- Semantic HTML.
- Visible keyboard focus.
- Accessible labels for form controls.
- Sufficient color contrast.
- Keyboard-operable navigation and accordions.
- Reduced-motion support.
- Do not communicate status by color alone.
