import Component from '../core/Component';

class PurchaseLottoForm extends Component {
  template() {
    return `
            <input id="purchaseInput" placeholder="금액" />
            <button id="purchaseButton" class="button buttonFont">구입</button>
        `;
  }

  setEvent() {
    const $purchaseBtn = this.$target.querySelector('#purchaseButton');
    $purchaseBtn.addEventListener('click', this.props.handlePurchaseBtn);
  }
}

export default PurchaseLottoForm;
