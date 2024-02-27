import { $ } from '../../util/domSelector';

const MyLottoOutputView = {
  renderSection() {
    $('#my-lottos-section').classList.remove('hidden');
    $('#winning-lotto-section').classList.remove('hidden');
  },

  renderLottosInfo(lottoCount, lottosNumbers) {
    const lottosTicketsHTML = lottosNumbers.map((numbers) => {
      const formattedNumbers = numbers.join(', ');
      return `<li><span>🎟️</span>${formattedNumbers}</li>`;
    });
    $('#my-lottos-count').innerText = `총 ${lottoCount}개를 구매하였습니다.`;
    $('#my-lottos-list').innerHTML = lottosTicketsHTML.join('');
  },
};

export default MyLottoOutputView;
