import LottoController from './controllers/LottoController.js';

function App() {
  window.addEventListener('DOMContentLoaded', () => {
    const lottoController = new LottoController();
    lottoController.bindEvents();
  });
}
export default App;
