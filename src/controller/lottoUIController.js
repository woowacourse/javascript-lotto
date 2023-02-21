import paintEnterWinningNumber from '../components/enterGameBoard';
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

export default function LottoUIController() {
  this.state = {
    lottoGame: null,
  };

  const init = () => {
    this.state.lottoGame = new LottoGame();
    const $purchaseButton = document.getElementById('purchaseButton');

    $purchaseButton.addEventListener('click', () => {
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

      const $button = document.getElementById('checkResult');
      numberContainerAddChange((e) => keyUpEventListener(e, $button));

      $button.addEventListener('click', checkResultListener);
    });

    function numberContainerAddChange(listener) {
      const $container = document.querySelector('.number-container');

      $container.addEventListener('keyup', listener);
    }

    function checkResultListener() {
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

      const { state: bonusState, message: bonusMessage } = inputErrorChecker(
        () => validateBonusNumber(bonusNumber, winningNumbers)
      );

      if (!bonusState && !winState) {
        isPassNumbers();
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
    }

    const isPassNumbers = () => {
      showModal();
      const $modalContent = document.querySelector('.modal-content');
      clearConatiner($modalContent);

      $modalContent.appendChild(
        lottoResultBoard(
          {
            FIFTH: 0,
            FOURTH: 0,
            THIRD: 0,
            SECOND: 0,
            FIRST: 0,
          },
          0.0
        )
      );

      const $closeButton = document.querySelector('.modal-close-button');

      $closeButton.addEventListener('click', () => {
        closeModal();
      });
    };

    const inputErrorChecker = (validator) => {
      try {
        validator();
      } catch (error) {
        return { state: true, message: error };
      }

      return { state: false, message: '' };
    };
  };

  init();
}
