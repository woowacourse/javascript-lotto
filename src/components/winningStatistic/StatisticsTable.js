import customCreateElement from "../../utils/customElement.js";
import { LOTTO_STATUS } from "../../constants/lotto.js";

export default class StatisticsTable {
  constructor($target, lottoHistory) {
    this.render($target, lottoHistory);
  }

  render($target, lottoHistory) {
    const $table = customCreateElement({ tagName: "table" });
    const $tableHead = customCreateElement({
      tagName: "tr",
      className: "table-head",
    });

    const tableHeadTexts = ["일치 갯수", "당첨금", "당첨 개수"];
    tableHeadTexts.forEach((text) => {
      const $row = customCreateElement({
        tagName: "th",
        className: "col",
        text,
      });

      $tableHead.appendChild($row);
    });

    $table.appendChild($tableHead);

    Object.entries(lottoHistory)
      .toReversed()
      .forEach(([rank, count]) => {
        const { REWORD, COUNT: MATCH_COUNT } = LOTTO_STATUS.find(
          (status) => status.RANK === Number(rank)
        );

        if (Number(rank) === 2) {
          const $tableRow = this.createTableRow({
            matchedCount: "5개+보너스볼",
            reword: REWORD.toLocaleString("ko-KR"),
            winningCount: count,
          });
          $table.appendChild($tableRow);
          return;
        }

        const $tableRow = this.createTableRow({
          matchedCount: `${MATCH_COUNT}개`,
          reword: REWORD.toLocaleString("ko-KR"),
          winningCount: count,
        });
        $table.appendChild($tableRow);
      });

    $target.appendChild($table);
  }

  createTableRow(tableInfo) {
    const { matchedCount, reword, winningCount } = tableInfo;

    const $tableRow = customCreateElement({
      tagName: "tr",
      className: "tabel-row",
    });

    const $tableRow1 = customCreateElement({
      tagName: "td",
      text: matchedCount,
    });
    const $tableRow2 = customCreateElement({
      tagName: "td",
      text: reword.toLocaleString("ko-KR"),
    });
    const $tableRow3 = customCreateElement({
      tagName: "td",
      text: `${winningCount}개`,
    });

    [$tableRow1, $tableRow2, $tableRow3].forEach(($row) =>
      $tableRow.appendChild($row)
    );

    return $tableRow;
  }
}
