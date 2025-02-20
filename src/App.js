import {
  getPurchaseAmountInput,
  getBonusNumberInput,
  getWinningNumbersInput,
  getRetryInput,
} from './View/inputView.js';
import { readUserInputUntilSuccess, convertFormat } from './View/utils.js';
import {
  validateEmptySpace,
  validatePurchaseAmount,
  validateEmptySpaceInWinningNumbers,
  validateWinningNumbers,
  validateBonusNumber,
  validateYorN,
} from './View/Validation/inputView.js';
import LottoManager from './Domain/Model/LottoManager.js';
import WinningLotto from './Domain/Model/WinningLotto.js';
import { outputView } from './View/outputView.js';
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
    });
    return bonusNumberInput;
  }

  async run() {
    const purchaseAmount = await this.#initializePurchaseAmount();

    const lottoManager = new LottoManager();
    const lottoCounts = lottoManager.purchaseLotto(purchaseAmount);

    outputView.printLottoCount(lottoCounts);

    lottoManager.makeLottoList(lottoCounts);
    // console.log('lottoManager.getLottoList()', lottoManager.getLottoList());
    // TODO: ${lottoCounts}개를 구매했습니다.
    // TODO: lotto 구매한만큼(lottoList) 보여주기

    const winningNumbers = await this.#initializeWinningNumbers();
    const bonusNumber = await this.#initializeBonusNumber(winningNumbers);

    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const lottoResult = lottoManager.compareWinningLotto(winningLotto);
    const totalLottoPrize = lottoManager.calculatePrize(lottoResult);
    const lottoProfit = lottoManager.calculateProfit(
      totalLottoPrize,
      purchaseAmount
    );

    outputView.printLottoResultInstruction();
    outputView.printLottoResult(lottoResult);
    outputView.printProfit(lottoProfit);
  }

  async retryRun() {
    const retry = await getRetryInput();
  }
}
export default App;
