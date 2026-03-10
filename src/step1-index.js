import InputView from './InputView.js';
import OutputView from './OutputView.js';
import LottoStore from './LottoStore.js';
import LottoResultGenerator from './LottoResultGenerator.js';
import Lotto from './Lotto.js';
import WinningLottoAndBonusNumber from './WinningLottoAndBonusNumber.js';

async function main() {
  const inputView = new InputView();
  const outputView = new OutputView();

  const purchaseAmount = await inputHandler(() => inputView.askAmount());
  const lottos = LottoStore.purchaseLottos(purchaseAmount);
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
