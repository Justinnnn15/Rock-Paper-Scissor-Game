
const choices = ['rock', 'paper', 'scissors'];
const playerDisplay = document.getElementById('player-display');
const computerDisplay = document.getElementById('computer-display');
const resultDisplay = document.getElementById('result-display');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const buttons = document.querySelectorAll('.choice-box .choice-display');
const statsElements = document.querySelectorAll('.stats-box .stat span');
const modal = document.getElementById('gameOverModal');
const gameOverText = document.getElementById('gameOverText');
const restartBtn = document.getElementById('restartBtn');
const continueBtn = document.getElementById('continueBtn');
const startScreen = document.getElementById('startScreen');
const startGameBtn = document.getElementById('startGameBtn');
const gameContainer = document.querySelector('.game-container');
const playerHandImage = document.querySelector('#player-hand img');
const computerHandImage = document.querySelector('#computer-hand img');

let playerScore = 0;
let computerScore = 0;
let totalWins = 0;
let totalDraws = 0;
let totalLosses = 0;

// Start Game functionality
startGameBtn.addEventListener('click', () => {
    startScreen.classList.remove('active');
    gameContainer.style.display = 'flex';
    
    // Add entrance animation for game container
    gameContainer.style.opacity = '0';
    gameContainer.style.transform = 'translateY(20px)';
    
    // Trigger animation
    setTimeout(() => {
        gameContainer.style.transition = 'all 0.8s ease-out';
        gameContainer.style.opacity = '1';
        gameContainer.style.transform = 'translateY(0)';
    }, 100);
});

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const playerChoice = e.currentTarget.querySelector('.choice-name').textContent.toLowerCase();
        playGame(playerChoice);
    });
});

function generateComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function formatChoiceForImage(choice) {
    if (choice === 'scissors') {
        return 'Scissor';
    }
    return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

function updateStats() {
    statsElements[0].textContent = totalWins;
    statsElements[1].textContent = totalDraws;
    statsElements[2].textContent = totalLosses;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    totalWins = 0;
    totalDraws = 0;
    totalLosses = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    updateStats();
    modal.classList.remove('active');
}

function resetRound() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    modal.classList.remove('active');
}

function showGameOverModal(message) {
    gameOverText.textContent = message;
    modal.classList.add('active');
}

// Event listeners for modal buttons
restartBtn.addEventListener('click', resetGame);
continueBtn.addEventListener('click', resetRound);

function updateScore(result) {
    if (result === 'win') {
        playerScore++;
    } else if (result === 'lose') {
        computerScore++;
    } else if (result === 'draw') {
        totalDraws++;
        updateStats();
    }
    
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    
    if (playerScore === 10) {
        totalWins++;
        updateStats();
        showGameOverModal('VICTORY!');
    } else if (computerScore === 10) {
        totalLosses++;
        updateStats();
        showGameOverModal('YOU LOSE!');
    }
}

function displayResult(playerChoice, computerChoice, result) {
    playerDisplay.textContent = `PLAYER: ${playerChoice.toUpperCase()}`;
    computerDisplay.textContent = `COMPUTER: ${computerChoice.toUpperCase()}`;

    let message = '';
    if (result === 'win') {
        message = 'YOU WIN!';
    } else if (result === 'lose') {
        message = 'YOU LOSE!';
    } else {
        message = 'IT\'S A DRAW!';
    }

    resultDisplay.textContent = message;
    resultDisplay.classList.remove('result-animation');
    void resultDisplay.offsetWidth; // Trigger reflow
    resultDisplay.classList.add('result-animation');
}

function playGame(playerChoice) {
    const computerChoice = generateComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    updateScore(result);
    displayResult(playerChoice, computerChoice, result);
    playerHandImage.src = `images/Human-${formatChoiceForImage(playerChoice)}.png`;
    computerHandImage.src = `images/Robot-${formatChoiceForImage(computerChoice)}.png`;
}
