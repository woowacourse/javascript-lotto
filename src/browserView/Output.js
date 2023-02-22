import { QuerySelector, Tag } from '../constants/HTML.js';
import Convertor from '../utils/Convertor.js';

class Output {
  constructor() {
    this.lottosField = document.querySelector(QuerySelector.LOTTO_LIST_FIELD);
    this.lottoInputField = document.querySelector(QuerySelector.LOTTO_INPUT_FIELD);
    this.resultModal = document.querySelector(QuerySelector.RESULT_MODAL);
  }

  #createLottosField = (purchaseCount, lottos) => {
    const purchaseMessageEl = document.createElement(Tag.DIV);
    purchaseMessageEl.className = QuerySelector.PURCHASE_MESSAGE;
    purchaseMessageEl.innerText = Convertor.purchaseCount(purchaseCount);

    const lottosEl = document.createElement(Tag.UL);
    lottosEl.className = QuerySelector.LOTTO_LIST;

    lottos.forEach((lotto) => {
      const lottoEl = document.createElement(Tag.LI);
      lottoEl.className = QuerySelector.LOTTO;
      lottoEl.innerText = Convertor.lottoWithIcon(lotto);
      lottosEl.appendChild(lottoEl);
    });

    return { purchaseMessageEl, lottosEl };
  };

  renderLottosField = (purchaseCount, lottos) => {
    this.lottosField.innerText = '';

    const { purchaseMessageEl, lottosEl } = this.#createLottosField(purchaseCount, lottos);

    this.lottosField.append(purchaseMessageEl);
    this.lottosField.append(lottosEl);
  };

  renderLottoInputField() {
    this.lottoInputField.classList.add('show');
  }

  renderResultModal(ranks, profitRate) {
    this.paintProfitRate(profitRate);
  }

  paintProfitRate(profitRate) {
    const profitMessage = Convertor.profitRateResult(profitRate);
    document.querySelector(QuerySelector.PROFIT_MESSAGE).innerText = profitMessage;
  }
}

export default Output;
