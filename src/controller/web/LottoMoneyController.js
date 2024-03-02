import { $ } from '../../util/domSelector';
import { focusElement, hideElement, renderError, resetElementValue } from '../../util/view';
import MoneyValidation from '../../validation/moneyValidation';
import MyLottoInfoView from '../../view/web/MyLottoInfoView';
import NUMBER from '../../constants/number';
import LottoPublisher from '../../domain/LottoPublisher';

class LottoMoneyController {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    $('#money-input').addEventListener('input', () => {
      if ($('#money-error')) hideElement($('#money-error'));
    });
  }

  validateMoney(money) {
    try {
      MoneyValidation.validate(money);
      return money;
    } catch ({ message }) {
      focusElement($('#money-input'));
      resetElementValue($('#money-input'));
      MyLottoInfoView.hideSection();
      renderError($('#money-error'), message);
    }
  }

  convertMoneyToLotto(money) {
    const lottosCount = Number.parseInt(money / NUMBER.LOTTO_PRICE, 10);

    const lottoPublisher = new LottoPublisher(lottosCount, []);
    const lottos = lottoPublisher.publishLottos();
    const lottosNumbers = lottoPublisher.lottoNumbers;

    return [lottos, lottosNumbers];
  }

  showLottosInfo(lottosNumbers) {
    MyLottoInfoView.renderSection();
    MyLottoInfoView.renderLottosCount(lottosNumbers.length);
    MyLottoInfoView.renderLottosNumbers(lottosNumbers);
    $('.number-input').focus();
  }
}

export default LottoMoneyController;
