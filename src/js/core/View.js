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

  bindEventListener(type, selector, callback) {
    const isTarget = (target) => target.closest(selector);

    this.$target.addEventListener(type, (e) => {
      if (!isTarget(e.target)) return;

      e.preventDefault();
      callback(e);
    });
  }
}
