import Console from './utils/Console.js';

export default class Component {
  read() {}

  render() {
    Console.print(this.template());
  }

  template() {
    return '';
  }
}
