import LottoMachine from './LottoMachine.js';
import { roundOff } from '../utils/numberHandler.js';
import LOTTO from '../constants/lotto.js';
import { RANK, RANKING_TABLE } from '../constants/ranks.js';

const LottoGame = (function () {
  const props = {
    lottos: [],
    amountOfRanks: [],
    winningNumbers: { luckyNumbers: [], bonusNumber: 0 },
    profit: 0,
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

  const drawLotto = () => {
    const amountOfRanks = Array.from({ length: 6 }, () => 0);

    props.lottos.forEach(lotto => {
      amountOfRanks[getRank(lotto.getNumbers(), props.winningNumbers)] += 1;
    });

    props.amountOfRanks = [...amountOfRanks];
  };

  const calculateProfit = () => {
    const totalPrizeMoney = calculateTotalPrizeMoney();
    const totalBuyMoney = props.lottos.length * LOTTO.PRICE;
    props.profit = roundOff((totalPrizeMoney / totalBuyMoney) * 100);
  };

  const calculateTotalPrizeMoney = () => {
    return LOTTO.PRIZE_MONEY.reduce((acc, curr, currIdx) => {
      return acc + curr * props.amountOfRanks[currIdx];
    }, 0);
  };

  return {
    initProps() {
      props.lottos = [];
      props.amountOfRanks = Array.from({ length: 6 }, () => 0);
      props.winningNumbers = { luckyNumbers: [], bonusNumber: 0 };
      props.profit = 0;
    },

    initLotto(price) {
      props.lottos = LottoMachine.generateLottos(price);
    },

    getLottos() {
      return props.lottos.map(lotto => lotto.getNumbers());
    },

    initWinningNumbers({ luckyNumbers, bonusNumber }) {
      props.winningNumbers = { luckyNumbers, bonusNumber };
    },

    getResult() {
      drawLotto();
      calculateProfit();

      return {
        amountOfRanks: props.amountOfRanks,
        profit: props.profit,
      };
    },
  };
})();

export default LottoGame;
