const LottoMachine = require('../domain/LottoMachine');
const { winningNumbersTag, bonusNumberTag } = require('../utils/DOM.js');

class resultModalPage {
  openModalButton() {
    this.getWinningAndBonusNumber();
  }
  getWinningAndBonusNumber() {
    const winningNumber = [];
    const bonusNumber = bonusNumberTag.value;
    winningNumbersTag.forEach((number, index) => {
      winningNumber[index] = number.value;
    });
    console.log(bonusNumber);
  }
}

module.exports = resultModalPage;
