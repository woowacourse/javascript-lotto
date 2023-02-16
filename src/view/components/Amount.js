import Component from '../../Component.js';
import generateMessages from '../../utils/generateMessages.js';
import Inputs from '../../utils/Inputs.js';
import { PRICE } from '../../constants/values.js';

export default class Amount extends Component {
  #total;

  setUp({ setter }) {
    this.setter = setter;
  }

  async read() {
    const amount = await Inputs.readAmount();

    this.#total = amount / PRICE;
    this.setter({ total: this.#total });
  }

  template() {
    return generateMessages.countMessage(this.#total);
  }
}
