import './web/styles/reset.css';
import './web/styles/index.css';
import WebLottoController from './web/WebLottoController';
import {
  lottoResultModalSection,
  purchaseAmountForm,
  purchaseButton,
  purchaseLottoList,
  purchaseResult,
  winningNumbersButton,
  winningNumbersForm,
} from './web/DOM/objects';
import WebInputView from './web/views/WebInputView';
import WebOutputView from './web/views/WebOutputView';

const app = {
  play() {
    this.initApp();
    this.initEventListener();
  },

  purchaseAmountHandler(event) {
    const purchaseAmount = WebInputView.readPurchaseAmount(event);
    if (purchaseAmount) {
      new WebLottoController(purchaseAmount).run();
    }
  },

  initApp() {
    WebOutputView.reset(purchaseResult);
    WebOutputView.reset(purchaseLottoList);
    WebOutputView.reset(winningNumbersForm);
    lottoResultModalSection.classList.add('hide');
  },

  initEventListener() {
    purchaseAmountForm.addEventListener('submit', this.purchaseAmountHandler);
  },
};

app.play();
