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
    this.render();
  }

  render() {
    this._cleanUpEvent();
    this._getTargetElement().innerHTML = this._getTemplate();
    this._setEvent();
  }

  getTargetElementId() {
    return this.#targetElementId;
  }

  _setEvent() {}

  _cleanUpEvent() {}

  _getTemplate() {
    throw new CustomError("_getTemplate 메서드가 구현되어 있지 않습니다.");
  }

  _getTargetElement() {
    const $targetElement = $(`#${this.#targetElementId}`);
    if (!$targetElement) {
      throw CustomError("render를 위한 타겟 엘리먼트가 존재하지 않습니다.");
    }

    return $targetElement;
  }
}
