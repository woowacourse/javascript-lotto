import LottoController2 from './controller/LottoController2.js';
import amountFormEventListener from './eventListener/amountFormEventListener.js';
import modalCloseButtonEventListener from './eventListener/modalCloseButtonEventListener.js';
import modalRestartButtonEventListener from './eventListener/modalRestartButtonEventListener.js';
import resultFormEventListener from './eventListener/resultFormEventListener.js';

const controller = new LottoController2();

// 구입 금액을 입력받고 로또를 발행하여 출력하는 이벤트
document.addEventListener('DOMContentLoaded', () => {
  const amountFormElement = document.querySelector('.amount-form');
  const resultFormElement = document.querySelector('.result-form');
  const modalCloseButton = document.querySelector('.result-modal__button-close');
  const modalRestartButton = document.querySelector('.result-modal__button-restart');

  amountFormElement.addEventListener('submit', (event) => {
    const purchaseAmount = amountFormEventListener(event);
    controller.issueLottosAndPrintInfos(purchaseAmount);
  });

  resultFormElement.addEventListener('submit', (event) => {
    const [winningNumbers, bonusNumber] = resultFormEventListener(event);
    controller.analyzeAndPrintLottoResult(winningNumbers, bonusNumber);
  });

  modalCloseButton.addEventListener('click', modalCloseButtonEventListener);
  modalRestartButton.addEventListener('click', modalRestartButtonEventListener);
});
