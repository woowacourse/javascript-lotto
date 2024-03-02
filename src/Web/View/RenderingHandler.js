import '../css/header.css';
import '../css/footer.css';
import '../css/main.css';

import LottoNumbersComponents from './components/LottoNumbersComponent';
import WinLottoComponents from './components/WinLottoComponents';

import LottoComponents from './components/LottoComponents';
import { appendChildren } from '../utils';
import ResultModal from './components/ResultModal';

const RenderingHandler = Object.freeze({
  renderLottoComponents: () => {
    const app = document.getElementById('app');
    const main = document.createElement('main');
    const lottoContainer = LottoComponents.makeLottoContainerElement();

    main.appendChild(lottoContainer);
    app.appendChild(main);
  },

  renderLottosList: (boughtLottos) => {
    const lottoResultContainer = document.getElementById('lottoResultContainer');
    lottoResultContainer.innerHTML = '';
    appendChildren(lottoResultContainer, [
      LottoNumbersComponents.makeLottoResults(boughtLottos),
      WinLottoComponents.makeWinLottoForm(),
    ]);
  },

  renderLottoResultModal: (winLottos, rateOfIncome) => {
    const main = document.getElementsByTagName('main')[0];
    main.appendChild(ResultModal.makeModalElement(winLottos, rateOfIncome));
  },

  resetRenderedComponents: () => {
    const app = document.getElementById('app');
    app.innerHTML = '';
  },
});

export default RenderingHandler;
