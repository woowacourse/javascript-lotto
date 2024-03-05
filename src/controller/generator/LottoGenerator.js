import Condition from '../../constants/Condition';
import Lotto from '../../domain/Lotto';
import Validator from '../../domain/Validator';
import Random from '../../utils/Random';

const { LOTTO, MONEY } = Condition;

function createOneLottoTicket() {
  const numbers = Random.pickNumbersInRangeByRule({
    start: LOTTO.NUMBER_RANGE_MIN,
    end: LOTTO.NUMBER_RANGE_MAX,
    count: LOTTO.NUMBER_LENGTH,
  });
  Validator.checkLottoNumbers(numbers);
  return new Lotto(numbers);
}

const LottoGenerator = {
  createLotto(money) {
    return Array.from({ length: Math.floor(money / MONEY.UNIT) }).map(() => createOneLottoTicket());
  },
};

export default LottoGenerator;
