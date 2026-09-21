# Vera Eziolisa portfolio

React and Vite portfolio for a writer and brand storyteller.

## Project structure

- `src/pages/` — Home, About, Portfolio, Contact, and fallback pages.
- `src/components/` — navigation, reusable content blocks, images, and motion elements.
- `src/hooks/` — routing, in-view reveals, and parallax behavior.
- `src/data/` — portfolio copy and navigation labels.
- `src/styles/` — base rules, shared elements, page layouts, animation rules, and responsive rules.
- `public/images/` — supplied portfolio photography and brand logos.

## Commands

- `npm install` — install dependencies.
- `npm run dev` — start the local site.
- `npm run build` — create the production build.
- `npm run lint` — check JavaScript and JSX.

Motion uses native CSS transitions and browser observers. Smaller screens skip parallax, and the site honors `prefers-reduced-motion`.
