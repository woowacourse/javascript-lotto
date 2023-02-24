import { addESCCloseEventListener } from './components/modal';
import LottoUIController from './controller/lottoUIController';

class App {
  constructor($app) {
    addESCCloseEventListener();
    new LottoUIController($app).play();
  }
}

export default App;
