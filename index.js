import { options } from './lib/cmd.js'
import { loadCorpus, writeArticle } from './lib/corpus.js'
import { generator } from './lib/generator.js';
import { createRandomPicker } from './lib/random.js';

const corpus = loadCorpus('corpus/data.json');
const title = options.title || createRandomPicker(corpus.title)();
const article = generator(title, {corpus, ...options});
const output = writeArticle(title, article);

console.log('生成成功！');