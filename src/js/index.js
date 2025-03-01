import { parseBonusNumber, parseWinningNumber } from '../input/parseInput.js';
import { $, $all } from '../util/selector.js';
import { resetError, showError } from './errorHandler.js';
import validateWinningNumber from '../validation/validateWinningNumber.js';
import validateBonusNumber from '../validation/validateBonusNumber.js';
import { lockScroll, unlockScroll } from './scroll.js';
import WinningLotto from '../domain/WinningLotto.js';
import { calculateMatchingResult } from '../service/MatchingService.js';
import { calculateProfitRate } from '../service/ProfitService.js';
import { submitPurchaseForm } from './purchase/submitPurchaseForm.js';

document.addEventListener('DOMContentLoaded', () => {
  submitPurchaseForm();

  submitWinningNumberForm();
  // setupModalControls();
});

// ✅ 2. 당첨 번호 입력 폼 이벤트 설정
const submitWinningNumberForm = () => {
  $('#winning-number-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handleWinningNumber();
  });
};

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
      const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);
      // const matchingResult = calculateMatchingResult(winningLotto, lottoArray);
      // const profitRate = calculateProfitRate(matchingResult, lottoArray.length);
    } catch (error) {
      errorUI.textContent = error.message;
      errorUI.style.visibility = 'visible';
      resultButton.disabled = true;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('#result-modal');
  const closeButton = document.querySelector('.close-button');
  const restartButton = document.querySelector('#restart-button');

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

// 🔹 2. 당첨 번호 입력 처리
const handleWinningNumber = () => {
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
