import './PurchaseSection.css';
import Component from '../core/Component';
import PurchaseLottoForm from './PurchaseLottoForm';

class PurchaseSection extends Component {
  template() {
    return `
        <div>구입할 금액을 입력해주세요.</div>
        <template id="purchaseLottoTemplate"></template>
        `;
  }

  mounted() {
    const $purchaseLottoForm = document.querySelector('#purchaseLottoTemplate');
    new PurchaseLottoForm($purchaseLottoForm, {
      play: this.props.play,
    });
  }
}

export default PurchaseSection;
