import BaseWebComponent from "../base/BaseWebComponent.js";
import "./lotto-result.css";

class LottoResult extends BaseWebComponent {
  getTemplate() {
    return `
      <dialog class="lotto-result">
        <button class="lotto-result__close_button">
          <img src="close-button.svg" alt="close-button" />
        </button>
        <h2 class="lotto-result__title">🏆 당첨 통계 🏆</h2>
        <table class="lotto-result__statistics">
          <tr>
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
          <tr class="lotto-result__row">
            <td>3개</td>
            <td>5,000</td>
            <td>n개</td>
          </tr>
          <tr class="lotto-result__row">
            <td>4개</td>
            <td>50,000</td>
            <td>n개</td>
          </tr>
          <tr class="lotto-result__row">
            <td>5개</td>
            <td>1,500,000</td>
            <td>n개</td>
          </tr>
          <tr class="lotto-result__row">
            <td>5개+보너스볼</td>
            <td>30,000,000</td>
            <td>n개</td>
          </tr>
          <tr class="lotto-result__row">
            <td>6개</td>
            <td>2,000,000,000</td>
            <td>n개</td>
          </tr>
        </table>
        <p class="lotto-result__profit">당신의 총 수익률은 %입니다.</p>
        <button class="lotto-result__restart-button">다시 시작하기</button>
      </dialog>
      `;
  }
}

customElements.define("lotto-result", LottoResult);
