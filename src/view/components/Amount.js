import Component from './Component.js';
import generationMessages from '../../utils/generationMessages.js';
import Inputs from '../../utils/Inputs.js';
import { LOTTO } from '../../constant/constants.js';
import LottoMachine from '../../domain/LottoMachine.js';

export default class Amount extends Component {
  #lottoCount;

  #lottoList;

  setUp({ setter }) {
    this.setter = setter;
  }

  async read() {
    const amount = await Inputs.readAmount();

    this.#lottoCount = amount / LOTTO.PRICE;
    this.#lottoList = LottoMachine.purchase(this.#lottoCount);
    this.setter({ total: this.#lottoCount, lottoList: this.#lottoList });
  }

  template() {
    return generationMessages.countMessage(this.#lottoCount);
  }
}
