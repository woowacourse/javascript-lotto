import LOTTO_RULES from '../constants/lotto-rules';
import makeRandomNumber from '../utils/getRandomNumber';

const { maxLength, minLength, winningNumbersLength } = LOTTO_RULES;

class LottoGenerator {
  #generatedLottos;

  constructor(lottoTickets) {
    this.#generatedLottos = this.#generateAllLottos(lottoTickets);
  }

  generateRandomLotto() {
    const lottoSet = new Set();
    while (lottoSet.size < winningNumbersLength) {
      const randomNumber = makeRandomNumber(maxLength, minLength);
      lottoSet.add(randomNumber);
    }

    return Array.from(lottoSet).sort((a, b) => a - b);
  }

  #generateAllLottos(lottoTickets) {
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
