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
    const $div = customCreateElement({
      tagName: "div",
      className: `${!this.#show ? "hidden" : ""} lotto-winning-info-form`,
    });
    const $infoText = customCreateElement({
      tagName: "p",
      className: `${!this.#show ? "hidden" : ""} lotto-winning-info-form`,
      text: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
    });
    const $form = customCreateElement({
      tagName: "form",
    });
    const $inputsContainer = customCreateElement({
      tagName: "div",
      className: "lotto-number-input-container",
    });

    $div.appendChild($infoText);
    $form.appendChild($inputsContainer);
    $div.appendChild($form);

    const { winningNumbers, bonusNumber } =
      winningLottoInfoStore.getState().winningLottoInfo;

    new WinningNumbersInput($inputsContainer, winningNumbers);
    new BonusNumberInput($inputsContainer, bonusNumber);
    new Button($form, () => {}, "결과 확인하기", "submit");

    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    $target.appendChild($div);
  }

  handleSubmit = () => {
    const $lottoNumbers = document.querySelectorAll(
      ".lotto-numbers-wrap > .number-input"
    );
    const winningNumbers = [];
    $lottoNumbers.forEach(($lottoNumber) => {
      winningNumbers.push($lottoNumber.value);
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
    const bonusNumber = $bonusNumber.value;

    try {
      validateBonusNumber(winningNumbers, bonusNumber);
    } catch (e) {
      alert(e.message);
      return;
    }

    winningLottoInfoStore.getState().setWinningLottoInfo({
      winningNumbers: winningNumbers.map(Number),
      bonusNumber: Number(bonusNumber),
    });
  };
}
