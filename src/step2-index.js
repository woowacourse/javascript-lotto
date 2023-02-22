import './style/reset.css';
import './style/style.css';
import Component from './Component.js';
import { qs, component } from './utils/domHelper';
import Amount from './view/components/Amount.js';
import LottoList from './view/components/LottoList.js';
import WinNumbers from './view/components/WinNumbers.js';
import StatisticsModal from './view/components/StatisticsModal.js';

class App extends Component {
  constructor() {
    super(qs('#app'));
  }

  getInitialState() {
    return { lottoList: [] };
  }

  setUp() {
    this.state = this.getInitialState();
  }

  initState() {
    this.setState(this.getInitialState());
  }

  mounted() {
    const {
      state: { lottoList },
      initState,
      openModal,
      setLottoList,
      updateDrawingNumbers,
    } = this;

    new Amount(component('amount'), { setLottoList: setLottoList.bind(this) });

    if (lottoList.length !== 0) {
      new LottoList(component('lottoList'), { lottoList });
      new WinNumbers(component('winNumbers'), {
        updateDrawingNumbers: updateDrawingNumbers.bind(this),
        openModal: openModal.bind(this),
      });
      new StatisticsModal(component('statistics-modal'), {
        lottoList,
        initState: initState.bind(this),
      });
    }
  }

  template() {
    return `
      <header>Header</header>
      <main class='lotto-store'>
        <section class='lotto-store__title'>🎱 내 번호 당첨 확인 🎱</section>
        <section class='lotto-store__amount' data-component='amount'></section>
        ${this.getAfterPurchaseTemplate()}
      </main>
      <footer>Footer</footer>
    `;
  }

  setLottoList(lottoList) {
    this.setState({ lottoList });
  }

  updateDrawingNumbers(drawingNumbers) {
    const lottoList = this.state.lottoList.map((lotto) => {
      lotto.setDrawingNumbers(drawingNumbers);

      return lotto;
    });

    this.setLottoList(lottoList);
  }

  openModal() {
    qs('.statistics-modal__dialog').showModal();
  }

  getAfterPurchaseTemplate() {
    if (this.state.lottoList.length !== 0) {
      return `
        <section class='lotto-store__lotto-list' data-component='lottoList'></section>
        <section class='lotto-store__win-numbers' data-component='winNumbers'></section>
        <div data-component='statistics-modal'></div>
      `;
    }

    return ``;
  }
}

new App();
