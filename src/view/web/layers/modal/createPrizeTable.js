import {
  LOTTO_MATCHED_NUMBER_COUNT,
  LOTTO_PRIZE_MONEY,
} from "../../../../constants/lotto.js";
import { WINNING_TABLE } from "../../../../constants/web.js";
import { setHeader, setRow } from "../../templates/table.js";

const createPrizeTable = (result) => {
  const rows = Array.from(result).map(([matchedCount, matchedLottos]) => {
    const prizeKey = LOTTO_MATCHED_NUMBER_COUNT.get(matchedCount);
    const prize = LOTTO_PRIZE_MONEY.get(prizeKey);
    return [matchedCount, prize, matchedLottos];
  });

  const headerTemplate = setHeader([...WINNING_TABLE.HEADERS]);
  const rowTemplate = rows.map((row) => setRow(row)).join("");

  document
    .getElementById("prize-table")
    .insertAdjacentHTML("afterbegin", headerTemplate);

  document
    .getElementById("prize-table-body")
    .insertAdjacentHTML("beforeend", rowTemplate);
};

export default createPrizeTable;
