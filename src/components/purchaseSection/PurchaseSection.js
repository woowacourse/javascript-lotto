import './PurchaseSection.css';
import Component from '../core/Component';
import PurchaseLottoForm from './PurchaseLottoForm';

class PurchaseSection extends Component {
  mounted() {
    const { handlePurchaseBtn } = this;
    const $purchaseLottoForm = document.querySelector('#purchaseLottoForm');
    new PurchaseLottoForm($purchaseLottoForm, {
      handlePurchaseBtn: handlePurchaseBtn.bind(this),
    });
  }

  template() {
    return `
        <div>구입할 금액을 입력해주세요.</div>
          <form id="purchaseLottoForm"></form>
          <div id="purchaseError" class="hidden">
        </div>`;
  }

  setEvent() {
    const $purchaseLottoForm = this.$target.querySelector('#purchaseLottoForm');
    $purchaseLottoForm.addEventListener('click', e => {
      e.preventDefault();
    });
  }

  handlePurchaseBtn() {
    this.props.play();
  }
}

export default PurchaseSection;
