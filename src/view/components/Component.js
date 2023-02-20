import Console from '../../utils/Console.js';
import { CustomError, ERROR_CODE } from '../../utils/Error.js';

export default class Component {
  constructor(props) {
    if (this.constructor === Component) {
      throw new CustomError({ code: ERROR_CODE.CANNOT_CREATE_INSTANCE });
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
