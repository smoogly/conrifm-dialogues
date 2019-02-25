export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function shuffle(array: ReadonlyArray<number>) {
    let currentIndex = array.length;
    let temporaryValue: number;
    let randomIndex: number;

    const newArr = [...array];

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = newArr[currentIndex];
        newArr[currentIndex] = newArr[randomIndex];
        newArr[randomIndex] = temporaryValue;
    }

    return newArr;
}

export function rollover(array: ReadonlyArray<number>) {
    const direction = getRandomInt(0, 2) === 0;
    if (direction) {
        return [array[array.length - 1], ...array.slice(0, array.length - 1)];
    }

    return [...array.slice(1, array.length), array[0]]
}
