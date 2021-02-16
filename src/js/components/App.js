import { $ } from '../utils/dom.js';
import LottoPerchaseInput from './LottoPerchaseInput.js';

export default class App {
  constructor() {
    this.$target = $('#app');

    this.mountComponent();
  }

  initState() {}

  setState() {}

  mountComponent() {
    this.lottoPerchaseInput = new LottoPerchaseInput({});
  }
}
