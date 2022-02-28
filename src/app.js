import './css/index.css';
import LottoMachineController from './js/controller/LottoMachineController.js';

export default class App {
  constructor() {
    this.lottoMachineController = new LottoMachineController();
    console.log('app');
  }
}

new App();
