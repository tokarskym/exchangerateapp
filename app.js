const currencyType = document.querySelector('#select-currency');
const exchangeAmount = document.querySelector('#exchange-amount');
const plnAmount = document.querySelector('#pln-amount');
const convertButton = document.querySelector('.button');
const rateInformation = document.querySelector('#info');
const plnParagraph = document.querySelector('#pln-sign');
const loader = document.querySelector('.loader');

const checkValue = () => {
   if (exchangeAmount.value < 0) {
      exchangeAmount.value = exchangeAmount.value * -1;
   } else {
      exchangeAmount;
   }
};

const exchange = () => {
   if (exchangeAmount.value !== '') {
      loader.classList.remove('loader-hidden');
      fetch(
         `https://api.nbp.pl/api/exchangerates/rates/a/${currencyType.value}/`
      )
         .then((res) => res.json())
         .then((data) => {
            const calculation = (
               exchangeAmount.value * data.rates[0].mid
            ).toFixed(2);
            rateInformation.textContent = `1 ${currencyType.value} = ${data.rates[0].mid} PLN`;
            plnParagraph.textContent = `PLN`;
            plnAmount.value = calculation;
            loader.classList.add('loader-hidden');
         });
   } else {
      alert('Please fill in amount.');
   }
};

const clearInputs = () => {
   exchangeAmount.value = '';
   plnAmount.value = '';
   plnParagraph.textContent = ``;
   rateInformation.textContent = ``;
};

const enterKey = () => {
   if (event.key === 'Enter') {
      convertButton.click();
   }
};

convertButton.addEventListener('click', exchange);
currencyType.addEventListener('click', clearInputs);
exchangeAmount.addEventListener('keypress', enterKey);
exchangeAmount.addEventListener('keyup', checkValue);
