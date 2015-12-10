function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomInt() {
    return Math.floor(Math.random());
}

function getRandomColor() {
    return '#'+Math.random().toString(16).substr(-6);
}
