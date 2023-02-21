import Component from '../../Component.js';

export default class Amount extends Component {
  template() {
    return `
      <label>구입할 금액을 입력해 주세요.</label>
      <form>
        <input placeholder='금액'/>
        <button>구입</button>
      </form>
    `;
  }
}
