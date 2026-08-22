# Opkodex LTD — SmartCare Rwanda

A production-oriented, responsive frontend for the SmartCare Rwanda patient registration and hospital-discovery experience.

## Included

- Responsive Home / Landing page
- Hospital directory with working search and district filter
- Hospital detail/selection flow
- Dynamic `register.html?hospital=la-charite`
- Multi-section patient/parent + dependent registration form
- NIN, email, Rwanda phone, date and file validation
- File metadata collection without persisting uploaded documents in the browser
- Accessible form labels, focus states, keyboard-friendly controls
- Registration review and confirmation state
- FAQ, contact/footer and legal/privacy messaging
- Modular TypeScript
- GitHub Actions deployment workflow for GitHub Pages
- No sensitive registration data written to `localStorage`

## Important production note

This package is a production-oriented **frontend**. A real production healthcare deployment still requires a secure backend/API, authenticated hospital staff portals, encrypted document storage, access controls, audit logging, consent/privacy workflows, backup and disaster recovery, and compliance review before processing real patient data.

The frontend submits to `/api/registrations` only when `demoMode` is disabled in `src/config.ts`. In the default demo mode, it shows a successful confirmation without sending sensitive data anywhere.

## Run

```bash
npm install
npm run build
```

Then serve the project root over HTTP.

Example:

```bash
python -m http.server 8080
```

Open:

`http://localhost:8080/index.html`

## GitHub Pages

Push the repository to GitHub. The included workflow:

`.github/workflows/deploy-pages.yml`

builds the TypeScript and deploys the repository to GitHub Pages.

## Project structure

```text
src/
├── app.ts
├── config.ts
├── data/
│   └── hospitals.ts
├── types/
│   └── smartcare.ts
├── pages/
│   ├── home.ts
│   ├── hospitals.ts
│   └── register.ts
└── utils/
    ├── files.ts
    ├── format.ts
    └── validation.ts
```
