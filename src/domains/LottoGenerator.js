const LOTTO_MIN_LENGTH = 1;
const LOTTO_MAX_LENGTH = 45;
const LOTTO_COUNT = 6;

class LottoGenerator {
  #generatedLottos;

  constructor(lottoTickets) {
    this.#generatedLottos = this.#generateRandomLottos(lottoTickets);
  }

  #makeRandomNumber() {
    return Math.floor(
      Math.random() * (LOTTO_MAX_LENGTH - LOTTO_MIN_LENGTH) + LOTTO_MIN_LENGTH,
    );
  }

  generateRandomLotto() {
    const lottoSet = new Set();
    while (lottoSet.size < LOTTO_COUNT) {
      const randomNumber = this.#makeRandomNumber();
      lottoSet.add(randomNumber);
    }
    return Array.from(lottoSet);
  }

  #generateRandomLottos(lottoTickets) {
    const generatedLottos = [];
    for (let ticket = 0; ticket < lottoTickets; ticket++) {
      generatedLottos.push(this.generateRandomLotto().sort());
    }

    return generatedLottos;
  }

  get generatedLottos() {
    return this.#generatedLottos;
  }
}

export default LottoGenerator;
