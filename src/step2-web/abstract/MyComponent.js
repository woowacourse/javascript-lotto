import Observer from "./Observer.js";

import { $ } from "../utils/selector.js";

import CustomError from "../../step1-console/utils/CustomError.js";

export default class MyComponent extends Observer {
  #targetElementId;

  constructor(targetElementId) {
    super();
    this.#targetElementId = targetElementId;
  }

  update() {
    this._render();
  }

  init() {
    this._render();
    this._setEvent();
  }

  getTargetElementId() {
    return this.#targetElementId;
  }

  _render() {
    const $target = this._getTargetElement();

    $target.innerHTML = this._getTemplate();
  }

  _setEvent() {}

  _getTemplate() {
    throw new CustomError("_getTemplate 메서드가 구현되어 있지 않습니다.");
  }

  _getTargetElement() {
    return $(`#${this.#targetElementId}`);
  }
}
