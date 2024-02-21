import LottoController from './controller/LottoController';

class App {
  async init() {
    await new LottoController().start();
  }
}

export default App;
