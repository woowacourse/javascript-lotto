/* eslint-disable max-lines-per-function */

// /**
//  * step 2의 시작점이 되는 파일입니다.
//  * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
// */

import calculateRevenueRate from './domain/model/calculateRevenueRate';
import createLottos from './domain/model/createLottos';
import LottoStatistics from './domain/model/LottoStatistics';
import { validateBonus, validateLottoNumber, validateMoney } from './domain/validation';
import normalizeErrorMessage from './view/utils/normalizeErrorMessage';

let userMoney;
let userLottos = [];
const lottoStatistics = new LottoStatistics();

function toggleClassName(element, className) {
  if (element.classList.contains(className)) {
    return element.classList.remove(className);
  }
  return element.classList.add(className);
}

function toggleModal() {
  const $modal = document.querySelector('.modal');
  const $modalDimmed = document.querySelector('.modal-dimmed');
  toggleClassName($modal, 'modal-close');
  toggleClassName($modalDimmed, 'modal-close');
}

function createElement(type, text) {
  const element = document.createElement(type);
  element.innerText = text;
  return element;
}

// 1. 로또 구매하기
function printUserLottos() {
  userLottos.forEach((userLotto) => {
    const parent = document.querySelector('.lotto-item-container');
    const element = createElement('p', `🎟️ ${userLotto.getNumbers().join(', ')}`);
    parent.appendChild(element);
  });
}

document.getElementById('purchase-button').addEventListener('click', () => {
  userMoney = document.querySelector('#user-money').value;

  try {
    validateMoney(userMoney);
    userLottos = createLottos(userMoney);
    printUserLottos();
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(normalizeErrorMessage(error.message));
  }
});

// 2. 로또 결과 확인하기
function printRevenueRate(revenueRate) {
  const $boldText = document.querySelector('.bold-text');
  const element = createElement('p', `당신의 총 수익률은 ${revenueRate}% 입니다`);
  $boldText.appendChild(element);
  element.classList.add('modal-items');
}

function printStatisticsResult(rankResult) {
  toggleModal();
  Object.keys(rankResult).forEach((key) => {
    const { name, price, count } = rankResult[key];

    const parent = document.querySelector('.modal-item-container');
    const child = createElement('tr', '');
    child.classList.add('modal-items');
    parent.appendChild(child);
    let elementName = createElement('td', `${name}개`);

    if (name === '5+1') {
      elementName = createElement('td', '5개+보너스볼');
    }

    child.appendChild(elementName);
    const elementPrice = createElement('td', `${price.toLocaleString()}원`);
    child.appendChild(elementPrice);
    const elementCount = createElement('td', `${count}개`);
    child.appendChild(elementCount);
  });

  const profit = lottoStatistics.calculateProfit();
  const revenueRate = calculateRevenueRate(profit, userMoney);
  printRevenueRate(revenueRate);
}

document.getElementById('result-button').addEventListener('click', () => {
  const bonusNumber = Number(document.querySelector('#input-bonus-number').value);
  const winningNumbers = [...document.querySelectorAll('.input-winning-number')].map((element) => Number(element.value));
  const winningLotto = { bonusNumber, lottoNumber: winningNumbers };
  try {
    validateLottoNumber(winningNumbers);
    validateBonus(bonusNumber, winningNumbers);
    const rankResult = lottoStatistics.compareLottos(userLottos, winningLotto);
    printStatisticsResult(rankResult);
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(normalizeErrorMessage(error.message));
  }
});

// 3. 로또 초기화하기
document.getElementById('reset-button').addEventListener('click', () => {
  location.reload(true);
});

// 4. 결과 닫기
document.getElementById('reset-close-button').addEventListener('click', () => {
  document.querySelectorAll('.modal-items').forEach((element) => {
    element.remove();
  });
  lottoStatistics.init();
  toggleModal();
});
