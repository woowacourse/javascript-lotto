import Console from '../../utils/Console.js';
import { ERROR } from '../../constant/constants.js';

export default class Component {
  state;

  constructor(props) {
    if (this.constructor === Component) {
      throw new Error(ERROR.CANNOT_CREATE_INSTANCE);
    }

    this.setUp(props);
  }

  read() {}

  setUp() {}

  render() {
    this.template() && Console.print(this.template());
  }

  template() {
    return '';
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }
}
