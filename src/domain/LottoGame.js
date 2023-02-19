const generateLottoNumbers = require('./LottoNumbersGenerator');
const LottoTicket = require('./LottoTicket');
const Converter = require('../util/Converter');
const { LOTTO, LOTTO_RANK, RANK_NAME } = require('../constants');

class LottoGame {
  #lottoTickets;
  #rankResult;

  constructor(userBudget) {
    this.#lottoTickets = Array.from(
      { length: userBudget / LOTTO.PRICE },
      () => new LottoTicket(Converter.sortAscending(generateLottoNumbers()))
    );
    this.#rankResult = {
      [LOTTO_RANK.FIRST.NAME]: 0,
      [LOTTO_RANK.SECOND.NAME]: 0,
      [LOTTO_RANK.THIRD.NAME]: 0,
      [LOTTO_RANK.FOURTH.NAME]: 0,
      [LOTTO_RANK.FIFTH.NAME]: 0,
    };
  }

  getLottoTickets() {
    return this.#lottoTickets.map((lottoTicket) => lottoTicket.getNumbers());
  }

  getLottoRankResult(winningNumbers, bonusNumber) {
    this.#lottoTickets.forEach((lottoTicket) => {
      const rankName = this.getLottoRankName(
        lottoTicket.countMatchedNumbers(winningNumbers),
        lottoTicket.hasBonusNumber(bonusNumber)
      );

      this.countLottoRank(rankName);
    });

    return this.#rankResult;
  }

  getLottoRankName(matchedNumberCount, hasBonusNumber) {
    const rankName = RANK_NAME[matchedNumberCount];

    if (!rankName) return;
    if (matchedNumberCount === LOTTO_RANK.SECOND.MATCHED_NUMBER_COUNT && hasBonusNumber) {
      return LOTTO_RANK.SECOND.NAME;
    }
    return rankName;
  }

  countLottoRank(rankName) {
    if (!rankName) return;
    this.#rankResult[rankName] += 1;
  }

  calculateTotalPrize() {
    return Object.entries(this.#rankResult).reduce((totalPrize, [rankName, rankCount]) => {
      return totalPrize + rankCount * LOTTO_RANK[rankName.toUpperCase()].PRIZE;
    }, 0);
  }

  calculateProfitRate(totalPrize) {
    const userBudget = LOTTO.PRICE * this.#lottoTickets.length;
    return Converter.toFixedNumber((totalPrize / userBudget) * 100, 1);
  }
}

module.exports = LottoGame;
