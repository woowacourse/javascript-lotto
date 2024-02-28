import InputView from './View/InputView';
import OutputView from './View/OutputView';
import LottoMachine from './Domain/LottoMachine';
import WinningLotto from './Domain/WinningLotto';
import retryOnFailureAsync from './Utils/retryOnFailureAsync';
import Money from './Domain/Money.js';

class LottoController {
  #lottoMachine = new LottoMachine();

  #winningLotto = new WinningLotto();

  #money = new Money();
  
  async run() {
    await retryOnFailureAsync(this.#readBuyingLottoMoney, this);
    this.#printBoughtLottos();
    await retryOnFailureAsync(this.#readWinLottoNumber, this);
    await retryOnFailureAsync(this.#readBonusNumber, this);
    this.#printRewardResult();
    this.#printRateOfReturn();
    await retryOnFailureAsync(this.#generateRetry, this);
  }

  async #readBuyingLottoMoney() {
    const moneyInput = await InputView.readMoney();
    this.#money.fromInputValue(moneyInput);
    const buyingMoney = this.#money.getMoney();
    this.#lottoMachine.makeLottoByMoney(buyingMoney);
  }

  #printBoughtLottos() {
    const boughtLottos = this.#lottoMachine.getLottos();
    OutputView.printBoughtLottoLength(boughtLottos.length);
    OutputView.printBoughtLottos(boughtLottos);
  }

  async #readWinLottoNumber() {
    const winLottoNumbers = await InputView.readWinLottoNumbers();
    this.#winningLotto.setWinLottoNumbers(winLottoNumbers);
  }

  async #readBonusNumber() {
    const bonusNumber = await InputView.readBonusNumber();
    this.#winningLotto.setBonusNumber(bonusNumber);
  }

  #printRewardResult() {
    const totalWinningLottoInfo = this.#winningLotto.getWinLottoNumbers();
    const rewardResult = this.#lottoMachine.getRewardResult(totalWinningLottoInfo);
    OutputView.printRewardResultHeader();
    OutputView.printRewardResult(rewardResult);
  }

  #printRateOfReturn() {
    const buyingMoney = this.#money.getMoney();
    const rateOfIncome = this.#lottoMachine.getRateOfIncome(buyingMoney);
    OutputView.printRateOfReturn(rateOfIncome);
  }

  async #generateRetry() {
    const isRetry = await InputView.readIsRetryRun();

    if (isRetry) {
      this.#initializeLottoApp();
      await this.run();
    }
  }

  #initializeLottoApp() {
    this.#lottoMachine = undefined;
  }
}

export default LottoController;
