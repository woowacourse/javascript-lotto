import LottoMachine from './LottoMachine.js';
import NumberHandler from '../util/NumberHandler.js';
import LOTTO from '../constant/lotto.js';
import { RANK, RANKING_TABLE } from '../constant/rank.js';

const LottoGame = (function () {
  const props = {
    lottos: [],
    amountOfRanks: Array.from({ length: 6 }, () => 0),
    winningNumbers: { luckyNumbers: [], bonusNumber: 0 },
  };

  const getRank = (numbers, { luckyNumbers, bonusNumber }) => {
    const matchCount = getMatchCount(numbers, luckyNumbers);
    const isSecondRank =
      matchCount === 5 && hasBonusNumber(numbers, bonusNumber);

    return isSecondRank ? RANK.SECOND : RANKING_TABLE[matchCount];
  };

  const getMatchCount = (numbers, targetNumbers) => {
    return numbers.filter(number => targetNumbers.includes(number)).length;
  };

  const hasBonusNumber = (numbers, bonusNumber) => {
    return numbers.includes(bonusNumber);
  };

  const calculateTotalPrizeMoney = () => {
    return LOTTO.PRIZE_MONEY.reduce((acc, curr, currIdx) => {
      return acc + curr * props.amountOfRanks[currIdx];
    }, 0);
  };

  return {
    init(price) {
      props.lottos = LottoMachine.generateLottos(price);
    },

    getLottos() {
      return props.lottos.map(lotto => lotto.getNumbers());
    },

    initWinningNumbers({ luckyNumbers, bonusNumber }) {
      props.winningNumbers = { luckyNumbers, bonusNumber };
    },

    drawLotto() {
      props.lottos.forEach(lotto => {
        props.amountOfRanks[
          getRank(lotto.getNumbers(), props.winningNumbers)
        ] += 1;
      });

      return [...props.amountOfRanks];
    },

    calculateProfit() {
      const totalPrizeMoney = calculateTotalPrizeMoney();
      const totalBuyMoney = props.lottos.length * LOTTO.PRICE;

      return NumberHandler.roundOff((totalPrizeMoney / totalBuyMoney) * 100);
    },
  };
})();

export default LottoGame;
