import CustomError from "../../step1-console/utils/CustomError.js";

export default class LottoWebApp {
  #$target;
  #views = [];

  constructor(target, views = []) {
    if (!target) {
      throw new CustomError("루트 엘리먼트가 존재하지 않습니다.");
    }

    this.#$target = target;
    this.#views = views;
  }

  init() {
    this.#setBaseTemplate();
    this.#initViews();
  }

  #setBaseTemplate() {
    this.#$target.innerHTML = `
<div class="buy-amount-form"></div>
<div class="bought-lotto-board"></div>
<div class="winning-lotto-form"></div>
<div class="lotto-result-modal"></div>
`;
  }

  #initViews() {
    this.#views.forEach((view) => view.init());
  }
}
