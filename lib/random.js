export function randomInt(min, max) {
    const p = Math.random();

    return Math.floor(min * (1-p) + max * p);
}

export function createRandomPicker(arr) {
    arr = [...arr];
    function randomPicker() {
        const len = arr.length - 1;
        const index = randomInt(0, len);
        const picked = arr[index];
        [arr[index], arr[len]] = [arr[len], arr[index]];
        
        return picked;
    }

    randomPicker();
    return randomPicker;
}