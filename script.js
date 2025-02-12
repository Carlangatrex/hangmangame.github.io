const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGame();
}

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
    revealWord(); // Reveal the word when the game ends
}

const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) endGame();
}

const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};

const drawHangMan = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', startGame);

function revealWord() {
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        letter.classList.remove('hidden');
        letter.classList.add('reveal');
    });
}

// Llama a esta función cuando el jugador pierda

const englishButton = document.getElementById('englishButton');
const frenchButton = document.getElementById('frenchButton');
const spanishButton = document.getElementById('spanishButton');
const menuButton = document.getElementById('menuButton');

let words = [];

const selectLanguage = (language) => {
    switch(language) {
        case 'english':
            words = englishWords;
            break;
        case 'french':
            words = frenchWords;
            break;
        case 'spanish':
            words = spanishWords;
            break;
    }
    startButton.style.display = 'block';
    menuButton.style.display = 'block';
    document.getElementById('languageButtons').style.display = 'none';
};

englishButton.addEventListener('click', () => selectLanguage('english'));
frenchButton.addEventListener('click', () => selectLanguage('french'));
spanishButton.addEventListener('click', () => selectLanguage('spanish'));

const returnToMenu = () => {
    startButton.style.display = 'none';
    menuButton.style.display = 'none';
    document.getElementById('languageButtons').style.display = 'block';
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.removeEventListener('keydown', letterEvent);
};

menuButton.addEventListener('click', returnToMenu);
