import { $, $$ } from '../utils/util';
import WinningResultSectionView from './WinningResultSectionView';
import PurchaseTicketSectionView from './PurchaseTicketSectionView';
import { MATCH_RESULT_INDEX, PRIZE_MONEY } from '../constants/constants';

const CLASS_DISPLAY_NONE = 'display-none';

export default class LottoMachineView {
  constructor() {
    this.purchaseTicketSectionView = new PurchaseTicketSectionView();
    this.winningResultSectionView = new WinningResultSectionView();

    this.resultModalArea = $('#result-modal-area');
  }

  initialize(lottos) {
    this.initializeInputValues();
    this.purchaseTicketSectionView.initialize(lottos);
    this.winningResultSectionView.initialize();
  }

  updateOnPurchase(tickets, charge) {
    this.purchaseTicketSectionView.updateOnPurchase(tickets, charge);
    this.winningResultSectionView.updateOnPurchase(tickets);
  }

  openWinningResultModal(result) {
    this.updateWinningResultModal(result);
    this.resultModalArea.classList.remove(CLASS_DISPLAY_NONE);
  }

  closeWinningResultModal() {
    this.resultModalArea.classList.add(CLASS_DISPLAY_NONE);
  }

  updateWinningResultModal({ matchResult, profitRatio }) {
    $$('.match-result', this.resultModalArea).forEach((resultRow) => {
      $('.match-count', resultRow).innerText = `${matchResult[MATCH_RESULT_INDEX[resultRow.dataset.matchCount]]}개`;
      $('.prize-money', resultRow).innerText = PRIZE_MONEY[resultRow.dataset.matchCount].toLocaleString();
    })
    $('#profit-ratio', this.resultModalArea).innerText = Math.round(profitRatio);
  }

  initializeInputValues() {
    $$('input').forEach((element) => {
      element.value = '';
    })
  }
}
