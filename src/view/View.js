import { SETTING, RANKING } from '../constant/setting.js';
import elementHandler from '../handler/elementHandler.js';

const $lottosContainer = elementHandler.$('.lottos-container');
const $lottosText = elementHandler.$('.lottos-text');
const $lottosList = elementHandler.$('.lottos-list');

const $winningLottoForm = elementHandler.$('.winning-lotto-form');
const $winningLottoInputContainer = elementHandler.$('.winning-lotto-input-container');
const $bonusLottoInputContainer = elementHandler.$('.bonus-lotto-input-container');

const $winningResultTable = elementHandler.$('.winning-result-table');
const $profitRateText = elementHandler.$('.profit-rate-text');

const $modal = elementHandler.$('#modal');

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

  renderWinningResults(winningResults, profitRate) {
    $modal.hidden = false;

    const matchedCounts = [3, 4, 5, 'B5', 6];
    $winningResultTable.innerHTML += matchedCounts
      .map((matchedKey) => {
        const { TITLE_UI, REWARD } = RANKING[matchedKey];
        return `
        <tr>
          <td class="winning-result-column">${TITLE_UI}</td>
          <td class="winning-result-column">${REWARD.toLocaleString()}원</td>
          <td class="winning-result-column">${winningResults[matchedKey]}개</td>
        </tr>`;
      })
      .join('');

    $profitRateText.innerHTML = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },
};

export default View;
