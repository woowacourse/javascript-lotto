import paintEnterWinningNumber from '../components/enterGameBoard';
import paintLottoStatus from '../components/purchaseLottoStatus';
import LottoGame from '../domain/LottoGame';
import { validatePurchaseAmount } from '../utils/validator';

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
    });

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
