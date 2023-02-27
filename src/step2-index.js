/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './static/css/style.css';
import LottoWebController from './controller/LottoWebController';
import {
  MINIMUM_LOTTO_UNIT,
  WINNING_ORDER,
  CONVERT_RANK_TO_STRING,
  MATCH_RANK,
} from './data/Constants';
import { LOTTO_EMOJI } from './data/Constants';

const inputPurchaseButton = document.getElementById('input-purchase-btn');
const checkResultButton = document.getElementById('check-result-btn');
const modalCloseButton = document.getElementById('modal-close-btn');
const restartButton = document.getElementById('restart-btn');

const afterPurchaseShowElement =
  document.getElementsByClassName('after-purchase')[0];
const lottoListWrap = document.getElementsByClassName('lotto-list')[0];
const purchaseLottoCount = document.getElementById('lotto-purchase-count');
const winNumberElement = document.getElementsByClassName('winNumber');
const bonusNumberElement = document.getElementById('bonusNumber');
const modal = document.getElementsByClassName('result-modal-background')[0];
const ranks = document.getElementsByClassName('rank');
const earnRateElement = document.getElementById('earnRate');
const inputAmountElement = document.getElementById('input-purchase-amount');

const controller = new LottoWebController();

// 구매 버튼 클릭시
inputPurchaseButton.addEventListener('click', () => setLottos());

const setLottos = () => {
  resetLottoList();

  const inputAmount = inputAmountElement.value;
  afterPurchaseShowElement.style.display = 'block';
  controller.setLottos(inputAmount);
  purchaseLottoCount.innerText = inputAmount / MINIMUM_LOTTO_UNIT;

  const lottoList = controller.printLottoInfo();
  renderLottoList(lottoList);
};

const resetLottoList = () => {
  while (lottoListWrap.firstChild) {
    lottoListWrap.removeChild(lottoListWrap.firstChild);
  }
};

const renderLottoList = (lottoList) => {
  lottoList.map((lottoInfo) => {
    const lottoElement = document.createElement('li');

    createTextElementAndAppend(LOTTO_EMOJI, lottoElement);
    createTextElementAndAppend(lottoInfo, lottoElement);

    lottoListWrap.append(lottoElement);
  });
};

const createTextElementAndAppend = (text, parent) => {
  const textElement = document.createElement('p');
  textElement.innerHTML = text;
  parent.appendChild(textElement);
};

// 결과 버튼 클릭시
checkResultButton.addEventListener('click', () => result());

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

  WINNING_ORDER.forEach((order, index) => {
    if (order !== 'NONE')
      ranks[MATCH_RANK[order] - 1].innerText =
        rank[CONVERT_RANK_TO_STRING[index + 1]];
  });
};

// 모달 닫기 버튼 클릭시
modalCloseButton.addEventListener(
  'click',
  () => (modal.style.display = 'none'),
  false
);

// 재시작 버튼 클릭시
restartButton.addEventListener('click', () => location.reload());
