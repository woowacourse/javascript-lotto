import { LOTTO_RANK } from "../../step1-console/constants/lotto.js";
import Component from "../abstract/Component.js";
import { $ } from "../utils/selector.js";

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

    return `
    <section class="showing-winning-result ${hidden}">
    <div class="winning-result-container">
      <span class="winning-result-close-button">x</span>
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
          <tr class="winning-result-row">
            <td>3개</td>
            <td>5,000</td>
            <td>${rankResult[LOTTO_RANK.fifth]}개</td>
          </tr>
          <tr class="winning-result-row">
            <td>4개</td>
            <td>50,000</td>
            <td>${rankResult[LOTTO_RANK.fourth]}개</td>
          </tr>
          <tr class="winning-result-row">
            <td>5개</td>
            <td>1,500,000</td>
            <td>${rankResult[LOTTO_RANK.third]}개</td>
          </tr>
          <tr class="winning-result-row">
            <td>5개 + 보너스볼</td>
            <td>30,000,000</td>
            <td>${rankResult[LOTTO_RANK.second]}개</td>
          </tr>
          <tr class="winning-result-row">
            <td>6개</td>
            <td>2,000,000,000</td>
            <td>${rankResult[LOTTO_RANK.first]}개</td>
          </tr>
        </tbody>
      </table>

      <p class="profit-rate-message">당신의 총 수익률은 ${parseFloat(
        profitRate.toFixed(1)
      ).toLocaleString()}%입니다.</p>

      <button class="lotto-restart-button">다시 시작하기</button>
    </div>
  </section>
    `;
  }

  _setEvent() {
    $(".showing-winning-result").addEventListener(
      "click",
      this.#handleOutsideClick.bind(this)
    );

    $(".winning-result-close-button").addEventListener(
      "click",
      this.#handleResultModalCloseButton.bind(this)
    );

    $(".lotto-restart-button").addEventListener(
      "click",
      this.#handleRestartButton.bind(this)
    );
  }

  #handleOutsideClick(e) {
    if (e.target.classList.contains("showing-winning-result")) {
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
