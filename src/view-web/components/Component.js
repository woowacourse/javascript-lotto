import { ERROR } from '../../constant/constants.js';

export default class Component {
  $target;
  state;

  constructor($target) {
    if (this.constructor === Component) {
      throw new Error(ERROR.CANNOT_CREATE_INSTANCE);
    }
    this.$target = $target;

    this.setUp();
    this.render();
  }

  setUp() {}

  mount() {}

  addEvent(eventType, callback, $target = this.$target) {
    return $target.addEventListener(eventType, callback);
  }

  render() {
    this.template() && (this.$target.innerHTML = this.template());
    this.mount();
  }

  template() {
    return '';
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
