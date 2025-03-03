import DomHelper from "../../../utils/DomHelper.js";
import Validator from "../../../domain/Validator.js";

export default class WinningNumbers {
  constructor(onResult) {
    this.middleSection = DomHelper.querySelector(".lotto__middle");
    this.winningNumberInputs = DomHelper.querySelectorAll(
      ".target__lottos .one__numbers__input",
    );
    this.winningNumberContainer = DomHelper.querySelector(".target__lottos");

    this.bonusNumberInput = DomHelper.querySelector(
      ".bonus__number .one__numbers__input",
    );

    this.bonusNumberContainer = DomHelper.querySelector(".bonus__number");
    this.resultButton = DomHelper.querySelector(".result__btn");
    this.onResult = onResult;

    this.init();
  }

  init() {
    this.middleSection.style.display = "none";
    this.resultButton.addEventListener("click", this.handleResult.bind(this));

    this.winningNumberContainer.addEventListener(
      "keydown",
      this.handleWinningInputKeydown.bind(this),
    );

    this.bonusNumberContainer.addEventListener(
      "keydown",
      this.handleBonusInputKeydown.bind(this),
    );
  }

  handleWinningInputKeydown(event) {
    if (!event.target.classList.contains("one__numbers__input")) return;

    if (
      event.key !== "Enter" &&
      event.key !== "ArrowRight" &&
      event.key !== " "
    )
      return;

    event.preventDefault();

    const inputs = Array.from(this.winningNumberInputs);
    const currentIndex = inputs.indexOf(event.target);

    if (currentIndex < this.winningNumberInputs.length - 1) {
      this.winningNumberInputs[currentIndex + 1].focus();
    } else {
      this.bonusNumberInput.focus();
    }
  }

  handleBonusInputKeydown(event) {
    if (!event.target.classList.contains("one__numbers__input")) return;
    if (
      event.key !== "Enter" &&
      event.key !== "ArrowRight" &&
      event.key !== " "
    )
      return;

    event.preventDefault();

    this.resultButton.focus();
  }

  show() {
    this.middleSection.style.display = "block";

    if (this.winningNumberInputs.length > 0) {
      this.winningNumberInputs[0].focus();
    }
  }

  hide() {
    this.middleSection.style.display = "none";
  }

  handleResult() {
    try {
      if (!this.onResult) {
        throw new Error("로또를 먼저 구매해주세요.");
      }

      const { winningNumbers, bonusNumber } = this.validateWinningNumbers();

      this.onResult(winningNumbers, bonusNumber);
    } catch (error) {
      alert(error.message);
    }
  }

  reset() {
    [...this.winningNumberInputs, this.bonusNumberInput].forEach(
      (input) => (input.value = ""),
    );
    this.hide();
  }

  validateWinningNumbers() {
    const winningNumbers = [];

    this.winningNumberInputs.forEach((input) => {
      if (!input.value) {
        throw new Error("당첨 번호를 모두 입력해주세요.");
      }
      winningNumbers.push(Number(input.value));
    });

    Validator.isTargetNumber(winningNumbers.join(", "));

    if (!this.bonusNumberInput.value) {
      throw new Error("보너스 번호를 입력해주세요.");
    }

    const bonusNumber = Number(this.bonusNumberInput.value);
    Validator.isBonusNumber(bonusNumber, winningNumbers);

    return { winningNumbers, bonusNumber };
  }
}
