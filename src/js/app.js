import PurchaseLottosController from './controllers/PurchaseLottosController.js';
import CheckWinningLottosView from './views/CheckWinningLottosView.js';

function App() {
  window.addEventListener('DOMContentLoaded', () => {
    new PurchaseLottosController();
    new CheckWinningLottosView();
  });
}
export default App;
