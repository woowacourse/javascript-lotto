import Lotto from "./Lotto.js";

class PurchasedLotto {
  #lottos;

  constructor(lottoNumbersList) {
    if (
      !Array.isArray(lottoNumbersList) ||
      lottoNumbersList.some((arr) => !Array.isArray(arr))
    )
      throw new Error("[ERROR]");

    this.#lottos = lottoNumbersList.map(
      (lottoNumbers) => new Lotto(lottoNumbers)
    );
  }

  getLottos() {
    return this.#lottos;
  }

  getLottoCount() {
    return this.#lottos.length;
  }

  getPrizeList(winningLotto) {
    const prizeList = [0, 0, 0, 0, 0, 0];
    this.#lottos.forEach((lotto) => {
      const rank = winningLotto.getRank(lotto);
      if (rank !== null && rank >= 1 && rank <= 5) prizeList[rank] += 1;
    });

    return prizeList;
  }
}

export default PurchasedLotto;
