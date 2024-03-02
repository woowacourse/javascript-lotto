import PROGRESS_MESSAGE from '../../Constants/Messages/progressMessage.js';
import DELIMITER from '../../Constants/delimiter.js';

/**
 * 구매한 로또 갯수를 렌더링 합니다.
 * @param { number } lottoLength
 */
export const renderBoughtLottosLength = (boughtLottoslLength) => {
  const resultText = document.getElementById('resultText');
  resultText.textContent = `${PROGRESS_MESSAGE.BUY_LOTTO(boughtLottoslLength)}`;
};

/**
 * 구매한 로또들을 렌더링 합니다.
 * @param { number[] } boughtLottos
 */
export const renderBoughtLottos = (boughtLottos) => {
  boughtLottos.forEach((lotto) => {
    boughtLottosContainer.innerHTML += `<div class="boughtLotto"><p class ="lottoEmoji">🎟️</p> ${lotto.join(
      `${DELIMITER.LOTTO_NUMBER_SEPERATOR} `,
    )}</div>`;
  });
};

export const visibilizeWinningLottoForm = () => {
  const resultAndWinningLottoContainer = document.getElementById('resultAndWinningLottoContainer');

  resultAndWinningLottoContainer.classList.add('visible');
};
