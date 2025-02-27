import { getLottos } from './domain/getLottos.js';

let purchasePrice = 0;
let lottos = [];

const getPurchasePrice = () => {
  const purchaseForm = document.getElementById('purchase-form');
  purchaseForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(purchaseForm);
    const inputPurchasePrice = Number(formData.get('purchase-input'));
    purchasePrice = inputPurchasePrice;

    printQuantity(inputPurchasePrice);
  });
};

const printQuantity = (purchasePrice) => {
  const quantity = Math.floor(purchasePrice / 1000);

  const result = document.getElementById('result');
  result.innerHTML = ''; // 기존 내용 초기화
  const div = document.createElement('div');
  div.textContent = `총 ${quantity}개를 구매하였습니다.`;
  result.appendChild(div);

  printLottos(quantity);
};

const printLottos = (quantity) => {
  // 기존 로또 출력 초기화
  const existingContainer = document.getElementById('lottoContainer');
  if (existingContainer) {
    existingContainer.remove();
  }

  const container = document.createElement('div');
  container.id = 'lottoContainer';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '10px';

  lottos = getLottos(quantity);

  lottos.forEach((lotto) => {
    container.appendChild(printLotto(lotto));
  });

  result.appendChild(container);
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

getPurchasePrice();
