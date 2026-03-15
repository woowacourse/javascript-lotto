import { LottoMachine } from "./LottoMachine.js";

class App {
  #input;
  #output;

  constructor(input, output) {
    this.#input = input;
    this.#output = output;
  }

  async run() {
    while (true) {
      const amount = await this.#input.reRead(this.#input.readPurchaseAmount);
      const lottoMachine = new LottoMachine(amount);
      this.#showPurchaseLotto(lottoMachine);
      // const winningLotto = await this.#getWinningLotto();
      // this.#showMatchResult(lottoMachine, winningLotto);
      // const restart = await this.#input.reRead(this.#input.readRetry);
      // if (restart === "n") break;
    }
  }

  #showPurchaseLotto(lottoMachine) {
    this.#output.printPurchaseLottoCount(lottoMachine.getPurchaseCount());
    this.#output.printLottos(lottoMachine.getLottos());
  }

  // #showMatchResult(lottoMachine, winningLotto) {
  //   lottoMachine.calculateMatchResult(
  //     winningLotto.getLottoNumber(),
  //     winningLotto.getBonusNumber(),
  //   );
  //   this.#output.printResult(
  //     lottoMachine.getMatchResult(),
  //     lottoMachine.getRateOfReturn(),
  //   );
  // }

  // async #getWinningLotto() {
  //   const winningLottoNumber = (
  //     await this.#input.reRead(this.#input.readWinningLottoNumber)
  //   ).getLottoNumber();
  //   const winningLotto = await this.#input.reRead(
  //     this.#input.readBonusNumber,
  //     winningLottoNumber,
  //   );

  //   return winningLotto;
  // }
}

export default App;
