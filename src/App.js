import {
  getPurchaseAmountInput,
  getBonusNumberInput,
  getWinningNumbersInput,
  getRetryInput,
} from './View/inputView.js';
import { readUserInputUntilSuccess, convertFormat } from './View/utils.js';
import Lotto from './Domain/Model/Lotto.js';
import LottoMachine from './Domain/Model/LottoMachine.js';
import WinningLotto from './Domain/Model/WinningLotto.js';
import LottoManager from './Domain/Model/LottoManager.js';
import { outputView } from './View/outputView.js';
import { validatePurchaseAmount } from './View/Validation/purchaseAmount.js';
import {
  validateEmptySpaceInWinningNumbers,
  validateWinningNumbers,
} from './View/Validation/winningNumbers.js';
import { validateBonusNumber } from './View/Validation/bonusNumber.js';
import { validateYorN } from './View/Validation/retry.js';
import { validateEmptySpace } from './View/Validation/util.js';

class App {
  async #initializePurchaseAmount() {
    const purchaseAmountInput = await readUserInputUntilSuccess({
      readUserInput: getPurchaseAmountInput,
      formatter: (input) => {
        validateEmptySpace(input);
        const convertedInput = convertFormat.toNumber(input);
        validatePurchaseAmount(convertedInput);
        return convertedInput;
      },
      onError: (error) => outputView.printErrorMessage(error),
    });
    return purchaseAmountInput;
  }

  async #initializeWinningNumbers() {
    const winningNumbersInput = await readUserInputUntilSuccess({
      readUserInput: getWinningNumbersInput,
      formatter: (input) => {
        validateEmptySpace(input);
        const splittedInput = convertFormat.splitByComma(input);

        validateEmptySpaceInWinningNumbers(splittedInput);
        const numbers = splittedInput.map(Number);
        validateWinningNumbers(numbers);
        return numbers;
      },
      onError: (error) => outputView.printErrorMessage(error),
    });
    return winningNumbersInput;
  }

  async #initializeBonusNumber(winningNumbersInput) {
    const bonusNumberInput = await readUserInputUntilSuccess({
      readUserInput: getBonusNumberInput,
      formatter: (input) => {
        validateEmptySpace(input);
        const convertedInput = convertFormat.toNumber(input);
        validateBonusNumber(convertedInput, winningNumbersInput);
        return convertedInput;
      },
      onError: (error) => outputView.printErrorMessage(error),
    });
    return bonusNumberInput;
  }

  async #initializeRetry() {
    const retryInput = await readUserInputUntilSuccess({
      readUserInput: getRetryInput,
      formatter: (input) => {
        validateEmptySpace(input);
        validateYorN(input);
        return input;
      },
      onError: (error) => outputView.printErrorMessage(error),
    });
    return retryInput;
  }

  async run() {
    const purchaseAmount = await this.#initializePurchaseAmount();
    const { lottoCounts, lottoNumbersList, lottoList } =
      this.buyLottos(purchaseAmount);

    outputView.printLottoCount(lottoCounts);
    outputView.printLottoList(lottoNumbersList);

    const winningNumbers = await this.#initializeWinningNumbers();
    const bonusNumber = await this.#initializeBonusNumber(winningNumbers);

    const winningLotto = new WinningLotto(
      new Lotto(winningNumbers),
      bonusNumber,
    );

    const { lottoResult, lottoProfit } = this.getLottoResult(
      winningLotto,
      lottoList,
    );

    outputView.printLottoResultInstruction();
    outputView.printLottoResult(lottoResult);
    outputView.printProfit(lottoProfit);

    await this.retryRun();
  }

  buyLottos(purchaseAmount) {
    const lottoMachine = new LottoMachine();
    const lottoCounts = lottoMachine.purchaseLotto(purchaseAmount);
    lottoMachine.makeLottoList(lottoCounts);
    const lottoNumbersList = lottoMachine.getLottoNumbersList();
    const lottoList = lottoMachine.getLottoList();
    return { lottoCounts, lottoNumbersList, lottoList };
  }

  getLottoResult(winningLotto, lottoList) {
    const lottoManager = new LottoManager(winningLotto, lottoList);
    const lottoResult = lottoManager.compareWinningLotto();
    const totalLottoPrize = lottoManager.calculatePrize(lottoResult);
    const lottoProfit = lottoManager.calculateProfit(totalLottoPrize);
    return { lottoResult, lottoProfit };
  }

  async retryRun() {
    const retry = await this.#initializeRetry();
    if (retry === 'y') {
      await this.run();
    }
  }
}
export default App;
