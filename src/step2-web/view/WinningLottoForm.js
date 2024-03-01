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

    const lottoNumberInputsTemplate = Array(LOTTO_NUMBER_LENGTH)
      .fill()
      .map((_) => this.#getLottoNumberInputTemplate())
      .join("");

    return `
  <section class="getting-winning-lotto ${lottos.length ? "" : "hidden"}">
      <p class="winning-lotto-message body-text">지난 주 당첨번호 ${LOTTO_NUMBER_LENGTH}개와 보너스 번호 1개를 입력해주세요.</p>
      <div class="winning-lotto-input-group">
        <div class="number-input-wrapper">

          <div class="winning-numbers-group">
            <p class="body-text">당첨 번호</p>
            <div class="winning-numbers-input-wrapper">
              ${lottoNumberInputsTemplate}
            </div>
          </div>

          <div class="bonus-number-group">
            <p class="body-text">보너스 번호</p>
            <div class="winning-numbers-input-wrapper">
              ${this.#getLottoNumberInputTemplate()}
            </div>
          </div>

        </div>
        <p id=${ERROR_MESSAGE_ELEMENT_ID} class="error-message"></p>

        <button id=${CHECK_RESULT_BUTTON_ID} class="check-result-button">
          결과 확인하기
        </button>

      </div>
  </section>
  `;
  }

  #getLottoNumberInputTemplate() {
    return `<input type="number" class="${LOTTO_NUMBER_INPUT_CLASS}" />`;
  }

  _setEvent() {
    const checkResultClickHandler = this._attachErrorHandler(
      this.#handleCheckResultButton.bind(this),
      ERROR_MESSAGE_ELEMENT_ID
    );

    $(`#${CHECK_RESULT_BUTTON_ID}`).addEventListener(
      "click",
      checkResultClickHandler
    );
  }

  #handleCheckResultButton() {
    const { winningNumbers, bonusNumber } = this.#getLottoNumbersFromInputs();

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

  #getLottoNumbersFromInputs() {
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
