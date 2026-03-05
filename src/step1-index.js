import InputView from "./InputView.js";
import LottoStore from "./LottoStore.js";
import WinningNumbersAndBonusNumberBuilder from "./WinningNumbersAndBonusNumberBuilder.js";

async function main() {
  const inputView = new InputView();

  const amount = await inputView.askAmount();
  const lottos = LottoStore.purchaseLottos(amount);

  const winningNumbers = await inputView.askWinningNumbers();
  const bonusNumber = await inputView.askBonusNumber();

  const builder = new WinningNumbersAndBonusNumberBuilder();
  builder.setWinningNumbers(winningNumbers).setBonusNumber(bonusNumber).build();
}

main();
