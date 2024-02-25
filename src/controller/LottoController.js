import InputView from '../view/InputView';
import LottoMachine from '../domain/LottoMachine';
import OutputView from '../view/OutputView';
import Money from '../domain/Money';
import retryOnInvalidInput from '../util/retryOnInvalidInput';
import calculateROI from '../util/calculateROI';
import retryGame from '../util/retryGame';

class LottoController {
  #lottoMachine;

  #money;

  async lottoGameStart() {
    await this.handleMoneyInsertion();
    this.#printPurchasedLottos();
    await this.handleWinningNumbersInsertion();
    await this.handleBonusNumbersInsertion();

    this.#calculateLottoResult();

    await this.retryGame();
  }

  async handleMoneyInsertion() {
    await retryOnInvalidInput(async () => {
      await this.#insertMoney();
    });

    this.#lottoMachine = new LottoMachine(this.#money.count);
  }

  async handleWinningNumbersInsertion() {
    await retryOnInvalidInput(async () => {
      await this.#insertWinnigNumbers();
    });
  }

  async handleBonusNumbersInsertion() {
    await retryOnInvalidInput(async () => {
      await this.#insertBonusNumbers();
    });
  }

  async retryGame() {
    await retryGame(async () => {
      await this.lottoGameStart();
    });
  }

  async #insertMoney() {
    const inputMoney = await InputView.readMoney();
    const validatedMoney = new Money(inputMoney);

    this.#money = validatedMoney;
  }

  async #insertWinnigNumbers() {
    const inputWinningNumber = await InputView.readWinnigNumbers();

    this.#lottoMachine.winningLotto = inputWinningNumber;
  }

  async #insertBonusNumbers() {
    const inputBonusNumber = await InputView.readBonusNumber();

    this.#lottoMachine.bonusNumber = inputBonusNumber;
  }

  #printPurchasedLottos() {
    OutputView.printPurchasedLottoAmount(this.#money.count);
    this.#lottoMachine.lottos.forEach((lotto) => {
      OutputView.printLottoNumbers(lotto);
    });
  }

  #calculateLottoResult() {
    const lottoRanks = this.#lottoMachine.countLottoRanks();
    OutputView.printResultNotice();
    lottoRanks.forEach((lottoRank, idx) => {
      OutputView.printLottoResult(lottoRank, idx);
    });

    const totalProfitRate = calculateROI(this.#money, lottoRanks);
    OutputView.printTotalProfitRate(totalProfitRate);
  }
}

export default LottoController;
