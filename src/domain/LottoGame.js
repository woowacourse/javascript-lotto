const generateLottoNumbers = require('./LottoNumbersGenerator');
const LottoTicket = require('./LottoTicket');

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
}

module.exports = LottoGame;
