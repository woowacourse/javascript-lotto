import InputHandler from './Domain/InputHandler.js';
import { outputView } from './View/outputView.js';
import LottoManager from './Domain/Model/LottoManager.js';
import WinningLotto from './Domain/Model/WinningLotto.js';
import {
  calculateLottoTickets,
  calculateLottoPrize,
  calculateLottoProfit,
} from './Utils/calculateLotto.js';
class App {
  async run() {
    const purchaseAmount = await InputHandler.getPurchaseAmount();

    const lottoManager = new LottoManager();
    const lottoTickets = calculateLottoTickets(purchaseAmount);

    outputView.printLottoCount(lottoTickets);

    lottoManager.makeLottoList(lottoTickets);
    outputView.printLottoList(lottoManager.getLottoList());

    const winningNumbers = await InputHandler.getWinningNumbers();
    const bonusNumber = await InputHandler.getBonusNumber();

    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const lottoResult = lottoManager.compareWinningLotto(winningLotto);
    const totalLottoPrize = calculateLottoPrize(lottoResult);
    const lottoProfit = calculateLottoProfit(totalLottoPrize, purchaseAmount);

    outputView.printLottoResultInstruction();
    outputView.printLottoResult(lottoResult);
    outputView.printProfit(lottoProfit);

    await this.retryRun();
  }

  async retryRun() {
    const retry = await InputHandler.getRetry();
    if (retry === 'y') {
      await this.run();
    }
  }
}
export default App;
