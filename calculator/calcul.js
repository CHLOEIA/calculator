const calculator = document.querySelector('.container')
const buttonDigit = calculator.querySelectorAll('.pad button.digit')
const buttonOperator = calculator.querySelectorAll('.pad button.operator')
const buttonClear = calculator.querySelectorAll('.pad button.clear')
const equalButton = calculator.querySelector('.pad button.equal')
const displayValue = calculator.querySelector('.display')
const displayHistory = calculator.querySelector('.screen h3')

displayValue.textContent = '0';
displayHistory.textContent = '';

let value = 0;
let operator = '';
let clear = false;

// buttonDigit[0].style.backgroundColor = 'red'
// buttonOperator[0].style.backgroundColor = 'Green'
// equalButton.style.backgroundColor = 'black'
// buttonClear[0].style.backgroundColor = 'black'

buttonDigit.forEach((button) => {
  button.addEventListener('click', () => {
    if (clear){
      displayValue.textContent = '';
      clear = false;
    }
    if (displayValue.textContent.length > 10)  { return }
    if (button.textContent === '.' && displayValue.textContent.includes('.')) { return }
    displayValue.textContent += button.textContent
    if (displayValue.textContent.charAt(0) === '0' && displayValue.textContent.length > 1){
      displayValue.textContent = displayValue.textContent.substring(1)
    }
  })
})

buttonOperator.forEach((button) => {
  button.addEventListener('click', () => {
    if (displayValue.textContent == '') {
    } else {
      value = operate(value,parseFloat(displayValue.textContent),operator);
    }
    operator = button.textContent;
    displayHistory.textContent = value +  button.textContent;
    displayValue.textContent = '';
  })
})

buttonClear.forEach((button) => {
  button.addEventListener('click', () => {
    // console.log(button.getAttribute('id'))
    switch (button.textContent) {
      case "AC":
        displayValue.textContent = '0';
        displayHistory.textContent = '';
        value = 0;
        operator = '';
        clear = false;
        break;
      case "C":
        displayValue.textContent = '';
        break;
      case "del":
        displayValue.textContent = displayValue.textContent.slice(0,-1);
        break;
      default:

    }
  })
})


equalButton.addEventListener('click', () => {
  if ( displayValue.textContent == '' ){
    displayValue.textContent = value;
  } else{
    displayValue.textContent = operate(value,parseFloat(displayValue.textContent),operator);
  }
  operator = '';
  displayHistory.textContent = '';
  clear = true;
  displayValue.textContent  = (displayValue.textContent > 99999999999) ? 'Overflow': displayValue.textContent ;
  displayValue.textContent = (Math.trunc(parseFloat(displayValue.textContent)*1000000))/1000000;
})



function operate(a , b , op){

  switch (op) {
    case '+':
      b = a + b;
      break;
    case '*':
      b = a * b;
      break;
    case '/':
      b = a / b;
      break;
    case '-':
      b = a - b;
      break;
    case '':
      b = b;
      break;
    default:
      return false;
  }
  return b;
}