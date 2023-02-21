import QuerySelector from '../constants/QuerySelector.js';
import Convertor from '../utils/Convertor.js';

class Output {
  constructor() {
    this.lottosField = document.querySelector(QuerySelector.lottoListField);
  }

  createLottosField = (purchaseCount, lottos) => {
    const purchaseMessageEl = document.createElement('div');
    purchaseMessageEl.className = QuerySelector.purchase_message;
    purchaseMessageEl.innerText = Convertor.purchaseCount(purchaseCount);

    const lottosEl = document.createElement('ul');
    lottosEl.className = QuerySelector.lottoList;
    lottos.forEach((lotto) => {
      const lottoEl = document.createElement('li');
      lottoEl.className = QuerySelector.lotto;
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
