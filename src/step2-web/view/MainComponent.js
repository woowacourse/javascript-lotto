import CustomError from "../../step1-console/utils/CustomError.js";

export default class MainComponent {
  $target;
  #components = [];

  constructor(target, ...components) {
    if (!target) {
      throw new CustomError("타겟 엘리먼트가 존재하지 않습니다.");
    }

    this.$target = target;
    this.#components = components;
  }

  init() {
    this.#paintBaseTemplate();
    this.#renderComponents();
  }

  #paintBaseTemplate() {
    this.$target.innerHTML = this.#getBaseTemplate();
  }

  #renderComponents() {
    this.#components.forEach((component) => component.render());
  }

  #getBaseTemplate() {
    return this.#components
      .map((component) => `<div id=${component.getTargetElementId()}></div>`)
      .join("");
  }
}
