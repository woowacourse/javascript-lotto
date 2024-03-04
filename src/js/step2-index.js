// import '../css/styles.css';
// import '../css/index.css';
// import '../css/modal.css';
// import '../css/font.css';
// import '../css/color.css';

import LottoController2 from './controller/LottoController2.js';
import modalCloseButtonEventListener from './eventListener/modalCloseButtonEventListener.js';
import modalRestartButtonEventListener from './eventListener/modalRestartButtonEventListener.js';
import purchaseFormSubmitListener from './eventListener/purchaseFormSubmitListener.js';
import winningsFormSubmitListener from './eventListener/resultFormEventListener.js';

const controller = new LottoController2();

// 구입 금액을 입력받고 로또를 발행하여 출력하는 이벤트
document.addEventListener('DOMContentLoaded', () => {
  const purchaseAmountForm = document.getElementById('form-purchase');
  const winningsForm = document.getElementById('form-winnings');
  const modalCloseButton = document.querySelector('.btn-close');
  const modalRestartButton = document.querySelector('.btn-restart');

  purchaseAmountForm.addEventListener('submit', (event) => {
    const purchaseAmount = purchaseFormSubmitListener(event);
    controller.issueLottosAndPrintInfos(purchaseAmount);
  });

  winningsForm.addEventListener('submit', (event) => {
    const [winningNumbers, bonusNumber] = winningsFormSubmitListener(event);
    controller.analyzeAndPrintLottoResult(winningNumbers, bonusNumber);
  });

  modalCloseButton.addEventListener('click', modalCloseButtonEventListener);
  modalRestartButton.addEventListener('click', modalRestartButtonEventListener);
});
