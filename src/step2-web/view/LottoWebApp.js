import CustomError from "../../step1-console/utils/CustomError.js";

export default class LottoWebApp {
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
    return `
<div class="test">
  <header class="lotto-header background-color-lotto-primary">
    <h1 class="font-size-title font-weight-semi-bold color-lotto-grey-scale-1">🎱 행운의 로또</h1>
  </header>

  <main>
    <div class="main-content-box">
    <h2 class="my-lotto-title">🎱 내 번호 당첨 확인 🎱</h2>
    ${this.#getTargetTemplates()}
    </div>
  </main>

  <footer class="lotto-footer">
    <span class="lotto-footer-letter">&copy;Copyright 2023. woowacourse</span>
  </footer>
</div>
`;
  }

  #getTargetTemplates() {
    return this.#components
      .map((component) => `<div id=${component.getTargetElementId()}></div>`)
      .join("");
  }
}
