import { create } from "../core/dom.js";

export const LottoStatistics = ($target, { lottoResult, profitRate }) => {
  lottoResult.forEach(({ count }) => {
    const $count = create("div", {
      text: count,
      class: "lotto-result",
    });
    $target.append($count);
  });

  const $profitRate = create("div", {
    text: `총 수익률은 ${profitRate}%입니다.`,
    class: "lotto-profitRate",
  });

  $target.append($profitRate);

  const $askRetry = create("button", {
    type: "submit",
    className: "retry-button",
    text: "다시 하시겠습니까",
  });
  $target.append($askRetry);
};
