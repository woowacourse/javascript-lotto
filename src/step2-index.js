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

  showSystemMessage();
};

const showSystemMessage = () => {
  const systemMessage = document.getElementById('systemMessage');
  systemMessage.innerHTML = '';
  const messageContainer = document.createElement('div');
  messageContainer.textContent = `지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.`;
  systemMessage.appendChild(messageContainer);

  showWinningLottos();
};

const showWinningLottos = () => {
  const systemMessage = document.getElementById('systemMessage');
  const divWinningContainer = document.createElement('div');

  const divWinningNumber = document.createElement('span');
  divWinningNumber.textContent = `당첨 번호`;
  divWinningContainer.appendChild(divWinningNumber);

  const divBonusContainer = document.createElement('div');

  const divBonusNumber = document.createElement('span');
  divBonusNumber.textContent = `보너스 번호`;
  divBonusContainer.appendChild(divBonusNumber);

  for (let i = 0; i < 6; i++) {
    const input = document.createElement('input');
    input.id = `winningNumber${i}`;
    input.style.width = '30px';
    input.type = `number`;
    input.addEventListener('input', (event) => {
      winningNumbers[i] = Number(event.target.value);
    });
    divWinningContainer.appendChild(input);
  }

  systemMessage.appendChild(divWinningContainer);

  const bonusInput = document.createElement('input');
  bonusInput.id = 'bonusNumber';
  bonusInput.style.width = '30px';
  bonusInput.type = `number`;

  bonusInput.addEventListener('input', (e) => {
    bonusNumber = Number(e.target.value);
  });
  divBonusContainer.appendChild(bonusInput);

  systemMessage.appendChild(divBonusContainer);
  const button = document.createElement('button');
  button.id = `showResultButton`;
  button.textContent = `결과 확인하기`;

  systemMessage.appendChild(button);
  handleResultButton();
};

const handleResultButton = () => {
  document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'showResultButton') {
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
  });
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
