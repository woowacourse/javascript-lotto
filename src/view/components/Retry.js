import Component from './Component.js';
import Inputs from '../../utils/Inputs.js';
import { GAME } from '../../constant/index.js';

export default class Retry extends Component {
  setUp({ setter }) {
    this.setter = setter;
  }

  async read() {
    const retry = await Inputs.readRetry();

    if (retry === GAME.RETRY) this.setter({ retry: true });
    if (retry === GAME.EXIT) this.setter({ retry: false });
  }
}
