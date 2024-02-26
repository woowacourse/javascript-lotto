import lottoMachine from '../domain/lottoMachine';

class lottoGameWebController {
  constructor() {
    this.bindEventListener();
  }

  bindEventListener() {
    document.querySelector('#purchase-form').addEventListener('submit', this.handleClickPurchaseButton);
  }

  handleClickPurchaseButton = (event) => {
    event.preventDefault();
    const purchaseAmountInput = event.target.querySelector('#purchaseAmount-input');
    const purchaseAmount = purchaseAmountInput.value;

    try {
      const lottoTickets = lottoMachine.makeLottos(purchaseAmount);
    } catch (error) {
      alert(error.message);
      return;
    }

    //
    purchaseAmountInput.value = '';
  };
}

new lottoGameWebController();
