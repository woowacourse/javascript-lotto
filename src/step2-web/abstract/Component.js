import CustomError from "../../utils/CustomError";

export default class WebComponent extends Observer {
  update() {
    this._render();
  }

  _init() {
    this._render();
    this._setEvent();
  }

  _render() {
    this.$target.innerHTML = this._getTemplate();
  }

  _setEvent() {}

  _getTemplate() {
    throw new CustomError("_getTemplate 메서드가 구현되어 있지 않습니다.");
  }
}
