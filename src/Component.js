export default class Component {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setUp();
    this.render();
  }

  setUp() {}

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  template() {
    return '';
  }

  mounted() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
