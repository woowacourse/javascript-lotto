import Validate from './Model/Validate.js';

const input_price = document.querySelector('.input_price');

// 로또 구매 수량 요소 생성
export function createLottoCountElement(count) {
  const buy_count = document.createElement('p');
  buy_count.innerText = `총 ${count}개를 구매하였습니다.`;
  buy_count.classList.add('buy_count');
  return buy_count;
}

// 로또 컨테이너 생성
function createLottoContainer() {
  const lotto_container = document.createElement('section');
  lotto_container.classList.add('lotto_container');
  return lotto_container;
}

// 로또 구매 수량 UI 생성
function paintLottoCount(lottos) {
  const main_container = document.getElementById('main_container');

  main_container.appendChild(createLottoCountElement(lottos.length));
  main_container.appendChild(createLottoContainer());
}

// 로또 생성
function createLotto() {
  const lottoMachine = new LottoMachine();
  return lottoMachine.generateLotto(input_price.value);
}

// 로또 구매 후 UI 업데이트
function handleLottoPurchase() {
  try {
    Validate.checkIsEmpty(input_price.value);
    Validate.checkIsNumber(input_price.value);
    Validate.checkThousandUnit(input_price.value);
    Validate.checkPriceRange(input_price.value);

    const lottos = createLotto();
    paintLottoCount(lottos);
  } catch (error) {
    alert(error.message);
  }
}

// 이벤트 설정
function setupEventListeners() {
  input_price.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') handleLottoPurchase();
  });
  button_price.addEventListener('click', handleLottoPurchase);
}

// 초기화 실행
setupEventListeners();
