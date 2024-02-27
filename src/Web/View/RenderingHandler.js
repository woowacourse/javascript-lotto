import '../css/header.css';
import '../css/footer.css';
import '../css/main.css';

import LottoNumbersComponents from './components/LottoNumbersComponent';
import WinLottoComponents from './components/WinLottoComponents';

import LottoComponents from './components/LottoComponents';
import { makeElementWithClassName } from '../utils';

const RenderingHandler = Object.freeze({
  renderHeader: () => {
    const app = document.getElementById('app');
    const headerElement = document.createElement('header');
    headerElement.innerText = '🎱 행운의 로또';

    app.appendChild(headerElement);
  },

  renderFooter: () => {
    const app = document.getElementById('app');
    const footerElement = document.createElement('footer');
    footerElement.innerText = 'Copyright 2023. woowacourse';

    app.appendChild(footerElement);
  },

  renderLottoComponents: () => {
    const app = document.getElementById('app');
    const main = document.createElement('main');
    const lottoContainer = LottoComponents.makeLottoContainerElement();

    main.appendChild(lottoContainer);
    app.appendChild(main);
  },

  renderLottosList: (boughtLottos) => {
    const lottoContainer = document.getElementById('lottoContainer');
    lottoContainer.appendChild(LottoNumbersComponents.makeLottoResults(boughtLottos));
    lottoContainer.appendChild(WinLottoComponents.makeWinLottoForm());
  },
});

export default RenderingHandler;
