import {
  paintEnterWinningNumber,
  getWinNumberAndBonusNumber,
} from '../view/enterWinningNumber';
import {
  paintPurchaseAmountInput,
  getPurchaseAmount,
} from '../view/purchaseAmountInput';
import showErrorMessage from '../components/errorMessage';
import paintLottoResultBoard from '../view/lottoResult';
import paintModal, {
  addCloseModalBackgroundEventListener,
  closeModal,
} from '../view/modal';
import paintLottoStatus from '../view/purchaseLottoStatus';
import { STEP } from '../data/Constants';
import LottoGame from '../domain/LottoGame';
import {
  inputErrorChecker,
  printLottoResultErrorHandler,
  purchaseLottoErrorHandler,
} from '../utils/errorChecker';
import { clearConatiner } from '../utils/Utils';
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningNumbers,
} from '../utils/validator';
import lottoSection from '../view/lottoSection';

export default function LottoUIController($app) {
  this.state = {
    lottoGame: null,
    $root: null,
    step: STEP.INIT,
  };

  const init = () => {
    const $lottoSection = lottoSection();
    $app.appendChild($lottoSection);
    addCloseModalBackgroundEventListener(closeHandler);

    this.state.$root = $lottoSection;
  };

  this.play = () => {
    gameSetting();
    paintPurchaseAmountInput(this.state.$root, purchaseAmountHandler);
  };

  const gameSetting = () => {
    this.state.lottoGame = new LottoGame();
    this.state.step = STEP.INIT;
    clearConatiner(this.state.$root);
  };

  const clearGameBoard = ($root) => {
    $root.removeChild($root.lastChild);
    $root.removeChild($root.lastChild);
    this.state.step = STEP.INIT;
  };

  const restart = () => {
    console.log('restart');
    closeModal();
    this.play();
  };

  const closeHandler = () => {
    console.log('close');

    closeModal();
    this.state.step = STEP.ENTER;
  };

  const paintGameBoard = (purchaseAmount) => {
    const { $root, lottoGame } = this.state;
    this.state.step = STEP.ENTER;

    lottoGame.purchaseLottos(purchaseAmount);
    const lottos = lottoGame.getLottoNumbers();

    paintLottoStatus($root, lottos);
    paintEnterWinningNumber($root, checkResultHandler);
  };

  const paintResultView = ({ winCount, earningRate }) => {
    const $content = paintLottoResultBoard(
      { winCount, earningRate },
      { restart, closeHandler }
    );

    paintModal($content);
  };

  const calculateResult = (bonusNumber, winningNumbers) => {
    const { lottoGame } = this.state;

    lottoGame.registerGameBoard(winningNumbers, bonusNumber);

    const winCount = lottoGame.getLottosWinCount();
    const earningRate = lottoGame.getEarningRate();

    paintResultView({ winCount, earningRate });
  };

  const purchaseAmountHandler = (e) => {
    e.preventDefault();
    const { currentTarget } = e;

    const { $root, step } = this.state;

    const purchaseAmount = getPurchaseAmount(currentTarget);

    const { state, message } = inputErrorChecker(() =>
      validatePurchaseAmount(purchaseAmount)
    );

    if (state) {
      const { $errorContainer, $trigger } = purchaseLottoErrorHandler();
      showErrorMessage($errorContainer, message, $trigger);
      return;
    }

    if (step !== STEP.INIT) clearGameBoard($root);

    paintGameBoard(purchaseAmount);
  };

  const checkResultHandler = (e) => {
    e.preventDefault();

    if (this.state.step !== STEP.ENTER) return;

    const { currentTarget } = e;

    const { winningNumbers, bonusNumber } =
      getWinNumberAndBonusNumber(currentTarget);

    const { state: winState, message: winMessage } = inputErrorChecker(() =>
      validateWinningNumbers(winningNumbers)
    );

    const { state: bonusState, message: bonusMessage } = inputErrorChecker(() =>
      validateBonusNumber(bonusNumber, winningNumbers)
    );

    if (bonusState || winState) {
      const message = winState ? winMessage : bonusMessage;
      const { $errorContainer, $trigger } = printLottoResultErrorHandler();
      showErrorMessage($errorContainer, message, $trigger);
      return;
    }

    this.state.step = STEP.RESULT;
    calculateResult(bonusNumber, winningNumbers);
  };

  init();
}
