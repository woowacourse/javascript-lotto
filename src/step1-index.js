import InputView from "./InputView.js";
import LottoStore from "./LottoStore.js";
import WinningNumbersAndBonusNumberBuilder from "./WinningNumbersAndBonusNumberBuilder.js";

async function main() {
  const inputView = new InputView();

  const amount = await inputHandler(() => inputView.askAmount());
  const lottos = LottoStore.purchaseLottos(amount);

  const builder = new WinningNumbersAndBonusNumberBuilder();

  const winningNumbers = await inputHandler(() => {
    inputView.askWinningNumbers();
    builder.setWinningNumbers(winningNumbers);
  });

  const bonusNumber = await inputHandler(() => {
    inputView.askBonusNumber();
    builder.setBonusNumber(bonusNumber);
  });

  builder.build();
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
