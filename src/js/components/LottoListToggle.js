import Component from '../abstracts/component';
import createAction from '../flux/actionCreator';
import { TOGGLE_LOTTO_LIST } from '../flux/reducer';

class LottoListToggle extends Component {
  connectedCallback() {
    this.render();
    this.subscribe();
    this.setEvent();
  }

  render() {
    const { lottoListVisibility } = window.store.getState();
    const checked = lottoListVisibility ? 'checked' : '';
    this.innerHTML = this.template(checked);
  }

  template(checked) {
    return `
      <label>번호보기</label>
      <input type="checkbox" ${checked} />
      <span class="slider"></span>
    `;
  }

  setEvent() {
    this.addEvent('click', 'input', (event) => {
      window.store.dispatch(createAction(TOGGLE_LOTTO_LIST, event.target.checked));
    });
  }
}

customElements.define('lotto-list-toggle', LottoListToggle);

export default LottoListToggle;
