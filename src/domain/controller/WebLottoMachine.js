const Money = require('../model/Money');
const Winning = require('../model/Winning');
const webView = require('../../view/webView');
const {
  generateLottos,
  getBenefitRate,
  getCollectedRanks,
} = require('../../utils/lotto');
const { $, $$ } = require('../../utils');
const { LOTTO_NUMBER } = require('../../constant');

class WebLottoMachine {
  closeModalClickEvent() {
    $('#closeButton').addEventListener('click', () => {
      webView.hideResultModal();
    });

    $('#winningModal').addEventListener('click', () => {
      webView.hideResultModal();
    });

    $('#winningScreen').addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

  closeModalKeydownEvent() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        webView.hideResultModal();
      }
    });
  }

  getWinning(winningNumbers, bonusNumber) {
    const winning = new Winning();
    winning.setWinningNumbers(winningNumbers);
    winning.setBonusNumber(bonusNumber);

    return winning;
  }

  play() {
    this.moneySubmitEvent();
    this.closeModalClickEvent();
    this.closeModalKeydownEvent();
    this.retryClickEvent();
    this.watchInputEvent();
    webView.printCopyright();
  }

  retryClickEvent() {
    $('#retryButton').addEventListener('click', () => {
      webView.showBeginning();
    });
  }

  showCountAndLottos(count, lottos) {
    webView.printLottoCount(count);
    webView.printLottos(lottos);
  }

  showResult(ranks, benefitRate) {
    webView.showResultModal();
    webView.printRanksCount(ranks);
    webView.printBenefitRate(benefitRate);
  }

  moneySubmitEvent() {
    $('#moneyForm').addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        const money = new Money($('#moneyAmount').value);
        const lottos = generateLottos(money.getAmount());
        const count = money.getAmount() / LOTTO_NUMBER.moneyUnit;

        this.prepareWinningInputs();
        this.showCountAndLottos(count, lottos);

        this.winningNumbersSubmitEvent(money, lottos);
      } catch (error) {
        webView.printError(error, '#moneyError');
      }
    });
  }

  winningNumbersSubmitEvent(money, lottos) {
    $('#inputNumberContainer').addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        const winningNumbers = [...$$('.winning-number')].map((item) =>
          Number(item.value)
        );
        const bonusNumber = Number($('#bonus').value);

        webView.removeError('#lottoNumbersError');
        const winning = this.getWinning(winningNumbers, bonusNumber);
        const ranks = getCollectedRanks(winning, lottos);
        const benefitRate = getBenefitRate(money.getAmount(), ranks);
        this.showResult(ranks, benefitRate);
      } catch (error) {
        webView.printError(error, '#lottoNumbersError');
      }
    });
  }

  prepareWinningInputs() {
    webView.removeLottos();
    webView.removeError('#moneyError');
    webView.showLottoAndWinningInput();
    webView.focusFirstWinningNumber();
  }

  watchInputEvent() {
    $('#moneyAmount').addEventListener('input', webView.controllMoneyInput);

    $$('.winning-number').forEach((item) =>
      item.addEventListener('input', () => webView.controllWinningNumber(item))
    );

    $('#bonus').addEventListener('input', () =>
      webView.controllWinningNumber($('#bonus'))
    );
  }
}

module.exports = WebLottoMachine;
