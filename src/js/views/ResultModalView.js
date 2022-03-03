import { $ } from '../utils/element-manager';
import { hasClassName } from '../utils/validator';

export default class ResultModalView {
  #$container;

  constructor(element) {
    this.#$container = element;
    this.#$container.addEventListener('click', this.bindCloseModalEvent.bind(this));
  }

  bindCloseModalEvent() {
    if (hasClassName(this.#$container, ['close-modal-button', 'reset-button', 'modal'])) {
      this.#$container.classList.remove('show');
    }
  }

  bindResetLottos(handler) {
    $(this.#$container, '.reset-button').addEventListener('click', handler);
  }

  showResultModal() {
    this.#$container.classList.add('show');
  }

  renderHitCount(compareResult) {
    Object.values(compareResult).forEach((count, index) => {
      $(this.#$container, `#winning-count-${index + 1}th`).textContent = `${count} 개`;
    });
  }

  renderProfitRage(profitRate) {
    $(
      this.#$container,
      '.profit-rate-wrapper'
    ).textContent = `당신의 총 수익률은 ${profitRate}% 입니다.`;
  }
}
