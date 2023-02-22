/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './public/css/reset.css';
import './public/css/index.css';
import LottoGame from './domain/LottoGame';
import ResultModal from './view/ResultModal';

const app = document.querySelector('#app');

const lottoGame = new LottoGame();
// 구입 금액 가져오기
const purchaseButton = document.querySelector('.purchase-button');

purchaseButton.addEventListener('click', (e) => {
  e.preventDefault();

  const inputMoney = Number(document.querySelector('.input-money').value);
  const unorderList = document.querySelector('.buy-lotto-list');

  lottoGame.purchaseLottos(inputMoney);

  const resultList = lottoGame.getLottos().map((lotto) => {
    return `<li>🎟️ ${lotto.getLottoNumber().join(', ')}</li>`;
  });

  const purchaseLottoAmount = document.querySelector('.purchased-lotto-amount');
  purchaseLottoAmount.innerText = `총 ${resultList.length}개를 구매했습니다.`;
  unorderList.innerHTML = resultList.join(' ');
});

// 당첨 번호 가져오기

const getResultButton = document.querySelector('.get-result');

function ResultModalControll(ranks, profit) {
  const modal = new ResultModal(ranks, profit);
  modal.render(app);

  //   const modal = document.querySelector('.modal-none');
  //   modal.className = 'modal-view';
}

getResultButton.addEventListener('click', (e) => {
  try {
    e.preventDefault();
    const winningLottoNumberElement = document.querySelector('.my-lotto-numbers').children;
    const winningLottoNumber = [...winningLottoNumberElement].map((v) => {
      return Number(v.value);
    });
    const bonusNumbers = Number(document.querySelector('.my-bonus-number').value);
    lottoGame.generateWinningLotto(winningLottoNumber, bonusNumbers);
    ResultModalControll(lottoGame.getWinningRankResult(), lottoGame.getProfitRateOfPrize());

    // modalControll();
  } catch (error) {
    console.error(error);
  }
});
