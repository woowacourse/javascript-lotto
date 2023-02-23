const LottoMachine = require('../domain/LottoMachine.js');
const view = require('../view/view.js');
const { moneyValidate, winningAndBonusNumberValidate } = require('../utils/validation.js');
const { moneyValidateError, winningAndBonusNumberValidateError } = require('../utils/validateFunction.js');
class ControllerLottoWeb {
  listLotto;
  money;
  constructor() {
    this.listLotto = [];
    this.money = 0;
    this.lottoMachine = new LottoMachine();
    this.initializeButtonEvents();
  }

  initializeButtonEvents() {
    document.getElementById('buy').addEventListener('click', this.handlePurchaseButtonClick);

    document.getElementById('result_button').addEventListener('click', this.handleResultButtonClick);

    document.querySelector('.close').addEventListener('click', this.handleCloseModalButtonClick);

    document.querySelector('.restart').addEventListener('click', this.handleRestartButtonClick);
  }

  handlePurchaseButtonClick = () => {
    this.money = view.readMoney();
    if (moneyValidate(this.money)) {
      alert(moneyValidateError(this.money));
      return;
    }

    this.buyLottos(this.money);
  };

  buyLottos(money) {
    this.printPurchasedLottoNumberToView();

    this.lottoMachine.makeLotto(money);
    this.createLottoListElements();
    view.printAllLotto();
  }

  printPurchasedLottoNumberToView = () => {
    const lottoNumber = this.lottoMachine.countLotto(this.money);
    view.printPurchasedLottoNumber(lottoNumber);
  };

  createLottoListElements = () => {
    const lottoList = document.querySelector('.lottoList');

    this.lottoMachine.lottoNumber.forEach((list, index) => {
      const li = document.createElement('li');
      li.textContent = '🎟️' + list.toString();
      lottoList.append(li);
      this.listLotto[index] = list;
    });
  };

  handleResultButtonClick = () => {
    const winningNumber = this.getWinningNumber();
    const bonusNumber = view.readBonusNumber();

    if (winningAndBonusNumberValidate(winningNumber, bonusNumber)) {
      alert(winningAndBonusNumberValidateError(winningNumber, bonusNumber));
      return;
    }

    this.displayResult(winningNumber, bonusNumber);
  };

  getWinningNumber = () => {
    const winningNumber = [];
    const winningNumbersTag = view.readWinningNumbersTag();

    winningNumbersTag.forEach((number, index) => {
      winningNumber[index] = number.value;
    });

    return winningNumber;
  };

  displayResult(winningNumber, bonusNumber) {
    const result = this.lottoMachine.getWinningStatus(winningNumber, bonusNumber);

    view.printResultLotto(result);
    view.printProfitResult(this.lottoMachine.getProfitRate(this.money, result).toFixed(2));
    view.showModal();
  }

  handleRestartButtonClick = () => {
    window.location.reload();
  };

  handleCloseModalButtonClick = () => {
    view.closeModal();
  };
}

module.exports = ControllerLottoWeb;
