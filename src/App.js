import LottoMachine from "./domains/LottoMachine.js";
import { BonusNumberValidator } from "./validators/BonusNumberValidator.js";
import { PurchasePriceValidator } from "./validators/PurchasePriceValidator.js";
import { WinningNumbersValidator } from "./validators/WinningNumbersValidator.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";

class App {
  async run() {
    const lottoPurchasePrice = await InputView.enterPurchasePrice();
    PurchasePriceValidator.validate(Number(lottoPurchasePrice));
    const lottoCount = lottoPurchasePrice / 1000;

    const lottoMachine = new LottoMachine(lottoCount);
    OutputView.printPurchaseLottos(lottoMachine.lottos);

    const winningNumbers = await InputView.enterWinningNumbers();
    const splittedWinningNumbers = winningNumbers.split(",").map(Number);
    WinningNumbersValidator.validate(splittedWinningNumbers);

    const bonusNumber = await InputView.enterBonusNumber();
    const transformedBonusNumber = Number(bonusNumber);
    BonusNumberValidator.validate(
      transformedBonusNumber,
      splittedWinningNumbers
    );
  }
}

export default App;
