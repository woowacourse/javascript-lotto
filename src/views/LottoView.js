import RANK from '../constants/rank.js';
import ERROR from '../constants/error.js';
import lottoGameValidatorStep2 from '../domains/lottoGameValidatorStep2.js';

const lottoView = {
  bindBuyButtonEventHandler(onClickBuyButton) {
    const buyButton = document.querySelector('#buy-button');

    buyButton.addEventListener('click', event => {
      event.preventDefault();

      const buyMoneyInput = document.querySelector('#buy-money');
      const buyMoney = Number(buyMoneyInput.value);

      try {
        lottoGameValidatorStep2.throwErrorIfInvalidBuyMoney(buyMoney);
        onClickBuyButton(buyMoney);
        buyMoneyInput.value = null;
      } catch (error) {
        alert(error.message);
        buyMoneyInput.focus();
      }
    });
  },

  bindShowResultButtonEventHandler(onClickShowResultButton) {
    const showResultButton = document.querySelector('#show-result-button');

    showResultButton.addEventListener('click', event => {
      event.preventDefault();

      const bonusNumberInput = document.querySelector('#bonus-number');
      const luckyNumbersInput = document.querySelectorAll('#lucky-numbers-input > input');
      const bonusNumber = Number(bonusNumberInput.value);
      const luckyNumbers = [...luckyNumbersInput].map(number => Number(number.value));

      try {
        lottoGameValidatorStep2.throwErrorIfInvalidLuckyNumbers(luckyNumbers);
        lottoGameValidatorStep2.throwErrorIfInvalidBonusNumber(bonusNumber, luckyNumbers);
        onClickShowResultButton(bonusNumber, luckyNumbers);
      } catch (error) {
        alert(error.message);
        error.message === ERROR.BONUS_NUMBER
          ? bonusNumberInput.focus()
          : luckyNumbersInput[0].focus();
      }
    });
  },

  bindModalCloseButtonEventHandler(onClickModalCloseButton) {
    const modalCloseButton = document.querySelector('#modal-close-button');

    modalCloseButton.addEventListener('click', () => {
      this.hideModal();
      onClickModalCloseButton();
    });
  },

  bindRestartButtonEventHandler() {
    const restartButton = document.querySelector('#restart-button');

    restartButton.addEventListener('click', this.resetScreen.bind(this));
  },

  printPurchasedLottos(lottoNumbersList) {
    this.lottosQuantity = document.querySelector('#lottos-quantity');
    this.lottosQuantity.innerText = lottoNumbersList.length;

    const lottoListContainer = document.querySelector('#lotto-list-container');

    lottoListContainer.innerHTML = null;
    lottoNumbersList.forEach(lottoNumbers => {
      lottoListContainer.innerHTML += `<li>🎟️ ${lottoNumbers.join(', ')}</li>`;
    });

    const lottoDetail = document.querySelector('.lotto-detail');

    this.show(lottoDetail);
    this.showWinningNumbersForm();
  },

  showWinningNumbersForm() {
    const winningNumbersForm = document.querySelector('#winning-numbers-form');
    this.show(winningNumbersForm);
  },

  printResult(amountOfRanks, profit) {
    const showResultButton = document.querySelector('#show-result-button');
    const amountOfRanksContainer = document.querySelectorAll('.amount-of-ranks-container');
    const profitContainer = document.querySelector('#profit-container');
    const lottoModal = document.querySelector('#lotto-modal');

    showResultButton.disabled = true;

    amountOfRanksContainer[RANK.SIZE - RANK.FIFTH - 1].innerHTML = amountOfRanks[RANK.FIFTH];
    amountOfRanksContainer[RANK.SIZE - RANK.FOURTH - 1].innerHTML = amountOfRanks[RANK.FOURTH];
    amountOfRanksContainer[RANK.SIZE - RANK.THIRD - 1].innerHTML = amountOfRanks[RANK.THIRD];
    amountOfRanksContainer[RANK.SIZE - RANK.SECOND - 1].innerHTML = amountOfRanks[RANK.SECOND];
    amountOfRanksContainer[RANK.SIZE - RANK.FIRST - 1].innerHTML = amountOfRanks[RANK.FIRST];

    profitContainer.innerHTML = profit;

    const modalBackground = document.querySelector('.modal-background');
    this.show(modalBackground);
    this.show(lottoModal);
  },

  resetScreen() {
    const buyButton = document.querySelector('#buy-button');
    const showResultButton = document.querySelector('#show-result-button');

    this.hideModal();
    this.hideElementsforInitialScreen();
    this.resetInputs();

    buyButton.disabled = false;
    showResultButton.disabled = false;
  },

  hideModal() {
    const lottoModal = document.querySelector('#lotto-modal');
    const modalBackground = document.querySelector('.modal-background');
    const buyButton = document.querySelector('#buy-button');
    const showResultButton = document.querySelector('#show-result-button');

    this.hide(lottoModal);
    this.hide(modalBackground);

    buyButton.disabled = false;
    showResultButton.disabled = false;
  },

  hideElementsforInitialScreen() {
    const lottoDetail = document.querySelector('.lotto-detail');
    const winningNumbersForm = document.querySelector('#winning-numbers-form');

    this.hide(lottoDetail);
    this.hide(winningNumbersForm);
  },

  resetInputs() {
    const lottoListContainer = document.querySelector('#lotto-list-container');
    const buyMoneyInput = document.querySelector('#buy-money');
    const luckyNumbersInput = document.querySelectorAll('#lucky-numbers-input > input');
    const bonusNumberInput = document.querySelector('#bonus-number');

    lottoListContainer.innerHTML = null;
    buyMoneyInput.value = null;
    luckyNumbersInput.forEach(luckyNumber => (luckyNumber.value = null));
    bonusNumberInput.value = null;
  },

  show(HTMLelement) {
    HTMLelement.style.display = 'block';
  },

  hide(HTMLelement) {
    HTMLelement.style.display = 'none';
  },
};

export default lottoView;
