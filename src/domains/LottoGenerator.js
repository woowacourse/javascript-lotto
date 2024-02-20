const LOTTO_MIN_LENGTH = 1;
const LOTTO_MAX_LENGTH = 45;
const LOTTO_COUNT = 6;

class LottoGenerator {
  constructor(lottoTickets) {
    this.lottoTickets = lottoTickets;
  }

  #generateRandomNumber() {
    return Math.floor(
      Math.random() * (LOTTO_MAX_LENGTH - LOTTO_MIN_LENGTH) + LOTTO_MIN_LENGTH,
    );
  }

  generateRandomLottos() {
    const lottoSet = new Set();
    while (lottoSet.size < LOTTO_COUNT) {
      const randomNumber = this.#generateRandomNumber();
      lottoSet.add(randomNumber);
    }
    return Array.from(lottoSet);
  }
}

export default LottoGenerator;
