import { options } from './lib/cmd.js'
import { loadCorpus, writeArticle } from './lib/corpus.js'
import { generator } from './lib/generator.js';
import { interact } from './lib/interact.js';
import { createRandomPicker } from './lib/random.js';

const corpus = loadCorpus('corpus/data.json');
let title = options.title || createRandomPicker(corpus.title)();
(async function () {
    if (Object.keys(options).length <= 0) {
        const answers = await interact([
            {text: '请输入文章主题', value: title},
            {text: '请输入最小字数', value: 6000},
            {text: '请输入最大字数', value: 10000},
        ])

        title = answers[0];
        options.min = answers[1];
        options.max = answers[2];
    }

    const article = generator(title, {corpus, ...options});
    const output = writeArticle(title, article);
    console.log('生成成功！');
}());