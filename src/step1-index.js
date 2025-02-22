import { INPUT, OUTPUT, RETRY_STRING, ERROR } from "./constants/message.js";
import Input from "./view/Input.js";
import Output from "./view/Output.js";
import { divideByUnit } from "./utils/count.js";
import PriceValidator from "./validation/PriceValidator.js";
import BonusNumberValidator from "./validation/BonusNumberValidator.js";
import Lotto from "./domain/Lotto.js";
import LottoMachine from "./domain/LottoMachine.js";
import LottoResult from "./domain/LottoResult.js";
import { PRICE } from "./constants/price.js";
import { throwError } from "./utils/throwError.js";
import LottoFactory from "./domain/LottoFactory.js";

/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

const priceInput = async () =>
  Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.PRICE);
    new PriceValidator().validatePrice(Number(input));
    return Number(input);
  });

const getNeededLottoNumbers = async () => {
  const winningLotto = await Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.WINNER_NUMBERS);
    const winningNumbersArray = input.split(",").map(Number);
    const winningLotto = new Lotto(winningNumbersArray);
    return winningLotto;
  });

  const bonusLottoNumber = await Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.BONUS_NUMBER);
    new BonusNumberValidator().validateBonusNumber(
      winningLotto.getLottoNumbers(),
      Number(input)
    );
    return Number(input);
  });
  return { winningLotto, bonusLottoNumber };
};

const game = async () => {
  const price = await priceInput();

  const countNumber = divideByUnit(PRICE.UNIT, price);
  Output.print(`${countNumber}${OUTPUT.BUY_COUNT}`);

  const lottos = LottoFactory.issueLottos(countNumber);
  Output.printLottoNumber(lottos);

  const { winningLotto, bonusLottoNumber } = await getNeededLottoNumbers();
  Output.print(OUTPUT.WINNING_HISTORY);
  Output.print(OUTPUT.LINE);

  const lottoMachine = new LottoMachine(lottos);
  lottoMachine.updateAllLottoStatus(
    winningLotto.getLottoNumbers(),
    bonusLottoNumber
  );
  const lottoStatus = lottoMachine.getMatchedLottoStatus();

  const lottoResult = new LottoResult(lottoStatus, price);
  const lottoHistory = lottoResult.getWinningHistory();

  Output.printWinningHistory(lottoHistory);
  Output.printTotalProfit(lottoResult.calculateRate());
};

const start = async () => {
  await game();

  const retry = await Input.retry(async () => {
    const input = await Input.readLineAsync(INPUT.RETRY);
    if (!RETRY_STRING.includes(input)) {
      throwError(ERROR.INVALID_RETRY_STRING);
    }
    return input.toLowerCase();
  });

  if (retry === "y") await start();
};

start();
