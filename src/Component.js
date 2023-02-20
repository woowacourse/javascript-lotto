import Console from './utils/Console.js';

export default class Component {
  constructor(props) {
    this.setUp(props);
  }

  read() {}

  setUp() {}

  render() {
    const template = this.template();

    template && Console.print(template);
  }

  template() {
    return '';
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }
}
