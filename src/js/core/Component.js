export default class Component {
  constructor(target, props) {
    this.$target = target;
    this.$props = props;
    this.setup();
    this.render();
    this.selectDOM();
    this.bindEvent();
  }
  setup() {}
  mainTemplate() {}
  mountComponent() {}
  render() {
    this.$target.innerHTML = this.mainTemplate();
  }
  setState() {}
  selectDOM() {}
  bindEvent() {}
  clear() {}
}
