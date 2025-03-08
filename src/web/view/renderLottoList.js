const $lottoList = document.getElementById('lotto-list');
const $lottoCount = document.getElementById('lotto-count');

export function renderLottoList(lottoMaker) {
  lottoMaker.lottoList.forEach((lotto) => {
    const li = document.createElement('li');
    li.textContent = '🎟️ ' + lotto.numbers;
    $lottoList.appendChild(li);
  });

  $lottoCount.textContent = lottoMaker.lottoList.length;
}
