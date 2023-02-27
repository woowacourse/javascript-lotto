const Lotto = require('../../domain/model/Lotto');
const { pickRandomNumberInRange } = require('..');
const {
  LOTTO_NUMBER,
  CALCULATION_NUMBER,
  RANK_INFORMATIONS,
} = require('../../constant');
const Benefit = require('../../domain/model/Benefit');

const lottoUtils = {
  generateLottos(amount) {
    const lottoCount = amount / LOTTO_NUMBER.moneyUnit;
    new Lotto();
    return Array.from({ length: lottoCount }).map(
      () => new Lotto(lottoUtils.getComposedLottoNumbers())
    );
  },

  getBenefitRate: (money, ranks) => {
    const benefit = new Benefit();
    benefit.calculateRate(money, ranks);

    return benefit.getRate();
  },

  getComposedLottoNumbers() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < LOTTO_NUMBER.lottoNumberCount) {
      const randomNumber = pickRandomNumberInRange(
        LOTTO_NUMBER.lottoStart,
        LOTTO_NUMBER.lottoEnd
      );
      lottoNumbers.add(randomNumber);
    }

    return [...lottoNumbers].sort((first, second) => first - second);
  },

  getCollectedRanks(winning, lottos) {
    const RANK_TEMPLATE = [0, 0, 0, 0, 0];

    const ranks = lottos.reduce((accumulator, lotto) => {
      const currentRanks = accumulator;
      const matchedCount = lottoUtils.getMatchedCount(
        winning,
        lotto.getLottoNumbers()
      );
      const rankIndex = lottoUtils.getRankIndex(
        matchedCount,
        lottoUtils.isBonus(winning, lotto.getLottoNumbers())
      );

      return lottoUtils.getUpdatedRanks(currentRanks, rankIndex);
    }, RANK_TEMPLATE);

    return ranks;
  },

  getUpdatedRanks(ranks, rankIndex) {
    const updatedRanks = ranks;

    if (rankIndex !== CALCULATION_NUMBER.losing) {
      updatedRanks[rankIndex] += 1;
    }

    return updatedRanks;
  },

  getMatchedCount(winning, lotto) {
    const winningNumbers = winning.getWinningNumbers();

    return lotto.filter((number) => winningNumbers.includes(number)).length;
  },

  getRankIndex(matchedCount, isBonus) {
    const rankIndex = RANK_INFORMATIONS.findIndex(
      (rankInformation) =>
        rankInformation.isBonus === isBonus &&
        rankInformation.matchedCount === matchedCount
    );
    if (rankIndex === CALCULATION_NUMBER.failFindIndex) {
      return CALCULATION_NUMBER.losing;
    }

    return rankIndex;
  },

  isBonus(winning, lotto) {
    return lotto.includes(winning.getBonusNumber());
  },
};

module.exports = lottoUtils;
