import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import LottoStore from "./LottoStore.js";
import WinningNumbersAndBonusNumberBuilder from "./WinningNumbersAndBonusNumberBuilder.js";
import LottoRankCalculator from "./LottoRankCalculator.js";
import LottoReturnCalculator from "./LottoReturnCalculator.js";

async function getPurchaseAmount() {
  const inputView = new InputView();
  return await inputHandler(() => {
    const purchaseAmount = inputView.askAmount();
    return {
      lottos: LottoStore.purchaseLottos(purchaseAmount),
      purchaseAmount,
    };
  });
}

async function getWinningNumbersAndBonusNumber() {
  const inputView = new InputView();
  const builder = new WinningNumbersAndBonusNumberBuilder();

  await inputHandler(async () => {
    const winningNumbersInput = await inputView.askWinningNumbers();
    const winningNumbers = winningNumbersInput.split(",").map(Number);
    builder.setWinningNumbers(winningNumbers);
  });

  await inputHandler(async () => {
    const bonusNumberInput = await inputView.askBonusNumber();
    const bonusNumber = Number(bonusNumberInput);
    builder.setBonusNumber(bonusNumber);
  });

  return { ...builder.build() };
}

async function retry() {
  const inputView = new InputView();
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

async function main() {
  const outputView = new OutputView();

  const { lottos, purchaseAmount } = await getPurchaseAmount();

  outputView.printLottos(lottos);

  const { winningNumbers, bonusNumber } =
    await getWinningNumbersAndBonusNumber();

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

  await retry();
}

main();
