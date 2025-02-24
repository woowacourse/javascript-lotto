import {
  getPurchaseAmountInput,
  getBonusNumberInput,
  getWinningNumbersInput,
  getRetryInput,
} from './View/inputView.js';
import { outputView } from './View/outputView.js';
import Validator from './View/Validation/Validator.js';
import { readUserInputUntilSuccess } from './View/utils.js';
import LottoManager from './Domain/Model/LottoManager.js';
import WinningLotto from './Domain/Model/WinningLotto.js';
import {
  calculateLottoTickets,
  calculateLottoPrize,
  calculateLottoProfit,
} from './Utils/calculateLotto.js';
class App {
  async #initializePurchaseAmount() {
    const purchaseAmountInput = await readUserInputUntilSuccess({
      readUserInput: getPurchaseAmountInput,
      formatter: (input) => {
        Validator.validatePurchaseAmount(input);
      },
    });
    return purchaseAmountInput;
  }

  async #initializeWinningNumbers() {
    const winningNumbersInput = await readUserInputUntilSuccess({
      readUserInput: getWinningNumbersInput,
      formatter: (input) => {
        Validator.validateWinningNumbers(input);
      },
    });
    return winningNumbersInput;
  }

  async #initializeBonusNumber(winningNumbersInput) {
    const bonusNumberInput = await readUserInputUntilSuccess({
      readUserInput: getBonusNumberInput,
      formatter: (input) => {
        Validator.validateBonusNumber(input, winningNumbersInput);
      },
    });
    return bonusNumberInput;
  }

  async #initializeRetry() {
    const retryInput = await readUserInputUntilSuccess({
      readUserInput: getRetryInput,
      formatter: (input) => {
        Validator.validateRetryInput(input);
      },
    });
    return retryInput;
  }

  async run() {
    const purchaseAmount = await this.#initializePurchaseAmount();

    const lottoManager = new LottoManager();
    const lottoTickets = calculateLottoTickets(purchaseAmount);

    outputView.printLottoCount(lottoTickets);

    lottoManager.makeLottoList(lottoTickets);
    outputView.printLottoList(lottoManager.getLottoList());

    const winningNumbers = await this.#initializeWinningNumbers();
    const bonusNumber = await this.#initializeBonusNumber(winningNumbers);

    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const lottoResult = lottoManager.compareWinningLotto(winningLotto);
    const totalLottoPrize = calculateLottoPrize(lottoResult);
    const lottoProfit = calculateLottoProfit(totalLottoPrize, purchaseAmount);

    outputView.printLottoResultInstruction();
    outputView.printLottoResult(lottoResult);
    outputView.printProfit(lottoProfit);

    await this.retryRun();
  }

  async retryRun() {
    const retry = await this.#initializeRetry();
    if (retry === 'y') {
      await this.run();
    }
  }
}
export default App;
