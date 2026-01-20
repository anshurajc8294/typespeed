const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Coding is not just about what you know, it is about what you can figure out.",
    "JavaScript is the language of the web.",
    "Practice makes perfect when it comes to typing speed.",
    "Keep pushing your limits every single day."
];

const quoteDisplay = document.getElementById('quote-display');
const inputField = document.getElementById('input-field');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('reset-btn');

let timer = 0;
let interval = null;
let isStarted = false;

// 1. Setup Quote
function renderNewQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.innerHTML = '';
    quotes[randomIndex].split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        quoteDisplay.appendChild(span);
    });
    inputField.value = '';
}

// 2. Timer and Stats Logic
inputField.addEventListener('input', () => {
    if (!isStarted) {
        startTimer();
        isStarted = true;
    }

    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = inputField.value.split('');
    let correctChars = 0;

    arrayQuote.forEach((charSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            charSpan.classList.remove('correct', 'incorrect');
        } else if (character === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
            correctChars++;
        } else {
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
        }
    });

    // Calculate Accuracy
    if (arrayValue.length > 0) {
        let acc = (correctChars / arrayValue.length) * 100;
        accuracyDisplay.innerText = Math.floor(acc);
    }

    // Finish Condition
    if (arrayValue.length === arrayQuote.length) {
        stopTimer();
    }
});

function startTimer() {
    timer = 0;
    interval = setInterval(() => {
        timer++;
        timerDisplay.innerText = timer;
        calculateWPM();
    }, 1000);
}

function calculateWPM() {
    const wordsTyped = inputField.value.trim().split(/\s+/).length;
    const minutes = timer / 60;
    if (minutes > 0) {
        const wpm = Math.round(wordsTyped / minutes);
        wpmDisplay.innerText = wpm;
    }
}

function stopTimer() {
    clearInterval(interval);
    inputField.disabled = true;
}

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    isStarted = false;
    timer = 0;
    timerDisplay.innerText = 0;
    wpmDisplay.innerText = 0;
    accuracyDisplay.innerText = 100;
    inputField.disabled = false;
    renderNewQuote();
});

// Initial load
renderNewQuote();