import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import moment from 'moment';

const __dirname = dirname(fileURLToPath(import.meta.url));

//读取语料库
export function loadCorpus(src) {
    const path = resolve(__dirname, '..', src);
    const data = readFileSync(path, {encoding: 'utf-8'});

    return JSON.parse(data);
}

//将生成的文章写入output文件夹
export function writeArticle(title, article) {
    const text = `${title}\n\n   ${article.join('\n\n   ')}`;
    const outputDir = resolve(__dirname, '..', 'output');
    const time = moment().format('YYYY-MM-DD HH-mm-ss');
    const outputFile = resolve(outputDir, `${title}${time}.txt`);

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir);
    }

    writeFileSync(outputFile, text);
   
    return outputFile;
}