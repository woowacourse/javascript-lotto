import Button from "./common/button.js";
import validateBonusNumber from "../validation/validateBonusNumber.js";
import Lotto from "../domain/Lotto.js";
import { LOTTO_NUMBER } from "../constants/lotto.js";

export default class LottoWinningInfoForm {
  #setWinningLottoInfo;
  #show;

  constructor($target, winningLottoInfo, setWinningLottoInfo, show) {
    this.#setWinningLottoInfo = setWinningLottoInfo;
    this.#show = show;
    this.render($target, winningLottoInfo);
  }

  render($target, winningLottoInfo) {
    const $form = document.createElement("form");
    $form.className = `${!this.#show ? "hidden" : ""} lotto-winning-info-form`;

    const { winningNumbers, bonusNumber } = winningLottoInfo;
    $form.innerHTML = `
    <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <div class="lotto-number-input-container">
        <div class="lotto-number-input-wrap">
            <span>당첨 번호</span>
            <div class="lotto-numbers-wrap">
            ${Array.from(
              { length: LOTTO_NUMBER.LENGTH },
              (_, index) =>
                `<input class="number-input" value="${
                  winningNumbers[index] ?? ""
                }" />`
            ).join("")}
            </div>
        </div>
        <div class="lotto-number-input-wrap bonus-input-wrap">
            <span>보너스 번호</span>
            <input class="number-input" value="${
              bonusNumber === 0 ? "" : bonusNumber
            }"/>
        </div>
    </div>
`;

    new Button($form, this.handleResultButtonClick, "결과 확인하기");
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

    this.#setWinningLottoInfo({ winningNumbers, bonusNumber });
  };
}
