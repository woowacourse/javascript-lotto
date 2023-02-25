import LottoUIController from './controller/lottoUIController';

class App {
  constructor($app) {
    new LottoUIController($app).play();
  }
}

export default App;
