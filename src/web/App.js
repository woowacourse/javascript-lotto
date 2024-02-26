import LottoPurchaseBox from './LottoPurchaseBox';

class App {
  play() {
    const $target = document.querySelector('#app');
    const lottoPurchaseBox = new LottoPurchaseBox($target);
  }
}

export default App;
