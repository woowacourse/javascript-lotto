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

/** STEP2 ByWeb */
import { getPurchaseAmountInputByWeb } from './View/inputViewByWeb.js';
import { outputViewByWeb } from './View/outputViewByWeb.js';
import { createWinningLottoForm } from './View/createDom.js';

const validateAndFormatPurchaseAmountInput = (input) => {
  validateEmptySpace(input);
  const convertedInput = convertFormat.toNumber(input);
  validatePurchaseAmount(convertedInput);
  return convertedInput;
};

class App {
  #state = {};

  #eventHandler = {};

  constructor() {
    this.#eventHandler = {
      submit: this.#submitEventHandler(),
      click: this.#clickEventHandler(),
      keydown: this.#keyEventHandler(),
    };
  }

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
    console.log('lottoCounts', lottoCounts);
    console.log('lottoMachine', lottoMachine);
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

  #submitEventHandler() {
    return (event) => {
      event.preventDefault();

      const $target = event.target;
      if ($target.id === 'lottoPurchaseForm') {
        this.#purchaseLottosByWeb($target);
      }
      if ($target.id === 'winningLottoForm') {
        this.#purchaseWinningLottoByWeb($target);
      }
    };
  }

  #clickEventHandler() {
    return (event) => {
      const $target = event.target;
      if (
        $target.id === 'modalCloseButton' ||
        $target.id === 'modalOverlay' ||
        $target.closest('#modalCloseButton')?.id === 'modalCloseButton'
      ) {
        this.#closeWinningStatisticsModal();
      }
      if ($target.id === 'modalRestartButton') {
        this.#restart($target);
      }
    };
  }

  #keyEventHandler() {
    return (event) => {
      if (event.key === 'Escape') {
        this.#closeWinningStatisticsModal();
      }
    };
  }

  #setEventHandlers() {
    const $app = document.querySelector('#app');
    $app.addEventListener('submit', this.#eventHandler.submit);
    $app.addEventListener('click', this.#eventHandler.click);
    $app.addEventListener('keydown', this.#eventHandler.keydown);
  }

  #removeEventHandlers() {
    const $app = document.querySelector('#app');
    $app.removeEventListener('submit', this.#eventHandler.submit);
    $app.removeEventListener('click', this.#eventHandler.click);
    $app.removeEventListener('keydown', this.#eventHandler.keydown);
  }

  runWeb() {
    this.#setEventHandlers();
  }

  #initializeWebInput({ readUserInput, formatter, onError }) {
    try {
      const input = readUserInput();
      return formatter(input);
    } catch (error) {
      onError(error);
      return null;
    }
  }

  #purchaseLottosByWeb($target) {
    const formData = new FormData($target);

    const purchaseAmountInput = this.#initializeWebInput({
      readUserInput: () => formData.get('purchaseAmount'),
      formatter: validateAndFormatPurchaseAmountInput,
      onError: (error) => outputViewByWeb.displayErrorMessage(error),
    });

    if (purchaseAmountInput === null) {
      return;
    }

    const { lottoCounts, lottoNumbersList, lottoList } =
      this.buyLottos(purchaseAmountInput);

    this.#state = { lottoList };

    const $input = document.querySelector('#purchaseAmountInput');
    $input.setAttribute('disabled', true);

    const $button = document.querySelector('#purchaseAmountButton');
    $button.setAttribute('disabled', true);

    const $section = document.querySelector('#lottoListWinningLottoContainer');
    const $article = document.createElement('article');
    $article.setAttribute('id', 'lottoListDisplay');
    $article.setAttribute('class', 'lotto-list-display');

    const $form = createWinningLottoForm();
    $section.appendChild($article);

    outputViewByWeb.displayLottoCount(lottoCounts);
    outputViewByWeb.displayLottoList(lottoNumbersList);

    $section.appendChild($form);

    const $winningNumberInput = document.querySelector('#lottoNumber1');
    $winningNumberInput.focus();
  }

  #purchaseWinningLottoByWeb($target) {
    const { lottoList } = this.#state;

    const formData = new FormData($target);

    const winningNumbersInput = this.#initializeWebInput({
      readUserInput: () => formData.getAll('winningNumber'),
      formatter: (input) => {
        validateEmptySpaceInWinningNumbers(input);
        const numbers = input.map(Number);
        validateWinningNumbers(numbers);
        return numbers;
      },
      onError: (error) => outputViewByWeb.displayErrorMessage(error),
    });

    if (winningNumbersInput === null) {
      return;
    }

    const bonusNumberInput = this.#initializeWebInput({
      readUserInput: () => formData.get('bonusNumber'),
      formatter: (input) => {
        validateEmptySpace(input);
        const convertedInput = convertFormat.toNumber(input);
        validateBonusNumber(convertedInput, winningNumbersInput);
        return convertedInput;
      },
      onError: (error) => outputViewByWeb.displayErrorMessage(error),
    });

    if (bonusNumberInput === null) {
      return;
    }

    const winningLotto = new WinningLotto(
      new Lotto(winningNumbersInput),
      bonusNumberInput,
    );

    const { lottoResult, lottoProfit } = this.getLottoResult(
      winningLotto,
      lottoList,
    );

    outputViewByWeb.displayLottoResult(lottoResult, lottoProfit);

    const $form = $target.closest('#winningLottoForm');
    const inputs = $form.querySelectorAll('input');

    inputs.forEach((input) => {
      input.setAttribute('readonly', true);
    });
  }

  #closeWinningStatisticsModal() {
    const $modal = document.querySelector('#modal');
    if ($modal) {
      $modal.remove();
    }
  }

  #restart() {
    this.#closeWinningStatisticsModal();

    const $input = document.querySelector('#purchaseAmountInput');
    $input.value = null;
    $input.removeAttribute('disabled');

    const $button = document.querySelector('#purchaseAmountButton');
    $button.removeAttribute('disabled');

    const $section = document.querySelector('#lottoListWinningLottoContainer');
    $section.replaceChildren();
    this.#removeEventHandlers();
    this.runWeb();
  }
}
export default App;
