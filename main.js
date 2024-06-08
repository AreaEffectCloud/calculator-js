let runningTotal = 0;
let buffer = '0';
let preOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = formatNumber(buffer);
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'AC':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (preOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            preOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case 'backspace':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === 0) {
        return;
    }
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    preOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (preOperator === '+') {
        runningTotal += intBuffer;
    } else if (preOperator === '−') {
        runningTotal -= intBuffer;
    } else if (preOperator === '×') {
        runningTotal *= intBuffer;
    } else if (preOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function formatNumber(num) {
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.');
}

function init() {
    document.querySelector('.calc').addEventListener('click', function(event){
        if (event.target.tagName === 'BUTTON') {
            buttonClick(event.target.innerText);
        } else if (event.target.classList.contains('backspace-button')) {
            buttonClick('backspace');
        }
    })
}

init()