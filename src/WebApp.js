import { convertFormat } from './View/utils.js';
import Lotto from './Domain/Model/Lotto.js';
import WinningLotto from './Domain/Model/WinningLotto.js';

import { validatePurchaseAmount } from './View/Validation/purchaseAmount.js';
import {
  validateEmptySpaceInWinningNumbers,
  validateWinningNumbers,
} from './View/Validation/winningNumbers.js';
import { validateBonusNumber } from './View/Validation/bonusNumber.js';
import { validateEmptySpace } from './View/Validation/util.js';

/** STEP2 By Web */
import { outputViewByWeb } from './View/WebView/outputViewByWeb.js';
import { createWinningLottoForm } from './View/WebView/createWinningLottoForm.js';
import { createLottoListDisplay } from './View/WebView/createLottoListDisplay.js';
import { createWinningStatisticsModal } from './View/WebView/createWinningStatisticsModal.js';

import { buyLottos } from './Domain/buyLottos.js';
import { getLottoResult } from './Domain/getLottoResult.js';

class WebApp {
  #state = {};

  #eventHandler = {};

  constructor() {
    this.#eventHandler = {
      submit: this.#submitEventHandler(),
      click: this.#clickEventHandler(),
      keydown: this.#keyEventHandler(),
    };
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
        this.#retryRunWeb();
      }
    };
  }

  #keyEventHandler() {
    return (event) => {
      const $modal = document.querySelector('#modal');
      if ($modal && event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
      }
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
      formatter: (input) => {
        validateEmptySpace(input);
        const convertedInput = convertFormat.toNumber(input);
        validatePurchaseAmount(convertedInput);
        return convertedInput;
      },
      onError: (error) => outputViewByWeb.displayErrorMessage(error),
    });

    if (purchaseAmountInput === null) {
      return;
    }

    const { lottoCounts, lottoNumbersList, lottoList } =
      buyLottos(purchaseAmountInput);

    this.#state = { lottoList };

    const $input = document.querySelector('#purchaseAmountInput');
    $input.setAttribute('disabled', true);

    const $button = document.querySelector('#purchaseAmountButton');
    $button.setAttribute('disabled', true);

    const $section = document.querySelector('#lottoListWinningLottoContainer');

    const $article = createLottoListDisplay(lottoCounts, lottoNumbersList);
    $section.appendChild($article);

    const $form = createWinningLottoForm();
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

    const { lottoResult, lottoProfit } = getLottoResult(
      winningLotto,
      lottoList,
    );
    this.#state = { ...this.#state, lottoResult, lottoProfit };

    const $winningStatisticsModal = createWinningStatisticsModal(
      lottoResult,
      lottoProfit,
    );
    document.querySelector('#app').prepend($winningStatisticsModal);

    const $form = $target.closest('#winningLottoForm');
    const $inputs = $form.querySelectorAll('input');

    $inputs.forEach((input) => {
      input.setAttribute('readonly', true);
    });
  }

  #closeWinningStatisticsModal() {
    const $modal = document.querySelector('#modal');
    if ($modal) {
      $modal.remove();
    }
  }

  #retryRunWeb() {
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
export default WebApp;
