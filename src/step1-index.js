import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import LottoGame from './domain/LottoGame.js';
import Console from './util/Console.js';
import COMMAND from './constant/command.js';

const App = (function () {
  const purchaseLottos = async () => {
    const lottoPrice = await InputView.readLottoPrice();
    LottoGame.init(lottoPrice);

    OutputView.printLottos(LottoGame.getLottos());
  };

  const registerWinningNumbers = async () => {
    const luckyNumbers = await InputView.readLuckyNumbers();
    const bonusNumber = await InputView.readBonusNumber(luckyNumbers);

    LottoGame.initWinningNumbers({ luckyNumbers, bonusNumber });
  };

  const calculateLotto = () => {
    const amountOfRanks = LottoGame.drawLotto();
    const profit = LottoGame.calculateProfit();

    OutputView.printStatistics(amountOfRanks, profit);
  };

  const isRetry = async () => {
    return (await InputView.readRetryCommand()) === COMMAND.RETRY;
  };

  const endLotto = () => {
    Console.close();
  };

  return {
    async beginLotto() {
      await purchaseLottos();
      await registerWinningNumbers();
      calculateLotto();

      if (await isRetry()) {
        this.beginLotto();
        return;
      }

      endLotto();
    },
  };
})();

App.beginLotto();
