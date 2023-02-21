import { QuerySelector, Tag } from '../constants/HTML.js';
import Convertor from '../utils/Convertor.js';

class Output {
  constructor() {
    this.lottosField = document.querySelector(QuerySelector.LOTTO_LIST_FIELD);
  }

  createLottosField = (purchaseCount, lottos) => {
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

    const { purchaseMessageEl, lottosEl } = this.createLottosField(purchaseCount, lottos);
    this.lottosField.append(purchaseMessageEl);
    this.lottosField.append(lottosEl);
  };
}

export default Output;
