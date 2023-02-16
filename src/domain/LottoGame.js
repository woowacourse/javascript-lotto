const generateLottoNumbers = require('./LottoNumbersGenerator');
const LottoTicket = require('./LottoTicket');
const Converter = require('../util/Converter');

class LottoGame {
  #userBudget;
  #lottoTickets;

  constructor(userBudget) {
    this.#userBudget = userBudget;
    this.#lottoTickets = Array.from(
      { length: userBudget / 1000 },
      () => new LottoTicket(Converter.sortAscending(generateLottoNumbers()))
    );
  }

  getLottoRank(matchedNumberCount, hasBonusNumber) {
    const rank = Rank[matchedNumberCount];
    if (matchedNumberCount === 5 && hasBonusNumber) return 2;
    if (rank === undefined) return 0;
    return rank;
  }
}

module.exports = LottoGame;
