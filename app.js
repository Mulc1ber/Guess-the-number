const inputText = document.getElementById('inputText')
const guessBtn = document.getElementById('guessBtn')
const listAttempts = document.getElementById('listAttempts')
const answer = document.getElementById('answer')
const lowHigh = document.getElementById('lowHigh')
const startNewGame = document.getElementById('startNewGame')

const textLow = 'Last guess was too low!'
const textHigh = 'Last guess was too high!'

const wrong = 'Wrong!'
const correct = 'Congratulations! You got it right!'
const gameOver = '!!!GAME OVER!!!'




// Создаем генератор случайных чисел
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерируем случайное число от 1 до 100
let randomNumber = getRandomNumber(1, 100);
console.log(randomNumber);

// Создаем счетчик для ограничения попыток
let countGuess = 0

inputText.focus()

function handlerBtnGuess() {
    // Ограничиваем возможности пользователя для ввода данных
    if (!inputText.getAttribute('disabled')) {
        if (listAttempts.textContent.length == 0) {
            listAttempts.textContent = 'Previous guesses: '
        }
        // Выводим значение, которое ввел пользователь
        if (inputText.value == '') {
            listAttempts.textContent += `0 `
        } else {
            listAttempts.textContent += `${inputText.value} `
        }
    }

    // Проверяем загаданое число с числом пользователя
    if (inputText.value > randomNumber) {
        lowHigh.textContent = textHigh
        answer.classList.remove('correct')
        answer.classList.add('wrong')
        answer.textContent = wrong
    } else if (inputText.value < randomNumber) {
        lowHigh.textContent = textLow
        answer.classList.remove('correct')
        answer.classList.add('wrong')
        answer.textContent = wrong
    } else {
        guessBtn.setAttribute('disabled', 'disabled')
        inputText.setAttribute('disabled', 'disabled')

        answer.classList.remove('wrong')
        answer.classList.add('correct')
        answer.textContent = correct

        lowHigh.style.display = 'none'
        startNewGame.style.display = 'block'
    }

    countGuess += 1
    inputText.value = ''
    inputText.focus()

    // Если пользователь использовал все попытки
    if (countGuess >= 10) {
        guessBtn.setAttribute('disabled', 'disabled')
        inputText.setAttribute('disabled', 'disabled')

        answer.classList.remove('correct')
        answer.classList.add('wrong')
        answer.textContent = gameOver

        lowHigh.textContent = ''
        lowHigh.style.display = 'none'
        startNewGame.style.display = 'block'
    }
}

function handlerBtnNewGame() {
    guessBtn.removeAttribute('disabled')
    inputText.removeAttribute('disabled')
    listAttempts.textContent = ''

    answer.textContent = ''
    answer.classList.remove('correct')
    answer.classList.remove('wrong')

    lowHigh.textContent = ''
    lowHigh.style.display = 'block'
    startNewGame.style.display = 'none'

    countGuess = 0
    randomNumber = getRandomNumber(1, 100);
    console.log(randomNumber);
    inputText.focus()
}



// Событие по клику на кнопку "Submit guess"
guessBtn.addEventListener('click', handlerBtnGuess)

// Событие по нажатию кнопки "Enter"
document.addEventListener('keydown', function (event) {
    if (!guessBtn.getAttribute('disabled')) {
        if (event.key == 'Enter') {
            handlerBtnGuess()
        }
    }
})



// Событие по клику на кнопку "Start new game"
startNewGame.addEventListener('click', handlerBtnNewGame)

// Событие по нажатию кнопки "Esc"
document.addEventListener('keydown', function (event) {
    if (event.key == 'Escape') {
        handlerBtnNewGame()
    }
})
