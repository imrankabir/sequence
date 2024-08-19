const app = 'Sequence';
const VISITS_KEY = 'sequence-visits';

const tiles = document.querySelectorAll('.tile');
const startButton = document.getElementById('start');
let sequence = [];
let playerSequence = [];
let level = 0;

tiles.forEach(tile => {
    tile.addEventListener('click', () => handleTileClick(tile.id));
});

const startGame = e => {
    sequence = [];
    playerSequence = [];
    level = 0;
    nextRound();
}

startButton.addEventListener('click', startGame);

const nextRound = e => {
    level++;
    playerSequence = [];
    const nextTile = tiles[Math.floor(Math.random() * tiles.length)];
    sequence.push(nextTile.id);
    playSequence();
}

const playSequence = e => {
    let i = 0;
    const interval = setInterval(() => {
        activateTile(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 600);
}

const activateTile = id => {
    const tile = document.getElementById(id);
    tile.classList.add('active');
    setTimeout(() => tile.classList.remove('active'), 300);
}

const handleTileClick = id => {
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

const checkSequence = e => {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

trackVisitor();
