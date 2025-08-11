
const choices = ['rock', 'paper', 'scissors'];
const playerDisplay = document.getElementById('player-display');
const computerDisplay = document.getElementById('computer-display');
const resultDisplay = document.getElementById('result-display');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const buttons = document.querySelectorAll('.choice-box .choice-display');
const playerHandImage = document.querySelector('#player-hand img');
const computerHandImage = document.querySelector('#computer-hand img');

let playerScore = 0;
let computerScore = 0;

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

function updateScore(result) {
    if (result === 'win') {
        playerScore++;
    } else if (result === 'lose') {
        computerScore++;
    }
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function displayResult(playerChoice, computerChoice, result) {
    playerDisplay.textContent = `PLAYER: ${playerChoice.toUpperCase()}`;
    computerDisplay.textContent = `COMPUTER: ${computerChoice.toUpperCase()}`;

    if (result === 'win') {
        resultDisplay.textContent = 'YOU WIN!';
    } else if (result === 'lose') {
        resultDisplay.textContent = 'YOU LOSE!';
    } else {
        resultDisplay.textContent = 'IT\'S A DRAW!';
    }
}

function playGame(playerChoice) {
    const computerChoice = generateComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    updateScore(result);
    displayResult(playerChoice, computerChoice, result);
    playerHandImage.src = `images/Human-${formatChoiceForImage(playerChoice)}.png`;
    computerHandImage.src = `images/Robot-${formatChoiceForImage(computerChoice)}.png`;
}
