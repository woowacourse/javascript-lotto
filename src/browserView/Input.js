import { QuerySelector } from '../constants/HTML.js';

class Input {
  constructor() {
    this.initElements();
  }

  initElements() {
    this.moneyInputEl = document.querySelector(QuerySelector.MONEY_INPUT);
    this.purchaseBtn = document.querySelector(QuerySelector.PURCHASE_BUTTON);
    this.winningNumberInputs = document.querySelectorAll(QuerySelector.WINNING_NUMBER);
    this.bonusNumberInput = document.querySelector(QuerySelector.BONUS_NUMBER);
    this.resultBtn = document.querySelector(QuerySelector.RESULT_BUTTON);
  }

  purchaseLottos = (callback) => {
    this.purchaseBtn.addEventListener('click', () => {
      callback(this.moneyInputEl.value);
    });
  };

  seeResult = (callback) => {
    this.resultBtn.addEventListener('click', () => {
      const winningNumbers = [];

      this.winningNumberInputs.forEach((input) => {
        winningNumbers.push(Number(input.value));
      });

      const BonusNumber = Number(this.bonusNumberInput.value);

      callback(winningNumbers, BonusNumber);
    });
  };
}

export default Input;
