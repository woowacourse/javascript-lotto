import './css/index.css';
import LottoMachineController from './js/controller/LottoMachineController.js';

const app = {
  init: () => {
    new LottoMachineController();
  }
};

app.init();
