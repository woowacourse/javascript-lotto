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
import Lotto from '../domain/Lotto.js';
import { submitWinningNumberForm } from './submitWinningNumberForm.js';

document.addEventListener('DOMContentLoaded', () => {
  submitPurchaseForm();

  submitWinningNumberForm();
  // setupModalControls();
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
