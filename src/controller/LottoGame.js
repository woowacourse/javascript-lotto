import Lotto from '../domain/Lotto';
import LottoValidator from '../domain/LottoValidator';

class LottoGame {
  createLotto(money) {
    return Array.from({ length: money / 1000 }).map(() => new Lotto([1, 2, 3, 4, 5, 6]));
  }

  createWinningNumbers(numbers) {
    LottoValidator.validateNumbersLength(numbers);
    LottoValidator.validateNumbersDuplicate(numbers);
    LottoValidator.validateNumbersType(numbers);
    LottoValidator.validateNumbersRange(numbers);

    return numbers;
  }
}

export default LottoGame;
