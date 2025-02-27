import Button from "./common/button.js";
import validateBonusNumber from "../validation/validateBonusNumber.js";
import Lotto from "../domain/Lotto.js";
import winningLottoInfoStore from "../store/winningLottoInfo.js";
import WinningNumbersInput from "./WinningNumbersInput.js";
import customCreateElement from "../utils/customElement.js";
import BonusNumberInput from "./BonusNumberInput.js";

export default class LottoWinningInfoForm {
  #show;

  constructor($target, show) {
    this.#show = show;
    this.render($target);
  }

  render($target) {
    const $form = customCreateElement({
      tagName: "form",
      className: `${!this.#show ? "hidden" : ""} lotto-winning-info-form`,
    });
    const $infoText = customCreateElement({
      tagName: "form",
      className: `${!this.#show ? "hidden" : ""} lotto-winning-info-form`,
      text: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
    });
    const $inputsContainer = customCreateElement({
      tagName: "form",
      className: "lotto-number-input-container",
    });

    $form.appendChild($infoText);
    $form.appendChild($inputsContainer);

    const { winningNumbers, bonusNumber } =
      winningLottoInfoStore.getState().winningLottoInfo;

    new WinningNumbersInput($inputsContainer, winningNumbers);
    new BonusNumberInput($inputsContainer, bonusNumber);
    new Button($form, this.handleResultButtonClick, "결과 확인하기");

    $form.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.handleResultButtonClick();
    });

    $target.appendChild($form);
  }

  handleResultButtonClick = () => {
    const $lottoNumbers = document.querySelectorAll(
      ".lotto-numbers-wrap > .number-input"
    );
    const winningNumbers = [];
    $lottoNumbers.forEach(($lottoNumber) => {
      winningNumbers.push(Number($lottoNumber.value));
    });

    try {
      new Lotto(winningNumbers);
    } catch (e) {
      alert(e.message);
      return;
    }

    const $bonusNumber = document.querySelector(
      ".bonus-input-wrap > .number-input"
    );
    const bonusNumber = Number($bonusNumber.value);

    try {
      validateBonusNumber(winningNumbers, bonusNumber);
    } catch (e) {
      alert(e.message);
      return;
    }

    winningLottoInfoStore.setState((state) => ({
      winningLottoInfo: {
        ...state.winningLottoInfo,
        winningNumbers,
        bonusNumber,
      },
    }));
  };
}
