import generateLottoNumbers from './LottoNumbersGenerator';
import LottoTicket from './LottoTicket';
import Converter from '../util/Converter';
import { LOTTO, LOTTO_RANK } from '../constants/constants';

const Rank = {
  [LOTTO_RANK.FIRST.MATCHED_NUMBERS]: 1,
  [LOTTO_RANK.THIRD.MATCHED_NUMBERS]: 3,
  [LOTTO_RANK.FOURTH.MATCHED_NUMBERS]: 4,
  [LOTTO_RANK.FIFTH.MATCHED_NUMBERS]: 5,
};

class LottoGame {
  #userBudget;
  #lottoTickets;

  constructor(userBudget) {
    this.#userBudget = userBudget;
    this.#lottoTickets = Array.from(
      { length: userBudget / LOTTO.PRICE },
      () => new LottoTicket(Converter.sortAscending(generateLottoNumbers()))
    );
  }

  getLottoTickets() {
    return this.#lottoTickets.map((lottoTicket) => lottoTicket.getNumbers());
  }

  countLottoRanks(winningNumbers, bonusNumber) {
    const lottoRanksCount = [0, 0, 0, 0, 0, 0];
    this.#lottoTickets.forEach((lottoTicket) => {
      lottoRanksCount[
        this.getLottoRank(
          lottoTicket.countMatchedNumbers(winningNumbers),
          lottoTicket.hasBonusNumber(bonusNumber)
        )
      ] += 1;
    });
    return lottoRanksCount;
  }

  getLottoRank(matchedNumberCount, hasBonusNumber) {
    const rank = Rank[matchedNumberCount];
    if (matchedNumberCount === 5 && hasBonusNumber) return 2;
    if (rank === undefined) return 0;
    return rank;
  }

  calculateTotalPrize(lottoRanksCount) {
    const prizeMoneys = [0, 2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000];

    return lottoRanksCount.reduce(
      (totalPrize, rankCount, rank) => totalPrize + rankCount * prizeMoneys[rank],
      0
    );
  }

  calculateProfitRate(totalPrize) {
    return Converter.toFixedNumber((totalPrize / this.#userBudget) * 100, 1);
  }
}

export default LottoGame;
