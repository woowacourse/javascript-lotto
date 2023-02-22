import { LOTTO, GAME, PRIZE } from '../constants/constants.js';
import randomGenerator from '../utils/randomGenerator.js';
import Lotto from './Lotto.js';

const LottoMachine = {
  purchase(lottoCount) {
    return Array(lottoCount)
      .fill()
      .map(() => new Lotto(randomGenerator(LOTTO.COUNT)));
  },

  draw(lotto) {
    const numbers = lotto.getNumbers();
    const { winningNumbers, bonusNumber } = lotto.getDrawingNumbers();
    const awards = winningNumbers.filter((number) => numbers.includes(number));

    return awards.length === LOTTO.THIRD_PLACE && numbers.includes(bonusNumber)
      ? LOTTO.SECOND_PLACE
      : awards.length;
  },

  calculateStatistics(lottoList) {
    const statistics = {};

    lottoList.forEach((lotto) => {
      const result = LottoMachine.draw(lotto);

      statistics[result] ? (statistics[result] += 1) : (statistics[result] = 1);
    });

    return statistics;
  },

  calculateEarningRate(lottoList) {
    const lottoCount = lottoList.length;
    const statistics = LottoMachine.calculateStatistics(lottoList);

    const earning = Object.entries(statistics).reduce(
      (acc, [rank, count]) => (rank in PRIZE ? acc + PRIZE[rank] * count : acc),
      GAME.INITIAL_EARNING
    );

    return ((earning / (LOTTO.PRICE * lottoCount)) * 100).toFixed(1);
  },
};

export default LottoMachine;
