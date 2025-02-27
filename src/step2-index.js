/* eslint-disable max-lines-per-function */

// /**
//  * step 2의 시작점이 되는 파일입니다.
//  * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
// */

// function addClassName(element, className) {
//   element.className += className;
// }

import createLottos from './domain/model/createLottos';
import LottoStatistics from './domain/model/LottoStatistics';

let userLottos = [];

function addClassName(element) {
  element.className;
}

function createElement(type, text) {
  const element = document.createElement(type);
  element.innerText = text;
  return element;
}

// 로또 구매하기
function printUserLottos() {
  userLottos.forEach((userLotto) => {
    const parent = document.querySelector('.lotto-item-container');
    const element = createElement('p', `🎟️ ${userLotto.getNumbers().join(', ')}`);
    parent.appendChild(element);
  });
}

document.getElementById('purchase-button').addEventListener('click', () => {
  const userMoney = document.querySelector('#user-money').value;
  userLottos = createLottos(userMoney);
  printUserLottos();
});

// 로또 결과 확인하기
function printStatisticsResult(rankResult) {
  Object.keys(rankResult).forEach((key) => {
    const { name, price, count } = rankResult[key];

    const parent = document.querySelector('.modal-item-container');
    const child = createElement('tr', '');
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
}

const lottoStatistics = new LottoStatistics();
document.getElementById('result-button').addEventListener('click', () => {
  const bonusNumber = Number(document.querySelector('#input-bonus-number').value);
  const winningNumbers = [...document.querySelectorAll('.input-winning-number')].map((element) => Number(element.value));
  console.log(winningNumbers);
  const winningLotto = { bonusNumber, lottoNumber: winningNumbers };
  const rankResult = lottoStatistics.compareLottos(userLottos, winningLotto);
  printStatisticsResult(rankResult);
});

// 로또 초기화하기
document.getElementById('reset-button').addEventListener('click', () => {
  location.reload(true);
});
