const Console = require('../utils/Console');
const {
  MAGIC_NUMBER,
  MAGIC_LITERAL,
  RANK_INFORMATIONS,
} = require('../constant');

const outputView = {
  printLottoCount(count) {
    Console.print(`${count}개를 구매했습니다.`);
  },

  printLotto(lotto) {
    Console.print(`[${lotto.join(MAGIC_LITERAL.separator)}]`);
  },

  printResultTitle() {
    Console.print('당첨 통계\n--------------------\n');
  },

  printResult(ranks) {
    const result = ranks.reduce((accumulator, rankCount, rankIndex) => {
      return `${this.getResultLine(rankIndex, rankCount)}\n${accumulator}`;
    }, '');
    Console.print(result);
  },

  printBenefit(rate) {
    Console.print(`총 수익률은 ${rate.toLocaleString()}%입니다.`);
  },

  getResultLine(rank, rankCount) {
    if (rank === MAGIC_NUMBER.secondRankIndex) {
      return `${
        RANK_INFORMATIONS[rank].matchedCount
      }개 일치, 보너스 볼 일치 (${RANK_INFORMATIONS[
        rank
      ].reward.toLocaleString()}원) - ${rankCount}개`;
    }
    return `${RANK_INFORMATIONS[rank].matchedCount}개 일치 (${RANK_INFORMATIONS[
      rank
    ].reward.toLocaleString()}원) - ${rankCount}개`;
  },
};

module.exports = outputView;
