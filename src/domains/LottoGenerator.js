import makeRandomInRange from '../utils/makeRandomInRange';
import LOTTO_RULES from '../constants/lotto-rules';

class LottoGenerator {
  #generatedLottos;

  constructor(ticketCount) {
    this.#generatedLottos = this.#generateLottosByTicketCount(ticketCount);
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

  #generateLottosByTicketCount(ticketCount) {
    return Array.from({ length: ticketCount }, () => this.generateLotto());
  }

  get generatedLottos() {
    return this.#generatedLottos;
  }
}

export default LottoGenerator;
