//@ts-check
import AmountInput from "./components/AmountInput.js";
import LottoList from "./components/LottoList.js";
import StatisticsModal from "./components/StatisticsModal.js";
import UserInput from "./components/UserInput.js";
import { qs } from "../utils/domHelper.js";
import Component from "./core/Component.js";

class App extends Component {
  constructor() {
    super(qs("#app"));
  }

  setUp() {
    this.initialState = { lottoList: [] };
    this.state = this.initialState;
  }

  template() {
    return `
      <header id="header-layout">
        <h1 class="header-layout-title title">🎱 행운의 로또</h1>
      </header>
      <main id="main-layout">
        <div class="amount-input-layout"></div>
        <section class="lotto-detail-layout"></section>
        <div class="user-input-layout"></div>
      </main>
      <div class='statistics-modal'></div>
      <footer class="footer lotto-caption">Copyright 2023. woowacourse</footer>
      `;
  }

  mounted() {
    const {
      state: { lottoList },
      setLottoList,
    } = this;

    new AmountInput(qs(".amount-input-layout"), {
      setLottoList: setLottoList.bind(this),
      state: this.state,
    });

    if (lottoList.length !== 0) {
      new LottoList(qs(".lotto-detail-layout"), lottoList);
      new UserInput(qs(".user-input-layout"), {
        lottoList,
        onResult: this.handleLottoResult.bind(this),
        openModal: this.openModal.bind(this),
      });

      new StatisticsModal(qs(".statistics-modal"), {
        lottoResults: this.state.lottoResults,
        lottoList,
        reset: this.reset.bind(this),
        closeModal: this.closeModal.bind(this),
      });
    }
  }

  setLottoList(lottoList) {
    this.setState({ lottoList });
  }

  handleLottoResult({ lottoRanks, totalProfit, earningRate }) {
    this.setState({
      lottoResults: {
        ranks: lottoRanks,
        profit: totalProfit,
        earningRate,
      },
    });
  }

  openModal() {
    qs(".statistics-dialog").showModal();
  }

  closeModal() {
    qs(".statistics-dialog").close();
  }

  reset() {
    this.setState(this.initialState);
  }
}

export default App;
