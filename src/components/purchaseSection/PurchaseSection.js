import './PurchaseSection.css';
import Component from '../core/Component';
import PurchaseLottoForm from './PurchaseLottoForm';
import dom from '../../utils/dom';
import { DOM_MESSAGE } from '../../constants/message';

class PurchaseSection extends Component {
  template() {
    return `
        <div>${DOM_MESSAGE.PURCHASE_AMOUNT_INPUT}</div>
        <template id="purchaseLottoTemplate"></template>
        `;
  }

  mounted() {
    const $purchaseLottoForm = dom.$('#purchaseLottoTemplate');
    new PurchaseLottoForm($purchaseLottoForm);
  }
}

export default PurchaseSection;
