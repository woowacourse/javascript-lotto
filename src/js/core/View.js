export default class View {
  constructor(props = {}) {
    this.props = props;
    this._init();
  }

  _init() {
    this._configureDOM();
    this._bindEvents();
  }

  _bindEvents() {}

  _configureDOM() {}
}
