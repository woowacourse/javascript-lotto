export default class Component {
  $target;
  props;

  constructor($target, props = {}) {
    this.$target = $target;
    this.props = props;
    this.initStates();
    this.subscribeStates();
    this.mountTemplate();
    this.mountChildComponents();
    this.initEvent();
  }

  initStates() {}

  initEvent() {}

  mountTemplate() {}

  mountChildComponents() {}

  subscribeStates() {}
}
