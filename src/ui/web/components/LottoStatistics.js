import { create } from "../core/dom.js";

export const LottoStatistics = ({ onRetry }) => {
  const $section = create("section", { className: "lotto-statistics-section" });

  const render = ({ lottoResult, profitRate }) => {
    $section.replaceChildren();

    const $title = create("h2", {
      text: "🏆 당첨 통계 🏆",
      className: "statistics-title lotto-subtitle",
    });

    const $table = create("table", { className: "statistics-table" });
    const $thead = create("thead");
    const $headerRow = create("tr");

    ["일치 갯수", "당첨금", "당첨 갯수"].forEach((text) => {
      $headerRow.append(create("th", { text }));
    });
    $thead.append($headerRow);

    const $tbody = create("tbody", { className: "lotto-body" });
    lottoResult.forEach(({ matchCount, hasBonus, count, prize, order }) => {
      const $row = create("tr", { "data-rank": order });

      const matchText = hasBonus
        ? `${matchCount}개 + 보너스볼`
        : `${matchCount}개`;
      const prizeText = prize.toLocaleString();
      const countText = `${count}개`;

      const $matchTd = create("td", { text: matchText, "data-field": "match" });
      const $prizeTd = create("td", { text: prizeText, "data-field": "prize" });
      const $countTd = create("td", { text: countText, "data-field": "count" });

      $row.append($matchTd, $prizeTd, $countTd);
      $tbody.append($row);
    });

    $table.append($thead, $tbody);

    console.log(profitRate);
    const $profitRate = create("p", {
      text: `당신의 총 수익률은 ${profitRate}%입니다.`,
      className: "profit-rate",
    });

    const $retryButton = create("button", {
      type: "button",
      className: "retry-button lotto-button",
      text: "다시 시작하기",
    });

    $retryButton.addEventListener("click", onRetry);
    $section.append($title, $table, $profitRate, $retryButton);
  };

  return { $section, render };
};
