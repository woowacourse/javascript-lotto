const input_price = document.querySelector('.input_price');

// 로또 구매 후 UI 업데이트
function handleLottoPurchase() {}

// 이벤트 설정
function setupEventListeners() {
  input_price.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') handleLottoPurchase();
  });
  button_price.addEventListener('click', handleLottoPurchase);
}

// 초기화 실행
setupEventListeners();
