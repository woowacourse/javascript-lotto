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

  async readRestart() {
    const restartResponse = await ReadLine.readLineAsync('> 다시 시작하시겠습니까? (y, n)');

    // TODO: 예외 처리 추가

    return restartResponse;
  },
};

export default InputView;
