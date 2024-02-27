import LottoPurchaseBox from './LottoPurchaseBox';

class App {
  start() {
    const $target = document.querySelector('#app');
    new LottoPurchaseBox($target, { restart: () => this.restart() });
  }

  restart() {
    this.start();
  }
}

export default App;
