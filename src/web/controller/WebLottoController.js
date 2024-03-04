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
      this.#moneyInputFormHandler($moneyInput.value);
    });
  }

  #moneyInputFormHandler(value) {
    const $moneyButton = document.getElementById('money-button');

    this.#insertMoney(value);
    this.#lottoMachine = new LottoMachine(this.#money);
    $moneyButton.disabled = true;
    mainPage.generateCountNotice(this.#money.count);
    mainPage.generatePurchasedLottosNotice(this.#lottoMachine.lottos);
    mainPage.generateWinningNumbersInputs();
    this.#readWinningLottoAndBonusNumber();
  }

  #insertMoney(value) {
    const $moneyInput = document.getElementById('money-input');
    try {
      this.#money = new Money(value);
    } catch (err) {
      errorAlert(err);
      $moneyInput.value = null;
    }
  }

  #readWinningLottoAndBonusNumber() {
    const $numberForm = document.getElementById('number-form');
    const $numberInputs = document.getElementsByClassName('number-input');

    $numberInputs[0].focus();
    $numberForm.addEventListener('submit', event => {
      event.preventDefault();
      const numberInputs = Array.from(event.target.numberInput).map(val => {
        return val.value;
      });
      this.#makeWinningLottoAndBonusNumber(numberInputs);
    });
  }

  #makeWinningLottoAndBonusNumber(numberInputs) {
    try {
      this.#lottoMachine.winningLotto = numberInputs.slice(0, 6).join(LOTTO_RULE.NUMBER_DELIMITER);
      this.#lottoMachine.bonusNumber = numberInputs[6];

      this.#openResultModal();
    } catch (err) {
      errorAlert(err);
    }
  }

  #openResultModal() {
    const $dialog = document.getElementById('dialog');
    $dialog.showModal();

    const totalLottoRanks = this.#lottoMachine.countLottoRanks();
    const profitRate = calculateROI(this.#money, totalLottoRanks);

    resultModal.generateResultRank(totalLottoRanks);
    resultModal.generateProfitRate(profitRate);
    this.#clickExitButtonHandler($dialog);
    this.#clickRestartButtonHandler();
  }

  #clickExitButtonHandler($dialog) {
    const $modalExitButton = document.getElementById('modal-exit-button');

    $modalExitButton.addEventListener('click', () => {
      $dialog.close();
      resultModal.deleteResultRank();
    });
  }

  #clickRestartButtonHandler() {
    const $restartButton = document.getElementById('restart-button');

    $restartButton.addEventListener('click', () => {
      location.reload();
    });
  }
}

export default WebLottoController;
