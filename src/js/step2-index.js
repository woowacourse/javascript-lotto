import LottoController2 from './controller/LottoController2.js';
import amountFormEventListener from './eventListener/amountFormEventListener.js';
import resultFormEventListener from './eventListener/resultFormEventListener.js';

const controller = new LottoController2();

// 구입 금액을 입력받고 로또를 발행하여 출력하는 이벤트
document.addEventListener('DOMContentLoaded', () => {
  const amountFormElement = document.querySelector('.amount-form');
  const resultFormElement = document.querySelector('.result-form');

  amountFormElement.addEventListener('submit', (event) => {
    const purchaseAmount = amountFormEventListener(event);
    controller.issueLottosWithPrint(purchaseAmount);
  });

  resultFormElement.addEventListener('submit', (event) => {
    const [winningNumbers, bonusNumber] = resultFormEventListener(event);
  });
});
