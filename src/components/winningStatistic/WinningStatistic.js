import Button from "../common/button.js";
import customCreateElement from "../../utils/customElement.js";
import StatisticsTable from "./StatisticsTable.js";

export default class WinningStatistic {
  constructor(winningResult, setInit) {
    this.init(winningResult, setInit);
  }

  render($target) {
    $target.appendChild(this.$div);
  }

  init(winningResult, setInit) {
    this.$div = customCreateElement({
      tagName: "div",
      className: "winning-static-container",
    });
    const $title = customCreateElement({
      tagName: "p",
      className: "winning-static-title",
      text: "🏆 당첨 통계 🏆",
    });

    this.$div.appendChild($title);

    new StatisticsTable(this.$div, winningResult.lottoHistory);

    const $rateText = customCreateElement({
      tagName: "p",
      className: "rate-text",
      text: `당신의 총 수익률은 ${winningResult.rate}입니다.`,
    });
    const $footer = customCreateElement({
      tagName: "div",
      className: "winning-static-footer",
    });

    $footer.appendChild($rateText);
    this.$div.appendChild($footer);

    const $button = new Button(() => setInit(), "다시 시작하기").render();
    $footer.appendChild($button);
  }
}
