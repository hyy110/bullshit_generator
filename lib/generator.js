import { createRandomPicker, randomInt } from "./random"

function sentence(pick, replacer) {
    let ret = pick();
    for (const key of replacer) {
        ret = ret.replace(new RegExp(`{{${key}}}`, 'g'), 
            typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]);
    }

    return ret;
}

export function generator(title, {corpus, min = 6000, max = 10000}) {
    const articleLenght = randomInt(min, max);

    const { famous, bosh_before, bosh, conclude, said } = corpus;
    const [pickFamous, pickBoshBefore, pickBosh, pickConclude, pickSaid] = [famous, bosh_before, bosh, conclude, said].map((item) => {
        return createRandomPicker(item);
    })

    const article = [];
    let totalLength = 0;

    while (totalLength < articleLenght) {
        let section = '';
        const sectionLength = randomInt(200, 500);

        while (section.length < sectionLength || !/[。?]$/.test(section)) {
            const n = randomInt(0, 100);
            if (n < 20) {
                section += sentence(pickFamous, {said: pickSaid, conclude: pickConclude});
            } else if (n < 50) {
                section += sentence(pickBoshBefore, {title}) + sentence(pickBosh, {title});
            } else {
                section += sentence(pickBosh, {title});
            }
        }

        totalLength += section.length;

        article.push(section);
    }

    return article;
}