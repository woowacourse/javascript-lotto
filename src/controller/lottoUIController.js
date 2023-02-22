import paintEnterWinningNumber from '../components/enterGameBoard';
import paintInitialEnterInput from '../components/initialEnterInput';
import lottoResultBoard from '../components/lottoResult';
import paintModal, { closeModal } from '../components/modal';
import paintLottoStatus from '../components/purchaseLottoStatus';
import LottoGame from '../domain/LottoGame';
import { inputErrorChecker } from '../utils/errorChecker';
import { clearConatiner } from '../utils/Utils';
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningNumbers,
} from '../utils/validator';

export default function LottoUIController($app) {
  this.state = {
    lottoGame: new LottoGame(),
    $root: null,
  };

  const init = () => {
    const $lottoSection = document.createElement('div');
    $lottoSection.className = 'lotto-section';

    $app.appendChild($lottoSection);

    this.state.$root = $lottoSection;
  };

  this.play = () => {
    gameSetting();
    paintInitialEnterInput(this.state.$root, purchaseAmountHandler);
  };

  const gameSetting = () => {
    this.state.lottoGame = new LottoGame();
    clearConatiner(this.state.$root);
  };

  const paintResultView = ({ winCount, earningRate }) => {
    const $content = lottoResultBoard({ winCount, earningRate }, restart);

    paintModal($content);
  };

  const calculateResult = (bonusNumber, winningNumbers) => {
    const { lottoGame } = this.state;

    lottoGame.registerGameBoard(winningNumbers, bonusNumber);

    const winCount = lottoGame.getLottosWinCount();
    const earningRate = lottoGame.getEarningRate();

    paintResultView({ winCount, earningRate });
  };

  const purchaseAmountHandler = () => {
    const { $root, lottoGame } = this.state;

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

    lottoGame.purchaseLottos(purchaseAmount);
    const lottos = lottoGame.getLottoNumbers();

    paintLottoStatus($root, lottos);
    paintEnterWinningNumber($root, checkResultHandler);
  };

  const checkResultHandler = () => {
    const $winNumbers = document.querySelectorAll('input[name="winNumber"]');
    const winningNumbers = [...$winNumbers.values()].map(({ value }) =>
      Number(value)
    );
    const bonusNumber = Number(
      document.querySelector('input[name="bonusNumber"]').value
    );

    const { state: winState, message: winMessage } = inputErrorChecker(() =>
      validateWinningNumbers(winningNumbers)
    );

    const { state: bonusState, message: bonusMessage } = inputErrorChecker(() =>
      validateBonusNumber(bonusNumber, winningNumbers)
    );

    if (!bonusState && !winState) {
      calculateResult(bonusNumber, winningNumbers);
      return;
    }

    alert(winState ? winMessage : bonusMessage);

    // if (winState) {
    //   alert(winMessage);
    //   return;
    // }

    // if (bonusState) {
    //   alert(bonusMessage);
    //   return;
    // }
  };

  const restart = () => {
    closeModal();
    this.play();
  };

  init();
}
