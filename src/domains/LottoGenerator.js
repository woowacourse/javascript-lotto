import LOTTO_RULES from '../constants/lotto-rules';

class LottoGenerator {
  #generatedLottos;

  constructor(lottoTickets) {
    this.#generatedLottos = this.#generateRandomLottos(lottoTickets);
  }

  #makeRandomNumber() {
    return Math.floor(
      Math.random() * (LOTTO_RULES.maxLength - LOTTO_RULES.minLength) +
        LOTTO_RULES.minLength,
    );
  }

  generateRandomLotto() {
    const lottoSet = new Set();
    while (lottoSet.size < LOTTO_RULES.winningNumbersLength) {
      const randomNumber = this.#makeRandomNumber();
      lottoSet.add(randomNumber);
    }

    return Array.from(lottoSet);
  }

  #generateRandomLottos(lottoTickets) {
    const generatedLottos = [];
    for (let ticket = 0; ticket < lottoTickets; ticket++) {
      generatedLottos.push(this.generateRandomLotto().sort((a, b) => a - b));
    }

    return generatedLottos;
  }

  get generatedLottos() {
    return this.#generatedLottos;
  }
}

export default LottoGenerator;
