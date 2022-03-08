import { $body } from './utils/dom.js';

import { handleClick } from './event/handleClick.js';
import { handleSubmit } from './event/handleSubmit.js';

export default class App {
  constructor() {
    this.handleEvent();
    this.lottoPrice = 0;
    this.lottoList = [];
    this.winningNumberList = [];
  }

  handleEvent() {
    $body.addEventListener('click', handleClick.bind(this));
    $body.addEventListener('submit', handleSubmit.bind(this));
  }
}

new App();
