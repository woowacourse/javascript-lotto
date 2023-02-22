const $lottoList = document.getElementById('purchased-lotto-list');
const $lottoCount = document.getElementById('purchased-lotto-count');
const $winningLottoSection = document.getElementById('winning-lotto-section');

const LottoListView = {
  showLottoList(lottos) {
    $lottoCount.innerHTML = `총 ${lottos.length}개를 구매했습니다.`;
    $lottoList.innerHTML = '';
    lottos.forEach((lotto) => {
      $lottoList.innerHTML += `<li class="purchased-lotto-numbers"><span class="purchased-lotto-icon">🎟️</span> ${lotto._numbers.join(
        ', '
      )}</li>`;
    });
    $winningLottoSection.style.display = 'block';
  },
};

export default LottoListView;
