import LottoStore from "../domain/LottoStore";

class WebController {
  #lottoStore;

  constructor() {
    this.#lottoStore = new LottoStore();
  }

  purchaseLottos(purchaseAmount) {
    try {
      const lottoCount = this.#lottoStore.calculateLottoCount(purchaseAmount);
      const randomNumbers = this.#lottoStore.generateRandomNumbers(lottoCount);
      this.#lottoStore.issueLottos(randomNumbers);

      return this.#lottoStore.lottos;
    } catch (error) {
      alert(error.message);
    }
  }
}

export default WebController;
