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

  calculateProfitRate(winningNumbers, bonusNumber) {
    this.#lottoStore.setWinningLotto(winningNumbers, bonusNumber);
    const rankings = this.#lottoStore.checkRanking();
    const totalProfitRate = this.#lottoStore.getTotalProfitRate(rankings);
    const totalRanking = this.#lottoStore.calculateTotalRanking(rankings);

    return { totalRanking, totalProfitRate };
  }
}

export default WebController;
