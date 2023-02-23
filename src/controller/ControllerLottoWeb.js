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
    this.setButtonClick();
  }

  setButtonClick() {
    document.getElementById('buy').addEventListener('click', this.purchaseButton);

    document.getElementById('result_button').addEventListener('click', this.resultButton);

    document.querySelector('.close').addEventListener('click', this.closeModalButton);

    document.querySelector('.restart').addEventListener('click', this.restartButton);
  }

  purchaseButton = () => {
    this.money = view.readMoney();
    if (!moneyValidate(this.money)) this.playLottos(this.money);

    if (moneyValidate(this.money)) alert(moneyValidateError(this.money));
  };

  playLottos(money) {
    this.showPurchasedLottoNumber();

    this.lottoMachine.makeLotto(money);
    this.makeLottoList();
    view.printAllLotto();
  }

  showPurchasedLottoNumber = () => {
    const lottoNumber = this.lottoMachine.countLotto(this.money);
    view.printPurchasedLottoNumber(lottoNumber);
  };

  makeLottoList = () => {
    const lottoList = document.querySelector('.lottoList');

    this.lottoMachine.lottoNumber.forEach((list, index) => {
      const li = document.createElement('li');
      li.textContent = '🎟️' + list.toString();
      lottoList.append(li);
      this.listLotto[index] = list;
    });
  };

  resultButton = () => {
    const winningNumber = this.getWinningNumber();
    const bonusNumber = view.readBonusNumber();

    if (winningAndBonusNumberValidate(winningNumber, bonusNumber))
      alert(winningAndBonusNumberValidateError(winningNumber, bonusNumber));

    if (!winningAndBonusNumberValidate(winningNumber, bonusNumber)) this.resultPlay(winningNumber, bonusNumber);
  };

  resultPlay(winningNumber, bonusNumber) {
    const result = this.lottoMachine.getWinningStatus(winningNumber, bonusNumber);

    view.printResultLotto(result);
    view.printProfitResult(this.lottoMachine.getProfitRate(this.money, result));
    view.showModal();
  }

  getWinningNumber = () => {
    const winningNumber = [];
    const winningNumbersTag = view.readWinningNumbersTag();

    winningNumbersTag.forEach((number, index) => {
      winningNumber[index] = number.value;
    });

    return winningNumber;
  };

  restartButton = () => {
    window.location.reload();
  };

  closeModalButton = () => {
    view.closeModal();
  };
}

module.exports = ControllerLottoWeb;
