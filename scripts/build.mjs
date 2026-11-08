import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'thanks.html', 'styles.css', 'script.js', 'assets', '.nojekyll']) {
  await cp(file, `dist/${file}`, { recursive: true });
}
console.log('Built static portfolio in dist/. No dependencies or server required.');
