import WinningLotto from '../../domain/entity/WinningLotto';
import WebView from '../../view/WebView';

class WebWinningLottoController {
  static playWebWinningLotto() {
    const winningLottoConfig = {
      value: Array.from(document.querySelectorAll('.winningLottoNumbersInput'))
        .map(numberInput => numberInput.value)
        .filter(numberString => numberString),
      factory: inputList => new WinningLotto(inputList),
    };
    const winningLotto = WebView.readExactValue(winningLottoConfig);

    if (winningLotto) {
      const bonusNumberConfig = {
        value: document.querySelector('.bonusNumberInput').value,
        factory: inputString => winningLotto.setBonusNumberString(inputString),
      };
      WebView.readExactValue(bonusNumberConfig);
    }
  }
}

export default WebWinningLottoController;
