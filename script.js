// 1. THEME SWITCHER LOGIC
const themeBtn = document.getElementById('theme-btn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    themeBtn.textContent = '🌙 Dark Mode';
  } else {
    themeBtn.textContent = '☀️ Light Mode';
  }
});

// 2. GUESSING GAME LOGIC
let secretNumber = Math.floor(Math.random() * 10) + 1;
let lives = 3; // The tracking variable for attempts remaining
console.log("Psst! The engine's secret number is: " + secretNumber);

const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const gameMessage = document.getElementById('game-message');
const resetBtn = document.getElementById('reset-btn');
const livesContainer = document.getElementById('lives-container');

guessBtn.addEventListener('click', () => {
  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    gameMessage.textContent = "⚠️ Enter a number from 1 to 10.";
    gameMessage.style.color = "#ffa502";
    return;
  }

  // 1. Handle Win State
  if (userGuess === secretNumber) {
    gameMessage.textContent = "🎉 Correct! You beat the engine! 🏆";
    gameMessage.style.color = "#34d399"; 
    endGame();
    return;
  }
  
  // 2. Deduct a life if wrong
  lives--;
  
  // Update the visual hearts text length directly
  if (lives === 2) livesContainer.textContent = "❤️❤️";
  if (lives === 1) livesContainer.textContent = "❤️";
  
  // 3. Handle Game Over State
  if (lives === 0) {
    livesContainer.textContent = "💀";
    gameMessage.textContent = "💥 Game Over! The target was " + secretNumber + ".";
    gameMessage.style.color = "#f43f5e";
    endGame();
    return;
  }

  // 4. Handle Clue States (Only if they still have lives left!)
  if (userGuess > secretNumber) {
    gameMessage.textContent = "📈 Too high! Try a lower number.";
    gameMessage.style.color = "#f43f5e"; 
  } else {
    gameMessage.textContent = "📉 Too low! Try a higher number.";
    gameMessage.style.color = "#f43f5e"; 
  }
});

// Helper function to lock text fields down when a round concludes
function endGame() {
  resetBtn.classList.remove('hidden');
  guessBtn.disabled = true;
  guessInput.disabled = true;
}

// 3. REPLAY LOOP TRIGGER LOGIC
resetBtn.addEventListener('click', () => {
  secretNumber = Math.floor(Math.random() * 10) + 1;
  lives = 3;
  console.log("Engine completely reset! New target: " + secretNumber);
  
  // Reset the UI elements completely
  livesContainer.textContent = "❤️❤️❤️";
  gameMessage.textContent = "";
  guessInput.value = "";
  
  // Unfreeze inputs and put the reset button back in hiding
  guessBtn.disabled = false;
  guessInput.disabled = false;
  resetBtn.classList.add('hidden');
});
