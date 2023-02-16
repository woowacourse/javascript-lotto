import Component from './Component.js';
import Amount from './view/components/Amount.js';
import LottoList from './view/components/LottoList.js';
import WinNumbers from './view/components/WinNumbers.js';
import Statistics from './view/components/Statistics.js';
import Retry from './view/components/Retry.js';
import Console from './utils/Console.js';

class App extends Component {
  async play() {
    await this.render(new Amount({ setter: this.setState.bind(this) }));
    await this.render(new LottoList({ lottoList: this.state.lottoList }));
    await this.render(
      new WinNumbers({ lottoList: this.state.lottoList, setter: this.setState.bind(this) })
    );
    await this.render(new Statistics({ lottoList: this.state.lottoList }));
    await this.render(new Retry({ setter: this.setState.bind(this) }));
    await this.checkRetry(this.state.retry);

    this.exit();
  }

  async render(component) {
    await component.read();
    component.render();
  }

  setUp() {
    this.state = { total: null, lottoList: [], retry: false };
  }

  exit() {
    Console.close();
  }

  async checkRetry(retry) {
    if (retry) await new App().play();
  }
}

const app = new App();
app.play();
