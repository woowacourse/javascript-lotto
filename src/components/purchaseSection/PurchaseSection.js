import './PurchaseSection.css';
import Component from '../core/Component';
import PurchaseLottoForm from './PurchaseLottoForm';
import dom from '../../utils/dom';

class PurchaseSection extends Component {
  template() {
    return `
        <div>구입할 금액을 입력해주세요.</div>
        <template id="purchaseLottoTemplate"></template>
        `;
  }

  mounted() {
    const $purchaseLottoForm = dom.$('#purchaseLottoTemplate');
    new PurchaseLottoForm($purchaseLottoForm);
  }
}

export default PurchaseSection;
