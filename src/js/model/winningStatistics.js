import { findSameElementLength } from '../utils/array';
import { lottoTicket } from './lottoTicket';
import { userMoneyInput } from './userMoneyInput';

export const winningStatistics = {
  store: {
    matchThreeNumbers: 0,
    matchFourNumbers: 0,
    matchFiveNumbers: 0,
    matchFiveNumbersAndBonusBall: 0,
    matchSixNumbers: 0,
  },

  calculateLottoRank(winningNumber, bonusNumber) {
    const lottoTickets = lottoTicket.getLottoTickets();

    lottoTickets.forEach((lottoTicket) => {
      const countMatchWinningNumber = findSameElementLength(lottoTicket, winningNumber);
      const countMatchBonusNumber = lottoTicket.includes(bonusNumber) ? 1 : 0;

      switch (countMatchWinningNumber) {
        case 6:
          this.store.matchSixNumbers += 1;
          break;
        case 5:
          if (countMatchBonusNumber) {
            this.store.matchFiveNumbersAndBonusBall += 1;
            break;
          }
          this.store.matchFiveNumbers += 1;
          break;
        case 4:
          this.store.matchFourNumbers += 1;
          break;
        case 3:
          this.store.matchThreeNumbers += 1;
          break;
      }
    });
  },

  getProfitRate() {
    const profit =
      this.store.matchThreeNumbers * 5000 +
      this.store.matchFourNumbers * 50000 +
      this.store.matchFiveNumbers * 1500000 +
      this.store.matchFiveNumbersAndBonusBall * 30000000 +
      this.store.matchSixNumbers * 2000000000;

    return ((profit - userMoneyInput.store) / userMoneyInput.store) * 100;
  },

  initializeLottoRank() {
    this.store.matchThreeNumbers = 0;
    this.store.matchFourNumbers = 0;
    this.store.matchFiveNumbers = 0;
    this.store.matchFiveNumbersAndBonusBall = 0;
    this.store.matchSixNumbers = 0;
  },
};
