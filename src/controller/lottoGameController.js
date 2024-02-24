import { LOTTO_PRICE } from "../constants/lotto-constants.js";
import { RETRY_INPUT } from "../constants/view-messages.js";
import Lotto from "../domain/Lotto.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
import executeOrRetryAsync from "../utils/executeOrRetryAsync.js";
import CommonValidator from "../validator/CommonValidator.js";
import lottoNumberValidator from "../validator/LottoNumberValidator.js";
import purchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import WinningLottoGenerator from "./winningLottoGenerator.js";
import winningLottoGenerator from "./winningLottoGenerator.js";

class LottoGameController {
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async play() {
    const lottoList = await this.#setupLotto();
    const { winningLottoNumbers, bonusNumber } =
      await this.#createValidatedWinningLotto();

    this.#getGameResult({ lottoList, winningLottoNumbers, bonusNumber });

    const restart = await this.#inputView.readRestartGame();
    if (restart === RETRY_INPUT) this.play();
  }

  async #createValidatedWinningLotto() {
    const winningLottoGenerator = WinningLottoGenerator();
    const { winningLottoNumbers, bonusNumber } =
      await winningLottoGenerator.createWinningLotto();

    return { winningLottoNumbers, bonusNumber };
  }

  async #setupLotto() {
    const purchaseAmount = await executeOrRetryAsync({
      asyncFn: this.#getPurchaseAmount.bind(this),
      handleError: console.log,
    });

    return this.#getLottoList(purchaseAmount);
  }

  async #getPurchaseAmount() {
    const purchaseAmount = await this.#inputView.readPurchaseAmount();
    CommonValidator.validate(purchaseAmount);
    purchaseAmountValidator.validate(purchaseAmount);
    const lottoMachine = new LottoMachine(purchaseAmount);
    const lottoList = lottoMachine.makeLottos();
    this.#outputView.printPurchaseMessage(purchaseAmount);
    return Number(purchaseAmount);
  }

  async #getLottoList(purchaseAmount) {
    const lottoMachine = new LottoMachine(purchaseAmount);
    const lottoList = lottoMachine.makeLottos();

    this.#displayLottoList(lottoList);

    return lottoList;
  }

  #displayLottoList(lottoList) {
    const lottoNumberList = lottoList.reduce((acc, cur) => {
      const numbers = cur.getNumbers();
      acc.push(numbers);
      return acc;
    }, []);

    this.#outputView.printLottos(lottoNumberList);
  }

  // async #setWinningLotto() {
  //   const winningLottoWithoutBonusNumber =
  //     await this.#setWinningLottoWithoutBonusNumber();
  //   const winningLotto = await this.#setWinningLottoBonusNumber(
  //     winningLottoWithoutBonusNumber,
  //   );

  //   return winningLotto;
  // }

  // async #setWinningLottoWithoutBonusNumber() {
  //   const winningLottoWithoutBonusNumber = await executeOrRetryAsync({
  //     asyncFn: this.#getWinningLotto.bind(this),
  //     handleError: console.log,
  //   });

  //   return winningLottoWithoutBonusNumber;
  // }

  // async #setWinningLottoBonusNumber(winningLottoWithoutBonusNumber) {
  //   const winningLottoWithBonusNumber = await executeOrRetryAsync({
  //     asyncFn: () => this.#getBonusNumber(winningLottoWithoutBonusNumber),
  //     handleError: console.log,
  //   });
  //   return winningLottoWithBonusNumber;
  // }

  // async #getWinningLotto() {
  //   const winningLottoNumbers = await this.#inputView.readWinningLottoNumber();
  //   CommonValidator.validate(winningLottoNumbers);
  //   lottoNumberValidator.validate(winningLottoNumbers);
  //   const winningLotto = new Lotto(winningLottoNumbers);

  //   return winningLotto;
  // }

  // async #getBonusNumber(winningLotto) {
  //   const bonusNumber = await this.#inputView.readBonusNumber();
  //   const WinningLottoWithBonusNumber = new WinningLotto(
  //     winningLotto,
  //     Number(bonusNumber),
  //   );

  //   return WinningLottoWithBonusNumber;
  // }

  #getGameResult(lottoList, winningLottoNumbers) {
    const lottoResult = new LottoResult({
      lottoList,
      winningLottoNumbers,
      bonusNumber,
    });
    const totalResult = lottoResult.getTotalResult();
    const profit = lottoResult.getProfit(lottoList.length * LOTTO_PRICE);

    this.#outputView.printResult(totalResult);
    this.#outputView.printProfit(profit);
  }
}

export default LottoGameController;
