# Mehbur Rahman's portfolio

A static portfolio built with HTML, CSS, and JavaScript. It includes a persistent dark/light switch, project filtering, project-note dialogs, education, ongoing research and development, and a contact form.

- Website: https://abir9795.github.io/
- Repository: https://github.com/Abir9795/Abir9795.github.io

## Run locally

```sh
npm start
```

Visit **http://localhost:3000**. Node.js 20 or newer is needed for the preview server and build script. There are no packages to install. Press `Ctrl+C` to stop the preview. Use `PORT=3001 npm start` for a different port.

You can also open `index.html` directly for a visual preview. Use HTTP or the live website to submit the contact form.

## Build

```sh
npm run build
```

`dist/` contains the complete static website. Preview this exact output with `node scripts/serve.mjs --dist`. It can be uploaded to another static host without rewriting the site.

## Edit the site

| File | Contents |
| --- | --- |
| `index.html` | Content, projects, research, education, contacts, and form settings |
| `thanks.html` | Legacy thank-you page; the contact form now confirms inline |
| `styles.css` | Both themes, layout, illustrations, and responsive styles |
| `script.js` | Theme preference, menu, filters, dialogs, form validation, clipboard action |
| `assets/mehbur-rahman.jpg` | Supplied portrait |
| `assets/Mehbur_Rahman_CV.pdf` | Supplied CV, preserved without modification |
| `assets/favicon.svg` | Browser tab icon |

All four selected projects use the same full-width row layout on desktop and stack their image above the description on smaller screens. The header and browser tab use the MR monogram.

### Project images

- `assets/projects/fastbus-admin-dashboard.png`: original [FastBus admin dashboard screenshot](https://raw.githubusercontent.com/Abir9795/FastBus/main/docs/screenshots/admin-dashboard.png).
- `assets/projects/speech-application.png`: original [Speech Intelligence application screenshot](https://raw.githubusercontent.com/Abir9795/speech-intelligence-system/main/docs/images/application.png).

The screenshots are stored locally, load lazily, preserve their full frame, and open at original resolution when clicked. South-Stack and FabricFlow retain their labelled illustrations until screenshots are supplied. To replace either, add its screenshot to `assets/projects/` and use the existing `project-media` figure structure in its card.

Dark mode is the default. A visitor's explicit choice is saved under `mehbur-theme` in local storage. If storage is blocked, theme switching still works for the current page. Without JavaScript, content and project source links remain available, and the contact section provides a direct email link.

## Contact form and delivery checks

The form submits in the background to **Formspree** at `https://formspree.io/f/xzeelpqp`. Formspree forwards notifications to the recipient configured in the form's dashboard. The intended recipient is **abir.rahman9795@gmail.com**. Visitors remain on the portfolio and receive an inline confirmation after the provider accepts the request.

To verify actual delivery:

1. Confirm the recipient email is verified in the Formspree account.
2. Submit a short test through the live website.
3. Confirm that the submission appears in the Formspree dashboard, then check Gmail (including Spam). An API acceptance confirms submission to Formspree, not inbox delivery.
4. If the dashboard records the message but email does not arrive, check the form's email notification settings and recipient verification. See [Formspree's email troubleshooting guide](https://help.formspree.io/articles/troubleshooting/i-m-not-receiving-emails/).

The JSON request contains `name`, `email`, `message`, `subject`, `source`, and the hidden `_gotcha` honeypot. The send button and visible fields are locked while a request is pending to prevent duplicate submissions. Success requires a successful HTTP status and Formspree's JSON success response; validation errors and unexpected responses preserve the message. A 20-second timeout restores retry controls. The form never automatically falls back to a native POST or navigates to the provider's thank-you page.

No private API key is embedded in the site. The endpoint is a public form URL. Without JavaScript, visitors can use the direct email link. The privacy notice beside the send button links to [Formspree's policy](https://formspree.io/legal/privacy-policy/). [AJAX documentation](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax)

## GitHub Pages and future hosting

GitHub Pages publishes from `main` at the repository root. `.nojekyll` makes this a static site, and GitHub's Pages build supplies the deployment. No Student Pack subscription is required for Pages on a public repository. [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

To publish future edits, commit and push the files in this folder. You do not need to commit `dist/`; GitHub serves the root HTML, CSS, script, and assets.

To move to another host or domain later:

1. Upload the output of `npm run build`, or connect this repository with the build command `npm run build` and output directory `dist`.
2. Update the canonical URL, `og:url`, and absolute `og:image` in `index.html`.
3. Keep the Formspree endpoint in `action` and `data-submit-endpoint` if the form account is unchanged. Submissions include the current page address automatically; no thank-you redirect needs configuring.
4. Update any Formspree domain restriction for the new site, then submit a test message and verify both the dashboard record and email notification.

## Content and verification

Project descriptions use the CV and public repository documentation. FabricFlow is included as a business application. SkillForge links to CSE499 and is marked in development. PAFR is marked ongoing research, with evaluations described as planned. No model-training claims, invented benchmark results, cloud certifications, or professional DevOps experience are implied.

Education dates were recovered from text outside the original CV page boundary: expected NSU graduation December 2026, HSC 2020, and SSC 2018. FastBus and Speech Intelligence show real application screenshots; South-Stack and FabricFlow use labelled illustrations.

Validation covers JavaScript syntax, HTML structure and local references, ARIA references, theme switching and saved preferences, project filtering, menu and dialog handlers, form validation, asynchronous success/error handling, duplicate prevention, timeouts, primary text contrast, and the static build. DOM checks do not establish browser layout, native keyboard focus behavior, spam-check behavior, or email delivery. No browser connection was available for visual testing; verify the layout in your own phone and desktop browsers before sending the link to recruiters.
