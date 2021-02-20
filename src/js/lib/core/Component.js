export default class Component {
  $target;
  props;

  constructor($target, props = {}) {
    this.$target = $target;
    this.props = props;
    this.initStates();
    this.subscribeStates();
    this.render();
    this.initEvent();
  }

  render() {
    this.mountTemplate();
    this.mountChildComponents();
  }

  initStates() {}

  initEvent() {}

  mountTemplate() {}

  mountChildComponents() {}

  subscribeStates() {}
}
