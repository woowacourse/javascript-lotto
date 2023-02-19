import Console from '../../utils/Console.js';

export default class Component {
  constructor(props) {
    this.setUp(props);
  }

  read() {}

  setUp() {}

  render() {
    Console.print(this.template());
  }

  template() {
    return '';
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }
}
