let runningTotal = 0;
let placeholder = '0';
let previousOperation = null;

const input = document.querySelector('.total');

document.querySelector('.container').addEventListener('click', (event) => {
    buttonClick(event.target.innerHTML);
})

const buttonClick = (value) => {
    if (event.target === input) {
        null
    } else if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

const handleNumber = (value) => {
    if (placeholder === '0') {
        placeholder = value;
    } else {
        placeholder += value;
    }
}

const handleSymbol = (value) => {
    switch (value) {
        case "C":
            placeholder = '0';
            runningTotal = 0;
            previousOperation = null;
            break;
        case '←':
            if (placeholder.length === 1) {
                placeholder = '0';
            } else {
                placeholder = placeholder.substring(0, placeholder.length - 1);
            }
            break;
        case '=':
            if (previousOperation === null) {
                return;
            }
            flushOperation(parseInt(placeholder));
            previousOperation = null;
            placeholder = '' + runningTotal;
            runningTotal = 0;
            break;
        default:
            handleMath(value);
            break;


    }

}

const handleMath = (value) => {
    const placeholderNum = parseInt(placeholder);
    if (runningTotal === 0) {
        runningTotal = placeholderNum;
    } else {
        flushOperation(placeholderNum);
    }

    previousOperation = value;

    placeholder = '0';
}

const flushOperation = (placeholderNum) => {
    if (previousOperation === '+') {
        runningTotal += placeholderNum;
    } else if (previousOperation === '−') {
        runningTotal -= placeholderNum;
    } else if (previousOperation === '×') {
        runningTotal *= placeholderNum;
    } else {
        runningTotal /= placeholderNum;
    }
}

const rerender = () => {
    input.innerHTML = placeholder;
}