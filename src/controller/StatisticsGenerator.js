import Condition from '../constants/Condition';

const {
  MONEY, PRIZE, RANK, FORMATTING, BLANK,
} = Condition;

const StatisticsGenerator = {
  calculateAllPrize(lottoTickets, winningLotto) {
    const { winningNumbers, bonusNumber } = winningLotto;

    return lottoTickets.map((lottoTicket) => lottoTicket.calculatePrize(winningNumbers, bonusNumber));
  },

  calculateReturnOnInvestment(prizes) {
    const totalReward = prizes.reduce(
      (acc, cur) => (acc += cur !== RANK.LAST_PLACE ? PRIZE.find(([rank]) => rank === cur)[1].REWARD : BLANK),
      0,
    );

    const { PERCENT, ROUND } = FORMATTING;
    return Math.round((totalReward / (prizes.length * MONEY.UNIT)) * PERCENT * ROUND) / ROUND;
  },
};

export default StatisticsGenerator;
