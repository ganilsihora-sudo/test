let targetNumber;
let remainingAttempts;
const maxAttempts = 7;

// DOM Elements
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const restartBtn = document.getElementById('restartBtn');

// गेम शुरू करने का फंक्शन
function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    remainingAttempts = maxAttempts;
    
    attemptsDisplay.innerText = remainingAttempts;
    message.innerText = "1 से 100 के बीच नंबर चुनें!";
    message.style.color = "#333";
    
    guessInput.value = "";
    guessInput.disabled = false;
    guessBtn.disabled = false;
    restartBtn.style.display = "none";
}

// गेस चेक करने का फंक्शन
function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // वैलिडेशन
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.innerText = "कृपया 1 से 100 के बीच का वैध नंबर डालें!";
        message.style.color = "#e67e22";
        return;
    }

    remainingAttempts--;
    attemptsDisplay.innerText = remainingAttempts;

    // रिजल्ट की जाँच
    if (userGuess === targetNumber) {
        message.innerText = `🎉 बधाई हो! आपने सही नंबर ${targetNumber} पहचान लिया!`;
        message.style.color = "#28a745";
        endGame();
    } else if (remainingAttempts === 0) {
        message.innerText = `💀 गेम ओवर! सही नंबर था: ${targetNumber}`;
        message.style.color = "#d9534f";
        endGame();
    } else if (userGuess < targetNumber) {
        message.innerText = "📉 बहुत छोटा नंबर है! थोड़ा बड़ा सोचें।";
        message.style.color = "#007bff";
    } else {
        message.innerText = "📈 बहुत बड़ा नंबर है! थोड़ा छोटा सोचें।";
        message.style.color = "#007bff";
    }

    guessInput.value = "";
    guessInput.focus();
}

// गेम खत्म होने पर
function endGame() {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    restartBtn.style.display = "block";
}

// इवेंट लिसनर्स
guessBtn.addEventListener('click', checkGuess);

// Enter की दबाने पर भी चेक हो
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

restartBtn.addEventListener('click', initGame);

// पेज लोड होते ही गेम स्टार्ट
initGame();