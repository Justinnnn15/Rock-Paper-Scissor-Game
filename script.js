// Get DOM elements
const playerHand = document.getElementById('player-hand');
const computerHand = document.getElementById('computer-hand');
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');
const resultText = document.getElementById('result-text');
const choices = document.querySelectorAll('.choice-display');

// Game state
let scores = {
    player: 0,
    computer: 0
};

// Hide all hands initially
function hideAllHands() {
    playerHand.querySelectorAll('.hand-image').forEach(img => img.classList.add('hidden'));
    computerHand.querySelectorAll('.hand-image').forEach(img => img.classList.add('hidden'));
}

// Show hands with animation
function showHands(playerChoice, computerChoice) {
    hideAllHands();
    
    // Show player's hand immediately
    playerHand.querySelector(`.hand-image.${playerChoice}`).classList.remove('hidden');
    
    // Animate computer's choice
    let choices = ['rock', 'paper', 'scissors'];
    let count = 0;
    const animationInterval = setInterval(() => {
        hideAllComputerHands();
        const currentChoice = choices[count % 3];
        computerHand.querySelector(`.hand-image.${currentChoice}`).classList.remove('hidden');
        count++;
        
        if (count === 8) { // Stop after 8 iterations
            clearInterval(animationInterval);
            // Show final choice
            hideAllComputerHands();
            computerHand.querySelector(`.hand-image.${computerChoice}`).classList.remove('hidden');
            // Show result after animation
            updateResult(playerChoice, computerChoice);
        }
    }, 100); // Change hand every 100ms
}

// Hide only computer hands
function hideAllComputerHands() {
    computerHand.querySelectorAll('.hand-image').forEach(img => img.classList.add('hidden'));
}

// Update the game result
function updateResult(playerChoice, computerChoice) {
    const winner = getWinner(playerChoice, computerChoice);
    
    // Update scores and display
    if (winner === 'player') {
        scores.player++;
        resultText.textContent = 'You win!';
    } else if (winner === 'computer') {
        scores.computer++;
        resultText.textContent = 'Computer wins!';
    } else {
        resultText.textContent = "It's a draw!";
    }
    
    // Update score display
    playerScore.textContent = scores.player;
    computerScore.textContent = scores.computer;
    
    // Check for game end
    if (scores.player === 10 || scores.computer === 10) {
        const gameWinner = scores.player === 10 ? 'You' : 'Computer';
        resultText.textContent = `Game Over! ${gameWinner} won the game!`;
        // Disable choices
        choices.forEach(choice => choice.style.pointerEvents = 'none');
        setTimeout(() => {
            if (confirm('Play again?')) {
                resetGame();
            }
        }, 1000);
    }
}

// Get computer choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Determine winner
function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'draw';
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }
    
    return 'computer';
}

// Play round
function playRound(playerChoice) {
    // Disable choices during animation
    choices.forEach(choice => choice.style.pointerEvents = 'none');
    
    // Clear result text during animation
    resultText.textContent = 'Robot is choosing...';
    
    const computerChoice = getComputerChoice();
    showHands(playerChoice, computerChoice);
    
    // Re-enable choices after animation
    setTimeout(() => {
        choices.forEach(choice => choice.style.pointerEvents = 'auto');
    }, 900); // Slightly longer than animation duration
}

// Reset game
function resetGame() {
    scores.player = 0;
    scores.computer = 0;
    playerScore.textContent = '0';
    computerScore.textContent = '0';
    resultText.textContent = 'Choose your move!';
    hideAllHands();
    choices.forEach(choice => choice.style.pointerEvents = 'auto');
}

// Add click listeners to choices
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.querySelector('.choice-name').textContent.toLowerCase();
        playRound(playerChoice);
    });
});

// Initialize game
hideAllHands();
resultText.textContent = 'Choose your move!';
