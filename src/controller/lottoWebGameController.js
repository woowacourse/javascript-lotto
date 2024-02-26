import lottoMachine from '../domain/lottoMachine';
import view from '../view/webView/view';

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
    const lottoPurchaseArticle = document.getElementById('lottoPurchase-article');
    console.log(purchaseAmount);

    let lottoTickets;
    try {
      lottoTickets = lottoMachine.makeLottos(purchaseAmount);
      view.renderLottoList(lottoTickets);
      lottoPurchaseArticle.style.display = 'block';
    } catch (error) {
      alert(error.message);
      return;
    }

    //
    purchaseAmountInput.value = '';
  };
}

new lottoGameWebController();
