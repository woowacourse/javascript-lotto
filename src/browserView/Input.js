import { Event, QuerySelector } from '../constants/HTML.js';

class Input {
  constructor() {
    this.#initElements();
  }

  #initElements() {
    this.moneyInputEl = document.querySelector(QuerySelector.MONEY_INPUT);
    this.purchaseBtn = document.querySelector(QuerySelector.PURCHASE_BUTTON);
    this.winningNumberInputs = document.querySelectorAll(QuerySelector.WINNING_NUMBER);
    this.bonusNumberInput = document.querySelector(QuerySelector.BONUS_NUMBER);
    this.resultBtn = document.querySelector(QuerySelector.RESULT_BUTTON);
    this.resultModal = document.querySelector(QuerySelector.RESULT_MODAL);
    this.modalCloseBtn = document.querySelector(QuerySelector.MODAL_CLOSE_BUTTON);
    this.restartBtn = document.querySelector(QuerySelector.RESTART_BUTTON);
  }

  purchaseLottos = (callback) => {
    this.purchaseBtn.addEventListener(Event.CLICK, () => {
      callback(this.moneyInputEl.value);
    });
  };

  seeResult = (callback) => {
    this.resultBtn.addEventListener(Event.CLICK, () => {
      this.resultModal.showModal();

      const winningNumbers = [];

      this.winningNumberInputs.forEach((input) => {
        winningNumbers.push(Number(input.value));
      });

      const BonusNumber = Number(this.bonusNumberInput.value);
      callback(winningNumbers, BonusNumber);
    });
  };

  closeModal = () => {
    this.modalCloseBtn.addEventListener(Event.CLICK, () => {
      this.resultModal.close();
    });
  };

  restart = (resetOutput) => {
    console.log(this.restartBtn);
    this.restartBtn.addEventListener(Event.CLICK, () => {
      this.resultModal.close();
      this.resetInputs(resetOutput);
    });
  };

  resetInputs = (resetOutput) => {
    this.moneyInputEl.value = '';
    this.winningNumberInputs.forEach((input) => {
      input.value = '';
    });
    this.bonusNumberInput = '';
    resetOutput();
  };
}

export default Input;
