import MyComponent from "../abstract/MyComponent.js";

import Lotto, {
  LOTTO_NUMBER_LENGTH,
} from "../../step1-console/domain/Lotto.js";

import { $, $$ } from "../utils/selector.js";
import WinningLotto from "../../step1-console/domain/WinningLotto.js";
import LottoNumber from "../../step1-console/domain/LottoNumber.js";
import LottoResultMaker from "../../step1-console/domain/LottoResultMaker.js";

export default class WinningLottoForm extends MyComponent {
  #lottosState;
  #lottoResultState;
  #isResultModalOnState;

  constructor({
    targetElementId,
    lottosState,
    lottoResultState,
    isResultModalOnState,
  }) {
    super(targetElementId);

    this.#lottosState = lottosState;
    this.#lottoResultState = lottoResultState;
    this.#isResultModalOnState = isResultModalOnState;
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
        <button class="check-result-button">
          결과 확인하기
          </button>
          
          <p id="winning-lotto-error-message" class="error-message"></p>
      </div>
  </section>
  `;
  }

  #getLottoNumberInputTemplate() {
    return `<input type="number" class="lotto-number-input" />`;
  }

  _setEvent() {
    const checkResultClickHandler = this._attachErrorHandler(
      this.#handleCheckResultButton.bind(this),
      "winning-lotto-error-message"
    );

    $(".check-result-button").addEventListener(
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

    this.#lottoResultState.setState({
      rankResult,
      profitRate,
    });
    this.#isResultModalOnState.setState(true);
  }

  #getLottoNumbersFromInputs() {
    const $winningNumberInputs = $$(".lotto-number-input").slice(
      0,
      LOTTO_NUMBER_LENGTH
    );
    const $bonusNumberInput = $$(".lotto-number-input")[LOTTO_NUMBER_LENGTH];

    const winningNumbers = $winningNumberInputs.map((input) => +input.value);
    const bonusNumber = +$bonusNumberInput.value;

    return { winningNumbers, bonusNumber };
  }

  #createWinningLotto(winningNumbers, bonusNumber) {
    const lottos = new Lotto(winningNumbers);
    const bounusNumber = new LottoNumber(bonusNumber);
    return new WinningLotto(lottos, bounusNumber);
  }
}
