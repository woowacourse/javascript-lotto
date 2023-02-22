import { qsAll } from './utils/domHelper';

export default class Component {
  constructor($target, props = {}) {
    this.$target = $target;
    this.props = { ...props };
    this.setUp();
    this.setEvent();
    this.render();
  }

  setEvent() {}

  setUp() {}

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  template() {
    return '';
  }

  mounted() {}

  addEvent(eventType, selector, callback, $target = this.$target) {
    const children = [...qsAll(selector, $target)];
    const isTarget = (target) => children.includes(target) || target.closest(selector);

    $target.addEventListener(eventType, (event) => {
      if (isTarget(event.target)) callback(event);
    });

    return this;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
