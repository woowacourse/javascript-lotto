class Component {
  $target;

  constructor($target) {
    this.$target = $target;
    this.render();
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Component;
