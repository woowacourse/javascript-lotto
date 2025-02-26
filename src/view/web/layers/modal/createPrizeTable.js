import {
  LOTTO_MATCHED_NUMBER_COUNT,
  LOTTO_PRIZE_MONEY,
} from "../../../../constants/lotto.js";
import { WINNING_TABLE } from "../../../../constants/web.js";
import { setTable, setHeader, setRow } from "../../templates/table.js";

const createPrizeTable = (result) => {
  const rows = Array.from(result).map(([matchedCount, matchedLottos]) => {
    const matchedKey = LOTTO_MATCHED_NUMBER_COUNT.get(matchedCount);
    const prize = LOTTO_PRIZE_MONEY.get(matchedKey);
    return [matchedCount, prize, matchedLottos];
  });

  const headerTemplate = setHeader([...WINNING_TABLE.HEADERS]);
  const rowTemplate = rows.map((row) => setRow(row)).join("");
  const prizeTable = setTable(headerTemplate, rowTemplate);

  document
    .getElementById("prize-result-modal")
    .insertAdjacentHTML("beforeend", prizeTable);
};

export default createPrizeTable;
