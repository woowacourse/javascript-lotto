/* eslint-disable max-lines-per-function */
/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
*/

import createLottos from './domain/model/createLottos';
import LottoStatistics from './domain/model/LottoStatistics';

let userLottos = [];
const lottoStatistics = new LottoStatistics();

function getElement(id) {
  const $element = document.getElementById(id);
  const $value = parseFloat($element.value);
  $element.value = '';
  return $value;
}

// eslint-disable-next-line max-params
function makeElement(parent, tag, text) {
  const element = document.createElement(tag);
  element.innerText = text;
  parent.appendChild(element);
  return element;
}

function printUserLottoQuantity() {
  const $userLottoQuantity = document.getElementById('user-lotto-quantity');
  makeElement($userLottoQuantity, 'p', `총 ${userLottos.length} 개를 구매하셨습니다.`);
}

function printUserLottos() {
  const $userLottoList = document.getElementById('user-lotto-list');
  userLottos.forEach((lotto) => {
    makeElement($userLottoList, 'p', `🎟️ ${lotto.getNumbers().join(', ')}`);
  });
}

function printRevenueRate() {
  const $revenueRateContainer = document.getElementById('revenue-rate-container');
  const profit = lottoStatistics.calculateProfit();
  makeElement($revenueRateContainer, 'p', `당신의 총 수익률은 ${profit}%입니다.`);
}

function printStatisticsResult(statisticsResult) {
  const $resultTableBody = document.getElementById('result-table-body');
  Object.keys(statisticsResult).forEach((key) => {
    const $tableRow = makeElement($resultTableBody, 'tr', '');
    makeElement($tableRow, 'td', `${key}개`);
    makeElement($tableRow, 'td', `${statisticsResult[key].price.toLocaleString()}`);
    makeElement($tableRow, 'td', `${statisticsResult[key].count}개`);
  });
}

function buyUserLottos() {
  const money = getElement('money');
  userLottos = createLottos(money);
  printUserLottoQuantity();
  printUserLottos();
}

function getResult() {
  const $winningNumbers = [...document.querySelectorAll('.winning-number-input')];
  const winningNumbers = $winningNumbers.map((number) => parseFloat(number.value));
  const bonusNumber = parseFloat(document.getElementById('bonus-number-input').value);

  const winningLotto = { bonusNumber, lottoNumber: winningNumbers };
  const statisticsResult = lottoStatistics.compareLottos(
    userLottos,
    winningLotto,
  );

  printStatisticsResult(statisticsResult);
  printRevenueRate();
}

function restart() {
  location.reload(true);
}

window.buyUserLottos = buyUserLottos;
window.getResult = getResult;
window.restart = restart;
