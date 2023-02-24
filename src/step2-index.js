import '../main.css';
import { qs } from './utils/domHelper.js';
import Component from './view-web/components/Component.js';
import Amount from './view-web/components/Amount.js';
import LottoList from './view-web/components/LottoList.js';
import WinNumbers from './view-web/components/WinNumbers.js';
import StatisticsModal from './view-web/components/StatisticsModal';

class App extends Component {
  state;

  constructor() {
    super(qs('#app'), { lottoList: [] });
  }

  mount() {
    new Amount(this.setState.bind(this));
    if (this.state.lottoList.length !== 0) {
      new LottoList(this.state);
      new WinNumbers(this.setState.bind(this), {
        drawingNumbersSetter: this.setDrawingNumbers.bind(this),
        activateModal: this.activateModal.bind(this),
      });
      new StatisticsModal(this.state, this.setState.bind(this));
    }
  }

  template() {
    return `
    <div id="document-title"><h1>🎱 행운의 로또</h1></div>
    <article id="comfirmation-lotto-number-form">
      <header>
        <h2>🎱 내 번호 당첨 확인 🎱</h2>
      </header>

      <section id="input-purchase-form"></section>

      <section id="lotto-list-result-form"></section>

      <section>
        <form action="submit" id="input-winning-number-form">
        </form>
      </section>
    </article>

    <dialog id="lotto-statistics-modal"></dialog>

    <footer id="footer">
      <span>Copyright 2023. woowacourse</span>
    </footer>
    `;
  }

  setDrawingNumbers(drawingNumbers) {
    const lottoList = this.state.lottoList.map((lotto) => {
      lotto.setDrawingNumbers(drawingNumbers);
      return lotto;
    });
    return lottoList;
  }

  activateModal() {
    qs('#lotto-statistics-modal').showModal();
  }
}

new App();
