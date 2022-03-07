import { CLASS_NAME } from '../constants';

export default class View {
  constructor(container, props = {}) {
    if (this.constructor === View) {
      throw new Error('Abstract class can not be instantiated');
    }
    this.container = container;
    this.props = props;
    this._init();
  }

  _init() {
    this._configureDOM();
    this._bindEvents();
  }

  _bindEvents() {}

  _configureDOM() {}

  hide() {
    this.container.classList.add(CLASS_NAME.HIDE);
  }

  show() {
    this.container.classList.remove(CLASS_NAME.HIDE);
  }
}
