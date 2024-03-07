import Lotto from '../../domain/Lotto';
import LottoNumber from '../../domain/LottoNumber';
import Result from './Result';
import { INFORMATION, BUTTON } from '../constants/Constants';

const WinningLotto = {
  showWinningLottoInputUI(randomLottos, lottoMoney) {
    const winningLottoInformation = document.querySelector(
      '#game-winninglotto-input-numbers-information',
    );
    winningLottoInformation.innerHTML =
      INFORMATION.inputWinningLottoAndBonusNumberInformation;
    this.createWinningLottoInteraction();
    this.createBonusLottoInteraction();
    this.createResultButton(randomLottos, lottoMoney);
  },

  createWinningLottoInteraction() {
    const winningLottoInputInformation = document.querySelector(
      '#game-winninglotto-input-numbers-information',
    );
    winningLottoInputInformation.innerHTML =
      INFORMATION.inputWinningLottoInformation;
    const winningLottoInteraction = document.querySelector(
      '#game-winninglotto-input-numbers-interaction',
    );
    winningLottoInteraction.innerHTML = `
    ${Array.from(
      { length: Lotto.NUMBER_COUNT },
      () =>
        `<input class='number-input-interaction' name='winning-number' type='number' min='1' max='45'/>`,
    ).join('  ')}`;
  },

  createBonusLottoInteraction() {
    const bonusLottoInputInformation = document.querySelector(
      '#game-winninglotto-input-bonus-information',
    );
    bonusLottoInputInformation.innerHTML =
      INFORMATION.inputBonusNumberInformation;
    const bonusLottoInputInteraction = document.querySelector(
      '#game-winninglotto-input-bonus-interaction',
    );
    bonusLottoInputInteraction.innerHTML = `<input class='number-input-interaction' name='bonus-number' type='number' min='1' max='45'/>`;
  },

  createResultButton(randomLottos, lottoMoney) {
    const resultButton = document.querySelector('.result-button-container');
    resultButton.innerHTML = `<button class="result-button">${BUTTON.showResult}</button>`;
    resultButton.addEventListener('click', (event) => {
      event.preventDefault();
      try {
        const winningNumbers = Array.from(
          document.querySelectorAll('[name="winning-number"]'),
        ).map((input) => String(input.value));
        const winningLotto = new Lotto(winningNumbers.join());
        const bonusNumber = new LottoNumber(
          document.querySelector('[name="bonus-number"]').value,
        );
        winningLotto.checkHaveBonus(bonusNumber.getLottoNumber());
        Result.showResult(winningLotto, bonusNumber, randomLottos, lottoMoney);
      } catch (error) {
        alert(error);
      }
    });
  },
};

export default WinningLotto;
