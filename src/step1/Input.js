import { Lotto, WinningLotto } from './Lotto.js';
import { readLine } from './Utils.js';
import Validator from './Validator.js';

const Input = {

  async reRead(func, funcArgs) {
    while (true) {
      try {
        const answer = await func(funcArgs)
        return answer;
      } catch (err) {
        console.log(`[ERROR] ${err.message}`);
      }
    }
  },

  async readPurchaseAmount() {
    const answer = await readLine('> 구입금액을 입력해 주세요. ');
    Validator.purchaseAmountValidator(answer);
    return answer;
  },

  async readWinningLottoNumber() {
    const answer = await readLine('> 당첨 번호를 입력해 주세요. ');
    const lotto = new Lotto(answer.split(','));
    return lotto;
  },

  async readBonusNumber(winningLottoNumber) {
    const bonusNumber = await readLine('> 보너스 번호를 입력해 주세요. ');
    const winningLotto = new WinningLotto(winningLottoNumber, bonusNumber);
    return winningLotto;
  },

  async readRetry() {
    while (true) {
      try {
        const answer = await readLine('> 다시 시작하시겠습니까? (y/n) ');
        Validator.retryValidator(answer);
        return answer;
      } catch (err) {
        console.log(`[ERROR] ${err.message}`);
      }
    }
  },
}

export default Input;
