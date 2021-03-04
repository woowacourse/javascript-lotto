import { LOTTO_NUMBER_COUNT, BONUS_NUMBER_COUNT, PRIZE_MONEY, UNIT_AMOUNT } from '../utils/constants.js';

export default class ProfitCalculator {
  getResult(winningNumbers, tickets) {
    const rankCounts = this.getRankCounts([...winningNumbers], tickets);
    const earningRate = this.calculateEarningRate(rankCounts, tickets);

    return {
      rankCounts,
      earningRate,
    };
  }

  getRankCounts(winningNumbers, tickets) {
    const rankCount = [0, 0, 0, 0, 0, 0];
    const bonusNumber = winningNumbers.pop();
    const mainNumbers = winningNumbers;

    tickets.forEach(ticket => {
      const rank = this.getRank(ticket, mainNumbers, bonusNumber);

      if (PRIZE_MONEY[rank]) {
        rankCount[rank]++;
      }
    });

    return rankCount;
  }

  getRank(ticket, mainNumbers, bonusNumber) {
    let matchCount = 0;
    let matchBonus = false;
    let winningNumberCount = LOTTO_NUMBER_COUNT + BONUS_NUMBER_COUNT;

    ticket.numbers.forEach(number => {
      if (bonusNumber === number) {
        matchBonus = true;

        return;
      }
      if (mainNumbers.includes(number)) {
        matchCount++;
      }
    });

    return matchCount === 6 || (matchCount === 5 && matchBonus === true)
      ? winningNumberCount - matchCount
      : winningNumberCount - matchCount + 1;
  }

  calculateEarningRate(rankCounts, tickets) {
    const insertion = tickets.length * UNIT_AMOUNT;
    const earningRate = (this.calculateEarning(rankCounts, insertion) / insertion) * 100;

    return Number.isInteger(earningRate) ? earningRate : earningRate.toFixed(2);
  }

  calculateEarning(rankCounts, insertion) {
    return rankCounts.reduce((earning, count, rank) => {
      if (rank === 0) {
        return earning;
      }

      return (earning += PRIZE_MONEY[rank] * count);
    }, -insertion); // 수익 = 당첨금 - 투입금
  }
}
