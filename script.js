const tiles = document.querySelectorAll('.tile');
const startButton = document.getElementById('start');
let sequence = [];
let playerSequence = [];
let level = 0;

tiles.forEach(tile => {
    tile.addEventListener('click', () => handleTileClick(tile.id));
});

startButton.addEventListener('click', startGame);

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    nextRound();
}

function nextRound() {
    level++;
    playerSequence = [];
    const nextTile = tiles[Math.floor(Math.random() * tiles.length)];
    sequence.push(nextTile.id);
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        activateTile(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 600);
}

function activateTile(id) {
    const tile = document.getElementById(id);
    tile.classList.add('active');
    setTimeout(() => {
        tile.classList.remove('active');
    }, 300);
}

function handleTileClick(id) {
    playerSequence.push(id);
    activateTile(id);
    if (!checkSequence()) {
        alert('Game Over! Wrong sequence.');
        return;
    }
    if (playerSequence.length === sequence.length) {
        setTimeout(nextRound, 1000);
    }
}

function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}
