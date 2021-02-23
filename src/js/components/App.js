import LottoPurchaseInput from './LottoPurchaseInput.js';
import LottoTicketDisplay from './LottoTicketDisplay.js';
import WinningNumberInput from './WinningNumbersInput.js';
import WinningResultDisplay from './WinningResultDisplay.js';
import LottoManager from '../model/LottoManager.js';

export default class App {
  constructor() {
    this.lottoManager = new LottoManager();

    this.lottoPurchaseInput = new LottoPurchaseInput({
      lottoManager: this.lottoManager,
    });
    this.lottoTicketDisplay = new LottoTicketDisplay({
      lottoManager: this.lottoManager,
    });
    this.winningNumberInput = new WinningNumberInput({
      lottoManager: this.lottoManager,
    });
    this.winningResultDisplay = new WinningResultDisplay({
      lottoManager: this.lottoManager,
    });
  }
}
