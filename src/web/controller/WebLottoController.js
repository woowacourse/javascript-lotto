import LottoMachine from '../../domain/model/LottoMachine';
import Money from '../../domain/model/Money';
import { errorAlert } from '../../util/errorAlert';
import { calculateROI } from '../../domain/calculateStatistics';
import LOTTO_RULE from '../../constants/rules/lottoRule';
import { mainPage } from '../pages/mainPage';
import { resultModal } from '../pages/resultModal';

class WebLottoController {
  #money;
  #lottoMachine;

  start() {
    const $signupForm = document.getElementById('money-form');
    const $moneyInput = document.getElementById('money-input');

    $moneyInput.focus();
    $signupForm.addEventListener('submit', event => {
      event.preventDefault();
      this.moneyInputFormHandler($moneyInput.value);
    });
  }

  moneyInputFormHandler(value) {
    const $moneyInput = document.getElementById('money-input');
    const $moneyButton = document.getElementById('money-button');

    try {
      this.#money = new Money(value);
      this.#lottoMachine = new LottoMachine(this.#money);

      $moneyButton.disabled = true;
      mainPage.generateCountNotice(this.#money.count);
      mainPage.generatePurchasedLottosNotice(this.#lottoMachine.lottos);
      mainPage.generateWinningNumbersInputs();
      this.readWinningLottoAndBonusNumber();
    } catch (err) {
      errorAlert(err);
      $moneyInput.value = null;
    }
  }

  readWinningLottoAndBonusNumber() {
    const $numberForm = document.getElementById('number-form');
    const $numberInputs = document.getElementsByClassName('number-input');

    $numberInputs[0].focus();
    $numberForm.addEventListener('submit', event => {
      event.preventDefault();
      try {
        const numberInputs = Array.from(event.target.numberInput).map(val => {
          return val.value;
        });
        this.makeWinningLottoAndBonusNumber(numberInputs);
        this.openResultModal();
      } catch (err) {
        errorAlert(err);
      }
    });
  }

  makeWinningLottoAndBonusNumber(numberInputs) {
    this.#lottoMachine.winningLotto = numberInputs.slice(0, 6).join(LOTTO_RULE.NUMBER_DELIMITER);
    this.#lottoMachine.bonusNumber = numberInputs[6];
  }

  openResultModal() {
    const $resultModal = document.getElementById('result-modal');
    $resultModal.classList.remove('hidden');

    const totalLottoRanks = this.#lottoMachine.countLottoRanks();
    const profitRate = calculateROI(this.#money, totalLottoRanks);

    resultModal.generateResultRank(totalLottoRanks);
    resultModal.generateProfitRate(profitRate);
    this.clickExitButtonHandler();
    this.clickRestartButtonHandler();
  }

  clickExitButtonHandler() {
    const $modalExitButton = document.getElementById('modal-exit-button');
    const $resultModal = document.getElementById('result-modal');

    $modalExitButton.addEventListener('click', () => {
      $resultModal.classList.add('hidden');
      resultModal.deleteResultRank();
    });
  }

  clickRestartButtonHandler() {
    const $restartButton = document.getElementById('restart-button');

    $restartButton.addEventListener('click', () => {
      location.reload();
    });
  }
}

export default WebLottoController;
