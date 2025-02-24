import InputHandler from './View/InputHandler.js';
import { outputView } from './View/outputView.js';
import LottoService from './Domain/LottoService.js';

class App {
  async run() {
    const purchaseAmount = await InputHandler.getPurchaseAmount();

    const { lottoManager, lottoTickets } =
      LottoService.initializeLotto(purchaseAmount);

    outputView.printLottoCount(lottoTickets);
    outputView.printLottoList(lottoManager.getLottoList());

    const winningNumbers = await InputHandler.getWinningNumbers();
    const bonusNumber = await InputHandler.getBonusNumber(winningNumbers);

    const winningLotto = LottoService.initializeWinningLotto(
      winningNumbers,
      bonusNumber
    );

    const lottoResult = LottoService.compareWinningLotto(
      lottoManager,
      winningLotto
    );

    const lottoProfit = LottoService.processWinningLotto(
      lottoResult,
      purchaseAmount
    );

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
