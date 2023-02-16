import Buyer from './domain/Buyer';
import LottoResult from './domain/LottoResult';
import WinningLotto from './domain/WinningLotto';
import Validation from './Validation';
import InputView from './view/InputView';
import OutputView from './view/OutputView';

class LottoController {
  async proceedBuyLottos() {
    const money = await InputView.readMoney();
    Validation.validateMoney(money);
    this.buyer = new Buyer(money);
    this.buyer.buyLottos();

    OutputView.printLottos(this.buyer.getLottos());
  }

  async proceedWinningLotto() {
    const winningNumbers = await InputView.readWinningNumbers();
    const bonusNumber = await InputView.readBonusNumber();
    this.winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  }

  proceedLottoResult() {
    const lottoResult = new LottoResult(this.winningLotto);
    const receivedRewards = this.buyer.receiveRewards(lottoResult);
    const profitRate = this.buyer.getProfitRate();

    OutputView.printLottoResult(receivedRewards);
    OutputView.printProfitRate(profitRate);
  }

  async proceedRestartCommand() {
    const restartCommand = await InputView.readRestartCommand();
    Validation.validateRestartCommand(restartCommand);

    if (restartCommand === 'y') {
      return true;
    }
    OutputView.printExit();
    return false;
  }
}

export default LottoController;
