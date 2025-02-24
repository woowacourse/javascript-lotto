import PurchaseForm from "./PurchaseForm.js";

export default class LottoGame {
  constructor($target) {
    this.render($target);
  }

  render($target) {
    const $div = document.createElement("div");
    const $title = document.createElement("p");

    $title.innerText = "🎱 내 번호 당첨 확인 🎱";
    $title.className = "lotto-winning-result-title";
    $div.className = "lotto-winning-result-container";

    $div.appendChild($title);
    $target.appendChild($div);

    new PurchaseForm($div);
  }
}
