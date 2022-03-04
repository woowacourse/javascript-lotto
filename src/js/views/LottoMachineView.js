import { $, $$ } from '../utils/util';
import { lottoListTemplate, lottoTotalNumber, totalRateOfReturn } from './template';
import { LOTTO_PRIZE, SELECTOR } from '../constants/constants';

export default class LottoMachineView {
  #lottoResultTableRows;

  constructor() {
    this.#lottoResultTableRows = $$('tr', $(SELECTOR.LOTTO_RESULT_TBODY));
    this.#lottoResultTableRows.forEach((row, index) => {
      $$('td', row)[1].innerText = LOTTO_PRIZE[index].toLocaleString();
    });
  }

  updateChargeInput(value) {
    $(SELECTOR.CHARGE_INPUT).value = value;
  }

  blockInput() {
    $(SELECTOR.CHARGE_INPUT).disabled = true;
    $(SELECTOR.PURCHASED_BUTTON).disabled = true;
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

  showLottoResultModal() {
    $(SELECTOR.LOTTO_RESULT_MODAL).classList.remove('display-none');
  }

  removeLottoResultModal() {
    $(SELECTOR.LOTTO_RESULT_MODAL).classList.add('display-none');
  }

  showLottoResultTable(lottoResult, rateOfReturn) {
    this.#lottoResultTableRows.forEach((row, index) => {
      $$('td', row)[2].innerText = lottoResult[index];
    });
    $(SELECTOR.RATE_OF_RETURN).innerText = totalRateOfReturn(rateOfReturn);
  }
}
