import { $ } from './domUtils.js';
import { renderLottoList } from './renderLottoList.js';
import { renderWinningForm } from './renderWinningForm.js';

const purchasingHandler = (lottoGame) => (event) => {
  event.preventDefault();
  try {
    const money = Number($('#money').value);
    const lottoList = lottoGame.setLottos(money).getLottos();
    renderLottoList(lottoList);
    renderWinningForm(lottoGame);
  } catch (error) {
    console.dir(error);
  }
};

export const addPurchasingEvent = (lottoGame) => {
  const purchasingButton = $('#purchasing-button');
  purchasingButton.addEventListener('click', purchasingHandler(lottoGame));
};

export const renderPurchasing = ($app, lottoGame) => {
  $app.innerHTML = `<section id="purchasing-money">
        <h2 class="title">🎱 내 번호 당첨 확인 🎱</h2>
        <div class="message">구입할 금액을 입력해주세요.</div>
        <form id="money-form">
          <input id="money" type="text" placeholder="금액" />
          <button id="purchasing-button" type="submit">구입</button>
        </form>
      </section>`;
  addPurchasingEvent(lottoGame);
};
