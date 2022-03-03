import Lotto from './Lotto';
import { LOTTO_SETTING } from '../constants/setting';

export default class LottosModel {
  #lottos = [];
  #chargedMoney = 0;

  get chargedMoney() {
    return this.#chargedMoney;
  }

  set chargedMoney(money) {
    this.#chargedMoney += money;
  }

  buy(inputMoney) {
    const lottoCount = inputMoney / LOTTO_SETTING.PRICE;
    Array.from({ length: lottoCount }, () => this.#lottos.push(new Lotto().generate()));
  }

  get list() {
    return this.#lottos.map((value) => Array.from(value.pickedNumbers).join(', '));
  }

  get lottos() {
    return this.#lottos.map((lotto) => lotto.pickedNumbers);
  }
}
