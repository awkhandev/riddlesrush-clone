# Original riddlesrush.com Blog Page — Structural Analysis

> Extracted from `https://www.riddlesrush.com/blog` on 2026-08-04
> Raw HTML saved to `docs/research/raw_blog.html` (92KB)
> CSS file: `/_next/static/css/279d9d2dc04d8842.css` (Tailwind CSS v3.4.1)

---

## 1. Tech Stack

| Aspect | Detail |
|--------|--------|
| Framework | Next.js (App Router) — route at `app/(platform)/blog/page` |
| CSS Framework | Tailwind CSS v3.4.1 |
| UI Primitives | shadcn/ui (Radix) |
| Icons | Lucide React (inline SVGs) |
| Font | **Gabarito** (variable weight 400–900), loaded via `@font-face` as `__className_2d3e63` |
| Font applied via | `<body class="__className_2d3e63">` |
| Theme tokens | CSS custom properties (shadcn-style HSL) |
| Primary color | `#7736FE` (purple) — `--primary:260,100%,60%` |

### Design Token Values (from `:root`)

```css
--background: 0 0% 100%;          /* white */
--foreground: 222.2 84% 4.9%;     /* near-black */
--card: 0 0% 100%;                /* white */
--card-foreground: 222.2 84% 4.9%;
--popover: 0 0% 100%;
--popover-foreground: 222.2 84% 4.9%;
--primary: 260, 100%, 60%;        /* #7736FE purple */
--primary-foreground: 210 40% 98%;
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
--border: 214.3 31.8% 91.4%;
--input: 214.3 31.8% 91.4%;
--ring: 222.2 84% 4.9%;
--radius: 0.5rem;
```

### Accent Colors Used Throughout

| Color | Hex | Usage |
|-------|-----|-------|
| Purple (primary) | `#7736FE` | Active nav, category pills, brand |
| Purple hover | `#6a2ee6` | Button hover state |
| Blue 600 | `rgb(37, 99, 235)` | Card hover text, active page, CTA buttons |
| Blue 100 | `rgb(219, 234, 254)` | Icon background circles |
| Gray 900 | `rgb(17, 24, 39)` | Headings |
| Gray 700 | `rgb(55, 65, 81)` | Body text |
| Gray 600 | `rgb(75, 85, 99)` | Secondary text |
| Gray 500 | `rgb(107, 114, 128)` | Muted/meta text |
| Gray 200 | `rgb(229, 231, 235)` | Borders |
| Gray 100 | `rgb(243, 244, 246)` | Dividers, disabled backgrounds |

---

## 2. Page Layout Structure

### Full DOM Nesting Hierarchy

```
<body class="__className_2d3e63">
  <main class="flex-1">
    <div class="flex min-h-screen flex-col">

      <!-- HEADER -->
      <header class="z-40 bg-background border-b">
        <div class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          [logo] [nav items] [App button] [mobile menu button]
        </div>
      </header>

      <!-- FIXED OVERLAY (likely for mobile menu) -->
      <div style="position:fixed;z-index:9999;top:16px;left:16px;right:16px;bottom:16px;pointer-events:none"></div>

      <!-- MAIN CONTENT CONTAINER -->
      <div class="container max-w-7xl py-8 lg:py-20">
        [hero section]
        [category pills]
        [blog grid]
        [pagination]
        [CTA section]
      </div>

      <!-- FOOTER -->
      <footer class="mt-auto border-t border-gray-200 bg-white">...</footer>

    </div>
  </main>
</body>
```

---

## 3. Main Content Container — Centering & Width

### Container Classes

```html
<div class="container max-w-7xl py-8 lg:py-20">
```

### How `container` Works (from CSS)

The site overrides Tailwind's default `.container`:

```css
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 2rem;     /* 32px */
  padding-left: 2rem;      /* 32px */
}
@media (min-width: 1400px) {
  .container {
    max-width: 1400px;
  }
}
```

### Effective Behavior

| Property | Value |
|----------|-------|
| Width | `100%` (fluid) |
| Max-width | `min(1280px, 1400px)` = **1280px** (80rem from `max-w-7xl`) |
| Horizontal centering | `margin: auto` on both sides |
| Horizontal padding | `2rem` (32px) on each side |
| Vertical padding | `2rem` (32px) mobile, `5rem` (80px) on `lg:` (1024px+) |

> **Note:** Tailwind's `max-w-7xl` = `80rem` = `1280px`. The `.container` class adds its own `max-width: 1400px` at the `1400px` breakpoint, but `max-w-7xl` overrides it to 1280px. Result: content is capped at **1280px** wide.

---

## 4. Header / Navigation Structure

### Header Container

```html
<header class="z-40 bg-background border-b">
  <div class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
```

| Property | Value |
|----------|-------|
| Height | `4rem` (64px) — `h-16` |
| Max-width | `80rem` (1280px) — `max-w-7xl` |
| Horizontal padding | `1rem` mobile → `1.5rem` sm → `2rem` lg |
| Centering | `mx-auto` |
| Layout | `flex items-center justify-between gap-4` |
| Background | `hsl(var(--background))` = white |
| Border | `border-b` (1px bottom border) |
| Z-index | `z-40` |

### Logo

```html
<a class="flex items-center space-x-2 shrink-0" href="/">
  <img alt="Riddles app icon" width="44" height="44" class="rounded-xl" ... />
  <span class="hidden font-bold sm:inline-block text-lg">Riddles Rush</span>
</a>
```

- Icon: 44x44px, `rounded-xl`
- Text: hidden on mobile, visible on `sm:` (640px+), `font-bold text-lg`

### Desktop Nav (`hidden md:flex`)

```html
<nav class="hidden md:flex items-center gap-1 lg:gap-2">
```

| Nav Item | Classes | Active State |
|----------|---------|--------------|
| **Home** | `flex items-center text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer text-gray-700 hover:text-[#7736FE] hover:bg-gray-50` | — |
| **Categories** | Same base + `text-[#7736FE] bg-purple-50` | Active = purple text + purple-50 bg |
| **Browse Riddles** | Same base + `text-gray-700 hover:text-[#7736FE] hover:bg-gray-50` | — |

#### Categories Dropdown Structure

```html
<div class="relative">
  <a class="..." href="/blog" aria-expanded="false" aria-haspopup="true">
    Categories
    <svg class="lucide lucide-chevron-down ml-1 h-4 w-4 transition-transform">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </a>
</div>
```

- Wrapped in `<div class="relative">` (position context for dropdown)
- Chevron-down icon: 16x16px (`h-4 w-4`), with `ml-1` and `transition-transform` (for rotate on open)
- `aria-expanded="false"` and `aria-haspopup="true"` — indicates dropdown behavior
- **Note:** The dropdown content itself is likely rendered via JavaScript (not in SSR HTML), or uses a Radix/popover component

#### Browse Riddles Dropdown Structure

```html
<div class="relative">
  <a class="..." href="/riddles/riddles-with-answers" aria-expanded="false" aria-haspopup="true">
    Browse Riddles
    <svg class="lucide lucide-chevron-down ml-1 h-4 w-4 transition-transform">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </a>
</div>
```

- Identical structure to Categories dropdown

### App Download Button

```html
<a href="https://www.patrickws.com/riddles"
   class="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#7736FE] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#6a2ee6] transition-colors"
   target="_blank" rel="noopener noreferrer">
  <svg class="lucide lucide-download h-4 w-4" />
  <span>App</span>
</a>
```

- Hidden below `sm:` (640px)
- Purple button (`#7736FE`), white text, `rounded-lg`
- Hover: `#6a2ee6` (darker purple)

### Mobile Menu Button

```html
<button class="flex items-center mx-2 px-1 md:hidden min-h-[44px] min-w-[44px]"
        aria-label="Open navigation menu" aria-expanded="false">
  <svg class="lucide lucide-menu" ...>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
</button>
```

- Only visible below `md:` (768px) — `md:hidden`
- Min touch target: 44x44px (`min-h-[44px] min-w-[44px]`)
- Hamburger icon (3 horizontal lines)

---

## 5. Hero / Page Header Section

### Section Container

```html
<div class="text-center mb-16">
```

- Centered text, `4rem` (64px) bottom margin

### Book Icon Circle

```html
<div class="flex items-center justify-center mb-6">
  <div class="mr-4 hidden size-16 shrink-0 items-center justify-center rounded-full bg-blue-100 lg:flex">
    <svg class="lucide lucide-book-open h-8 w-8 text-blue-600" />
  </div>
  <h1 class="text-4xl lg:text-6xl font-bold text-gray-900">Riddle Collections</h1>
</div>
```

| Element | Mobile | Desktop (lg+) |
|---------|--------|---------------|
| Icon circle | Hidden | `size-16` (64x64px), `rounded-full`, `bg-blue-100` |
| Icon SVG | — | `h-8 w-8`, `text-blue-600` |
| H1 | `text-4xl` (2.25rem) | `lg:text-6xl` (3.75rem) |
| H1 weight | `font-bold` | `font-bold` |
| H1 color | `text-gray-900` | `text-gray-900` |

### Subtitle

```html
<p class="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
```

| Property | Mobile | Desktop |
|----------|--------|---------|
| Font size | `text-xl` (1.25rem) | `lg:text-2xl` (1.5rem) |
| Color | `text-gray-600` | — |
| Max-width | `max-w-4xl` = 56rem (896px) | — |
| Centering | `mx-auto` | — |
| Line height | `leading-relaxed` (1.625) | — |

### Meta Stats Row

```html
<div class="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
  <div class="flex items-center">
    <svg class="lucide lucide-calendar w-4 h-4 mr-2" />
    <span>470 Collections</span>
  </div>
  <div class="flex items-center">
    <svg class="lucide lucide-book-open w-4 h-4 mr-2" />
    <span>Updated Regularly</span>
  </div>
</div>
```

- `mt-8` (2rem top margin), flex centered, `space-x-6` (1.5rem gap)
- `text-sm` (0.875rem), `text-gray-500`
- Icons: 16x16px (`w-4 h-4`), `mr-2`

---

## 6. Category Pills Section

### Section Container

```html
<div class="mt-12">
  <div class="flex items-center justify-center mb-6">
    <svg class="lucide lucide-tag w-5 h-5 text-gray-600 mr-2" />
    <h2 class="text-lg font-semibold text-gray-900">Browse by Category</h2>
  </div>
  <div class="flex flex-wrap justify-center gap-3">
    [category pill links]
  </div>
</div>
```

### Category Pill Link (Default)

```html
<a class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full
          text-sm font-medium text-gray-700
          hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700
          transition-colors"
   href="/blog/category/kids-riddles">
  <span class="mr-2">🧸</span>Kids Riddles
</a>
```

| Property | Value |
|----------|-------|
| Display | `inline-flex` |
| Padding | `0.5rem 1rem` (8px 16px) |
| Background | `white` |
| Border | `1px solid rgb(229, 231, 235)` (gray-300) |
| Border radius | `9999px` (fully rounded pill) |
| Font | `text-sm font-medium` |
| Text color | `text-gray-700` |
| Hover background | `blue-50` |
| Hover border | `blue-300` |
| Hover text | `blue-700` |
| Emoji | `<span class="mr-2">` prefix with `0.5rem` right margin |

### "View All Categories" Pill (Active/CTA style)

```html
<a class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full
          text-sm font-medium hover:bg-blue-700 transition-colors"
   href="/blog/category">
  View All Categories
</a>
```

- Solid `blue-600` background, white text (no border)
- Hover: `blue-700`

### Pill Container

```html
<div class="flex flex-wrap justify-center gap-3">
```

- `flex-wrap` for wrapping on narrow screens
- `justify-center` to center pills
- `gap-3` = `0.75rem` (12px) spacing

---

## 7. Blog Post Grid

### Grid Container

```html
<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
```

| Breakpoint | Columns | Gap |
|------------|---------|-----|
| Mobile (< 640px) | 1 column (default) | `gap-8` = 2rem (32px) |
| sm (640px+) | 2 columns | `gap-8` = 2rem (32px) |
| lg (1024px+) | 3 columns | `gap-8` = 2rem (32px) |

> **Total items per page: 12 cards** (40 pages total, 12 per page)

---

## 8. Blog Post Card Component

### Card Wrapper

```html
<article class="group relative flex flex-col bg-white border-2 border-gray-200
                shadow-sm hover:shadow-xl rounded-2xl p-6
                justify-between h-full
                transition-all duration-300
                hover:border-blue-300 hover:-translate-y-1">
```

| Property | Default | Hover |
|----------|---------|-------|
| Display | `flex flex-col` | — |
| Background | `white` | — |
| Border | `2px solid gray-200` | `2px solid blue-300` |
| Border radius | `1rem` (rounded-2xl) | — |
| Padding | `1.5rem` (p-6) | — |
| Shadow | `shadow-sm` | `shadow-xl` |
| Transform | none | `translate-y: -0.25rem` (lifts up 4px) |
| Transition | `all 300ms` | — |
| Height | `h-full` (fills grid cell) | — |
| Overflow | — | — |

### Card Internal Structure

```
<article class="group relative flex flex-col ...">
  <!-- EMOJI ICON AREA -->
  <div class="flex items-center justify-center mb-6 min-h-[120px]">
    <span class="text-7xl filter drop-shadow-lg
                 group-hover:scale-110 transition-transform duration-300">
      🌬️
    </span>
  </div>

  <!-- CONTENT AREA -->
  <div class="flex flex-col justify-between flex-1 space-y-4">
    <!-- Title + Description -->
    <div>
      <h2 class="text-xl font-bold text-gray-900 mb-3 leading-tight
                 group-hover:text-blue-600 transition-colors">
        Chicago Riddles with Answers
      </h2>
      <p class="text-gray-600 leading-relaxed line-clamp-3">
        Solve Chicago riddles about deep dish...
      </p>
    </div>

    <!-- CTA Divider -->
    <div class="pt-4 border-t border-gray-100">
      <div class="flex items-center text-blue-600 font-medium
                  group-hover:text-blue-700 transition-colors">
        <span class="mr-2">Browse collection</span>
        <svg class="lucide lucide-arrow-right w-4 h-4
                    group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>

  <!-- FULL-CARD LINK OVERLAY -->
  <a class="absolute inset-0" href="/blog/chicago-riddles">
    <span class="sr-only">Open riddle collection</span>
  </a>
</article>
```

### Card Detail Breakdown

| Element | Classes | Notes |
|---------|---------|-------|
| **Emoji wrapper** | `flex items-center justify-center mb-6 min-h-[120px]` | Centered, 120px min height, 1.5rem bottom margin |
| **Emoji text** | `text-7xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300` | 4.5rem font size, drop shadow, scales up 10% on hover |
| **Content wrapper** | `flex flex-col justify-between flex-1 space-y-4` | Fills remaining space, 1rem gap between children |
| **H2 title** | `text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors` | 1.25rem bold, turns blue on hover |
| **Description** | `text-gray-600 leading-relaxed line-clamp-3` | Max 3 lines with ellipsis |
| **CTA divider** | `pt-4 border-t border-gray-100` | 1rem top padding, 1px top border (gray-100) |
| **CTA text** | `flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors` | Blue text, darker on hover |
| **Arrow icon** | `w-4 h-4 group-hover:translate-x-1 transition-transform` | 16px, slides right 4px on hover |
| **Card link overlay** | `absolute inset-0` with `<span class="sr-only">` | Makes entire card clickable |

---

## 9. Pagination

### Pagination Container

```html
<nav class="flex items-center justify-center mt-16" aria-label="Pagination">
  <div class="flex items-center space-x-2">
    [Previous] [Page numbers] [Next]
  </div>
</nav>
```

- Centered horizontally, `mt-16` (4rem top margin)
- Items spaced with `space-x-2` (0.5rem)

### Previous Button (Disabled on Page 1)

```html
<span class="flex items-center px-4 py-2 text-sm font-medium
             text-gray-400 bg-gray-100 border border-gray-200
             rounded-lg cursor-not-allowed">
  <svg class="lucide lucide-chevron-left w-4 h-4 mr-1" />
  Previous
</span>
```

### Page Number Button (Active)

```html
<a class="px-3 py-2 text-sm font-medium rounded-lg transition-colors
          bg-blue-600 text-white"
   aria-current="page" href="/blog">
  1
</a>
```

### Page Number Button (Inactive)

```html
<a class="px-3 py-2 text-sm font-medium rounded-lg transition-colors
          text-gray-700 bg-white border border-gray-300
          hover:bg-gray-50 hover:text-gray-900"
   href="/blog/page/2">
  2
</a>
```

### Ellipsis

```html
<span class="px-3 py-2 text-sm font-medium text-gray-500">...</span>
```

### Next Button

```html
<a class="flex items-center px-4 py-2 text-sm font-medium
          text-gray-700 bg-white border border-gray-300 rounded-lg
          hover:bg-gray-50 hover:text-gray-900 transition-colors"
   href="/blog/page/2">
  Next
  <svg class="lucide lucide-chevron-right w-4 h-4 ml-1" />
</a>
```

---

## 10. CTA Section (Bottom)

```html
<div class="mt-20 text-center">
  <div class="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">
      Ready to Solve Some Riddles?
    </h2>
    <p class="text-gray-700 mb-6 max-w-2xl mx-auto">
      Put your brain to the test with our interactive riddle collection...
    </p>
    <a class="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg
              font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
       href="/">
      Start Playing Now
      <svg class="lucide lucide-arrow-right w-5 h-5 ml-2" />
    </a>
  </div>
</div>
```

| Property | Value |
|----------|-------|
| Top margin | `5rem` (mt-20) |
| Container | Gradient `from-blue-50 to-indigo-100`, `rounded-2xl`, `p-8`, `border border-blue-200` |
| Title | `text-2xl font-bold text-gray-900 mb-4` |
| Body text | `text-gray-700 mb-6 max-w-2xl mx-auto` |
| Button | `bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold` |
| Button hover | `bg-blue-700 shadow-xl` |

---

## 11. Footer

### Footer Container

```html
<footer class="mt-auto border-t border-gray-200 bg-white">
  <div class="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
```

| Property | Value |
|----------|-------|
| Position | `mt-auto` (pushed to bottom via flexbox) |
| Border | `border-t border-gray-200` |
| Background | `white` |
| Max-width | `max-w-screen-xl` = `1280px` |
| Horizontal padding | `1rem` → `1.5rem` sm → `2rem` lg |
| Vertical padding | `2rem` → `2.5rem` md |

### Footer Grid

```html
<nav aria-label="Footer" class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
```

| Breakpoint | Columns | Gap |
|------------|---------|-----|
| Mobile | 1 column | `2.5rem` (gap-10) |
| sm (640px+) | 2 columns | `2.5rem` |
| lg (1024px+) | 4 columns | `3rem` (gap-12) |

### Footer Column Structure

Each column:
```html
<div>
  <h2 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
    Section Title
  </h2>
  <ul class="flex flex-col gap-2.5">
    <li>
      <a class="text-sm text-gray-700 underline-offset-2 decoration-gray-400
                hover:text-gray-900 hover:underline"
         href="/path">Link Text</a>
    </li>
  </ul>
</div>
```

| Element | Classes |
|---------|---------|
| Column heading | `mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500` |
| Link list | `flex flex-col gap-2.5` |
| Link | `text-sm text-gray-700 underline-offset-2 decoration-gray-400 hover:text-gray-900 hover:underline` |

### Footer Columns

1. **Popular riddle topics** — Tricky riddles, Short riddles, Logic riddles, Riddles with answers, Riddle categories
2. **Collections & contribute** — Submit Riddle, Collections
3. **Legal & about** — Terms of Service, Privacy Policy, About
4. **Connect** — Contact (mailto:)

### Copyright Area

```html
<div class="mt-10 text-center text-sm text-gray-700">
  <div class="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
    [social links]
    [copyright text]
  </div>
</div>
```

- `mt-10` (2.5rem top margin), centered
- Social links: Pinterest, YouTube
- Copyright: `© 2026 Riddles Rush. All Rights Reserved.`
- External link: TriviaBrain

---

## 12. Responsive Breakpoint Summary

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Default (mobile) | < 640px | 1-col grid, nav hidden, hamburger shown, `container` padding 32px, hero h1 `text-4xl` |
| `sm:` | 640px+ | 2-col grid, App button shown, header padding → 24px |
| `md:` | 768px+ | Desktop nav shown, hamburger hidden |
| `lg:` | 1024px+ | 3-col grid, hero h1 `text-6xl`, icon circle shown, footer 4-col, container padding → 32px vertical → 80px |
| `xl:` | 1280px+ | (Grid stays 3-col, no grid-cols-4 used on blog) |

---

## 13. Key Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `gap-8` | 2rem (32px) | Grid gap between cards |
| `gap-3` | 0.75rem (12px) | Category pills gap |
| `p-6` | 1.5rem (24px) | Card padding |
| `mb-16` | 4rem (64px) | Hero section bottom margin |
| `mt-12` | 3rem (48px) | Category section top margin |
| `mt-16` | 4rem (64px) | Pagination top margin |
| `mt-20` | 5rem (80px) | CTA section top margin |
| `py-8` / `lg:py-20` | 2rem / 5rem | Main container vertical padding |
| `mb-6` | 1.5rem (24px) | Various section subtitle margins |

---

## 14. Border & Shadow Patterns

| Element | Border | Shadow |
|---------|--------|--------|
| Header | `border-b` (1px gray-200) | none |
| Card (default) | `border-2 border-gray-200` (2px) | `shadow-sm` |
| Card (hover) | `border-2 hover:border-blue-300` | `shadow-xl` |
| Category pill | `border border-gray-300` (1px) | none |
| Pagination btn | `border border-gray-300` (1px) | none |
| Footer | `border-t border-gray-200` (1px) | none |
| CTA box | `border border-blue-200` (1px) | none (has `shadow-lg` on button) |

---

## 15. Typography Scale

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| H1 (hero) | `text-4xl` / `lg:text-6xl` (2.25rem / 3.75rem) | `font-bold` | `text-gray-900` |
| H2 (card title) | `text-xl` (1.25rem) | `font-bold` | `text-gray-900` |
| H2 (section) | `text-lg` (1.125rem) | `font-semibold` | `text-gray-900` |
| H2 (CTA) | `text-2xl` (1.5rem) | `font-bold` | `text-gray-900` |
| Subtitle | `text-xl` / `lg:text-2xl` | normal | `text-gray-600` |
| Card description | base (1rem) | normal | `text-gray-600` |
| Body text | base (1rem) | normal | `text-gray-700` |
| Nav items | `text-base` (1rem) | `font-semibold` | `text-gray-700` |
| Category pills | `text-sm` (0.875rem) | `font-medium` | `text-gray-700` |
| Pagination | `text-sm` (0.875rem) | `font-medium` | `text-gray-700` |
| Footer links | `text-sm` (0.875rem) | normal | `text-gray-700` |
| Footer headings | `text-xs` (0.75rem) | `font-semibold uppercase tracking-wider` | `text-gray-500` |
| Meta stats | `text-sm` (0.875rem) | normal | `text-gray-500` |
| Brand name | `text-lg` (1.125rem) | `font-bold` | default |

---

## 16. Interaction Patterns Summary

| Element | Interaction |
|---------|-------------|
| Card | `hover:-translate-y-1` (lifts 4px), `hover:shadow-xl`, `hover:border-blue-300`, full-card link overlay |
| Card emoji | `group-hover:scale-110` (10% scale up) |
| Card title | `group-hover:text-blue-600` (turns blue) |
| Card CTA arrow | `group-hover:translate-x-1` (slides right 4px) |
| Nav items | `hover:text-[#7736FE] hover:bg-gray-50` (purple + light bg) |
| Category pills | `hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700` |
| Pagination btns | `hover:bg-gray-50 hover:text-gray-900` |
| All transitions | `transition-colors` or `transition-all duration-300` |
| Dropdown chevrons | `transition-transform` (rotate on open) |
