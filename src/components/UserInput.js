import LottoCompany from "../domain/LottoCompany";
import { qs, qsAll } from "../utils/domHelper";
import Validator from "../validator/Validator";
import Button from "./@common/Button";
import Component from "./Component";

export default class UserInput extends Component {
  setEvent() {
    this.addEvent(
      "submit",
      ".user-input-bonus-form",
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
<form class="user-input-bonus-form">
<article class="user-input-bonus-article body">
  <span class="body">보너스 번호</span>
  <div class="user-input-bonus-form">
    <input type="number" class="user-input bonus-number" />
  </div>
</article>
</section>
<section class="results-button-layout"></section>
</form>
    `;
  }

  mounted() {
    new Button(qs(".results-button-layout"), {
      text: "결과 확인하기",
      size: "large",
      className: "results-button",
      type: "submit",
    });
  }

  getWinNumberInputs() {
    const winNumberInputs = qsAll(".win-number");
    const winNumbers = Array.from(winNumberInputs).map((input) =>
      Number(input.value)
    );
    Validator.validateWinNumbers(winNumbers);
    return winNumbers;
  }

  getBonusNumberInput(winNumbers) {
    const bonusNumberInput = qs(".bonus-number");
    const bonusNumber = Number(bonusNumberInput.value);
    Validator.validateBonusNumber(bonusNumber, winNumbers);
    return bonusNumber;
  }

  handleButtonClick(event) {
    try {
      event.preventDefault();
      const winNumbers = this.getWinNumberInputs();
      const bonusNumber = this.getBonusNumberInput(winNumbers);

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
      console.error("error", error);
      alert(error.message);
      winNumbers.forEach((input) => {
        input.value = "";
      });
      bonusNumberInput.value = "";
    }
  }
}
