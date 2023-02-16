import Component from '../../Component.js';
import Inputs from '../../utils/Inputs.js';

export default class Retry extends Component {
  setUp({ setter }) {
    this.setter = setter;
  }

  async read() {
    const retry = await Inputs.readRetry();

    if (retry === 'y') this.setter({ retry: true });
    if (retry === 'n') this.setter({ retry: false });
  }

  template() {}
}
