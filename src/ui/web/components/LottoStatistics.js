import { create } from "../core/dom.js";

export const LottoStatistics = ({ lottoResult, profitRate, onRetry }) => {
  const $section = create("section", { className: "lotto-statistics-section" });

  lottoResult.forEach(({ count }) => {
    const $count = create("div", {
      text: count,
      class: "lotto-result",
    });
    $section.append($count);
  });

  const $profitRate = create("div", {
    text: `총 수익률은 ${profitRate}%입니다.`,
    class: "lotto-profitRate",
  });

  $section.append($profitRate);

  const $askRetry = create("button", {
    type: "submit",
    className: "retry-button",
    text: "다시 하시겠습니까",
  });

  $askRetry.addEventListener("click", (e) => {
    e.preventDefault();
    onRetry();
  });

  $section.append($askRetry);
  return $section;
};
