import MyComponent from "../abstract/MyComponent.js";

import { LOTTO_NUMBER_LENGTH } from "../../step1-console/domain/Lotto.js";

import { $ } from "../utils/selector.js";

export default class WinningLottoForm extends MyComponent {
  #lottosState;

  constructor(targetElementId, lottosState) {
    super(targetElementId);

    this.#lottosState = lottosState;
  }

  _getTemplate() {
    const lottos = this.#lottosState.getLottos();
    if (!lottos.length) return "";

    return `
  <section class="getting-winning-lotto">
        <p class="winning-lotto-message body-text">지난 주 당첨번호 ${LOTTO_NUMBER_LENGTH}개와 보너스 번호 1개를 입력해주세요.</p>
        <div class="winning-lotto-input-group">
          <div class="number-input-wrapper">
            <div class="winning-numbers-group">
              <p class="body-text">당첨 번호</p>
              <div class="winning-numbers-input-wrapper">
                ${Array(LOTTO_NUMBER_LENGTH)
                  .fill()
                  .map((_) => this.#getLottoNumberInputTemplate())
                  .join("")}
              </div>
            </div>
            <div class="bonus-number-group">
              <p class="body-text">보너스 번호</p>
              <div class="winning-numbers-input-wrapper">
                ${this.#getLottoNumberInputTemplate()}
              </div>
            </div>
          </div>
          <button class="check-result-button">
            결과 확인하기
          </button>
        </div>
      </section>
  `;
  }

  #getLottoNumberInputTemplate() {
    return `<input type="number" class="lotto-number-input" />`;
  }

  _setEvent() {
    $(".check-result-button")?.addEventListener(
      "click",
      this.#handleWinningLotto.bind(this)
    );
  }

  #handleWinningLotto() {
    alert("click result");
  }
}
