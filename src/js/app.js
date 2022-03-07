import PurchaseLottosController from './controllers/PurchaseLottosController.js';
import CheckWinningLottosController from './controllers/CheckWinningLottosController.js';
import LottoMachine from './models/LottoMachine.js';

function App() {
  window.addEventListener('DOMContentLoaded', () => {
    const lottoMachine = new LottoMachine();
    new PurchaseLottosController(lottoMachine);
    new CheckWinningLottosController(lottoMachine);
  });
}
export default App;
