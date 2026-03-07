import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import LottoStore from "./LottoStore.js";
import WinningNumbersAndBonusNumberBuilder from "./WinningNumbersAndBonusNumberBuilder.js";
import LottoRankCalculator from "./LottoRankCalculator.js";
import LottoReturnCalculator from "./LottoReturnCalculator.js";

async function main() {
  const inputView = new InputView();
  const outputView = new OutputView();

  const lottos = await inputHandler(() => {
    const purchaseAmount = inputView.askAmount();
    return LottoStore.purchaseLottos(purchaseAmount);
  });

  outputView.printLottos(lottos);

  const builder = new WinningNumbersAndBonusNumberBuilder();

  await inputHandler(async () => {
    const winningNumbersInput = await inputView.askWinningNumbers();
    const winningNumbers = winningNumbersInput.split(",").map(Number);
    //TODO: refactor. validator 추상화 필요함.
    if (winningNumbers.some((number) => Number.isNaN(number))) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.NUMBER);
    }
    builder.setWinningNumbers(winningNumbers);
  });

  await inputHandler(async () => {
    const bonusNumberInput = await inputView.askBonusNumber();
    const bonusNumber = Number(bonusNumberInput);
    //TODO: refactor. validator 추상화 필요함.
    if (Number.isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER.NUMBER);
    }
    builder.setBonusNumber(bonusNumber);
  });

  const { winningNumbers, bonusNumber } = builder.build();

  const rank = LottoRankCalculator.calculateLottoRanks({
    lottos,
    winningNumbers,
    bonusNumber,
  });
  const returnAmount = LottoReturnCalculator.calculateReturnAmount(rank);
  const returnRate = LottoReturnCalculator.calculateReturnRate(
    returnAmount,
    purchaseAmount,
  );

  outputView.printLottoResult(rank, returnRate);

  await inputHandler(async () => {
    const userInput = await inputView.askRetry();
    if (userInput === "y") {
      main();
    }
  });
}

async function inputHandler(inputFn) {
  while (1) {
    try {
      return await inputFn();
    } catch (e) {
      console.log(e.message);
    }
  }
}

main();
