import Lotto from './Lotto';
import { LOTTO_SETTING } from '../constants/setting';

export default class LottosModel {
  #lottos = [];

  buy(inputMoney) {
    const lottoCount = inputMoney / LOTTO_SETTING.PRICE;
    Array.from({ length: lottoCount }, () => {
      const lottoInstance = new Lotto();
      lottoInstance.generateNumberList();

      this.#lottos.push(lottoInstance);
    });
  }

  get list() {
    return this.#lottos.map((value) => value.pickedNumber.join(', '));
  }
}
