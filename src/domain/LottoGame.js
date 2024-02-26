import LottoDrawingMachine from "./LottoDrawingMachine";
import LottoStore from "./LottoStore";
import WinningLotto from "./WinningLotto";

class LottoGame {
  #lottoStore;
  #lottoDrawingMachine;

  constructor() {
    this.#lottoStore = new LottoStore();
    this.#lottoDrawingMachine = new LottoDrawingMachine();
  }

  issueLottos(purchaseAmount) {
    const lottoCount = this.#lottoStore.calculateLottoCount(purchaseAmount);
    console.log(lottoCount);
    const randomNumbers = this.#lottoStore.generateLottosNumbers(lottoCount);
    console.log(randomNumbers);
    const lottos = this.#lottoStore.issueLottos(randomNumbers);

    return lottos;
  }

  generateWinningLotto(winningNumbers, bonusNumber) {
    return new WinningLotto(winningNumbers, bonusNumber);
  }

  drawLotto(lottos, winningLotto) {
    const rankings = this.#lottoDrawingMachine.draw(lottos, winningLotto);
    const totalProfitRate =
      this.#lottoDrawingMachine.calculateTotalProfitRate(rankings);

    return { rankings, totalProfitRate };
  }
}

export default LottoGame;
