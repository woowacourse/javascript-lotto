import '../index.css';
import PurchaseLottoListener from './webView/PurchaseLottoListener';
import ResultModalListener from './webView/ResultModalListener';

addClickListener('.purchase-form__button', PurchaseLottoListener.purchaseLotto);
addClickListener('.result__button', ResultModalListener.resultButton);
addClickListener('.result-modal-header__close-button', ResultModalListener.closeModal);

function addClickListener(selector, listener) {
  document.querySelector(selector).addEventListener('click', listener);
}
