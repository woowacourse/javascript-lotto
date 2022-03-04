import { SELECTOR } from '../constants/selector';
import { $ } from '../utils/element-manager';
import { hasClassName } from '../utils/validator';

export default class ResultModalView {
  #ModalSection;

  constructor(element) {
    this.#ModalSection = element;
    this.#ModalSection.addEventListener('click', this.bindCloseModalEvent.bind(this));
  }

  bindCloseModalEvent() {
    if (
      hasClassName(this.#ModalSection, [
        SELECTOR.CLASS.CLOSE_MODAL_BUTTON,
        SELECTOR.CLASS.RESET_BUTTON,
        SELECTOR.CLASS.MODAL,
      ])
    ) {
      this.#ModalSection.classList.remove('show');
    }
  }

  bindResetLottos(handler) {
    $(this.#ModalSection, `.${SELECTOR.CLASS.RESET_BUTTON}`).addEventListener('click', handler);
  }

  showResultModal() {
    this.#ModalSection.classList.add('show');
  }

  renderHitCount(compareResult) {
    Object.values(compareResult).forEach((count, index) => {
      $(this.#ModalSection, `#winning-count-${index + 1}th`).textContent = `${count} 개`;
    });
  }

  renderProfitRage(profitRate) {
    $(
      this.#ModalSection,
      `.${SELECTOR.CLASS.PROFIT_RATE_WRAPPER}`
    ).textContent = `당신의 총 수익률은 ${profitRate}% 입니다.`;
  }
}
