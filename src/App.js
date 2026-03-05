import LottoGame from "./Model/LottoGame.js";
import LottoList from "./Model/LottoList.js";
import Rate from "./Model/Rate.js";
import { parsingNumbers } from "./utils/parsing.js";
import InputView from "./View/InputView.js";
import OutputView from "./View/OutputView.js";

class App {
  async run() {
    const inputView = new InputView();
    const price = await inputView.readPrice();
    const lottoNumbers = await inputView.readLottoNumbers();
    const bonusNumber = await inputView.readBonusNumber();

    const outputView = new OutputView();
    outputView.printAmount(price);

    const lottoList = new LottoList(price / 1000);
    outputView.printLottos(lottoList.getLottoList());

    const winningNumbers = parsingNumbers(lottoNumbers);

    

    const lottoGame = new LottoGame(winningNumbers, bonusNumber);

    const statistics = lottoGame.getStatistics(lottoList);

    const rate = new Rate(statistics, price);

    outputView.printStatistics(statistics);
    outputView.printRate(rate.getRate());

    // const isRetry = await inputView.readIsRetry();
  }
}

export default App;
