import { SETTING } from '../constant/setting.js';
import elementHandler from '../handler/elementHandler.js';

const $lottosContainer = elementHandler.$('.lottos-container');
const $lottosText = elementHandler.$('.lottos-text');
const $lottosList = elementHandler.$('.lottos-list');

const $winningLottoForm = elementHandler.$('.winning-lotto-form');
const $winningLottoInputContainer = elementHandler.$('.winning-lotto-input-container');
const $bonusLottoInputContainer = elementHandler.$('.bonus-lotto-input-container');

const View = {
  renderPurchasedLottos(lottos) {
    $lottosContainer.hidden = false;

    $lottosText.innerHTML = `총 ${lottos.length}개를 구매하였습니다.`;
    $lottosList.innerHTML = `${lottos
      .map((lotto) => `<li class="lottos-list-item"><span>🎟️</span> ${lotto.join(', ')}</li>`)
      .join('')}`;
  },

  renderWinningNumbersInput() {
    $winningLottoForm.hidden = false;

    $winningLottoInputContainer.innerHTML =
      `<input class="lotto-input-box winning" type="number" min="1" max="45" required />`.repeat(SETTING.LOTTO_LENGTH);
    $bonusLottoInputContainer.innerHTML = `<input class="lotto-input-box bonus" type="number" min="1" max="45" required />`;

    elementHandler.$$('.lotto-input-box')[0].focus();
  },
};

export default View;
