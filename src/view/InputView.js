import ReadLine from '../utils/readLineAsync.js';
import WinningLotto from '../domain/winningLotto.js';
import Lotto from '../domain/lotto.js';

const InputView = {
  async readCost() {
    const cost = Number(await ReadLine.readLineAsync('> 구입 금액을 입력해주세요'));

    return cost;
  },

  async readWinningNumbers() {
    const winningNumbers = await ReadLine.readLineAsync('> 당첨 번호를 입력해주세요.');
    const winningLotto = new Lotto(winningNumbers.split(',').map((number) => Number(number)));

    return winningLotto;
  },

  async readBonusNumber(lotto) {
    const bonusNumber = Number(await ReadLine.readLineAsync('> 보너스 번호를 입력해주세요.'));
    const winningLotto = new WinningLotto(lotto, bonusNumber);

    return winningLotto;
  },
};

export default InputView;
