import fs from 'fs';
import path from 'path';

const srcDir = `./src`;
const destDir = `./dist/bun`;

function* traverse(src) {
  const files = fs.readdirSync(src);

  for (const file of files) {
    const fullSrcPath = path.join(src, file);

    if (fs.statSync(fullSrcPath).isDirectory()) {
      yield* traverse(path.join(src, file));
    } else {
      yield path.join(src, file);
    }
  }
}

try {
  fs.rmSync(destDir, { recursive: true, force: true });

  fs.mkdirSync(destDir, { force: true, recursive: true });

  const srcLen = srcDir.length;

  for (const file of traverse(srcDir)) {
    if (file.endsWith('.mts')) {
      const relativePath = file.slice(srcLen - 1);

      const fullDestPath = path.join(destDir, relativePath);

      try {
        fs.mkdirSync(path.dirname(fullDestPath), {
          force: true,
          recursive: true,
        });
      } catch {
        //
      }

      const contents = fs.readFileSync(file, { encoding: 'utf-8' });
      const result = contents.replaceAll('.mjs', '.mts');

      fs.writeFileSync(fullDestPath, result, { encoding: 'utf-8' });
    }
  }
} catch (err) {
  console.error(err);
}
