import WinningLotto from '../../domain/entity/WinningLotto';
import WebView from '../../view/WebView';
import WebMainController from './WebMainController';
import WebWinningResultController from './WebWinningResultController';

class WebWinningLottoController {
  static playWebWinningResult() {
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

    const winningLottoObject = {
      numbers: winningLotto.getNumbers(),
      bonusNumber: winningLotto.getBonusNumber(),
    };

    WebWinningResultController.setWinningLottoObject(winningLottoObject);
    WebWinningResultController.playWinningResult();
  }
}

export default WebWinningLottoController;
