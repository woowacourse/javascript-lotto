import Buyer from './domain/Buyer';
import LottoResult from './domain/LottoResult';
import WinningLotto from './domain/WinningLotto';
import Lotto from './domain/Lotto';
import InputView from './view/InputView';
import OutputView from './view/OutputView';
import Validation from './Validation';
import Console from '../src/utils/Console';
import { RESTART_COMMAND } from './constants';

class LottoController {
  async proceedBuyLottos() {
    return Console.repeatWhile(async () => {
      const money = await InputView.readMoney();
      this.buyer = new Buyer(money);
      this.buyer.buyLottos();

      OutputView.printLottos(this.buyer.getLottos());
    });
  }

  async proceedWinningLotto() {
    return Console.repeatWhile(async () => {
      this.winningNumbers = new Lotto(await InputView.readLottoNumbers());
    });
  }

  async proceedBonusNumber() {
    return Console.repeatWhile(async () => {
      const bonusNumber = await InputView.readBonusNumber();
      this.winningLotto = new WinningLotto(this.winningNumbers, bonusNumber);
    });
  }

  proceedLottoResult() {
    const lottoResult = new LottoResult(this.winningLotto);
    const receivedRewards = this.buyer.receiveRewards(lottoResult);
    const profitRate = this.buyer.getProfitRate();

    OutputView.printLottoResult(receivedRewards);
    OutputView.printProfitRate(profitRate);
  }

  async proceedRestartCommand() {
    return Console.repeatWhile(async () => {
      const restartCommand = await InputView.readRestartCommand();
      Validation.validateRestartCommand(restartCommand);
      if (restartCommand === RESTART_COMMAND) {
        return true;
      }
      OutputView.printExit();
      return false;
    });
  }
}

export default LottoController;
