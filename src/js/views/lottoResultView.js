import View from "./View.js";
import { $ } from "../utils/dom.js";

const lottoResultTemplate = (lottoResult, totalProfitRate) => {
  return `
  <div class="result-background"></div>
  <section class="lotto-result-container">
    <button class="close-button">X</button>
    <table>
      <caption class="result-table-caption">
        🏆 당첨 통계 🏆
      </caption>
      <thead>
        <tr>
          <th>일치 갯수</th>
          <th>당첨금</th>
          <th>당첨 갯수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>3개</td>
          <td>5,000</td>
          <td class="fifth-winning-count">${lottoResult.fifth}개</td>
        </tr>
        <tr>
          <td>4개</td>
          <td>50,000</td>
          <td class="fourth-winning-count">${lottoResult.fourth}개</td>
        </tr>
        <tr>
          <td>5개</td>
          <td>1,500,000</td>
          <td class="third-winning-count">${lottoResult.third}개</td>
        </tr>
        <tr>
          <td>5개+보너스볼</td>
          <td>30,000,000</td>
          <td class="second-winning-count">${lottoResult.second}개</td>
        </tr>
        <tr>
          <td>6개</td>
          <td>2,000,000,000</td>
          <td class="first-winning-count">${lottoResult.first}개</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="profit-rate">당신의 총 수익률은 ${totalProfitRate}%입니다.</td>
        </tr>
      </tfoot>
    </table>
    <button class="restart-button">다시 시작하기</button>
  </section>
  `;
};

export default class LottoResultView extends View {
  constructor() {
    super();

    this.resultModal = $(".result-modal");
  }

  renderResultModal(lottoResult, totalProfitRate) {
    this.resultModal.innerHTML = lottoResultTemplate(lottoResult, totalProfitRate);
    $(".close-button").addEventListener("click", this.#closeModal);
    $(".restart-button").addEventListener("click", this.#onClickRestartButton);
  }

  #closeModal = () => {
    this.resultModal.innerText = "";
  };

  #onClickRestartButton = () => {
    this.#closeModal();
    this.handlers.get("click").forEach((func) => func());
  };
}
