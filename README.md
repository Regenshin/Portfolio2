# Devoy Douglas: Portfolio, with a little extra

Welcome to my corner of the internet: a portfolio that shows the work, tells the story, and lets you poke around inside a few tiny product demos. It is built with Vue 3 and Vite, styled with Tailwind CSS and custom CSS, and deployed to GitHub Pages.

## Take a look

- Scroll through the home, about, selected work, experience, and contact sections.
- Click anywhere on a project card to open its interactive demo workspace. The title link also works with the keyboard; the card's standalone action stays separate.
- Try the demo controls. Their sample data is saved in this browser, so a refresh does not wipe the little experiments.

The contact form is a front-end prototype. It shows a short sending state and clears the fields, but it does not send a message to a server yet.

## Run it locally

You will need Node.js 20.19 or newer (or 22.12 or newer) and npm.

```sh
npm ci
npm run dev
```

Vite prints a local address in the terminal, usually `http://localhost:5173`.

To make and preview a production build:

```sh
npm run build
npm run preview
```

## The lay of the land

```text
src/
  App.vue                 Portfolio sections, navigation, and project routing
  ProjectPage.vue         Project detail view and demo workspace
  projectData.js          Project catalog and browser-state helpers
  project-demos/          Six interactive sample product demos
  assets/img/             Portfolio portraits
  style.css               Tailwind import and custom visual design
  main.js                 Vue app entry point
.github/workflows/        GitHub Pages build and deployment workflow
docs/guide.md             Longer developer and editor guide
```

For the longer tour, including how project links and saved demo state work, head to the [project guide](docs/guide.md).

## Deploy

Push to `main` and GitHub Actions builds and publishes the site. You can also run the workflow manually from the Actions tab. In repository settings, choose **Settings → Pages → Build and deployment → Source → GitHub Actions**.

The build detects the repository name in GitHub Actions and uses it as the Pages path (for example, `/Portfolio2/`). Locally, it uses `/` so the dev server stays convenient.

## Built with

Vue 3 · Vite · Tailwind CSS 4 · lucide-vue-next

Keep exploring; there are buttons to press and small details to find.
