import elementHandler from '../handler/elementHandler.js';

const $lottosContainer = elementHandler.$('.lottos-container');
const $lottosText = elementHandler.$('.lottos-text');
const $lottosList = elementHandler.$('.lottos-list');

const View = {
  renderPurchasedLottos(lottos) {
    $lottosContainer.hidden = false;

    $lottosText.innerHTML = `총 ${lottos.length}개를 구매하였습니다.`;
    $lottosList.innerHTML = `${lottos
      .map((lotto) => `<li class="lottos-list-item"><span>🎟️</span> ${lotto.join(', ')}</li>`)
      .join('')}`;
  },

  renderWinningNumbersInput() {},
};

export default View;
