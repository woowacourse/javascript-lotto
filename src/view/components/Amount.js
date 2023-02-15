import Component from '../../Component.js';
import generateMessages from '../../utils/generateMessages.js';
import Inputs from '../../utils/Inputs.js';
import { PRICE } from '../../constants/values.js';

export default class Amount extends Component {
  #amount;

  constructor(setter) {
    super();

    this.setter = setter;
  }

  async read() {
    this.#amount = await Inputs.readAmount();
    this.setter({ total: this.#amount / PRICE });

    return this.#amount;
  }

  template() {
    return generateMessages.countMessage(this.#amount / PRICE);
  }
}
