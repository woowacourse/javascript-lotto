import { LOTTO } from '../constants.js';

export default class PurchaseFormModel {
  constructor() {
    this.init();
  }

  init() {
    this.data = {
      lottoCount: 0,
    };
  }

  purchase(money) {
    this.data.lottoCount = Math.floor(money / LOTTO.PRICE);
  }

  getData() {
    return this.data;
  }
}
