import { $ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';
import View from './View.js';
import validateMoney from '../validations/PurchaseLottos.js';

const template = {
  ticketImg: '<div>🎟️</div>',
  lottoNumberTemplate: lottoNumber => {
    return `<div class="items-center">
              🎟️
             <div class="lotto-numbers-container">${lottoNumber}</div>
          </div>`;
  },
  purchaseMessageTemplate: ({ length }) => {
    return `총 ${length}개를 구매하였습니다.`;
  }
};

export default class PurchaseLottosView extends View {
  constructor() {
    super();
    this.bindEvent(
      $(SELECTOR.ID.PURCHASE_MONEY_INPUT),
      'keyup',
      this.handleOnChangeMoneyInput.bind(this)
    );
  }

  getInputMoney() {
    return Number.parseInt($(SELECTOR.ID.PURCHASE_MONEY_INPUT).value);
  }

  renderPurchasedLottos(lottos) {
    this.clearMoneyInput();
    $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).replaceChildren();
    $(SELECTOR.ID.TOGGLE_CHECKBOX).checked
      ? this.renderPurchasedLottosByNumbers(lottos)
      : this.renderPurchasedLottosByImage(lottos);
  }

  renderPurchasedLottosByImage(lottos) {
    lottos.map(() => {
      $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        'beforeEnd',
        template.ticketImg
      );
    });
  }

  renderPurchasedLottosByNumbers(lottos) {
    lottos.map(lotto => {
      $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        'beforeEnd',
        template.lottoNumberTemplate(lotto.numbers.join(', '))
      );
    });
  }

  renderPurchasedLottosAmountByText(lottos) {
    $(SELECTOR.ID.LOTTO_RESULT_SPAN).textContent =
      template.purchaseMessageTemplate(lottos);
  }

  stopPurchase() {
    $(SELECTOR.ID.PURCHASE_MONEY_INPUT).disabled = true;
    $(SELECTOR.ID.PURCHASE_MONEY_BUTTON).disabled = true;
    $(SELECTOR.ID.LOTTO_RESULT_SECTION).hidden = false;
    $(SELECTOR.ID.WINNING_NUMBER_FORM).hidden = false;
  }

  clearMoneyInput() {
    $(SELECTOR.ID.PURCHASE_MONEY_INPUT).classList.remove('input-alert');
    $(SELECTOR.ID.PURCHASE_MONEY_INPUT_ALERT).textContent = '';
  }

  // 핸들러
  handleOnChangeMoneyInput(event) {
    try {
      validateMoney(event.target.value);
      this.clearMoneyInput();
    } catch (error) {
      $(SELECTOR.ID.PURCHASE_MONEY_INPUT).classList.add('input-alert');
      $(SELECTOR.ID.PURCHASE_MONEY_INPUT_ALERT).textContent = error.message;
    }
    if (event.target.value.length === 0) {
      this.clearMoneyInput();
    }
  }
}
