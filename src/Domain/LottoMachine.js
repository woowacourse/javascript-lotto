import Lotto from "./Lotto.js";

class LottoMachine {
  issueLottos(purchasePrice) {
    const ticketsCount = purchasePrice / 1000;

    return Array.from({ length: ticketsCount }, () => this.#createLotto());
  }

  #createLotto() {
    const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
      1,
      45,
      6,
    ).sort((a, b) => a - b);

    return new Lotto(lottoNumbers);
  }
}

export default LottoMachine;
