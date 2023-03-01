import LottoWebGame from './components/LottoWebGame';

class App {
  constructor($app) {
    new LottoWebGame($app).play();
  }
}

export default App;
