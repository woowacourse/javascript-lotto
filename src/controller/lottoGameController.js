import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class LottoGameController {
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async play() {
    const lottoList = await this.setLotto();

    const winningLotto = await this.executeOrRetryAsync(
      this.getWinningLotto.bind(this),
    );

    const result = new LottoResult(lottoList, winningLotto);
    result.getResult();
  }

  async executeOrRetryAsync(asyncFn) {
    try {
      return await asyncFn();
    } catch (error) {
      OutputView.printError(error.message);
      return this.executeOrRetryAsync(asyncFn);
    }
  }

  async setLotto() {
    const purchaseAmount = await this.executeOrRetryAsync(
      this.getPurchaseAmount.bind(this),
    );

    return this.getLottoList(purchaseAmount);
  }

  async getPurchaseAmount() {
    const puchaseAmount = await this.#inputView.inputPurchaseAmount();
    purchaseAmountValidator.validate(puchaseAmount);

    this.#outputView.printPurchaseMessage(puchaseAmount);
    return Number(puchaseAmount);
  }

  async getLottoList(purchaseAmount) {
    const lottoMachine = new LottoMachine(purchaseAmount);
    const lottoList = lottoMachine.makeLottos();

    this.displayLottoList(lottoList);

    return lottoList;
  }

  displayLottoList(lottoList) {
    const lottoNumberList = lottoList.reduce((acc, cur) => {
      const numbers = cur.getNumbers();
      acc.push(numbers);
      return acc;
    }, []);

    this.#outputView.printLottos(lottoNumberList);
  }

  async getWinningLotto() {
    const winningLotto = await this.#inputView.inputWinningLottoNumber();
    const winningLottoNumbers = winningLotto
      .split(",")
      .map((number) => Number(number));

    const bonusNumber = await this.#inputView.inputBonusNumber();

    return new WinningLotto(winningLottoNumbers, bonusNumber);
  }
}

export default LottoGameController;
