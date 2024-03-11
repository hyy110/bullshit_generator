import readline from 'readline';

function question(r1, {text, value}) {
    const q = `{${text}(${value})}\n`;
    return new Promise((resolve) => {
        r1.question(q, (answer) => {
            resolve(answer || value);
        })
    })
}

export async function interact(questions) {
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const answers = [];
    for (let i = 0; i < questions.length; i ++) {
        const q = questions[i];
        const answer = await question(r1, q);
        answers.push(answer);
    }
    r1.close();
    return answers;
}