import { $ } from '../utils/utils.js';
import {
  ticketImg,
  lottoNumberTemplate,
  purchaseMessageTemplate,
} from './template.js';
import { SELECTOR } from '../constants/constants.js';

export default class LottoView {
  getInputMoney() {
    return Number.parseInt($(SELECTOR.ID.PURCHASE_MONEY_INPUT).value);
  }

  renderLotto(lottos) {
    $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).replaceChildren();
    $(SELECTOR.ID.TOGGLE_CHECKBOX).checked
      ? this.renderLottoNumbers(lottos)
      : this.renderLottoImgs(lottos);
  }

  renderLottoImgs(lottos) {
    lottos.map(() => {
      $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        'beforeEnd',
        ticketImg
      );
    });
  }

  renderLottoNumbers(lottos) {
    lottos.map((lotto) => {
      $(SELECTOR.ID.LOTTO_RESULT_CONTAINER).insertAdjacentHTML(
        'beforeEnd',
        lottoNumberTemplate(lotto.numbers.join(', '))
      );
    });
  }

  renderLottoAmount(lottos) {
    $(SELECTOR.ID.LOTTO_RESULT_SPAN).textContent =
      purchaseMessageTemplate(lottos);
  }

  disablePurchase() {
    $(SELECTOR.ID.PURCHASE_MONEY_INPUT).disabled = true;
    $(SELECTOR.ID.PURCHASE_MONEY_BUTTON).disabled = true;
  }

  showLottoContainers() {
    $(SELECTOR.ID.LOTTO_RESULT_SECTION).hidden = false;
    $(SELECTOR.ID.WINNING_NUMBER_FORM).hidden = false;
  }
}
