import WinningLotto from '../../domain/entity/WinningLotto';
import WebView from '../../view/WebView';
import WebWinningResultController from './WebWinningResultController';

class WebWinningLottoController {
  static playWebWinningResult() {
    const winningLottoConfig = {
      value: Array.from(
        document.querySelectorAll('.winning-lotto-numbers__input'),
      )
        .map(numberInput => numberInput.value)
        .filter(numberString => numberString),
      factory: inputList => new WinningLotto(inputList),
    };
    const winningLotto = WebView.readExactValue(winningLottoConfig);

    if (winningLotto) {
      const bonusNumberConfig = {
        value: document.querySelector('.winning-lotto-bonus-number__input')
          .value,
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
