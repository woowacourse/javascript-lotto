import Lotto from './Lotto';
import { LOTTO_SETTING } from '../constants/setting';

export default class LottosModel {
  #lottos = [];
  #chargedMoney = 0;

  get chargedMoney() {
    return this.#chargedMoney;
  }

  addMoney(money) {
    this.#chargedMoney += money;
  }

  buy(inputMoney) {
    const lottoCount = inputMoney / LOTTO_SETTING.PRICE;
    this.#lottos = [...Array(lottoCount)].map((_) => new Lotto().generate());
  }

  get list() {
    return this.#lottos.map((value) => Array.from(value.lottoNumbers).join(', '));
  }

  get lottoNumbers() {
    return this.#lottos.map((lotto) => lotto.lottoNumbers);
  }

  reset() {
    this.#lottos = [];
    this.#chargedMoney = 0;
  }
}
