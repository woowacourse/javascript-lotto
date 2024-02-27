import PurchaseLottoService from './domain/service/PurchaseLottoService';
import '../index.css';
import WinningResultService from './domain/service/WinningResultService';
import CONDITION from './constant/Condition';
import ResultModal from './webView/ResultModal';

const addClickListener = (selector, listener) => {
  document.querySelector(selector).addEventListener('click', listener);
};

addClickListener('.purchase-form__button', purchaseListener);
addClickListener('.result__button', ResultModal.resultButtonListener);
addClickListener('.result-modal-header__close-button', ResultModal.closeModalListener);

const CLASSNAME_HIDDEN = 'hidden';

function purchaseListener(event) {
  event.preventDefault();

  const SELECTOR_PURCHASE = '.purchase-form__input';
  const SELECTOR_PURCHASED = '.purchased-lotto__list';

  const purchase = document.querySelector(SELECTOR_PURCHASE);
  const purchased = document.querySelector(SELECTOR_PURCHASED);
  const purchaseMoneyString = purchase.value;
  const lottos = new PurchaseLottoService(purchaseMoneyString).getLottos();

  const lottoStrings = lottos.map((lotto) => `🎟️ ${lotto.join(', ')}`);
  const lottosFragment = makeDivsFragmentFromStrings(lottoStrings);

  [...purchased.children].map((node) => node.remove());
  purchased.append(lottosFragment);
  showWinningPart();
}

function makeDivsFragmentFromStrings(strings) {
  const fragment = document.createDocumentFragment();
  const appendLottoDiv = (string) => {
    const div = document.createElement('div');
    div.textContent = string;
    fragment.appendChild(div);
  };

  strings.forEach((string) => appendLottoDiv(string));
  return fragment;
}

function showWinningPart() {
  const SELECTOR_WINNING_LOTTO = '.winning-lotto';
  const SELECTOR_RESULT = '.result';

  document.querySelector(SELECTOR_WINNING_LOTTO).classList.remove(CLASSNAME_HIDDEN);
  document.querySelector(SELECTOR_RESULT).classList.remove(CLASSNAME_HIDDEN);
}

function nextElementSiblings(element) {
  const result = [];
  while (element.nextElementSibling) {
    result.push(element.nextElementSibling);
  }
  return result;
}
