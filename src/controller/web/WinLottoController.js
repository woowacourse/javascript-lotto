import { $, $$ } from '../../util/domSelector';
import { hideElement, renderError } from '../../util/view';
import LottoPublisher from '../../domain/LottoPublisher';

class WinLottoController {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    [...$$('.number-input')].forEach((input) => {
      input.addEventListener('input', () => {
        if ($('#win-lotto-error')) hideElement($('#win-lotto-error'));
      });
    });
  }

  makeWinLotto(winNumbers, bonusNumber) {
    try {
      const lottoPublisher = new LottoPublisher(1, winNumbers);
      const winLotto = lottoPublisher.publishWinLotto(bonusNumber);
      return winLotto;
    } catch ({ message }) {
      renderError($('#win-lotto-error'), message);
    }
  }

  seperateLottoNumbers() {
    const numberInputs = [...$$('.number-input')];
    const bonusNumberInput = numberInputs.splice(-1, 1);

    const winNumbers = numberInputs.reduce((numbers, input) => {
      numbers.push(Number(input.value));
      return numbers;
    }, []);
    const bonusNumber = Number(bonusNumberInput[0].value);
    return [winNumbers, bonusNumber];
  }
}

export default WinLottoController;
