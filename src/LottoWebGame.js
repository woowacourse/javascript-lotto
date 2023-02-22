import { $ } from './dom/dom';
import lottoGameValidator from './domain/lottoGameValidator';

const LottoWebGame = function () {
  this.lottos = [];
  this.init = () => {
    initAddEventListener();
  };

  const submitPurchaseAmount = async (event) => {
    event.preventDefault();

    const purchaseAmount = $('#purchase-amount-form input[type=text]').value;
    try {
      lottoGameValidator.checkPruchaseAmount(purchaseAmount);
    } catch (error) {}
  };

  const initAddEventListener = () => {
    $('#purchase-amount-form').addEventListener('submit', submitPurchaseAmount);
  };
};

export default LottoWebGame;
