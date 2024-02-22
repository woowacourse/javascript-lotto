import LottoStore from "./domain/LottoStore";
import InputView from "./view/InputView";
import OutputView from "./view/OutputView";

class App {
  #lottoStore;

  constructor() {
    this.#lottoStore = new LottoStore();
  }

  async play() {
    const lottos = await this.#purchaseLottos();
    OutputView.printLottos(lottos);
  }

  async #purchaseLottos() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    const lottoCount = this.#lottoStore.calculateLottoCount(purchaseAmount);
    const randomNumbers = this.#lottoStore.generateRandomNumbers(lottoCount);
    const lottos = this.#lottoStore.issueLottos(randomNumbers);

    return lottos;
  }
}

export default App;
