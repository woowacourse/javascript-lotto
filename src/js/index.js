import { $, $$ } from './dom';
class App {
  init() {
    this.bindEventListener();
  }

  test() {
    const money = $('#money-input').value;
    alert(money);
  }

  bindEventListener() {
    $('#purchase-button').addEventListener('click', this.test);
  }
}

const app = new App();
app.init();
