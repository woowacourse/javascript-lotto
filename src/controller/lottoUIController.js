import paintEnterWinningNumber from '../components/enterGameBoard';
import initialEnterInput from '../components/initialEnterInput';
import lottoResultBoard from '../components/lottoResult';
import paintLottoStatus from '../components/purchaseLottoStatus';
import LottoGame from '../domain/LottoGame';
import { keyUpEventListener } from '../utils/eventListener';
import { clearConatiner } from '../utils/Utils';
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningNumbers,
} from '../utils/validator';
import { closeModal, showModal } from '../view/modal';

export default function LottoUIController($app) {
  this.state = {
    lottoGame: new LottoGame(),
    $root: null,
  };

  this.play = () => {
    gameSetting();
    console.log(this.state);
    addPurchaseButton();
  };

  const gameSetting = () => {
    this.state.lottoGame = new LottoGame();
    clearConatiner(this.state.$root);
    this.state.$root.appendChild(initialEnterInput());
  };

  const init = () => {
    const $lottoSection = document.createElement('div');
    $lottoSection.className = 'lotto-section';

    $app.appendChild($lottoSection);

    this.state.$root = $lottoSection;
  };

  const numberContainerAddChange = (listener) => {
    const $container = document.querySelector('.number-container');

    $container.addEventListener('keyup', listener);
  };

  const isPassNumbers = (bonusNumber, winningNumbers) => {
    const { lottoGame } = this.state;

    lottoGame.registerGameBoard(winningNumbers, bonusNumber);

    const winCount = lottoGame.getLottosWinCount();
    const rate = lottoGame.getEarningRate();

    const $modalContent = document.querySelector('.modal-content');
    clearConatiner($modalContent);
    $modalContent.appendChild(lottoResultBoard(winCount, rate));

    showModal();
    addRestartEvent();
  };

  const addRestartEvent = () => {
    const $retry = document.getElementById('retry');
    const $closeButton = document.querySelector('.modal-close-button');

    $closeButton.addEventListener('click', closeModal);
    $retry.addEventListener('click', restart);
  };

  const addPurchaseButton = () => {
    const $purchaseButton = document.getElementById('purchaseButton');

    $purchaseButton.addEventListener('click', purchaseAmountListener);
  };

  const addCheckResultButton = () => {
    const $button = document.getElementById('checkResult');
    numberContainerAddChange((e) => keyUpEventListener(e, $button));

    $button.addEventListener('click', checkResultListener);
  };

  const purchaseAmountListener = () => {
    const $purchaseInput = document.getElementById('purchaseInput');
    const purchaseAmount = Number($purchaseInput.value);

    const { state, message } = inputErrorChecker(() =>
      validatePurchaseAmount(purchaseAmount)
    );

    if (state) {
      alert(message);
      $purchaseInput.value = '';
      return;
    }

    this.state.lottoGame.purchaseLottos(purchaseAmount);
    const lottos = this.state.lottoGame.getLottoNumbers();

    paintLottoStatus(lottos);
    paintEnterWinningNumber();
    addCheckResultButton();
  };

  const checkResultListener = () => {
    const $winNumbers = document.querySelectorAll('input[name="winNumber"]');
    const winningNumbers = [...$winNumbers.values()].map(({ value }) =>
      Number(value)
    );
    const bonusNumber = Number(
      document.querySelector('input[name="bonusNumber"]').value
    );

    const { state: winState, message: winMessage } = inputErrorChecker(() =>
      validateWinningNumbers([...winningNumbers])
    );

    const { state: bonusState, message: bonusMessage } = inputErrorChecker(() =>
      validateBonusNumber(bonusNumber, winningNumbers)
    );

    if (!bonusState && !winState) {
      isPassNumbers(bonusNumber, winningNumbers);
      return;
    }

    if (winState) {
      alert(winMessage);
      return;
    }

    if (bonusState) {
      alert(bonusMessage);
      return;
    }
  };

  const restart = () => {
    closeModal();
    this.play();
  };

  const inputErrorChecker = (validator) => {
    try {
      validator();
    } catch (error) {
      return { state: true, message: error };
    }

    return { state: false, message: '' };
  };

  init();
}
