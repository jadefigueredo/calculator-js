const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

//atualiza o resultado para , senão, pega o número atual
function updateResult(originClear = false){
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit){
    if (digit == "," && (currentNumber.includes(",") || !currentNumber)) //verifica se está clicando no botão da vírgula
    return;

    if (restart){
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit;
    }

    updateResult(); // atualiza o número em tela
}

function setOperator(newOperator){
    if (currentNumber){
        calculate();
        
        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }

    operator = newOperator;
}

function calculate() {
    if (operator == null || firstOperand == null) return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator){
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break
        case "x":
            resultValue = firstOperand * secondOperand;
            break
        case "÷":
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    if (resultValue.toString().split(".")[1]?.length > 5){
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operator = null;
    firstOperand = null;
    restart = true;
    percentageValue = null;
    updateResult();
}

function clearCalculator(){
    currentNumber = "";
    firstOperand = null;
    operator = null;
    updateResult(true);
}

function setPercentage(){
    let result = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operator)){
        result = result * (firstOperand || 1); 
    }

    if (result.toString().split(".")[1]?.length > 5){ // verifica se a casa decimal é muito grande
        result = result.toFixed(5).toString();
    }

    currentNumber = result.toString();
    updateResult();
}

buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        const buttonText = button.innerText; // variável que pega o texto do botao
        if (/^[0-9,]+$/.test(buttonText)){ // Verifica o botao com o regex e testa
            addDigit(buttonText); // chama a função para adicionar o texto do botao
        } else if (["+", "-", "x", "÷"].includes(buttonText)){ // verifica se o botão do click é um dos operadores
            setOperator(buttonText);
        } else if (buttonText == "="){
            calculate();
        } else if (buttonText == "C") {
            clearCalculator();
        } else if (buttonText == "±"){
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1
            ).toString();
            updateResult();
        } else if (buttonText == "%"){
            setPercentage();
        }
    });
});
