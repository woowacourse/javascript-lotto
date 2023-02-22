import './style/reset.css';
import './style/style.css';
import Component from './Component.js';
import { qs, component } from './utils/domHelper';
import Header from './view/components/Header.js';
import Amount from './view/components/Amount.js';
import LottoList from './view/components/LottoList.js';
import WinNumbers from './view/components/WinNumbers.js';
import StatisticsModal from './view/components/StatisticsModal.js';

class App extends Component {
  constructor() {
    super(qs('#app'));
  }

  getInitialState() {
    return { amount: 0, lottoList: [] };
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

    new Header(component('header'));
    new Amount(component('amount'), { setLottoList: setLottoList.bind(this) });
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

  template() {
    return `
      <header>Header</header>
      <main>
        <section data-component='header'></section> 
        <section data-component='amount'></section>
        <section data-component='lottoList'></section>
        <section data-component='winNumbers'></section>
        <div data-component='statistics-modal'></div>
      </main>
      <footer>Feader</footer>
    `;
  }

  setAmount(amount) {
    this.setState({ amount });
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
}

new App();
