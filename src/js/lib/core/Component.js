export default class Component {
  $target;
  props;

  constructor($target, props = {}) {
    this.$target = $target;
    this.props = props;
    if (!this.isAllMeothodsImplemented()) this.throwErrorByCase();
    this.initStates();
    this.subscribeStates();
    this.mountTemplate();
    this.mountChildComponents();
    this.initEvent();
  }

  isAllMeothodsImplemented() {
    const prototype = this.__proto__;

    return (
      Object.hasOwnProperty.call(prototype, 'initStates') &&
      Object.hasOwnProperty.call(prototype, 'subscribeStates') &&
      Object.hasOwnProperty.call(prototype, 'mountTemplate') &&
      Object.hasOwnProperty.call(prototype, 'mountChildComponents') &&
      Object.hasOwnProperty.call(prototype, 'initEvent')
    );
  }

  throwErrorByCase() {
    const prototype = this.__proto__;

    if (!Object.hasOwnProperty.call(prototype, 'initStates'))
      throw new Error('initStates is not implemented');
    if (!Object.hasOwnProperty.call(prototype, 'subscribeStates'))
      throw new Error('subscribeStates is not implemented');
    if (!Object.hasOwnProperty.call(prototype, 'mountTemplate'))
      throw new Error('mountTemplate is not implemented');
    if (!Object.hasOwnProperty.call(prototype, 'mountChildComponents'))
      throw new Error('mountChildComponents is not implemented');
    if (!Object.hasOwnProperty.call(prototype, 'initEvent'))
      throw new Error('initEvent is not implemented');
  }

  initStates() {}

  initEvent() {}

  mountTemplate() {}

  mountChildComponents() {}

  subscribeStates() {}
}
