import '../index.css';
import LottoGameController from './controller/LottoGameController';

export default class App {
  constructor() {
    this.lottoGameController = new LottoGameController();
  }
}

const app = new App();

App();
