import { create } from "../core/dom.js";

export const LottoStatistics = ({ onRetry }) => {
  const $section = create("section", { className: "lotto-statistics-section" });

  const render = ({ lottoResult, profitRate }) => {
    $section.replaceChildren();

    lottoResult.forEach(({ count }) => {
      const $count = create("div", { text: count, className: "lotto-result" });
      $section.append($count);
    });

    const $profitRate = create("div", {
      text: `총 수익률은 ${profitRate}%입니다.`,
      className: "lotto-profitRate",
    });

    const $askRetry = create("button", {
      type: "button",
      className: "retry-button",
      text: "다시 하시겠습니까",
    });

    $askRetry.addEventListener("click", onRetry);
    $section.append($profitRate, $askRetry);
  };

  return { $section, render };
};
