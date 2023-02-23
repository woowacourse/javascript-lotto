/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './static/css/style.css';
import LottoWebController from './controller/LottoWebController';
import { MINIMUM_LOTTO_UNIT, WINNING_ORDER } from './data/Constants';
import { LOTTO_EMOJI } from './data/Constants';

const afterPurchaseShow = document.getElementsByClassName('after-purchase')[0];
const lottoListWrap = document.getElementsByClassName('lotto-list')[0];
const purchaseLottoCount = document.getElementById('lotto-purchase-count');
const winNumberElement = document.getElementsByClassName('winNumber');
const bonusNumberElement = document.getElementById('bonusNumber');
const modal = document.getElementsByClassName('result-modal-background')[0];
const ranks = document.getElementsByClassName('rank');
const earnRateElement = document.getElementById('earnRate');

const controller = new LottoWebController();

const resetLottoList = () => {
  while (lottoListWrap.firstChild) {
    lottoListWrap.removeChild(lottoListWrap.firstChild);
  }
};

const renderLottoList = (lottoList) => {
  lottoList.map((lottoInfo) => {
    const lottoElement = document.createElement('li');

    const lottoEmoji = document.createElement('div');
    lottoEmoji.innerHTML = LOTTO_EMOJI;
    lottoElement.appendChild(lottoEmoji);

    const lottoText = document.createElement('p');
    lottoText.innerHTML = lottoInfo;
    lottoElement.appendChild(lottoText);

    lottoListWrap.append(lottoElement);
  });
};

const setLottos = () => {
  resetLottoList();

  const inputAmount = document.getElementById('input-purchase-amount').value;
  afterPurchaseShow.style.display = 'block';
  controller.setLottos(inputAmount);
  purchaseLottoCount.innerText = inputAmount / MINIMUM_LOTTO_UNIT;

  const lottoList = controller.printLottoInfo();

  renderLottoList(lottoList);
};

const result = () => {
  const winNumber = Array.from(winNumberElement).map(
    (element) => element.value
  );
  const bonusNumber = bonusNumberElement.value;
  controller.setWinNumber(winNumber, bonusNumber);

  modal.style.display = 'block';

  matchWinRank();
  earnRateElement.innerText = controller.printEarningRate();
};

const matchWinRank = () => {
  const rank = controller.printWinningResult();
  WINNING_ORDER.forEach((order) => {
    if (order === 'FIFTH') ranks[0].innerText = rank[order];
    else if (order === 'FOURTH') ranks[1].innerText = rank[order];
    else if (order === 'THIRD') ranks[2].innerText = rank[order];
    else if (order === 'SECOND') ranks[3].innerText = rank[order];
    else if (order === 'FIRST') ranks[4].innerText = rank[order];
  });
};

document
  .getElementById('input-purchase-btn')
  .addEventListener('click', () => setLottos(), false);

document
  .getElementById('check-result-btn')
  .addEventListener('click', () => result(), false);

document
  .getElementById('modal-close-btn')
  .addEventListener('click', () => (modal.style.display = 'none'), false);

document
  .getElementById('restart-btn')
  .addEventListener('click', () => location.reload(), false);
