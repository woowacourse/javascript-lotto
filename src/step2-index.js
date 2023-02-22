/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './public/css/reset.css';
import './public/css/index.css';

const App = document.querySelector('#app');

// const header = document.createElement('header');
// header.innerHTML = `<header><h1>🎱 행운의 로또</h1></header>`;
// App.appendChild(header);

const purchaseButton = document.querySelector('.purchase-button');

purchaseButton.addEventListener('click', (e) => {
  e.preventDefault();

  const check = Number(document.querySelector('.input-money').value);
  const unorderList = document.querySelector('.buy-lotto-list');

  const resultList = Array.from({ length: check / 1000 }, () => 0).map(() => {
    return `<li>🎟️ 1, 2, 3, 4, 5, 6</li>`;
  });

  const purchaseLottoAmount = document.querySelector('.purchased-lotto-amount');
  purchaseLottoAmount.innerText = `총 ${resultList.length}개를 구매했습니다.`;
  unorderList.innerHTML = resultList.join(' ');
});

const getResultButton = document.querySelector('.get-result');

getResultButton.addEventListener('click', (e) => {
  e.preventDefault();
  const modal = document.querySelector('.modal-none');

  modal.className = 'modal-view';

  const getLottoNumbers = document.querySelector('.my-lotto-numbers').children;

  [...getLottoNumbers].forEach((v) => {
    console.log(v.value);
  });
  const getBonusNumbers = document.querySelector('.my-bonus-number').value;
  console.log(getBonusNumbers);
});

document.querySelector('.close-modal').addEventListener('click', (e) => {
  e.preventDefault();
  const modal = document.querySelector('.modal-view');

  modal.className = 'modal-none';
});
