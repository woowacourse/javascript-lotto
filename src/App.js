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
} from './View/Validation/inputView.js';
import LottoManager from './Domain/Model/LottoManager.js';

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
    return purchaseAmountInput
  }
  
  async #initializeWinningNumbers (){
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
    return winningNumbersInput,
  }

  async #initializeBonusNumbers(){
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
    const purchaseAmountInput = await this.#initializePurchaseAmount(); 

    const lottoManager = new LottoManager();
    const lottoCounts = lottoManager.purchaseLotto(purchaseAmountInput)
    lottoManager.makeLottoList(lottoCounts);
    // TODO: ${lottoCounts}개를 구매했습니다. view
    // TODO: lotto 구매한만큼(lottoList) 보여주기
    
    const winningNumbersInput = await this.#initializeBonusNumbers();
    
    const bonusNumberInput = await this.#initializeBonusNumbers();


  }

  async retryRun() {
    const retry = await getRetryInput();
  }
}
export default App;
