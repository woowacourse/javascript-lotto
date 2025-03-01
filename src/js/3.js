import { unlockScroll } from './scroll.js';

document.addEventListener('DOMContentLoaded', () => {
  setupPurchaseForm();
  setupWinningNumberForm();
  setupModalControls();
});

// ✅ 1. 로또 구매 이벤트 설정
const setupPurchaseForm = () => {
  $('#purchase-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    handleLottoPurchase();
  });
};

// ✅ 2. 당첨 번호 입력 폼 이벤트 설정
const setupWinningNumberForm = () => {
  $('#winning-number-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handleWinningNumberSubmission();
  });
};

// ✅ 3. 모달 관련 이벤트 설정
const setupModalControls = () => {
  const modal = $('#result-modal');
  const closeButton = $('.close-button');
  const restartButton = $('#restart-button');

  closeButton.addEventListener('click', () => closeModal(modal));
  restartButton.addEventListener('click', () => restartGame(modal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal(modal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal(modal);
  });
};

// 🔹 1. 로또 구매 처리
const handleLottoPurchase = () => {
  const priceInput = $('#price');
  const errorUI = $('#price-error');
  resetError(errorUI);

  try {
    const priceValue = priceInput.value.trim();
    validatePrice(priceValue);
    const price = parsePrice(priceValue);
    const { lottoArray, lottoCount } = purchaseLottos(price);
    updateLottoUI(lottoArray, lottoCount);
  } catch (error) {
    showError(errorUI, error.message);
  }
};

// 🔹 2. 당첨 번호 입력 처리
const handleWinningNumberSubmission = () => {
  const modal = $('#result-modal');
  const errorUI = $('#winning-number-error');
  resetError(errorUI);

  try {
    const { winningNumbers, bonusNumber } = getWinningNumbers();
    const lottoArray = LottoManager.getLottoArray();

    const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);
    const matchingResult = calculateMatchingResult(winningLotto, lottoArray);
    const profitRate = calculateProfitRate(matchingResult, lottoArray.length);

    updateResultUI(matchingResult, profitRate);
    showModal(modal);
  } catch (error) {
    showError(errorUI, error.message);
  }
};

const closeModal = (modal) => {
  modal.style.display = 'none';
  unlockScroll();
};

const restartGame = (modal) => {
  closeModal(modal);
  location.reload();
};

// 🔹 4. UI 관련 헬퍼 함수
const showError = (errorUI, message) => {
  errorUI.textContent = message;
  errorUI.style.visibility = 'visible';
};
