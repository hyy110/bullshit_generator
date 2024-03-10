import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

import { generator } from './lib/generator.js';
import { createRandomPicker } from './lib/random.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCorpus(src) {
    const path = resolve(__dirname, src);
    const data = readFileSync(path, {encoding: 'utf-8'});

    return JSON.parse(data);
}

function writeArticle(title, article) {
    const text = `${title}\n\n   ${article.join('\n\n   ')}`;
    const path = resolve(__dirname, 'output');
    if (!existsSync(path)) {
        mkdirSync(path);
    }

    const outputPath = join(path, 'output.txt');

    writeFileSync(outputPath, text);
}

const corpus = loadCorpus('corpus/data.json');

const pickTitle = createRandomPicker(corpus.title);
const title = pickTitle();

const article = generator(title, {corpus});

writeArticle(title, article);