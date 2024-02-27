import Component from '../Component';

class PurchaseSection extends Component {
  render() {
    this.innerHTML = `
        <div>구입할 금액을 입력해주세요.</div>
        <purchase-form></purchase-form>    
        <div id="purchaseError" class="hidden"></div>`;
  }
}

customElements.define('purchase-section', PurchaseSection);
