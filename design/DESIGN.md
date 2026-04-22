---
name: FastMenu Design System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5b403a'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#8f7069'
  outline-variant: '#e4beb6'
  surface-tint: '#b72301'
  primary: '#b72301'
  on-primary: '#ffffff'
  primary-container: '#ff5733'
  on-primary-container: '#580c00'
  inverse-primary: '#ffb4a4'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#00677c'
  on-tertiary: '#ffffff'
  tertiary-container: '#009fbd'
  on-tertiary-container: '#002f3a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad3'
  primary-fixed-dim: '#ffb4a4'
  on-primary-fixed: '#3d0600'
  on-primary-fixed-variant: '#8c1800'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#b0ecff'
  tertiary-fixed-dim: '#60d5f5'
  on-tertiary-fixed: '#001f27'
  on-tertiary-fixed-variant: '#004e5e'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system embodies a "fast-casual" tech aesthetic—blending the efficiency of a high-end POS system with the approachable warmth of a modern eatery. The brand personality is snappy, lightweight, and professional, prioritizing speed of thought and action. 

The visual style is **Minimalist** with high-clarity functional elements. It leverages heavy whitespace to reduce cognitive load for busy restaurant staff and patrons. It avoids unnecessary decorative elements, relying instead on precise typography and a singular, high-energy accent color to guide the user's eye. The emotional response should be one of total control and effortless navigation.

## Colors

The palette is anchored by "Electric Orange," a high-chroma primary used exclusively for critical actions and brand highlights. This is balanced against a high-contrast foundation of Charcoal and Clean White.

- **Primary (Electric Orange):** Used for primary CTAs, active states, and progress indicators.
- **Surface (White):** The default background for clarity and a "fresh" feel.
- **Deep Neutral (Charcoal):** Used for primary text and dark-mode surfaces to ensure maximum legibility.
- **Soft Neutral (Smoke):** Utilized for secondary backgrounds and subtle borders to maintain the minimalist structure without harsh lines.

## Typography

The design system utilizes **Inter** for its systematic, utilitarian qualities. The typographic scale is optimized for high-glanceability in high-traffic environments.

Headlines use a tighter letter-spacing and heavier weights to create a strong visual anchor. Body text is set with generous line heights to ensure readability on mobile devices and kitchen displays. Labels are often uppercase with slight tracking to distinguish them from interactive text elements.

## Layout & Spacing

This design system employs a **fluid grid** model with fixed maximum widths for desktop dashboard views. The spacing rhythm is based on a 4px baseline, ensuring all elements align to a consistent mathematical scale.

- **Margins:** 32px on desktop, scaling down to 16px on mobile.
- **Gutters:** 24px consistently to provide breathing room between modular components.
- **Density:** High-density layouts are preferred for "Back of House" management views, while low-density, high-margin layouts are used for customer-facing menus.

## Elevation & Depth

Depth is communicated through **Ambient Shadows** and tonal layering. This design system avoids harsh borders in favor of soft, diffused shadows that suggest "lift" without creating visual noise.

- **Level 1 (Base):** Flat surfaces, usually the main background.
- **Level 2 (Cards):** Soft, multi-layered shadows (Y: 4px, Blur: 12px, Opacity: 5%) used to separate content modules.
- **Level 3 (Modals/Popovers):** Deeper shadows (Y: 12px, Blur: 24px, Opacity: 10%) to indicate temporary, high-priority interactions.
- **Tonal Layers:** Subtle grey backgrounds (#F4F4F4) are used to group related items within a single white card.

## Shapes

The shape language is defined by large, friendly radiuses that evoke a modern, "fast-casual" feel. This softness contrasts with the technical precision of the typography.

- **Standard Elements:** Buttons, inputs, and small chips use a 0.5rem (8px) radius.
- **Containers:** Large cards and menu item blocks use a 1rem (16px) radius.
- **Interactive States:** On-hover, containers may subtly increase their shadow depth but maintain their corner radius to preserve consistency.

## Components

### Buttons & CTAs
Primary buttons use the Electric Orange background with white text. They are bold, spanning the full width on mobile to facilitate "thumb-driven" interactions. Secondary buttons use a subtle grey fill or a charcoal outline.

### Input Fields
Inputs are tall (48px-56px) for ease of touch. They feature a light grey background and transition to a charcoal border on focus. Error states use a 1px Red border with a subtle red tint in the background.

### Cards & Menu Items
The core of this design system. Menu cards feature high-quality imagery at the top, a 16px corner radius, and soft shadows. Content is left-aligned with price points highlighted in Electric Orange.

### Chips & Tags
Used for dietary labels (e.g., "Vegan," "Gluten-Free"). These are pill-shaped with a low-contrast grey background and medium-weight Inter labels.

### Icons
Utilize Lucide-style line icons with a 2px stroke weight. Icons should be sized at 20px or 24px, ensuring they align perfectly with the text baseline in buttons and lists.

### Order Progress Bar
A unique component for this design system: a thick, 8px high progress bar at the top of the interface, using a pulse animation in Electric Orange to signify "Live" order status.