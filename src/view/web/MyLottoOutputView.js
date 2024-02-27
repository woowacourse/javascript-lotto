import { $ } from '../../util/domSelector';
import { hideElement, renderElement } from '../../util/view';

const MyLottoOutputView = {
  renderSection() {
    renderElement($('#my-lottos-section'));
    renderElement($('#winning-lotto-section'));
  },

  hideSection() {
    hideElement($('#my-lottos-section'));
    hideElement($('#winning-lotto-section'));
  },

  renderLottosCount(lottoCount) {
    $('#my-lottos-count').innerText = `총 ${lottoCount}개를 구매하였습니다.`;
  },

  renderLottosNumbers(lottosNumbers) {
    const lottosTicketsHTML = lottosNumbers.map((numbers) => {
      const formattedNumbers = numbers.join(', ');
      return `<li><span>🎟️</span>${formattedNumbers}</li>`;
    });
    $('#my-lottos-list').innerHTML = lottosTicketsHTML.join('');
  },

  deleteLottoInfo() {
    $('#my-lottos-count').innerText = '';
    $('#my-lottos-list').innerHTML = '';
  },
};

export default MyLottoOutputView;
