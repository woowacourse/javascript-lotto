import { parseBonusNumber, parsePrice, parseWinningNumber } from '../input/parseInput.js';
import { purchaseLottos } from '../service/PurchaseService.js';
import validatePrice from '../validation/validatePrice.js';
import { $, $all } from '../util/selector.js';

import { updateLottoUI } from './purchase/updateLottoUI.js';
import { resetError } from './errorHandler.js';
import validateWinningNumber from '../validation/validateWinningNumber.js';
import validateBonusNumber from '../validation/validateBonusNumber.js';

// 🔹 스크롤 방지 함수
const lockScroll = () => {
  const body = document.body;
  body.style.overflow = 'hidden';
};

document.addEventListener('DOMContentLoaded', () => {
  $('#purchase-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const priceInput = $('#price');
    const errorUI = $('#price-error');
    const winningNumberForm = $('#winning-number-form');

    const priceValue = priceInput.value.trim();

    resetError(errorUI);
    try {
      validatePrice(priceValue);
      const price = parsePrice(priceValue);
      const { lottoArray, lottoCount } = purchaseLottos(price);
      updateLottoUI(lottoArray, lottoCount);
      // winningNumberForm.style.display = 'block';
    } catch (error) {
      errorUI.textContent = error.message;
      errorUI.style.visibility = 'visible';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  $('#winning-number-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const modal = $('#result-modal');
    const errorUI = $('#winning-number-error');
    const resultButton = $('.result-button');
    resetError(errorUI);
    try {
      const { winningNumbers, bonusNumber } = getWinningNumbers();

      modal.style.display = 'flex';
      lockScroll();
    } catch (error) {
      errorUI.textContent = error.message;
      errorUI.style.visibility = 'visible';
      resultButton.disabled = true;
    }
  });
});

const getWinningNumbers = () => {
  const winningNumberInput = Array.from($all('.winning-number-boxes input'))
    .map((input) => input.value.trim())
    .filter((value) => value !== '');

  const bonusNumberInput = $('#bonus').value.trim();

  validateWinningNumber(winningNumberInput);
  const winningNumbers = parseWinningNumber(winningNumberInput);

  validateBonusNumber(winningNumbers, bonusNumberInput);
  const bonusNumber = parseBonusNumber(bonusNumberInput);

  return { winningNumbers, bonusNumber };
};

document.addEventListener('DOMContentLoaded', () => {
  const resultButton = document.querySelector('#result-button');
  const modal = document.querySelector('#result-modal');
  const closeButton = document.querySelector('.close-button');
  const restartButton = document.querySelector('#restart-button');
  const body = document.body;

  // 🔹 스크롤 해제 함수
  const unlockScroll = () => {
    body.style.overflow = 'auto';
  };

  // 🔹 모달 닫기 (X 버튼 클릭)
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    unlockScroll(); // 스크롤 해제
  });

  // 🔹 모달 닫기 (다시 시작하기 버튼 클릭)
  restartButton.addEventListener('click', () => {
    modal.style.display = 'none';
    unlockScroll(); // 스크롤 해제
  });

  // 🔹 ESC 키 입력 시 모달 닫기
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
      unlockScroll(); // 스크롤 해제
    }
  });

  // 🔹 모달 바깥 클릭 시 닫기
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      unlockScroll(); // 스크롤 해제
    }
  });
});
