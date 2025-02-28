class ViewComponent {
  constructor($container) {
    if (!$container) {
      throw new Error('container가 주입되지 않았습니다.');
    }
    this.$container = $container;
  }

  render() {}

  bindEvents() {}

  template() {
    return '';
  }
}

export default ViewComponent;
