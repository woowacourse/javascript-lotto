import LottoMachine from "./Model/LottoMachine.js";
import Validate from "./Model/Validate.js";

class LottoGameManager {
  constructor() {
    this.price = 0;
    this.lottos = [];
    this.lottoMachine = new LottoMachine();
  }

  purchaseLotto(price) {
    Validate.validatePrice(price);
    this.price = price;
    this.lottos = this.lottoMachine.generateLotto(this.price);
  }

  getLottos() {
    return this.lottos;
  }

  getPrice() {
    return this.price;
  }

  resetGame() {
    this.price = 0;
    this.lottos = [];
  }
}

export default LottoGameManager;
