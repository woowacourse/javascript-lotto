import Component from '../../Component.js';

export default class Amount extends Component {
  setEvent() {
    this.addEvent('submit', '.amount-form', this.handleSubmitForm.bind(this));
  }

  template() {
    return `
      <label>구입할 금액을 입력해 주세요.</label>
      <form class='amount-form'>
        <input type='number' name='amount' placeholder='금액'/>
        <button type='submit'>구입</button>
      </form>
    `;
  }

  handleSubmitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { amount } = Object.fromEntries(formData);

    this.props.setAmount(Number(amount));
  }
}
