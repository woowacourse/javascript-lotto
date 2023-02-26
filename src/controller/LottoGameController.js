import LottoPurchasePage from '../components/LottoPurchasePage.js';
import resultModalPage from '../components/resultModalPage.js';
import { moneyInputButton, resultButton, modalClose, modal, resetButton } from '../utils/DOM.js';

export default class LottoGameController {
  constructor() {
    this.lottoPurchasePage = new LottoPurchasePage();
    this.resultModalPage = new resultModalPage();
    this.buttonEvents();
  }

  buttonEvents() {
    moneyInputButton.addEventListener('submit', event => {
      event.preventDefault();
      this.lottoPurchasePage.purchaseButton();
    });

    resultButton.addEventListener('click', () => {
      const lottoList = this.lottoPurchasePage.lottoNumbers();
      const moneyInput = this.lottoPurchasePage.inputMoney();
      this.resultModalPage.openModalButton(lottoList, moneyInput);
    });

    modalClose.addEventListener('click', () => {
      modal.classList.add('v-hidden');
    });

    resetButton.addEventListener('click', () => {
      window.location.reload();
    });
  }
}
