import { LOTTO } from './constants';
import { $ } from './dom/dom';
import lottoGameValidator from './domain/lottoGameValidator';
import Lotto from './domain/models/Lotto';
import generateRandomNumber from './utils/generateRandomNumber';

const $purchaseInput = $('#purchase-amount-form input[type=text]');

const LottoWebGame = function () {
  this.lottos = [];
  this.init = () => {
    initAddEventListener();
  };

  const buyLottos = (purchaseAmount) => {
    new Array(purchaseAmount / LOTTO.price).fill().forEach(() => {
      this.lottos.push(publishLotto());
    });
  };

  const publishLotto = () => {
    return new Lotto(generateLottoNumbers());
  };

  const generateLottoNumbers = () => {
    const lottoNumbers = [];
    while (lottoNumbers.length < 6) {
      const number = generateRandomNumber(LOTTO.minNumber, LOTTO.maxNumber);
      if (!lottoNumbers.includes(number)) lottoNumbers.push(number);
    }

    return lottoNumbers.sort((a, b) => a - b);
  };

  const submitPurchaseAmount = (event) => {
    event.preventDefault();

    const purchaseAmount = $purchaseInput.value;
    try {
      lottoGameValidator.checkPruchaseAmount(purchaseAmount);
      buyLottos(purchaseAmount);
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
