# Creative Portfolio Showcase

/skill:animate Create me portfolio website. Use the uploaded resume as information to be indicated on the portfolio website. Add sections for services, work experience, previous works, testimonial, contact.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/af57eb8f-015d-4424-91d0-430a0ff7a2ac).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Self-hosting (Render / Netlify)

The build picks the right server target automatically (see `vite.config.ts`):

- **Render**: `render.yaml` is included — Render builds with `npm install && npm run build` and starts `node .output/server/index.mjs` (Node 22).
- **Netlify**: `netlify.toml` is included — Netlify builds with `npm run build` and publishes `dist/`, with the server running as a Netlify Function.
- **Any other host**: set `NITRO_PRESET` to any nitro preset, or run the default Node build with `node .output/server/index.mjs`.
