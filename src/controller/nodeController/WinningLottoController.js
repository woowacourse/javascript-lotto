import MESSAGE from '../../constant/Message';
import WinningLotto from '../../domain/entity/WinningLotto';
import InputView from '../../view/InputView';
import OutputView from '../../view/OutputView';

class WinningLottoController {
  static async playWinningLotto() {
    const winningLottoConfig = {
      message: MESSAGE.prompt.winningNumber,
      factory: inputString => WinningLotto.fromString(inputString),
    };
    const winningLotto = await InputView.readExactValue(winningLottoConfig);
    OutputView.print(MESSAGE.blank);

    const bonusNumberConfig = {
      message: MESSAGE.prompt.bonusNumber,
      factory: inputString => winningLotto.setBonusNumberString(inputString),
    };
    await InputView.readExactValue(bonusNumberConfig);

    const winningLottoObject = {
      numbers: winningLotto.getNumbers(),
      bonusNumber: winningLotto.getBonusNumber(),
    };

    return winningLottoObject;
  }
}

export default WinningLottoController;
