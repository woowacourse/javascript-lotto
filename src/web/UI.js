const $threeMatchCount = document.querySelector('.three-match-count');
const $fourMatchCount = document.querySelector('.four-match-count');
const $fiveMatchCount = document.querySelector('.five-match-count');
const $fiveBonusMatchCount = document.querySelector('.five-bonus-match-count');
const $sixMatchCount = document.querySelector('.six-match-count');
const $profitRate = document.querySelector('.profit-rate');
const $lottoResultLabel = document.querySelector('.lotto-result-label');
const $lottoNumbers = document.querySelector('.lotto-numbers');
const $lottoResult = document.querySelector('.lotto-result');
const $answerForm = document.querySelector('.answer-form');
const $modal = document.querySelector('.modal');
const $modalCancel = document.querySelector('.modal-cancle');
const $modalBody = document.querySelector('.modal-body');

export const showLottos = (lottoCount, lottos) => {
  $lottoResult.classList.remove('hidden');
  $answerForm.classList.remove('hidden');

  $lottoResultLabel.innerText = `총 ${lottoCount}개를 구매하였습니다.`;

  const lottosfragment = new DocumentFragment();
  lottos.forEach((lottoNumber) => {
    const lottoTag = document.createElement('div');
    lottoTag.textContent = ` 🎟️ ${lottoNumber.join(',')}`;
    lottoTag.classList.add('lotto-number');
    lottosfragment.append(lottoTag);
  });
  $lottoNumbers.appendChild(lottosfragment);
};

export const showStatisticsResult = (statistics) => {
  $threeMatchCount.innerText = `${statistics.getResult.three}개`;
  $fourMatchCount.innerText = `${statistics.getResult.four}개`;
  $fiveMatchCount.innerText = `${statistics.getResult.five}개`;
  $fiveBonusMatchCount.innerText = `${statistics.getResult.five_bonus}개`;
  $sixMatchCount.innerText = `${statistics.getResult.six}개`;
  $profitRate.innerText = `당신의 총 수익률은 ${statistics.getProfit}%입니다`;
  $modal.classList.remove('hidden');
};

export const modalCancel = (e) => {
  if (!$modalBody.contains(e.target) || e.target === $modalCancel) {
    $modal.classList.add('hidden');
  }
};
