import Component from "../abstract/Component.js";

import Lotto, {
  LOTTO_NUMBER_LENGTH,
} from "../../step1-console/domain/Lotto.js";

import { $, $$ } from "../utils/selector.js";
import WinningLotto from "../../step1-console/domain/WinningLotto.js";
import LottoNumber from "../../step1-console/domain/LottoNumber.js";
import LottoResultMaker from "../../step1-console/domain/LottoResultMaker.js";
import { parseNumber } from "../../step1-console/utils/parseNumber.js";

const CHECK_RESULT_BUTTON_ID = "check-result-button";
const ERROR_MESSAGE_ELEMENT_ID = "winning-lotto-error-message";
const LOTTO_NUMBER_INPUT_CLASS = "lotto-number-input";
export default class WinningLottoForm extends Component {
  #lottosState;
  #lottoResultState;

  constructor({ targetElementId, lottosState, lottoResultState }) {
    super(targetElementId);

    this.#lottosState = lottosState;
    this.#lottoResultState = lottoResultState;
  }

  _getTemplate() {
    const lottos = this.#lottosState.getState();

    const lottoNumberInputsTemplates = Array(LOTTO_NUMBER_LENGTH)
      .fill()
      .map((_, index) => this.#getLottoNumberInputTemplate(index));

    return `
  <section class="getting-winning-lotto ${lottos.length ? "" : "hidden"}">
      <p class="winning-lotto-message body-text">지난 주 당첨번호 ${LOTTO_NUMBER_LENGTH}개와 보너스 번호 1개를 입력해주세요.</p>
      <form class="winning-lotto-form" onsubmit="return false;">
        <div class="number-input-wrapper">

          <div class="winning-numbers-group">
            <p class="body-text">당첨 번호</p>
            <div class="winning-numbers-input-wrapper">
              ${lottoNumberInputsTemplates.join("")}
            </div>
          </div>

          <div class="bonus-number-group">
            <p class="body-text">보너스 번호</p>
            <div class="winning-numbers-input-wrapper">
              ${this.#getLottoNumberInputTemplate(
                lottoNumberInputsTemplates.length
              )}
            </div>
          </div>

        </div>
        <p id=${ERROR_MESSAGE_ELEMENT_ID} class="error-message"></p>

        <button id=${CHECK_RESULT_BUTTON_ID} class="submit-button check-result-button-style">
          결과 확인하기
        </button>

      </form>
  </section>
  `;
  }

  #getLottoNumberInputTemplate(order) {
    return `<input type="number" class="${LOTTO_NUMBER_INPUT_CLASS}" data-input-order=${order} />`;
  }

  _setEvent() {
    $$(`.${LOTTO_NUMBER_INPUT_CLASS}`).forEach((input) => {
      input.addEventListener("keyup", this.#handleAutoFocus);
    });

    const submitHandler = this._attachErrorHandler(
      this.#handleSubmit.bind(this),
      ERROR_MESSAGE_ELEMENT_ID
    );

    $(`#${CHECK_RESULT_BUTTON_ID}`).addEventListener("click", submitHandler);
  }

  #handleAutoFocus(e) {
    if (isNaN(e.key)) {
      return;
    }

    const MAX_INPUT_LENGTH = 2;
    if (e.target.value.length === MAX_INPUT_LENGTH) {
      const currentOrder = e.target.dataset.inputOrder;
      const nextInput = $(`[data-input-order="${+currentOrder + 1}"]`);
      nextInput?.focus();
    }
  }

  #handleSubmit() {
    const { winningNumbers, bonusNumber } = this.#getUserLottoNumbers();

    const winningLotto = this.#createWinningLotto(winningNumbers, bonusNumber);
    const ranks = winningLotto.rankLottos(this.#lottosState.getState());

    const rankResult = LottoResultMaker.arrangeRanks(ranks);
    const profitRate = LottoResultMaker.calculateProfitRate(ranks);

    this.#resetErrorMessage();
    this.#lottoResultState.setState({
      rankResult,
      profitRate,
      isResultModalOn: true,
    });
  }

  #getUserLottoNumbers() {
    const $winningNumberInputs = $$(`.${LOTTO_NUMBER_INPUT_CLASS}`).slice(
      0,
      LOTTO_NUMBER_LENGTH
    );
    const $bonusNumberInput = $$(`.${LOTTO_NUMBER_INPUT_CLASS}`)[
      LOTTO_NUMBER_LENGTH
    ];

    const winningNumbers = $winningNumberInputs.map((input) =>
      parseNumber(input.value)
    );
    const bonusNumber = parseNumber($bonusNumberInput.value);

    return { winningNumbers, bonusNumber };
  }

  #createWinningLotto(winningNumbers, bonusNumber) {
    const lottos = new Lotto(winningNumbers);
    const bounusNumber = new LottoNumber(bonusNumber);
    return new WinningLotto(lottos, bounusNumber);
  }

  #resetErrorMessage() {
    $(`#${ERROR_MESSAGE_ELEMENT_ID}`).textContent = "";
  }
}
