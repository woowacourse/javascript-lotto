const LottoMachine = require('../domain/LottoMachine');
const { winningNumbersTag } = require('../utils/DOM.js');

class resultModalPage {
  openModalButton() {
    this.getWinningNumber();
  }
  getWinningNumber() {
    const winningNumber = [];
    winningNumbersTag.forEach((number, index) => {
      winningNumber[index] = number.value;
    });
    return winningNumber;
  }
}

module.exports = resultModalPage;
