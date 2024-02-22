import InputView from '../view/InputView';
import LottoMachine from '../domain/LottoMachine';
import OutputView from '../view/OutputView';
import Money from '../domain/Money';
import { retryOnInvalidInput } from '../util/retryOnInvalidInput';
import calculateROI from '../util/calculateROI';
import { retryGame } from '../util/retryGame';

class LottoController {
  #lottoMachine;
  #money;

  async lottoGameStart() {
    await retryOnInvalidInput(async () => {
      await this.#insertMoney();
    });

    this.#lottoMachine = new LottoMachine(this.#money);

    this.#printPurchasedLottos(this.#money.count);

    await retryOnInvalidInput(async () => {
      await this.#insertWinnigNumbers();
    });

    await retryOnInvalidInput(async () => {
      await this.#insertBonusNumbers();
    });

    this.#calculateLottoResult();

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

  #printPurchasedLottos(count) {
    OutputView.printPurchasedLottoAmount(count);
    this.#lottoMachine.lottos.forEach(lotto => {
      OutputView.printLottoNumbers(lotto.lottoNumbers);
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
