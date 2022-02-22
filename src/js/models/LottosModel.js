import Lotto from './Lotto.js';
import { isDivisible, isPositiveInteger } from '../utils/validator.js';

export default class LottosModel {
  #lottos = [];
  #isLottoNumberVisible = false;

  buy(inputMoney) {
    if (!isDivisible(inputMoney, 1000) || !isPositiveInteger(inputMoney)) {
      throw new Error('올바른 입력이 아닙니다.');
    }

    const lottoCount = inputMoney / 1000;
    Array.from({ length: lottoCount }, () => this.#lottos.push(new Lotto().generate()));
  }

  get list() {
    return this.#lottos.map((value) => value.pickedNumber.join(', '));
  }
}
