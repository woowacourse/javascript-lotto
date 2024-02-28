/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './styles/reset.css';
import './styles/style.css';
import LottoMachine from './domain/lottoMachine';

const $buyForm = document.querySelector('.buy-form');
const $lottoResult = document.querySelector('.lotto-result');
const $answerForm = document.querySelector('.answer-form');
const $lottoResultLabel = document.querySelector('.lotto-result-label');
const $lottoNumbers = document.querySelector('.lotto-numbers');

$buyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const money = formData.get('buy-input');

  if (money % 1000 !== 0) {
    alert('1000원 단위의 숫자를 입력해주세요');
    return;
  }

  $lottoResult.classList.remove('hidden');
  $answerForm.classList.remove('hidden');

  const lottoMachine = new LottoMachine(money);
  console.log(lottoMachine.getLottoCount);
  console.log(lottoMachine.getLottoNumbers);
  $lottoResultLabel.value = `총 ${lottoMachine.getLottoCount}개를 구매하였습니다.`;
});
