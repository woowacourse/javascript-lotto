export default class Component {
  constructor(target, props) {
    this.$target = target;
    this.$props = props;
    this.setup();
    this.initRender();
    this.selectDOM();
    this.bindEvent();
  }
  setup() {}
  mainTemplate() {}
  initRender() {}
  render() {}
  selectDOM() {}
  bindEvent() {}
  clearView() {}
}
