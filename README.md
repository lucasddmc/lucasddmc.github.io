# lucasddmc.github.io

Personal site. Static — no build step, no dependencies.

## Photos (required)

Drop the two headshots into `assets/`:

- `assets/hero-landscape.jpg` — used on screens wider than 820px
- `assets/hero-portrait.jpg`  — used on phones

Any JPG works; ~2000px on the long edge is plenty. Keep the filenames.

## Run locally

    python3 -m http.server 8000

Then open http://localhost:8000

## Notes

- Scroll-driven animations use native CSS (`animation-timeline`). `main.js`
  falls back to IntersectionObserver on Safari < 18 / Firefox < 132.
- The ViTViz figure is a white matplotlib export, inverted into the dark theme
  via the `.invertible` CSS class.
