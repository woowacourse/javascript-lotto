/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import { LOTTO_RULE } from "./utils/constants.js";
import LottoService from "./service/LottoService.js";

class App {
  async run() {
    const lottoService = new LottoService();

    const purchasedAmount = await InputView.readPurchaseAmount();
    const lottos = lottoService.purchaseLottos(purchasedAmount);

    OutputView.printLottoCount(lottos.length);
    OutputView.printIssuedLottos(lottos);

    const winningNumbers = await InputView.readWinningNumbers();
    const bonusNumber = await InputView.readBonusNumber();

    const { stats, profitRate } = lottoService.calculateWinningResult(
      winningNumbers,
      bonusNumber
    );

    OutputView.printStats(stats);
    OutputView.printProfitRate(profitRate);

    this.checkRestart();
  }

  async checkRestart() {
    const command = await InputView.askRestart();

    if (command === LOTTO_RULE.RESTART) {
      return this.run();
    }

    return InputView.close();
  }
}

const app = new App();
app.run();
