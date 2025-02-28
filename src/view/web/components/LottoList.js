import DomHelper from "../../../utils/DomHelper.js";

export default class LottoList {
  constructor() {
    this.container = DomHelper.querySelector(".lotto__list");
    this.maxHeight = "300px"; // 최대 높이 기본값 300px

    this.setupContainer();
  }

  setupContainer() {
    this.container.style.maxHeight = this.maxHeight;
    this.container.style.overflowY = "scroll";
    this.container.style.borderRadius = "4px";
    this.container.style.padding = "10px";
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
