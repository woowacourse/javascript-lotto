import LottoGameController from './controller/LottoGameController';

class App {
  start() {
    new LottoGameController().play();
  }
}

export default App;
