export default class View {
  state;

  constructor($target) {
    this.$target = $target;
  }

  update(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.afterMounted();
  }

  afterMounted() {}

  bindEventListener(type, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);

    this.$target.addEventListener(type, (e) => {
      if (!isTarget(e.target)) return;

      e.preventDefault();
      callback(e);
    });
  }
}
