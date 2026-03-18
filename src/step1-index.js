import InputView from './step-1/InputView.js';
import OutputView from './step-1/OutputView.js';
import LottoStore from './step-1/LottoStore.js';
import Lotto from './step-1/Lotto.js';
import WinningLottoAndBonusNumber from './step-1/WinningLottoAndBonusNumber.js';
import LottoResultGenerator from './step-1/LottoResultGenerator.js';

async function main() {
  const inputView = new InputView();
  const outputView = new OutputView();

  const lottos = await inputHandler(async () => {
    const purchaseAmount = await inputView.askAmount();
    return LottoStore.purchaseLottos(purchaseAmount);
  });
  outputView.printLottos(lottos);

  const winningLotto = await inputHandler(async () => {
    const winningNumbers = await inputView.askWinningNumbers();
    return new Lotto(winningNumbers);
  });

  const winningLottoAndBonusNumber = await inputHandler(async () => {
    const bonusNumber = await inputView.askBonusNumber();
    return new WinningLottoAndBonusNumber(winningLotto, bonusNumber);
  });

  const { ranks, returnRate } = LottoResultGenerator.generateResult(lottos, winningLottoAndBonusNumber);
  outputView.printLottoResult(ranks, returnRate);

  await inputHandler(async () => {
    const userInput = await inputView.askRetry();
    if (userInput === 'y') {
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
