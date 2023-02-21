import Convertor from '../utils/Convertor.js';

class Output {
  constructor() {
    this.lottosField = document.querySelector('.user_lotto_field');
  }

  createLottosField = (purchaseCount, lottos) => {
    const purchaseMessageEl = document.createElement('div');
    const purchaseMessage = Convertor.purchaseCount(purchaseCount);
    purchaseMessageEl.innerText = purchaseMessage;
    return purchaseMessageEl;
  };

  renderLottosField = (purchaseCount, lottos) => {
    const elements = this.createLottosField(purchaseCount, lottos);
    this.lottosField.append(elements);
  };
}

export default Output;
