import LottoResult from "../service/LottoResult";
import { qs, qsAll } from "../../utils/domHelper";
import Validator from "../validator/Validator";
import Button from "./@common/Button";
import Component from "../core/Component";

export default class UserInput extends Component {
  constructor(element, props) {
    super(element, props);
    this.lottoResult = new LottoResult(
      this.props.onResult,
      this.props.openModal
    );
  }

  template() {
    return `
    <h2 class="user-input-title body">
      지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
    </h2>
    <form class="user-input-form">
      <section class="user-input-section">
        <article class="user-input-win-article body">
          <p class="body">당첨 번호</p>
          ${Array(6)
            .fill("")
            .map(
              (_, i) => `
              <input type="text" class="user-input win-number" data-index="${i}" maxlength="2" />
            `
            )
            .join("")}
        </article>
        <article class="user-input-bonus-article body">
          <span class="body">보너스 번호</span>
          <input type="number" class="user-input bonus-number" />
        </article>
      </section>
      <section class="results-button-layout">
      </section>
    </form>
  `;
  }

  mounted() {
    new Button(qs(".results-button-layout"), {
      text: "결과 확인하기",
      size: "large",
      className: "results-button",
      type: "submit",
      onClick: this.handleButtonClick.bind(this),
    });

    const firstWinNumberInput = qs(".win-number");
    if (firstWinNumberInput) {
      firstWinNumberInput.focus();
    }
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

  clearInputs() {
    const winNumberInputs = qsAll(".win-number");
    const bonusNumberInput = qs(".bonus-number");
    winNumberInputs.forEach((input) => {
      input.value = "";
    });
    bonusNumberInput.value = "";
  }

  handleButtonClick(event) {
    try {
      event.preventDefault();
      const winNumbers = this.getWinNumberInputs();
      const bonusNumber = this.getBonusNumberInput(winNumbers);

      this.lottoResult.calculateResult(
        winNumbers,
        bonusNumber,
        this.props.lottoList.lottoList
      );

      this.props.openModal();
    } catch (error) {
      console.error("error", error);
      alert(error.message);
      this.clearInputs();
    }
  }
}
