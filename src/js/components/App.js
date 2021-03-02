import PurchaseAmountInput from './PurchaseAmountInput.js';
import PurchaseOptionInput from './PurchaseOptionInput.js';
import LottoTicketDisplay from './LottoTicketDisplay.js';
import WinningNumberInput from './WinningNumbersInput.js';
import WinningResultDisplay from './WinningResultDisplay.js';
import AppStageManager from '../model/appStageManager.js';
import LottoManager from '../model/LottoManager.js';

export default class App {
  constructor() {
    this.stageManager = new AppStageManager();
    this.lottoManager = new LottoManager({
      stageManager: this.stageManager,
    });
  }

  init() {
    this.purchaseAmountInput = new PurchaseAmountInput({
      stageManager: this.stageManager,
      lottoManager: this.lottoManager,
    });
    this.purchaseOptionInput = new PurchaseOptionInput({
      stageManager: this.stageManager,
      lottoManager: this.lottoManager,
    });
    this.lottoTicketDisplay = new LottoTicketDisplay({
      stageManager: this.stageManager,
      lottoManager: this.lottoManager,
    });
    this.winningNumberInput = new WinningNumberInput({
      stageManager: this.stageManager,
      lottoManager: this.lottoManager,
    });
    this.winningResultDisplay = new WinningResultDisplay({
      stageManager: this.stageManager,
      lottoManager: this.lottoManager,
    });
  }
}
