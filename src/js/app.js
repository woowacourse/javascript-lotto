import LottoView from './ui/LottoView.js';

function App() {
  window.addEventListener('DOMContentLoaded', () => {
    const lottoView = new LottoView();
    lottoView.bindEvents();
  });
}
export default App;
