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
| `thanks.html` | The page shown after the form's send flow |
| `styles.css` | Both themes, layout, illustrations, and responsive styles |
| `script.js` | Theme preference, menu, filters, dialogs, form validation, clipboard action |
| `assets/mehbur-rahman.jpg` | Supplied portrait |
| `assets/Mehbur_Rahman_CV.pdf` | Supplied CV, preserved without modification |
| `assets/favicon.svg` | Browser tab icon |

Dark mode is the default. A visitor's explicit choice is saved under `mehbur-theme` in local storage. If storage is blocked, theme switching still works for the current page. Without JavaScript, all content, project source links, and the native contact form remain available.

## Contact form activation

The form posts to **FormSubmit**, which forwards submissions to **abir.rahman9795@gmail.com**. It does not need access to your Gmail account, a Gmail password, or an API key.

1. Submit the form once if activation has not yet been triggered.
2. Open FormSubmit's activation email in Gmail, checking Spam if necessary, and confirm the destination address.
3. After activation, submit a short test through the live site and confirm that it arrives. Replying to a submission uses the visitor's email address.

The form keeps FormSubmit's spam check enabled and includes a hidden honeypot. Browser validation checks the name, email, and message. It never displays a claim that a message was sent before the provider accepts the submission. Visitors may see FormSubmit's spam check before returning to `thanks.html`.

The form sends the visitor's name, email, and message to FormSubmit. Its privacy policy is linked beside the send button. See the [official FormSubmit documentation](https://formsubmit.co/documentation) for delivery and activation details.

## GitHub Pages and future hosting

GitHub Pages publishes from `main` at the repository root. `.nojekyll` makes this a static site, and GitHub's Pages build supplies the deployment. No Student Pack subscription is required for Pages on a public repository. [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

To publish future edits, commit and push the files in this folder. You do not need to commit `dist/`; GitHub serves the root HTML, CSS, script, and assets.

To move to another host or domain later:

1. Upload the output of `npm run build`, or connect this repository with the build command `npm run build` and output directory `dist`.
2. Update the canonical URL, `og:url`, and absolute `og:image` in `index.html`.
3. Update the fallback `_next` form URL in the HTML. JavaScript also derives this thank-you URL from the current host and path.
4. Check FormSubmit activation for the new site and submit a test message.

## Content and verification

Project descriptions use the CV and public repository documentation. FabricFlow is included as a business application. SkillForge links to CSE499 and is marked in development. PAFR is marked ongoing research, with evaluations described as planned. No model-training claims, invented benchmark results, cloud certifications, or professional DevOps experience are implied.

Education dates were recovered from text outside the original CV page boundary: expected NSU graduation December 2026, HSC 2020, and SSC 2018. Project artwork is labelled illustration and is not presented as an application screenshot.

Validation covers JavaScript syntax, HTML structure and local references, ARIA references, theme switching and saved preferences, project filtering, menu and dialog handlers, form validation and redirects, primary text contrast, and the static build. DOM checks do not establish browser layout, native keyboard focus behavior, spam-check behavior, or email delivery. No browser connection was available for visual testing; verify the layout in your own phone and desktop browsers before sending the link to recruiters.
