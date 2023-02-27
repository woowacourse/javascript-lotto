import LottoGameValidator from '../view/LottoValidator.js';

const HTMLInputView = {
  readMoney() {
    const money = document.querySelector('.money-input').value;

    LottoGameValidator.validateMoney(money);

    return Number(money);
  },

  readWinningNumbersAndBonusNumber() {
    const winningNumbers = Array.from(document.getElementsByClassName('single-number-input'))
      .map((element) => element.value);
    const bonusNumber = winningNumbers.pop();

    LottoGameValidator.validateWinningNumbers(winningNumbers);
    LottoGameValidator.validateBonusNumber(bonusNumber, winningNumbers.map(Number));

    return { winningNumbers: winningNumbers.map(Number), bonusNumber: Number(bonusNumber) };
  },
};

export default HTMLInputView;
