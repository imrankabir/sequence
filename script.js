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

startButton.addEventListener('click', startGame);

const startGame = e => {
    sequence = [];
    playerSequence = [];
    level = 0;
    nextRound();
}

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

const padTwoDigits = num => num.toString().padStart(2, "0");

const formatDate = (date, dateDiveder = '-') => {
  return (
    [
      date.getFullYear(),
      padTwoDigits(date.getMonth() + 1),
      padTwoDigits(date.getDate()),
    ].join(dateDiveder) +
    " " +
    [
      padTwoDigits(date.getHours()),
      padTwoDigits(date.getMinutes()),
      padTwoDigits(date.getSeconds()),
    ].join(":")
  );
}

async function getVisitorIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unknown IP';
    }
}

async function trackVisitor() {
    const ip = await getVisitorIP();
    const time = formatDate(new Date());
    let visits = JSON.parse(localStorage.getItem(VISITS_KEY)) || [];
    visits.push({ip, time, app});
    localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
    persistVisits();
}

async function persistVisits() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // headers.append('mode', 'no-cors');
  const response = await fetch('https://enabled-humpback-lively.ngrok-free.app/save-visits.php', {
    method: 'POST',
    body: JSON.stringify(localStorage.getItem(VISITS_KEY)),
    headers
  });

  if (response.ok === true && response.status === 200) {
    console.log(response);
    localStorage.setItem(VISITS_KEY, JSON.stringify([]));
  }

}

trackVisitor();
