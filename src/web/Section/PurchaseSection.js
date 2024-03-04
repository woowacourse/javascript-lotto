import NUMBER from '../../constants/number';
import LottoService from '../../domain/LottoService';
import PurchaseAmountValidation from '../../validation/purchaseAmount';
import RandomSection from './RandomSection';
import WinNumberSection from './WinNumberSection';
import Error from '../../util/Error';

const PurchaseSection = {
  initPurchaseEvent() {
    const puchaseForm = document.querySelector('.puchase-form');
    puchaseForm.addEventListener('submit', this.purchaseSubmitEvent.bind(this));
  },

  purchaseSubmitEvent(event = {}) {
    event.preventDefault();
    const purchaseInput = document.querySelector('.purchase-input-text').value;
    try {
      PurchaseAmountValidation.validate(purchaseInput);
      const randomLottos = LottoService.getLottos(LottoService.getPurchaseCount(purchaseInput));
      Error.checkMessage('.purchase-error');
      RandomSection.showRandomLottos('.random-lottos', randomLottos);
      WinNumberSection.createInputUIWinNumber(randomLottos);
    } catch (error) {
      Error.showMessage('.purchase-error', error);
    }
  },
};

export default PurchaseSection;
