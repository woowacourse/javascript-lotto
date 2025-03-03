import clearUIElements from '../View/clear/clearUIElements.js';
import state from '../state.js';

function reset() {
  state.lottos = [];
  state.winCount = 0;
  state.purchasePrice = 0;
  clearUIElements();
}

export default reset;
