import { ACTION } from '../constants';
import createAction from '../flux/actionCreator';
import Component from '../abstracts/component';
import Store from '../flux/store';

class LottoListToggle extends Component {
  template(checked) {
    return `
      <label class="switch" for="checkbox">
        <input id="checkbox" type="checkbox" ${checked} />
        <div class="slider round"></div>
      </label>
    `;
  }

  setEvent() {
    this.addEvent('click', 'input', (event) => {
      Store.instance.dispatch(createAction(ACTION.TOGGLE_LOTTO_LIST, event.target.checked));
    });
  }

  shouldSubscribe() {
    return false;
  }

  render() {
    const { lottoListVisibility } = Store.instance.getState();
    const checked = lottoListVisibility ? 'checked' : '';
    this.innerHTML = this.template(checked);
  }
}

customElements.define('lotto-list-toggle', LottoListToggle);

export default LottoListToggle;
