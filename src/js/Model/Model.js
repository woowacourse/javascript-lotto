import LottoModel from './LottoModel.js';

export default class Model {
  constructor() {
    this.init();
    this.lottoModel = new LottoModel();
  }

  init() {
    console.log('model loaded...');
  }

  purchase(amount, callback) {
    const message = this.lottoModel.purchase(amount);

    callback(message);
  }
}
