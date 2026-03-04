import LottoList from "./Model/LottoList.js";
import InputView from "./View/InputView.js";
import OutputView from "./View/OutputView.js";

class App {
  async run() {
    const inputView = new InputView();
    // const price = await inputView.readPrice();
    // const lottoNumbers = await inputView.readLottoNumbers();
    // const bonusNumber = await inputView.readBonusNumber();

    const outputView = new OutputView();
    // outputView.printAmount(1);

    const lottoList = new LottoList(6);
    outputView.printLottos(lottoList.getLottoList());

    // const _statistics = { 5: 50, 4: 40, 3: 30, 2: 20, 1: 10 };
    // outputView.printStatistics(_statistics);
    // outputView.printRate(62.5);

    // const isRetry = await inputView.readIsRetry();

    
  }
}

export default App;
