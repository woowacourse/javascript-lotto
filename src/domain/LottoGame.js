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

  issueLottoes(purchaseAmount) {
    const lottoCount = this.#lottoStore.calculateLottoCount(purchaseAmount);
    const randomNumbers = this.#lottoStore.generateLottosNumbers(lottoCount);
    const lottoes = this.#lottoStore.issueLottoes(randomNumbers);

    return lottoes;
  }

  generateWinningLotto(winningNumbers, bonusNumber) {
    return new WinningLotto(winningNumbers, bonusNumber);
  }

  drawLotto(lottoes, winningLotto) {
    const rankings = this.#lottoDrawingMachine.draw(lottoes, winningLotto);
    const totalProfitRate =
      this.#lottoDrawingMachine.calculateTotalProfitRate(rankings);

    return { rankings, totalProfitRate };
  }
}

export default LottoGame;
