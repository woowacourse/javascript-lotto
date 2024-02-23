import Condition from '../constants/Condition';

const { MONEY, PRIZE, RANK, FORMATTING, BLANK } = Condition;

const StatisticsGenerator = {
  calculateAllPrize(lottoTickets, winningLotto) {
    const { winningNumbers, bonusNumber } = winningLotto;

    return lottoTickets.map((lottoTicket) =>
      lottoTicket.calculatePrize(winningNumbers, bonusNumber),
    );
  },

  calculateTotalReward(prizes) {
    return prizes.reduce(
      (acc, cur) =>
        (acc += cur !== RANK.LAST_PLACE ? PRIZE.find(([rank]) => rank === cur)[1].REWARD : BLANK),
      0,
    );
  },

  calculateReturnOnInvestment(prizes) {
    const totalReward = this.calculateTotalReward(prizes);
    const investment = prizes.length * MONEY.UNIT;
    const returnOnInvestment = (totalReward / investment) * FORMATTING.PERCENT;

    return Math.round(returnOnInvestment * FORMATTING.ROUND) / FORMATTING.ROUND;
  },
};

export default StatisticsGenerator;
