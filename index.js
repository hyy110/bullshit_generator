import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import moment from 'moment';

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
    const outputDir = resolve(__dirname, 'output');
    const time = moment().format('YYYY-MM-DD');
    const outputFile = resolve(outputDir, `${title}${time}.txt`);

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir);
    }
    try {
        writeFileSync(outputFile, text);
    } catch(e) {
        console.log(e);
    }
   
    return outputFile;
}

const corpus = loadCorpus('corpus/data.json');

const pickTitle = createRandomPicker(corpus.title);
const title = pickTitle();

const article = generator(title, {corpus});

writeArticle(title, article);