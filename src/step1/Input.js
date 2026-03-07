import { readLine } from './Utils.js';
import Validator from './Validator.js';

const Input = {
  async readPurchaseAmount() {
    const answer = await readLine('> 구입금액을 입력해 주세요. ');
    Validator.purchaseAmountValidator(answer);
    return answer;
  },

  async readWinningLottoNumber() {
    const answer = await readLine('> 당첨 번호를 입력해 주세요. ');
    const numbers = answer.split(',');
    Validator.validateLottoNumber(numbers);
    return numbers;
  },

  async readBonusNumber(winningLottoNumber) {
    const answer = await readLine('> 보너스 번호를 입력해 주세요. ');
    Validator.validateBonusNumber(winningLottoNumber, answer);
    return answer;
  },

  async readRetry() {
      const answer = await readLine('> 다시 시작하시겠습니까? (y/n) ');
      Validator.retryValidator(answer);
      return answer;
  },
}

export default Input;
