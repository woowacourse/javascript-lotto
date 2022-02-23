<<<<<<< HEAD
import LottoView from "./ui/LottoView.js";

function App() {
  window.addEventListener("DOMContentLoaded", () => {
    const lottoView = new LottoView();
  });
}
export default App;
=======
import LottoView from './views/LottoView.js';

window.addEventListener('DOMContentLoaded', () => {
  const lottoView = new LottoView();
  lottoView.bindEvents();
});
>>>>>>> 8a86911 (feat: 뷰에서 로또의 갯수 렌더링 기능 추가)
