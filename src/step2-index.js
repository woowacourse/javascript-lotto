/* eslint-disable no-undef */
import './css/style.css';
import './css/layout.css';

import { generateLottos } from './domain/generateLottos';
import LottoValidator from './domain/LottoValidator';
import PurchaseResults from './view/containers/PurchaseResults';
import InputWinningNumberBox from './view/containers/InputWinningNumberBox';
import inputWinningNumberEvent from './view/containers/InputWinningNumberBox/inputWinningNumberEvent';
import Container from './utils/Container';

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

const store = {};
const form = document.getElementById("money-submit");

form.onsubmit = function (event) {
  event.preventDefault();
  const money = event.target.money.value;
  try {
    LottoValidator.checkMoney(money);
    store['lottos'] = generateLottos((money));
    event.target.money.value = '';
    Container.render(
      "purchase-result",
      () => PurchaseResults(store)
    );
    Container.render(
      "input-winning-number",
      () => InputWinningNumberBox(store),
      () => inputWinningNumberEvent(store)
    );
  } catch (error) {
    alert(error.message);
  }
};

