import LottoController from './controller/LottoController';
import { InputView } from './view';
import { RestartOrExitValidator } from './validators';
import { RESTART } from './constants/message';
import retryOrEnd from './utils/RetryOrEnd';

class App {
  async init() {
    const lottoController = new LottoController();
    await lottoController.start();

    if ((await retryOrEnd([this.processRestartOrExit, this])) === RESTART.YES) this.init();
  }

  async processRestartOrExit() {
    const inputValue = await InputView.readRestartOrExit();
    RestartOrExitValidator.validateKeyword(inputValue);

    return inputValue;
  }
}

export default App;
