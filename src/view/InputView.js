import ReadLine from '../utils/readLineAsync.js';

const InputView = {
  async readCost() {
    const cost = Number(await ReadLine.readLineAsync('> 구입 금액을 입력해주세요'));

    return cost;
  },

  async readWinningNumbers() {
    const winningNumbers = await ReadLine.readLineAsync('> 당첨 번호를 입력해주세요.');

    return winningNumbers.split(',').map((number) => Number(number));
  },

  async readBonusNumber() {
    const bonusNumber = Number(await ReadLine.readLineAsync('> 보너스 번호를 입력해주세요.'));

    return bonusNumber;
  },
};

export default InputView;
