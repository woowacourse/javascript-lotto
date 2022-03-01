import { $, $$ } from '../utils/util';
import { lottoListTemplate, lottoTotalNumber } from './template';
import { MATCH_RESULT_INDEX, PRIZE_MONEY, SELECTOR } from '../constants/constants';

export default class LottoMachineView {
  constructor() {
    this.resultModalArea = $('#result-modal-area');
    this.showLottoList = {
      icon: this.showLottoIconList,
      number: this.showLottoNumberList,
    };
  }

  updateChargeInput(value) {
    $(SELECTOR.CHARGE_INPUT).value = value;
  }

  updateLottoList(lottos) {
    $(SELECTOR.LOTTO_TOTAL_NUMBER).innerHTML = lottoTotalNumber(lottos.length);
    $(SELECTOR.LOTTO_LIST_ICON).innerHTML = lottoListTemplate.icon(lottos.length);
    $(SELECTOR.LOTTO_LIST_NUMBER).innerHTML = lottoListTemplate.number(lottos);
  }

  showLottoIconList() {
    $(SELECTOR.LOTTO_LIST_ICON).classList.remove('display-none');
    $(SELECTOR.LOTTO_LIST_NUMBER).classList.add('display-none');
  }

  showLottoNumberList() {
    $(SELECTOR.LOTTO_LIST_ICON).classList.add('display-none');
    $(SELECTOR.LOTTO_LIST_NUMBER).classList.remove('display-none');
  }

  openResultModal(result) {
    this.updateResultModal(result);
    this.resultModalArea.classList.remove('display-none');
  }

  closeResultModal() {
    this.resultModalArea.classList.add('display-none');
  }

  updateResultModal({ matchResult, profitRatio }) {
    $$('.match-result', this.resultModalArea).forEach((resultRow) => {
      $('.match-count', resultRow).innerText = `${matchResult[MATCH_RESULT_INDEX[resultRow.dataset.matchCount]]}개`;
      $('.prize-money', resultRow).innerText = PRIZE_MONEY[resultRow.dataset.matchCount].toLocaleString();
    })
    $('#profit-ratio', this.resultModalArea).innerText = profitRatio;
  }
}
