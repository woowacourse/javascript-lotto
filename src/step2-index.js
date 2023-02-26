import '../main.css';
import { getId } from './utils/domHelper.js';
import Component from './view-web/components/Component.js';
import Amount from './view-web/components/Amount.js';
import LottoList from './view-web/components/LottoList.js';
import WinNumbers from './view-web/components/WinNumbers.js';
import StatisticsModal from './view-web/components/StatisticsModal';

class App extends Component {
  constructor() {
    super(getId('app'));
  }

  mount() {
    new Amount(this.lottoStore.setState, this.render.bind(this));

    console.log(this.lottoStore.getLottoList());
    if (this.lottoStore.getLottoList().length !== 0) {
      new LottoList();
      new WinNumbers(this.setDrawingNumbers.bind(this));
      new StatisticsModal();
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
}

new App();
