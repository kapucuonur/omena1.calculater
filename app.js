document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input'); // input/output button
    const numberButtons = document.querySelectorAll('.numbers div'); // number buttons
    const operatorButtons = document.querySelectorAll('.operators div'); // operator buttons
    const resultButton = document.getElementById('result'); // equal button
    const clearButton = document.getElementById('clear'); // clear button
  
    let resultDisplayed = false; // flag to keep track of whether result is displayed or not
  
    // Function to handle click event for number buttons
    const handleNumberButtonClick = (e) => {
      const currentString = input.innerHTML;
      const lastChar = currentString[currentString.length - 1];
  
      if (!resultDisplayed || (resultDisplayed && (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷'))) {
        input.innerHTML += e.target.innerHTML;
      } else {
        resultDisplayed = false;
        input.innerHTML = '';
        input.innerHTML += e.target.innerHTML;
      }
    };
  
    // Function to handle click event for operator buttons
    const handleOperatorButtonClick = (e) => {
      const currentString = input.innerHTML;
      const lastChar = currentString[currentString.length - 1];
  
      if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
        const newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
        input.innerHTML = newString;
      } else if (currentString.length === 0) {
        console.log('Enter a number first');
      } else {
        input.innerHTML += e.target.innerHTML;
      }
    };
  
    // Function to handle click event for equal button
    const handleResultButtonClick = () => {
      let inputString = input.innerHTML;
      const numbers = inputString.split(/\+|\-|\×|\÷/g).map(parseFloat); // Parse each number
      const operators = inputString.replace(/[0-9]|\./g, '').split('');
  
      // Çarpma ve bölme işlemlerini gerçekleştir
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '×') {
          numbers[i] = numbers[i] * numbers[i + 1];
          numbers.splice(i + 1, 1);
          operators.splice(i, 1);
          i--; // Operatörlerin ve sayıların konumlarını güncellemek için
        } else if (operators[i] === '÷') {
          numbers[i] = numbers[i] / numbers[i + 1];
          numbers.splice(i + 1, 1);
          operators.splice(i, 1);
          i--; // Operatörlerin ve sayıların konumlarını güncellemek için
        }
      }
  
      // Toplama ve çıkarma işlemlerini gerçekleştir
      let result = numbers[0];
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
          result += numbers[i + 1];
        } else if (operators[i] === '-') {
          result -= numbers[i + 1];
        }
      }
  
      input.innerHTML = result; // Sonucu göster
      resultDisplayed = true;
    };
  
    // Function to handle click event for clear button
    const handleClearButtonClick = () => {
      input.innerHTML = '';
      resultDisplayed = false;
    };
  
    // Adding click event listeners to number buttons
    numberButtons.forEach((button) => {
      button.addEventListener('click', handleNumberButtonClick);
    });
  
    // Adding click event listeners to operator buttons
    operatorButtons.forEach((button) => {
      button.addEventListener('click', handleOperatorButtonClick);
    });
  
    // Adding click event listener to equal button
    resultButton.addEventListener('click', handleResultButtonClick);
  
    // Adding click event listener to clear button
    clearButton.addEventListener('click', handleClearButtonClick);
  });
  