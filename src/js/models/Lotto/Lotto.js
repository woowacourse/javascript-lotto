import { getLottoNumberList } from '../../utils/lottoUtils.js';
import { cloneObject } from '../../utils/utils.js';

export default class Lotto {
  constructor() {
    this.numbers = getLottoNumberList();

    Object.freeze(this);
  }

  getNumbers() {
    return cloneObject(this.numbers.list);
  }
}
