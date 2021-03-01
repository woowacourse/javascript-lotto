export default class Component {
  constructor($target, props) {
    this.$target = $target;
    this.props = props ?? {};
    this.init();
  }

  init() {
    if (this.initState && typeof this.initState === 'function') {
      this.initState();
    }
    if (this.mountTemplate && typeof this.mountTemplate === 'function') {
      this.mountTemplate();
    }
    if (this.initDOM && typeof this.initDOM === 'function') {
      this.initDOM();
    }
    if (this.initEvent && typeof this.initEvent === 'function') {
      this.initEvent();
    }
    if (this.mountChildComponents && typeof this.mountChildComponents === 'function') {
      this.mountChildComponents();
    }
  }
}
