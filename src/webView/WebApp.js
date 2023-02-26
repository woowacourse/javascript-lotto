import LottoGame from '../domain/LottoGame.js';
import { $ } from './domUtils.js';
import { renderLottoList } from './renderLottoList.js';
import { renderWinningForm } from './renderWinningForm.js';

const lottoGame = new LottoGame();

const WebApp = function () {
  const purchasingHandler = (event) => {
  event.preventDefault();
  try {
    const money = Number($('#money').value);
      const lottoList = lottoGame.setLottos(money).getLottos();
      renderLottoList(lottoList);
      renderWinningForm(lottoGame);
    } catch (error) {
      alert(error.message);
    }
  };

  const purchasingButton = $('#purchasing-button');
  purchasingButton.addEventListener('click', purchasingHandler);
};

const webApp = new WebApp();
export default webApp;
