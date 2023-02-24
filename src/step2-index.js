/* eslint-disable no-undef */
import './css/style.css';
import './css/layout.css';
import './css/modal.css';

import { generateLottos } from './domain/generateLottos';
import LottoValidator from './domain/LottoValidator';
import Render from './utils/Render';
import PurchaseResults from './view/containers/PurchaseResults';
import InputWinningNumberBox from './view/containers/InputWinningNumberBox';
import GameModal from './view/containers/GameModal';
import modalEvent from './view/containers/GameModal/modalEvent';
import inputWinningNumberEvent from './view/containers/InputWinningNumberBox/inputWinningNumberEvent';

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
console.log('step2-index.js');
const form = document.getElementById("money-submit");

form.onsubmit = function (event) {
  event.preventDefault();
  const money = event.target.money.value;
  try {
    LottoValidator.checkMoney(money);
    store['lottos'] = generateLottos((money));
    event.target.money.value = '';
    Render.container("purchase-result", () => PurchaseResults(), () => { });
    Render.container("input-winning-number", () => InputWinningNumberBox(), () => { inputWinningNumberEvent(); });
    Render.container("game-result", () => GameModal(), () => modalEvent());
  } catch (error) {
    alert(error.message);
  }
};
