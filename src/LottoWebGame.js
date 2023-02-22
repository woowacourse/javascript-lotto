import { $ } from './dom/dom';
import lottoGameValidator from './domain/lottoGameValidator';

const $purchaseInput = $('#purchase-amount-form input[type=text]');

const LottoWebGame = function () {
  this.lottos = [];
  this.init = () => {
    initAddEventListener();
  };

  const submitPurchaseAmount = async (event) => {
    event.preventDefault();

    const purchaseAmount = $purchaseInput.value;
    try {
      lottoGameValidator.checkPruchaseAmount(purchaseAmount);
    } catch (error) {
      window.alert(error);
      $purchaseInput.value = '';
    }
  };

  const initAddEventListener = () => {
    $('#purchase-amount-form').addEventListener('submit', submitPurchaseAmount);
  };
};

export default LottoWebGame;
