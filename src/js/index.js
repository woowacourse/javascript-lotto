import { lockScroll, unlockScroll } from './scroll.js';
import { submitPurchaseForm } from './purchase/submitPurchaseForm.js';
import { submitWinningNumberForm } from './submitWinningNumberForm.js';
import { $ } from '../util/selector.js';
import { calculateMatchingResult } from '../service/MatchingService.js';
import { calculateProfitRate } from '../service/ProfitService.js';

document.addEventListener('DOMContentLoaded', async () => {
  const lottoArray = await submitPurchaseForm();
  const winningLotto = await submitWinningNumberForm();

  const matchingResult = calculateMatchingResult(winningLotto, lottoArray);
  const profitRate = calculateProfitRate(matchingResult, lottoArray.length);

  updateModalContent(matchingResult, profitRate);
  setupModalControls();
});

// ✅ 모달 내용 업데이트 함수
const updateModalContent = (matchingResult, profitRate) => {
  $('#match-3').textContent = `${matchingResult[3]}개`;
  $('#match-4').textContent = `${matchingResult[4]}개`;
  $('#match-5').textContent = `${matchingResult[5]}개`;
  $('#match-bonus').textContent = `${matchingResult['bonus']}개`;
  $('#match-6').textContent = `${matchingResult[6]}개`;

  const profitRateText = `당신의 총 수익률은 ${profitRate}%입니다.`;
  $('#profit-rate').textContent = profitRateText;

  showModal();
};

// ✅ 모달 표시 함수
const showModal = () => {
  const modal = $('#result-modal');
  modal.style.display = 'flex';
  lockScroll();
};

// ✅ 모달 관련 이벤트 설정
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

// ✅ 모달 닫기 함수
const closeModal = (modal) => {
  modal.style.display = 'none';
  unlockScroll();
};

// ✅ 게임 재시작 (새로고침)
const restartGame = (modal) => {
  closeModal(modal);
  location.reload();
};
