import startValidation from "../../validation/startValidation.js";
import winningLottoValidation from "../../validation/winningLottoValidation.js";
import winningLottoBonusValidation from "../../validation/winningLottoBonusValidation.js";
import winningLottoNumbersValidation from "../../validation/winningLottoNumbersValidation.js";
import getLottoPrizeMoney from "../../domain/getLottoPrizeMoney.js";
import LottoRankEvaluator from "../../domain/LottoRankEvaluator.js";
import { calculator } from "../../domain/calculator.js";
import { LOTTO_SETTING } from "../../constants/lottoConstants.js";
import { INPUT_MESSAGE } from "../constants/viewMessage.js";
import { OUTPUT_MESSAGE } from "../constants/viewMessage.js";

class WinningLottoController {
  #winningLotto = {};
  #issuedLottos = [];

  constructor(issuedLottos) {
    const afterBuySec = document.querySelector("#after-buy-section");

    const winningLottoDiv = this.#createWinningLottoDiv();
    afterBuySec.appendChild(winningLottoDiv);
    this.#setWinningLottoDiv();

    this.#issuedLottos = [...issuedLottos];

    this.#setClickResultBtnHandler();
  }

  #validateWinningNumbers(winningNumbers) {
    winningNumbers.forEach((number) => {
      startValidation(winningLottoValidation.winningCombination, number);
    });

    startValidation(
      winningLottoNumbersValidation.winningNumbers,
      winningNumbers
    );
  }

  #isValidWinningNumbers(lottoNumberInputValues) {
    const winningNumbers = lottoNumberInputValues.slice(0, 6).map(Number);

    try {
      this.#validateWinningNumbers(winningNumbers);
    } catch (error) {
      alert(error.message);
    }
  }

  #validateBonusNumber(winningCombination) {
    startValidation(
      winningLottoValidation.winningCombination,
      winningCombination.bonusNumber
    );
    startValidation(
      winningLottoBonusValidation.winningBonus,
      winningCombination
    );
  }

  #isValidBonusNumber(lottoNumberInputValues) {
    const numbers = lottoNumberInputValues.map(Number);
    const winningNumbers = numbers.slice(0, 6);
    const [bonusNumber] = numbers.slice(6);

    const winningCombination = {
      normalNumbers: winningNumbers,
      bonusNumber: bonusNumber,
    };

    try {
      this.#validateBonusNumber(winningCombination);

      this.#winningLotto.normalNumbers = winningNumbers;
      this.#winningLotto.bonusNumber = bonusNumber;
    } catch (error) {
      alert(error.message);
    }
  }

  getWinningLotto() {
    return {
      ...this.#winningLotto,
      normalNumbers: [...this.#winningLotto.normalNumbers],
    };
  }

  #handleResultBtnClick() {
    const lottoNumberInputValues = Array.from(
      document.querySelectorAll(".winning-lotto-number-input"),
      (input) => input.value
    );

    try {
      this.#isValidWinningNumbers([...lottoNumberInputValues]);
      this.#isValidBonusNumber([...lottoNumberInputValues]);
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  #setClickResultBtnHandler() {
    const resultBtn = document.querySelector("#result-btn");
    resultBtn.addEventListener("click", () => this.#handleResultBtnClick());
  }

  /* 우승 로또 번호 입력과 관련된 엘리먼트 함수들 */

  #createWinningNumberInput() {
    const numberInput = document.createElement("input");
    numberInput.classList.add("winning-lotto-number-input");
    numberInput.type = "text";
    numberInput.maxLength = 2;

    return numberInput;
  }

  #createWinningNumbersInputs() {
    const createWinningNumberInput = () => this.#createWinningNumberInput();
    return Array.from(
      { length: LOTTO_SETTING.LENGTH },
      createWinningNumberInput
    );
  }

  #createWinningLottoGuideP() {
    const winningLottoGuideP = document.createElement("p");
    winningLottoGuideP.classList.add("lotto-game-p");
    winningLottoGuideP.textContent = INPUT_MESSAGE.WINNING_LOTTO_NUMBERS;

    return winningLottoGuideP;
  }

  #createWinningLottoDiv() {
    const winningLottoDiv = document.createElement("div");
    winningLottoDiv.id = "winning-lotto-div";

    return winningLottoDiv;
  }

  #createWinningDisplayDiv() {
    const winningDisplayDiv = document.createElement("div");
    winningDisplayDiv.id = "winning-display-div";

    return winningDisplayDiv;
  }

  #createWinningNumbersDiv() {
    const winningNumbersDiv = document.createElement("div");
    winningNumbersDiv.id = "winning-numbers-div";

    return winningNumbersDiv;
  }

  #createWinningNumbersLabel() {
    const winningNumbersLabel = document.createElement("label");
    winningNumbersLabel.for = "winning-numbers";
    winningNumbersLabel.textContent = INPUT_MESSAGE.WINNING_NUMBERS;

    return winningNumbersLabel;
  }

  #createWinningNumbersInputDiv() {
    const winningNumbersInputDiv = document.createElement("div");
    winningNumbersInputDiv.classList.add("winning-numbers-input-div");

    return winningNumbersInputDiv;
  }

  #setWinningNumbersDiv(winningDisplayDiv) {
    const winningNumbersDiv = this.#createWinningNumbersDiv();
    winningDisplayDiv.appendChild(winningNumbersDiv);

    const winningNumbersLabel = this.#createWinningNumbersLabel();
    winningNumbersDiv.appendChild(winningNumbersLabel);

    const winningNumbersInputDiv = this.#createWinningNumbersInputDiv();
    winningNumbersDiv.appendChild(winningNumbersInputDiv);

    this.#createWinningNumbersInputs().forEach((winningNumberInput) => {
      winningNumbersInputDiv.appendChild(winningNumberInput);
    });
  }

  #createBonusNumberDiv() {
    const bonusNumberDiv = document.createElement("div");
    bonusNumberDiv.id = "bonus-number-div";

    return bonusNumberDiv;
  }

  #createBonusNumberLabel() {
    const bonusNumberLabel = document.createElement("label");
    bonusNumberLabel.for = "bonus-number";
    bonusNumberLabel.textContent = INPUT_MESSAGE.BONUS_NUMBER;

    return bonusNumberLabel;
  }

  #createBonusNumberInput() {
    const bonusNumberInput = this.#createWinningNumberInput();
    return bonusNumberInput;
  }

  #setBonusNumberDiv(winningDisplayDiv) {
    const bonusNumberDiv = this.#createBonusNumberDiv();
    winningDisplayDiv.appendChild(bonusNumberDiv);

    const bonusNumberLabel = this.#createBonusNumberLabel();
    bonusNumberDiv.appendChild(bonusNumberLabel);

    const bonusNumberInput = this.#createBonusNumberInput();
    bonusNumberDiv.appendChild(bonusNumberInput);
  }

  #createResultBtn() {
    const resultBtn = document.createElement("button");
    resultBtn.id = "result-btn";
    resultBtn.textContent = OUTPUT_MESSAGE.RESULT_BTN;

    return resultBtn;
  }

  #setWinningLottoDiv() {
    const winningLottoDiv = document.querySelector("#winning-lotto-div");

    const winningLottoGuideP = this.#createWinningLottoGuideP();
    winningLottoDiv.appendChild(winningLottoGuideP);

    const winningDisplayDiv = this.#createWinningDisplayDiv();
    winningLottoDiv.appendChild(winningDisplayDiv);

    this.#setWinningNumbersDiv(winningDisplayDiv);
    this.#setBonusNumberDiv(winningDisplayDiv);

    const resultBtn = this.#createResultBtn();
    winningLottoDiv.appendChild(resultBtn);
  }
}

export default WinningLottoController;
