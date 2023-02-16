import Component from './Component.js';
import Amount from './view/components/Amount.js';
import LottoList from './view/components/LottoList.js';
import Statistics from './view/components/Statistics.js';
import WinNumbers from './view/components/WinNumbers.js';

class App extends Component {
  async play() {
    await this.render(new Amount({ setter: this.setState.bind(this) }));
    await this.render(new LottoList({ lottoList: this.state.lottoList }));
    await this.render(new WinNumbers({ setter: this.setState.bind(this) }));
    await this.render(new Statistics({ lottoList: this.state.lottoList }));
  }

  async render(component) {
    await component.read();
    component.render();
  }

  setUp() {
    this.state = { total: null, lottoList: [] };
  }
}

const app = new App();
(async () => {
  await app.play();
})();
