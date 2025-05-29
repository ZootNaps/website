# Design System Documentation

This document outlines the comprehensive design system implemented in the South Lamar Studios website using Tailwind CSS v4's @theme directive and Framer Motion animations.

## Overview

The design system provides a cohesive visual language and interaction patterns that support the B2B podcast production service brand. It emphasizes professionalism, trustworthiness, and modern aesthetics while maintaining excellent accessibility and performance.

## Color System

### Primary Colors (Deep Teal)
Professional and trustworthy color representing stability and expertise.

```css
--color-primary: #2a3d45;
--color-primary-light: #3a4d55;
--color-primary-dark: #1a2d35;
```

**Shade Range:**
- `primary-50`: #f4f6f7 (lightest)
- `primary-100`: #e8ecee
- `primary-200`: #d1d9dd
- `primary-300`: #a8b8bf
- `primary-400`: #7a8e97
- `primary-500`: #5a6f7a
- `primary-600`: #4a5d68
- `primary-700`: #3e4f57
- `primary-800`: #36434a
- `primary-900`: #1a2d35 (darkest)

### Secondary Colors (Warm Orange)
Energetic and action-oriented color for calls-to-action and highlights.

```css
--color-secondary: #e76f51;
--color-secondary-light: #f08f75;
--color-secondary-dark: #d55f41;
```

**Shade Range:**
- `secondary-50`: #fdf5f3 (lightest)
- `secondary-100`: #fae9e4
- `secondary-200`: #f5d0c5
- `secondary-300`: #edb09d
- `secondary-400`: #e38968
- `secondary-500`: #e76f51
- `secondary-600`: #d55f41
- `secondary-700`: #b44a32
- `secondary-800`: #943d2b
- `secondary-900`: #7a3426 (darkest)

### Tertiary Colors (Light Blue)
Approachable and modern accent color for supporting elements.

```css
--color-tertiary: #58A4B0;
--color-tertiary-light: #79B9C3;
--color-tertiary-dark: #47838D;
```

**Shade Range:**
- `tertiary-50`: #f0f8fa (lightest)
- `tertiary-100`: #dbf0f3
- `tertiary-200`: #bce1e8
- `tertiary-300`: #8ccbd6
- `tertiary-400`: #58a4b0
- `tertiary-500`: #4a8a94
- `tertiary-600`: #3f747e
- `tertiary-700`: #385f67
- `tertiary-800`: #324f56
- `tertiary-900`: #2d434a (darkest)

### Background Colors
Sophisticated and welcoming background system.

```css
--color-bg: #f8f3ed;        /* Main background - warm cream */
--color-bg-dark: #e8e3dd;   /* Darker variant */
--color-bg-light: #fcf9f4;  /* Lighter variant */
```

### Neutral Colors
Balanced grays for text and supporting elements.

```css
--color-gray: #718096;       /* Medium gray */
--color-gray-dark: #4a5568;  /* Dark gray */
--color-gray-light: #a0aec0; /* Light gray */
```

## Typography

### Font Families

```css
--font-sans: var(--font-inter), system-ui, sans-serif;
--font-display: var(--font-plus-jakarta-sans), system-ui, sans-serif;
```

- **Inter**: Primary font for body text, optimized for readability
- **Plus Jakarta Sans**: Display font for headings, modern and professional

### Font Sizes

```css
--font-size-display-xl: 4rem;    /* 64px */
--font-size-display-lg: 3.5rem;  /* 56px */
--font-size-display: 2.5rem;     /* 40px */
--font-size-display-md: 2rem;    /* 32px */
```

### Typography Scale

- **H1**: 2.5rem (40px) on mobile, 3.5rem (56px) on tablet, 4rem (64px) on desktop
- **H2**: 2rem (32px) on mobile, 2.5rem (40px) on tablet, 3rem (48px) on desktop
- **H3**: 1.5rem (24px) on mobile, 1.75rem (28px) on tablet, 2rem (32px) on desktop
- **H4**: 1.25rem (20px)
- **H5**: 1.125rem (18px)
- **H6**: 1rem (16px)

## Spacing System

### Section Spacing

```css
--spacing-section: 5rem;     /* 80px - Default section spacing */
--spacing-section-sm: 3rem;  /* 48px - Small section spacing */
--spacing-section-lg: 7rem;  /* 112px - Large section spacing */
```

### Utility Classes

- `.section-spacing`: Default section padding
- `.section-spacing-sm`: Reduced section padding
- `.section-spacing-lg`: Increased section padding

## Border Radius

```css
--radius-btn: 0.5rem;      /* 8px - Button radius */
--radius-card: 1rem;       /* 16px - Card radius */
--radius-card-lg: 1.5rem;  /* 24px - Large card radius */
```

## Shadow System

### Shadow Definitions

```css
--shadow-soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04);
--shadow-medium: 0 4px 25px -3px rgba(0, 0, 0, 0.1), 0 8px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-strong: 0 10px 40px -3px rgba(0, 0, 0, 0.15), 0 4px 25px -2px rgba(0, 0, 0, 0.08);
--shadow-glow: 0 0 20px rgba(231, 111, 81, 0.3);
--shadow-glow-primary: 0 0 20px rgba(42, 61, 69, 0.3);
```

### Utility Classes

- `.shadow-soft`: Subtle shadow for cards and elements
- `.shadow-medium`: Medium shadow for elevated elements
- `.shadow-strong`: Strong shadow for modals and overlays
- `.shadow-glow`: Secondary color glow effect
- `.shadow-glow-primary`: Primary color glow effect

## Component System

### Buttons

```css
.btn {
  /* Base button styles with transitions and focus states */
  position: relative;
  overflow: hidden;
  /* Enhanced with ::before pseudo-element for hover effects */
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-secondary {
  background: var(--color-secondary);
  color: white;
}

.btn-outline {
  border: 2px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
}
```

**Button Variants:**
- `.btn-large`: Increased padding and font size
- `.btn-small`: Reduced padding and font size

### Cards

```css
.card {
  background: white;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-soft);
  transition: all 0.3s ease;
}

.card-elevated {
  box-shadow: var(--shadow-medium);
}
```

### Sections

```css
.section {
  padding: var(--spacing-section-sm) 0;
}

@media (min-width: 768px) {
  .section {
    padding: var(--spacing-section) 0;
  }
}

@media (min-width: 1024px) {
  .section {
    padding: var(--spacing-section-lg) 0;
  }
}
```

## Animation System

### Keyframe Animations

```css
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slide-up {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
```

### Animation Utilities

- `.animate-scroll`: Infinite horizontal scrolling (60s duration)
- `.animate-float`: Gentle floating animation (6s duration)
- `.animate-pulse-soft`: Soft pulsing opacity effect (2s duration)

### Framer Motion Patterns

#### Container Variants

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};
```

#### Item Variants

```tsx
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
```

#### Scroll-Triggered Animations

```tsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true });

<motion.div
  ref={ref}
  variants={containerVariants}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
>
```

## Accessibility Features

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--color-secondary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### High Contrast Support

```css
@media (prefers-contrast: high) {
  .card {
    border: 2px solid var(--color-primary);
  }
  
  .btn {
    border: 2px solid currentColor;
  }
}
```

### Forced Colors Support

```css
@media (forced-colors: active) {
  .btn {
    border: 1px solid ButtonText;
  }
  
  .card {
    border: 1px solid CanvasText;
  }
}
```

## Usage Guidelines

### Color Usage

1. **Primary**: Use for main navigation, headings, and primary actions
2. **Secondary**: Use for CTAs, highlights, and interactive elements
3. **Tertiary**: Use for accents, icons, and supporting elements
4. **Background**: Use for page backgrounds and content areas

### Typography Hierarchy

1. Use display fonts (Plus Jakarta Sans) for headings and important text
2. Use body font (Inter) for readable content
3. Maintain consistent line heights and spacing
4. Ensure sufficient color contrast (minimum 4.5:1 ratio)

### Animation Guidelines

1. Use animations to enhance user experience, not distract
2. Implement scroll-triggered animations for performance
3. Respect `prefers-reduced-motion` settings
4. Keep animations subtle and purposeful
5. Use consistent timing and easing functions

### Component Composition

1. Build components using design system utilities
2. Maintain consistent spacing and sizing
3. Use shadow system for depth and hierarchy
4. Implement hover and focus states consistently

## Implementation Examples

### Professional Card Component

```tsx
<motion.div 
  className="card p-8 hover:shadow-medium transition-all duration-300"
  whileHover={{ y: -4 }}
  variants={itemVariants}
>
  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
    <FontAwesomeIcon icon="check" className="w-8 h-8 text-white" />
  </div>
  <h3 className="text-xl font-semibold text-primary mb-4">Feature Title</h3>
  <p className="text-gray leading-relaxed">Feature description content.</p>
</motion.div>
```

### Animated Counter

```tsx
const AnimatedCounter = ({ value, isInView }) => {
  const count = useAnimatedCounter(value, isInView);
  return (
    <motion.div
      className="text-4xl font-bold text-primary"
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : {}}
    >
      {count}%
    </motion.div>
  );
};
```

This design system ensures consistency, accessibility, and professional presentation across the entire South Lamar Studios website while supporting the B2B podcast production service brand. 