import { CLASS_NAME } from '../constants.js';

export default class View {
  constructor(container, props = {}) {
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
