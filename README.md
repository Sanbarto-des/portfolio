# Sanbarto Mondal — Portfolio

Imported from the Claude Design project `test-folio`
(https://claude.ai/design/p/dbbd4beb-f2da-4490-a034-cb80547753c9).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/Sanbarto%20Mondal%20-%20Portfolio.html
```

Open `Sanbarto Mondal - Portfolio.html` — it's the home page. Everything is
static HTML/CSS/JS, no build step.

## Structure

| File | Purpose |
|------|---------|
| `Sanbarto Mondal - Portfolio.html` | Home (work grid, about, experience, contact) |
| `About.html` | About page |
| `project.html` | Generic project template (reads `?p=N`) |
| `CheQ…`, `Aurva…`, `Graphic Design…`, `100kmph…`, `Decathlon…`, `Cadence…`, `Dusk…`, `Doclove…` `.html` | 8 standalone case-study pages |
| `Hero Lighting - Explorations.html` | Standalone hero-lighting experiment |
| `image-slot.js` | `<image-slot>` web component (drag-to-fill placeholders) |
| `tweaks-panel.jsx` | Reusable Tweaks panel (used by the hero experiment) |
| `uploads/` | Image assets referenced by the pages |

## ⚠️ Image assets — action needed

The pages reference **71** images in `uploads/`. Only **3** were retrievable
through the Claude Design MCP connector (`DOC.png`, `arv-1.jpg`, `arv-6.jpg`).

The connector's file-read caps responses at **256 KiB** and returns anything
larger **truncated**, and the project's assets are login-gated (so they can't
be fetched directly over HTTP either). The remaining **68** images — most
covers, photos, and all GIFs — exceed that cap and could not be pulled intact.

**To complete the import:** download the project as a ZIP from
claude.ai/design (the project ⋯ / export menu) and copy its `uploads/`
folder over this one. That restores every asset at full resolution. The
HTML/JS is already complete and correct, so the site will render fully once
the images are in place.
