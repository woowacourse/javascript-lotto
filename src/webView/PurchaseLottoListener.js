import PurchaseLottoService from '../domain/service/PurchaseLottoService';

const CLASSNAME_HIDDEN = 'hidden';
const SELECTOR_WINNING_LOTTO = '.winning-lotto';
const SELECTOR_RESULT = '.result';
const SELECTOR_PURCHASE = '.purchase-form__input';
const SELECTOR_PURCHASED = '.purchased-lotto__list';

const Private = {
  stringToDiv(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div;
  },

  makeDivsFragmentFromStrings(strings) {
    const fragment = document.createDocumentFragment();

    const appendToFragment = (element) => {
      fragment.appendChild(element);
    };

    strings.map(Private.stringToDiv).forEach(appendToFragment);
    return fragment;
  },

  nextElementSiblings(element) {
    const result = [];
    while (element.nextElementSibling) {
      result.push(element.nextElementSibling);
    }
    return result;
  },
};

const View = {
  showWinningPart() {
    document.querySelector(SELECTOR_WINNING_LOTTO).classList.remove(CLASSNAME_HIDDEN);
    document.querySelector(SELECTOR_RESULT).classList.remove(CLASSNAME_HIDDEN);
  },
  printError(message) {
    document.querySelector('#error-purchase-money').textContent = message;
  },
  removeErrorMessage() {
    document.querySelector('#error-purchase-money').textContent = '';
  },
};

const PurchaseLottoListener = {
  purchaseLotto(event) {
    event.preventDefault();

    const purchaseMoney = document.querySelector(SELECTOR_PURCHASE);
    const purchased = document.querySelector(SELECTOR_PURCHASED);

    let lottos;
    try {
      lottos = new PurchaseLottoService(purchaseMoney.value).getLottos();
    } catch (error) {
      View.printError(error.message);
      return;
    }
    View.removeErrorMessage();
    const lottoStrings = lottos
      .map((lotto) => lotto.map((num) => String(num).padStart(2, ' ')))
      .map((lotto) => `🎟️ ${lotto.join(', ')}`);

    const lottosFragment = Private.makeDivsFragmentFromStrings(lottoStrings);

    [...purchased.children].map((node) => node.remove());
    purchased.append(lottosFragment);
    View.showWinningPart();
  },
};

export default PurchaseLottoListener;
