import Component from '../../Component.js';
import Inputs from '../../utils/Inputs.js';
import { EXIT, RETRY } from '../../constants/values.js';

export default class Retry extends Component {
  setUp({ setter }) {
    this.setter = setter;
  }

  async read() {
    const retry = await Inputs.readRetry();

    if (retry === RETRY) this.setter({ retry: true });
    if (retry === EXIT) this.setter({ retry: false });
  }
}
