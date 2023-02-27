const Money = require('../model/Money');
const Winning = require('../model/Winning');
const {
  getCollectedRanks,
  generateLottos,
  getBenefitRate,
} = require('../../utils/lotto');
const { LOTTO_NUMBER } = require('../../constant');
const { $, $$ } = require('../../utils');
const webView = require('../../view/webView');

const addEvents = {
  inputMoney: () => {
    $('#moneyForm').addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        const money = new Money(moneyAmount.value);
        const lottos = generateLottos(money.getAmount());
        const count = money.getAmount() / LOTTO_NUMBER.moneyUnit;

        webView.removeLottos();
        webView.removeError('#moneyError');
        webView.showLottoAndWinningInput();

        webView.printLottoCount(count);
        webView.printLotto(lottos);

        addEvents.inputNumber(money, lottos);
      } catch (error) {
        webView.printError(error, '#moneyError');
      }
    });
  },

  inputNumber: (money, lottos) => {
    $('#inputNumberContainer').addEventListener('submit', (event) => {
      event.preventDefault();

      try {
        const winningNumbers = [...$$('.winning-number')].map((item) =>
          Number(item.value)
        );
        const bonusNumber = Number($('#bonus').value);
        const winning = new Winning();

        webView.removeError('#lottoNumbersError');
        winning.setWinningNumbers(winningNumbers);
        winning.setBonusNumber(bonusNumber);

        webView.showResultModal();
        const ranks = getCollectedRanks(winning, lottos);

        webView.printRanksCount(ranks);
        const benefitRate = getBenefitRate(money.getAmount(), ranks);
        webView.printBenefitRate(benefitRate);
      } catch (error) {
        webView.printError(error, '#lottoNumbersError');
      }
    });
  },

  closeModalClick: () => {
    $('#closeButton').addEventListener('click', () => {
      webView.hideResultModal();
    });

    $('#winningModal').addEventListener('click', () => {
      webView.hideResultModal();
    });

    $('#winningScreen').addEventListener('click', (event) => {
      event.stopPropagation();
    });
  },

  retry: () => {
    $('#retryButton').addEventListener('click', () => {
      webView.showBeginning();
    });
  },

  inputChange: () => {
    $('#moneyAmount').addEventListener('input', webView.controllMoneyInput);

    $$('.winning-number').forEach((item) =>
      item.addEventListener('input', () => webView.controllWinningNumber(item))
    );

    $('#bonus').addEventListener('input', () =>
      webView.controllWinningNumber($('#bonus'))
    );
  },

  closeModalKeydown: () => {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        webView.hideResultModal();
      }
    });
  },
};

addEvents.inputMoney();
addEvents.closeModalClick();
addEvents.closeModalKeydown();
addEvents.retry();
addEvents.inputChange();
webView.printCopyright();
