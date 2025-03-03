import { validateBonus, validateLottoNumber, validateMoney } from '../../domain/validation.js';

import catchError from '../utils/catchError.js';
import toggleClassName from './utils/toggleClassName.js';
import createElement from './utils/createElement.js';

const LottoFormView = {
  readMoney() {
    const userMoney = document.querySelector('#user-money').value;
    if (!catchError(() => validateMoney(userMoney))) {
      return userMoney;
    }
    return false;
  },
  readWinningNumbers() {
    const winningNumbers = [...document.querySelectorAll('.input-winning-number')].map((element) => Number(element.value));
    if (!catchError(() => validateLottoNumber(winningNumbers))) {
      return winningNumbers;
    }
    return false;
  },
  readBonusNumber(winningLotto) {
    const bonusNumber = Number(document.querySelector('#input-bonus-number').value);
    if (!catchError(() => validateBonus(bonusNumber, winningLotto))) {
      return bonusNumber;
    }
    return false;
  },
  renderWinningLotto() {
    const $lottoBottom = document.querySelector('.lotto-bottom');
    toggleClassName($lottoBottom, 'hidden');
  },
  renderUserLottos(userLottos) {
    userLottos.forEach((userLotto) => {
      const $parent = document.querySelector('.lotto-item-container');
      const $element = createElement('p', `🎟️ ${userLotto.getNumbers().join(', ')}`);
      $parent.appendChild($element);
    });
  },
};

export default LottoFormView;
