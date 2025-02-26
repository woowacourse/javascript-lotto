//@ts-check

import LottoCompany from "../domain/LottoCompany";
import { qs, qsAll } from "../utils/domHelper";
import Validator from "../validator/Validator";
import Component from "./Component";

export default class UserInput extends Component {
  setEvent() {
    this.addEvent(
      "click",
      ".results-button",
      this.handleButtonClick.bind(this)
    );
  }

  template() {
    return `
    <h2 class="user-input-title body">
    지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
    </h2>
<section class="user-input-section">
<article class="user-input-win-article body">
  <span class="body">당첨 번호</span>
  <form>
  ${Array(6)
    .fill("")
    .map(
      (_, i) => `
                <input type="text" class="user-input win-number" data-index="${i}" pattern="[0-9]*" inputmode="numeric" maxlength="2" />
              `
    )
    .join("")}
  </form>
</article>
<article class="user-input-bonus-article body">
  <span class="body">보너스 번호</span>
  <form class="user-input-bonus-form">
    <input type="number" class="user-input bonus-number" />
  </form>
</article>
</section>
<section class="results-button-layout">
<button type="button" class="results-button lotto-caption">
  결과 확인하기
</button>
</section>
    `;
  }

  handleButtonClick() {
    try {
      const winNumberInputs = qsAll(".win-number");
      const bonusNumberInput = qs(".bonus-number");

      const winNumbers = Array.from(winNumberInputs).map((input) =>
        Number(input.value)
      );
      const bonusNumber = Number(bonusNumberInput.value);

      Validator.validateWinNumbers(winNumbers);
      Validator.validateBonusNumber(bonusNumber, winNumbers);

      const lottoCompany = new LottoCompany(winNumbers, bonusNumber);

      const lottoRanks = lottoCompany.calculateLottoRanks(
        this.props.lottoList.lottoList
      );
      const totalProfit = lottoCompany.calculateTotalProfit(lottoRanks);

      if (this.props.onResult) {
        this.props.onResult({ lottoRanks, totalProfit });
      }

      this.props.openModal();
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  }
}
