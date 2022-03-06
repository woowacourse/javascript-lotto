import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import { KEYCODE } from '../constants/setting';
import InputView from './InputView';

export default class MoneyInputView extends InputView {
  #moneyInputSection;

  constructor($element) {
    super();
    this.#moneyInputSection = $element;
    this.moneyInputHandler();
  }

  moneyInputHandler() {
    this.#moneyInputSection.addEventListener('keydown', this.preventNonDigitInput.bind(this));
  }

  bindMoneyInputSubmit(handler) {
    const moneyInputSection = this.#moneyInputSection;

    $(moneyInputSection, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`).addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        handler({ money: Number($(moneyInputSection, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`).value) });
      }
    );
  }

  disableNewMoneySubmit() {
    $(this.#moneyInputSection, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`).disabled = true;
    $(this.#moneyInputSection, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`).disabled = true;
  }

  reset() {
    $(this.#moneyInputSection, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`).disabled = false;
    $(this.#moneyInputSection, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`).disabled = false;
    $(this.#moneyInputSection, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`).value = '';
  }
}
