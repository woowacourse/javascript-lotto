import { getLottoNumberList } from './utils/lottoUtils.js';

export default class LottoNumbers {
  constructor() {
    this.list = getLottoNumberList();

    Object.freeze(this);
  }
}
