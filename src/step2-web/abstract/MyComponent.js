import Observer from "./Observer.js";

import { $ } from "../utils/selector.js";

import CustomError from "../../step1-console/utils/CustomError.js";

export default class MyComponent extends Observer {
  #targetElementId;

  constructor(targetElementId) {
    super();

    this.#validateTargetElementId(targetElementId);

    this.#targetElementId = targetElementId;
  }

  update() {
    this.render();
  }

  render() {
    this._cleanUpEvent();
    this.#paint();
    this._setEvent();
  }

  getTargetElementId() {
    return this.#targetElementId;
  }

  _cleanUpEvent() {}

  _setEvent() {}

  _getTemplate() {
    throw new CustomError("_getTemplate 메서드가 구현되어 있지 않습니다.");
  }

  _attachErrorHandler(eventHandler, errorMessageTargetId) {
    if (!errorMessageTargetId) {
      throw new CustomError("errorMessageTargetId가 주어지지 않았습니다.");
    }

    return (e) => {
      try {
        eventHandler(e);
      } catch (error) {
        $(`#${errorMessageTargetId}`).innerText = error.message;
      }
    };
  }

  #validateTargetElementId(value) {
    if (!value) {
      throw new CustomError("targetElementId는 필수 값입니다.");
    }

    if (typeof value !== "string") {
      throw new CustomError("targetElementId는 문자열이어야 합니다.");
    }
  }

  #paint() {
    this.#getTargetElement().innerHTML = this._getTemplate();
  }

  #getTargetElement() {
    const $targetElement = $(`#${this.#targetElementId}`);
    if (!$targetElement) {
      throw CustomError("render를 위한 타겟 엘리먼트가 존재하지 않습니다.");
    }

    return $targetElement;
  }
}
