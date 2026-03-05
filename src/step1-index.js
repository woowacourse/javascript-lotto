import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import LottoStore from "./LottoStore.js";
import WinningNumbersAndBonusNumberBuilder from "./WinningNumbersAndBonusNumberBuilder.js";
import LottoRankCalculator from "./LottoRankCalculator.js";
import LottoReturnCalculator from "./LottoReturnCalculator.js";

async function main() {
  const inputView = new InputView();
  const outputView = new OutputView();

  const purchaseAmount = await inputHandler(() => inputView.askAmount());
  const lottos = LottoStore.purchaseLottos(purchaseAmount);

  const builder = new WinningNumbersAndBonusNumberBuilder();

  await inputHandler(async () => {
    const winningNumbers = await inputView.askWinningNumbers();
    builder.setWinningNumbers(winningNumbers);
  });

  await inputHandler(async () => {
    const bonusNumber = await inputView.askBonusNumber();
    builder.setBonusNumber(bonusNumber);
  });

  const { winningNumbers, bonusNumber } = builder.build();

  const rank = LottoRankCalculator.calculateLottoRanks(
    lottos,
    winningNumbers,
    bonusNumber,
  );
  const returnAmount = LottoReturnCalculator.calculateReturnAmount(rank);
  const returnRate = LottoReturnCalculator.calculateReturnRate(
    returnAmount,
    purchaseAmount,
  );

  outputView.printLottoResult(rank, returnRate);
}

async function inputHandler(inputFn) {
  while (1) {
    try {
      return await inputFn();
    } catch (e) {
      console.error(e);
    }
  }
}

main();
