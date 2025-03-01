import { calculateRevenue } from './domain/calculateRevenue.js';
import { getLottos } from './domain/getLottos.js';
import { getWinningMatchCount } from './domain/getWinningMatchCount.js';
import WinningLotto from './domain/WinningLotto.js';

let purchasePrice = 0;
let lottos = [];
let bonusNumber = 0;
let winningNumbers = [];

const purchaseFrom = document.getElementById('purchase-form');
purchaseFrom.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(purchaseFrom);
  const inputPurchasePrice = Number(formData.get('purchase-input'));
  purchasePrice = inputPurchasePrice;

  printQuantity(purchasePrice);
});

const printQuantity = (purchasePrice) => {
  const quantity = Math.floor(purchasePrice / 1000);

  const result = document.getElementById('result');
  result.innerHTML = ''; // 기존 내용 초기화
  const div = document.createElement('div');
  div.id = 'quantity';
  div.textContent = `총 ${quantity}개를 구매하였습니다.`;
  result.appendChild(div);

  printLottos(quantity);
};

const printLottos = (quantity) => {
  const existingContainer = document.getElementById('lottoContainer');
  if (existingContainer) {
    existingContainer.remove();
  }

  const container = document.createElement('div');
  container.id = 'lotto-container';

  lottos = getLottos(quantity);

  lottos.forEach((lotto) => {
    container.appendChild(printLotto(lotto));
  });

  result.appendChild(container);

  showSystemMessage();
};

const showSystemMessage = () => {
  const systemMessage = document.getElementById('system-message');
  systemMessage.style.display = 'flex';

  showWinningLottos();
};

const showWinningLottos = () => {
  const divInputNumber = document.getElementById('number-input');
  divInputNumber.style.display = 'flex';

  const winningInputs = document.querySelectorAll('.winning-number');
  winningInputs.forEach((input, index) => {
    input.addEventListener('input', (event) => {
      winningNumbers[index] = Number(event.target.value);
    });
  });

  const bonusInput = document.getElementById('bonusNumber');
  bonusInput.addEventListener('input', (event) => {
    bonusNumber = Number(event.target.value);
  });

  handleResultButton();
};

const handleResultButton = () => {
  document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'show-result-button') {
      const modal = document.querySelector('.modal');
      modal.style.display = 'flex';
    }

    if (event.target && event.target.classList.contains('modal-close')) {
      const modal = document.querySelector('.modal');
      modal.style.display = 'none';
    }

    const lottoNumbers = new WinningLotto(winningNumbers, bonusNumber);
    const matchCounts = getWinningMatchCount(lottos, lottoNumbers);
    const revenue = calculateRevenue(matchCounts, purchasePrice);

    printModal(matchCounts, revenue);
  });
};

const printModal = (matchCounts, revenue) => {
  const threeCount = document.getElementById('three-count');
  const fourCount = document.getElementById('four-count');
  const fiveCount = document.getElementById('five-count');
  const fiveCountWithBonus = document.getElementById('five-count-with-bonus');
  const sixCount = document.getElementById('six-count');

  threeCount.innerText = `${matchCounts[3]}개`;
  fourCount.innerText = `${matchCounts[4]}개`;
  fiveCount.innerText = `${matchCounts[5]}개`;
  fiveCountWithBonus.innerText = `${matchCounts[7]}개`;
  sixCount.innerText = `${matchCounts[6]}개`;

  const revenueContainer = document.getElementById('revenue-container');
  revenueContainer.innerText = `당신의 총 수익률은 ${revenue}%입니다.`;
};

const printLotto = (lotto) => {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.gap = '10px';

  const img = new Image();
  img.src = '../images/lottoImage.png';
  img.alt = '로또 이미지';
  img.style.width = '30px';

  const numbersDiv = document.createElement('div');
  numbersDiv.innerHTML = lotto.getNumbers().join(', ');

  container.appendChild(img);
  container.appendChild(numbersDiv);

  return container;
};
