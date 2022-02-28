import { addPrefix } from '../utils/utils';

export default class View {
  state;

  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }

  setup() {}

  update(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  template() {
    return '';
  }

  render() {
    this.beforeMounted();
    this.$target.innerHTML = this.template();
    this.afterMounted();
  }

  beforeMounted() {}

  afterMounted() {}

  bindEventListener(eventType, { attributeName, attributeType }, callback) {
    const selector = addPrefix(attributeName, attributeType);
    const isTarget = (target) => target.closest(selector);

    this.$target.addEventListener(eventType, (e) => {
      if (!isTarget(e.target)) return;

      e.preventDefault();
      callback(e);
    });
  }
}
