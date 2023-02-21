import LottoGame from './domain/LottoGame';
import LottoUIController from './controller/lottoUIController';

class App {
  constructor($app) {
    this.#$app = $app;
    const controller = new LottoUIController();
  }
}

export default App;
