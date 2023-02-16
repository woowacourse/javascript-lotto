const {
  RANK_INFORMATIONS,
  MAGIC_NUMBER,
  MAGIC_LITERAL,
} = require('../constant');
const Console = require('../utils/Console');

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
