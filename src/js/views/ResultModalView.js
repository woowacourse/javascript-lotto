import { SELECTOR } from '../constants/selector';
import { $ } from '../utils/element-manager';
import { hasClassName } from '../utils/validator';

export default class ResultModalView {
  #modalSection;

  constructor(element) {
    this.#modalSection = element;
    this.#modalSection.addEventListener('click', this.bindCloseModalEvent.bind(this));
  }

  bindCloseModalEvent() {
    if (
      hasClassName(this.#modalSection, [
        SELECTOR.CLASS.CLOSE_MODAL_BUTTON,
        SELECTOR.CLASS.RESET_BUTTON,
        SELECTOR.CLASS.MODAL,
      ])
    ) {
      this.#modalSection.classList.remove('show');
    }
  }

  bindResetLottos(handler) {
    $(this.#modalSection, `.${SELECTOR.CLASS.RESET_BUTTON}`).addEventListener('click', handler);
  }

  showResultModal() {
    this.#modalSection.classList.add('show');
  }

  renderHitCount(compareResult) {
    Object.values(compareResult).forEach((count, index) => {
      $(this.#modalSection, `#winning-count-${index + 1}th`).textContent = `${count} 개`;
    });
  }

  renderProfitRage(profitRate) {
    $(
      this.#modalSection,
      `.${SELECTOR.CLASS.PROFIT_RATE_WRAPPER}`
    ).textContent = `당신의 총 수익률은 ${profitRate}% 입니다.`;
  }
}
