import makeRandomInRange from '../utils/makeRandomInRange';
import LOTTO_RULES from '../constants/lotto-rules';

class LottoGenerator {
  #generatedLottos;

  constructor(lottoTickets) {
    this.#generatedLottos = this.#generateLottosByTicketCount(lottoTickets);
  }

  generateLotto() {
    const { winningNumbersLength, minLength, maxLength } = LOTTO_RULES;
    const lottoSet = new Set();

    while (lottoSet.size < winningNumbersLength) {
      const randomNumber = makeRandomInRange(minLength, maxLength);
      lottoSet.add(randomNumber);
    }
    return Array.from(lottoSet).sort((a, b) => a - b);
  }

  #generateLottosByTicketCount(lottoTickets) {
    const generatedLottos = [];
    for (let ticket = 0; ticket < lottoTickets; ticket++) {
      generatedLottos.push(this.generateLotto());
    }
    return generatedLottos;
  }

  get generatedLottos() {
    return this.#generatedLottos;
  }
}

export default LottoGenerator;
