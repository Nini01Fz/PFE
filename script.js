document.addEventListener('DOMContentLoaded', function() {
const symbols = ['🍎', '🍊', '🍋', '🍓', '🍒', '🍇', '🍉', '🍑'];
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const winMessage = document.getElementById('win-message');
const loseMessage = document.getElementById('lose-message');

let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let lockBoard = false;
let score = 0;
let timer;
let secondsRemaining = 90; // Set your desired time limit in seconds

function createBoard() {
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

    for (const symbol of shuffledSymbols) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.innerHTML = `<span class="symbol">${symbol}</span>`;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }

}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            secondsRemaining--;

            if (secondsRemaining <= 0) {
                clearInterval(timer);
                endGame(false);
            }
            timerDisplay.textContent = `Time: ${secondsRemaining}s`;

        }, 1000);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        startTimer();
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    isMatch ? handleMatch() : unflipCards();
}

function handleMatch() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;

    disableCards();

    if (score === symbols.length) {
        clearInterval(timer);
        endGame(true);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function endGame(isWin) {
    if (isWin) {
        winMessage.textContent = 'Congratulations! You won!';
        gamewon();
    } else {
        loseMessage.textContent = 'Sorry, you lost. Better luck next time!';
    }
}

createBoard();
function gamewon() {
    var confettiSettings = { target: 'my-canvas' };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}
});