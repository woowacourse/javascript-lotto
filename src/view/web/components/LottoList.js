import DomHelper from "../../../utils/DomHelper.js";

export default class LottoList {
  constructor() {
    this.container = DomHelper.querySelector(".lotto__list");
  }

  displayLottos(lottos) {
    this.container.innerHTML = "";
    lottos.forEach((lotto) => {
      const lottoArray = lotto.getLottoNumber();

      const lottoElement = DomHelper.createElement("div", "random__lotto");
      const iconElement = DomHelper.createElement("div", "lotto__icon", "🎟️");
      const numbersElement = DomHelper.createElement(
        "div",
        "lotto__numbers",
        lottoArray.join(", "),
      );

      lottoElement.appendChild(iconElement);
      lottoElement.appendChild(numbersElement);
      this.container.appendChild(lottoElement);
    });
  }

  clear() {
    this.container.innerHTML = "";
  }
}
