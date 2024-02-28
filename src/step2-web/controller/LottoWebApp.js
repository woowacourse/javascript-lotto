import CustomError from "../../step1-console/utils/CustomError.js";

export default class LottoWebApp {
  $target;
  #views = [];

  constructor(target, views = []) {
    if (!target) {
      throw new CustomError("루트 엘리먼트가 존재하지 않습니다.");
    }

    this.$target = target;
    this.#views = views;
  }

  init() {
    this.#setBaseTemplate();
    this.#initViews();
  }

  #setBaseTemplate() {
    this.$target.innerHTML = this.#getBaseTemplate();
  }

  #getBaseTemplate() {
    return this.#views
      .map((view) => `<div id=${view.getTargetElementId()}></div>`)
      .join("");
  }

  #initViews() {
    this.#views.forEach((view) => view.init());
  }
}
