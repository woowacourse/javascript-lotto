import PurchaseLottoService from '../../domain/service/PurchaseLottoService';
import Lotto from '../Lotto/Lotto';
import PurchasedLotto from '../PurchasedLotto/PurchasedLotto';

const CLASSNAME_HIDDEN = 'hidden';
const SELECTOR_WINNING_LOTTO = '.winning-lotto';
const SELECTOR_RESULT = '.result';
const SELECTOR_PURCHASE = '.purchase-form__input';
const SELECTOR_PURCHASED = '.purchased-lotto__list';

const Private = {
  getLottos(purchaseMoney) {
    try {
      return new PurchaseLottoService(purchaseMoney).getLottos();
    } catch (error) {
      View.printErrorMessage(error.message);
      console.log(error.message);
      return;
    }
  },
};

const View = {
  showWinningPart() {
    document.querySelector(SELECTOR_WINNING_LOTTO).classList.remove(CLASSNAME_HIDDEN);
    document.querySelector(SELECTOR_RESULT).classList.remove(CLASSNAME_HIDDEN);
  },
  printErrorMessage(message) {
    document.querySelector('#error-purchase-money').textContent = message;
  },
  removeErrorMessage() {
    document.querySelector('#error-purchase-money').textContent = '';
  },
};

const PurchaseLottoListener = {
  purchaseLottoListener(event) {
    event.preventDefault();

    const purchaseMoney = document.querySelector(SELECTOR_PURCHASE);
    const purchased = document.querySelector(SELECTOR_PURCHASED);

    View.removeErrorMessage();

    PurchasedLotto.clear();
    const lottos = Private.getLottos(purchaseMoney.value);
    const fragment = document.createDocumentFragment();
    lottos.forEach((lotto) => fragment.append(new Lotto(lotto)));
    purchased.append(fragment);
    View.showWinningPart();
  },
};

export default PurchaseLottoListener;
