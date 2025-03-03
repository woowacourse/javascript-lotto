import clearUIElements from './View/clear/clearUIElements.js';
import state from './state.js';

function reset() {
  state.lottos = [];
  clearUIElements();
}

export default reset;
