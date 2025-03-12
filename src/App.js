import InputHandler from './View/InputHandler.js';
import { outputView } from './View/outputView.js';
import LottoService from './Domain/LottoService.js';

class App {
  #lottoService;

  constructor() {
    this.#lottoService = new LottoService();
  }

  async run() {
    const purchaseAmount = await InputHandler.getPurchaseAmount();
    const lottoTickets = this.#lottoService.initializeLotto(purchaseAmount);

    outputView.printLottoCount(lottoTickets);
    outputView.printLottoList(
      this.#lottoService.getLottoManager().getLottoList()
    );

    const winningNumbers = await InputHandler.getWinningNumbers();
    const bonusNumber = await InputHandler.getBonusNumber(winningNumbers);

    const winningLotto = this.#lottoService.createWinningLotto(
      winningNumbers,
      bonusNumber
    );

    const lottoResult =
      this.#lottoService.compareWithWinningLotto(winningLotto);
    const lottoProfit = this.#lottoService.calculateProfit(lottoResult);

    outputView.printLottoResultInstruction();
    outputView.printLottoResult(lottoResult);
    outputView.printProfit(lottoProfit);

    await this.retryRun();
  }

  async retryRun() {
    const retry = await InputHandler.getRetry();
    if (retry === 'y') {
      this.#lottoService = new LottoService(); // 새로운 게임을 위해 LottoService 재초기화
      await this.run();
    }
  }
}
export default App;
