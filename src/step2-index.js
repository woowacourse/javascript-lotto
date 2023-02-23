import './style/reset.css';
import './style/style.css';
import Component from './view/components/Component.js';
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
      new StatisticsModal(component('statisticsModal'), {
        lottoList,
        initState: initState.bind(this),
      });
    }
  }

  template() {
    return `
      <header>🎱 행운의 로또</header>
      <main class='lotto-store'>
        <section class='lotto-store__title'>🎱 내 번호 당첨 확인 🎱</section>
        <section class='lotto-store__amount' data-component='amount'></section>
        ${this.getAfterPurchaseTemplate()}
      </main>
      <footer>Copyright 2023. woowacourse</footer>
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
    qs('.lotto-store__statistics-dialog').showModal();
  }

  getAfterPurchaseTemplate() {
    if (this.state.lottoList.length !== 0) {
      return `
        <section class='lotto-store__lotto-list' data-component='lottoList'></section>
        <section class='lotto-store__win-numbers' data-component='winNumbers'></section>
        <div class='lotto-store__statistics-modal' data-component='statisticsModal'></div>
      `;
    }

    return ``;
  }
}

new App();
