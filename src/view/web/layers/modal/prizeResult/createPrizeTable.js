import {
  LOTTO_MATCHED_NUMBER_COUNT,
  LOTTO_PRIZE_MONEY,
} from "../../../../../constants/lotto.js";
import {
  LOTTO_RESULT_TABLE_MAP,
  PRIZE_RESULT,
} from "../../../../../constants/web.js";
import { setHeader, setRow } from "../../../../../utils/view/table.js";

const createPrizeTable = (result) => {
  const rows = Array.from(result).map(([matchedCount, matchedLottos]) => {
    const prizeKey = LOTTO_MATCHED_NUMBER_COUNT.get(matchedCount);
    const matchedTemplate = LOTTO_RESULT_TABLE_MAP.get(matchedCount);
    const prize = LOTTO_PRIZE_MONEY.get(prizeKey).toLocaleString();

    return [
      matchedTemplate,
      prize,
      `${matchedLottos}${PRIZE_RESULT.LOTTO_UNIT}`,
    ];
  });

  const headerTemplate = setHeader([...PRIZE_RESULT.HEADERS]);
  const rowTemplate = rows.map((row) => setRow(row)).join("");

  return { headerTemplate, rowTemplate };
};

export default createPrizeTable;
