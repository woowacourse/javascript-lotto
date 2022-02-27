import Lotto from './Lotto';
import { LOTTO_SETTING } from '../constants/setting';

export default class LottosModel {
  #lottos = [];

  buy(inputMoney) {
    const lottoCount = inputMoney / LOTTO_SETTING.PRICE;
    Array.from({ length: lottoCount }, () => this.#lottos.push(new Lotto().generate()));
  }

  get list() {
    return this.#lottos.map((value) => value.pickedNumbers.join(', '));
  }
}
