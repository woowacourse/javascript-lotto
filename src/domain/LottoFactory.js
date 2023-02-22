import LOTTO from '../constants/lotto';

const LottoFactory = {
  numbers: Array.from(
    { length: LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER + 1 },
    (_, i) => LOTTO.MIN_NUMBER + i,
  ),

  shuffle() {
    LottoFactory.numbers.sort(() => Math.random() - 0.5);
  },

  generateNumbers() {
    LottoFactory.shuffle();
    return LottoFactory.numbers.slice(0, LOTTO.SIZE);
  },
};

export default LottoFactory;
