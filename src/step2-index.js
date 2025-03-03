import Validate from './Model/Validate.js';

const input_price = document.querySelector('.input_price');

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
