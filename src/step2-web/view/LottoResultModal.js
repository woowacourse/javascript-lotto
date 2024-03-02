import {
  LOTTO_RANK_STANDARDS,
  LOTTO_RANK_TO_PRIZE,
} from "../../step1-console/constants/lotto.js";
import Component from "../abstract/Component.js";
import { $ } from "../utils/selector.js";

const SHOWING_WINNING_RESULT_SECTION_ID = "showing-winning-result";
const WINNING_RESULT_CLOSE_BUTTON_ID = "winning-result-close-button";
const LOTTO_RESTART_BUTTON_ID = "lotto-restart-button";

export default class LottoResultModal extends Component {
  #lottosState;
  #lottoResultState;

  constructor({ targetElementId, lottosState, lottoResultState }) {
    super(targetElementId);

    this.#lottosState = lottosState;
    this.#lottoResultState = lottoResultState;
  }

  _getTemplate() {
    this.#toggleBodyScrollable();

    const { rankResult, profitRate, isResultModalOn } =
      this.#lottoResultState.getState();

    const hidden = isResultModalOn ? "" : "hidden";

    const formattedProfitRateMessage = parseFloat(
      profitRate.toFixed(1)
    ).toLocaleString();

    return `
    <section id=${SHOWING_WINNING_RESULT_SECTION_ID} class="showing-winning-result" ${hidden}>
    <div class="winning-result-container">
      <span id=${WINNING_RESULT_CLOSE_BUTTON_ID} class="winning-result-close-button">x</span>
      <h3 class="winning-result-title">🏆 당첨 통계 🏆</h3>
      <table class="winning-result-table">
        <thead>
          <tr class="winning-result-column-names">
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
        </thead>
        <tbody>
        ${this.#getWinningResultRowsTemplate(rankResult)}
        </tbody>
      </table>

      <p class="profit-rate-message">
      당신의 총 수익률은 ${formattedProfitRateMessage}%입니다.
      </p>

      <button id=${LOTTO_RESTART_BUTTON_ID} class="submit-button lotto-restart-button-style">
        다시 시작하기
      </button>
    </div>
  </section>
    `;
  }

  _setEvent() {
    $(`#${SHOWING_WINNING_RESULT_SECTION_ID}`).addEventListener(
      "click",
      this.#handleOutsideClick.bind(this)
    );

    $(`#${WINNING_RESULT_CLOSE_BUTTON_ID}`).addEventListener(
      "click",
      this.#handleResultModalCloseButton.bind(this)
    );

    $(`#${LOTTO_RESTART_BUTTON_ID}`).addEventListener(
      "click",
      this.#handleRestartButton.bind(this)
    );
  }

  #getWinningResultRowsTemplate(rankResult) {
    return LOTTO_RANK_STANDARDS.map(
      ({ rank, matchCount, hasBonusNumber }) => `
<tr class="winning-result-row">
  <td>${matchCount}개 ${hasBonusNumber ? "+ 보너스볼" : ""}</td>
  <td>${LOTTO_RANK_TO_PRIZE[rank].toLocaleString()}</td>
  <td>${rankResult[rank]}개</td>
</tr>
      `
    ).join("");
  }

  #handleOutsideClick(e) {
    if (e.target.id === SHOWING_WINNING_RESULT_SECTION_ID) {
      this.#closeModal();
    }
  }

  #handleResultModalCloseButton() {
    this.#closeModal();
  }

  #closeModal() {
    this.#lottoResultState.setState({ isResultModalOn: false });
  }

  #handleRestartButton() {
    this.#lottosState.reset();
    this.#lottoResultState.reset();
  }

  #toggleBodyScrollable() {
    const { isResultModalOn } = this.#lottoResultState.getState();

    document.body.style.overflow = isResultModalOn ? "hidden" : "auto";
  }
}
