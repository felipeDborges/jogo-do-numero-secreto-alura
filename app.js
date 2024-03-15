let ListDrawnNumbers = [];
let limitNumber = 100;
let numberSecret = generateRandomNumber();
let attempts = 1;
displayInitialMessage();

function displayTextScreen (tag, texto) {
    let field = document.querySelector(tag);
    field.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function displayInitialMessage () {
    displayTextScreen('h1', 'Jogo do Número Secreto');
    displayTextScreen('p', 'Escolha um número entre 1 e 100');

}

function checkKick() {
    let kick = document.querySelector('input').value;
    
    if (kick == numberSecret) {
        displayTextScreen('h1', 'Acertou!');
        let wordTry = attempts > 1 ? 'tentativas' : 'tentativa';
        let messageAttempts = `Você descobriu o nímero secreto com ${attempts} ${wordTry}!`;
        displayTextScreen('p', messageAttempts);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (kick > numberSecret) {
            displayTextScreen('p','O número secreto é menor');
        } else {
            displayTextScreen('p','O número secreto é maior');
        }
        attempts++;
        clearField();
    }
}

function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * limitNumber + 1);
    let quantityElementsList = ListDrawnNumbers.length;

    if (quantityElementsList == limitNumber) {
        ListDrawnNumbers = [];
    }

    if (ListDrawnNumbers.includes(chosenNumber)) {
        return generateRandomNumber();
    } else {
        ListDrawnNumbers.push(chosenNumber);
        return chosenNumber;
    }
}

function clearField() {
    kick = document.querySelector('input');
    kick.value = '';

}

function restartGame() {
    numberSecret = generateRandomNumber();
    clearField();
    attempts = 1;
    displayInitialMessage();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}