import Convertor from '../utils/Convertor.js';

class Output {
  constructor() {
    this.lottosField = document.querySelector('.user_lotto_field');
  }

  createLottosField = (purchaseCount, lottos) => {
    const purchaseMessageEl = document.createElement('div');
    const purchaseMessage = Convertor.purchaseCount(purchaseCount);
    purchaseMessageEl.innerText = purchaseMessage;

    const lottosEl = document.createElement('ul');
    lottos.forEach((lotto) => {
      const lottoEl = document.createElement('li');
      lottoEl.innerText = `🎟️ ${lotto}`;
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
