import LottoResult from "../domain/LottoResult.js";
import LottoStatus from "../domain/LottoStatus.js";
import Ticket from "../domain/Ticket.js";
import Output from "../view/output.js";
import { OUTPUT } from "../constants/message.js";
import { PRICE } from "../constants/price.js";
import { divideByUnit } from "../utils/count.js";
import { getNeededLottoNumbers, getPrice } from "./getInputWithRetry.js";

const game = async () => {
  const price = await getPrice();

  const countNumber = divideByUnit(PRICE.UNIT, price);
  Output.print(`${countNumber}${OUTPUT.BUY_COUNT}`);

  const lottos = Ticket.createLottos(countNumber);
  Output.printLottoNumber(lottos);

  const { winningLotto, bonusLottoNumber } = await getNeededLottoNumbers();
  Output.print(OUTPUT.WINNING_HISTORY);
  Output.print(OUTPUT.LINE);

  const issuedLottoNumbers = lottos.map((lotto) => lotto.getLottoNumbers());
  const lottoStatus = new LottoStatus({
    enteredLottoNumbers: winningLotto.getLottoNumbers(),
    bonusLottoNumber,
  });
  const matchedlottoStatus =
    lottoStatus.getMatchedLottoStatus(issuedLottoNumbers);

  const lottoResult = new LottoResult({ matchedlottoStatus, price });
  const lottoHistory = lottoResult.getWinningHistory();

  Output.printWinningHistory(lottoHistory);
  Output.printTotalProfit(lottoResult.getRate());
};

export default game;
