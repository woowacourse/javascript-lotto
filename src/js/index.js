import { submitPurchaseForm } from './submitPurchaseForm.js';
import { submitWinningNumberForm } from './submitWinningNumberForm.js';
import { $ } from '../util/selector.js';
import { calculateMatchingResult } from '../service/MatchingService.js';
import { calculateProfitRate } from '../service/ProfitService.js';
import { closeModal, restartGame, showModal } from './modal.js';

document.addEventListener('DOMContentLoaded', async () => {
  const lottoArray = await submitPurchaseForm();
  const winningLotto = await submitWinningNumberForm();

  const matchingResult = calculateMatchingResult(winningLotto, lottoArray);
  const profitRate = calculateProfitRate(matchingResult, lottoArray.length);

  updateMatchingResult(matchingResult, profitRate);
  console.log(matchingResult, profitRate);
  // const modal = $('#result-modal');
  // showModal(modal);
  setupModalControl();
});

const updateMatchingResult = (matchingResult, profitRate) => {
  $('#match-3').textContent = `${matchingResult[3]}개`;
  $('#match-4').textContent = `${matchingResult[4]}개`;
  $('#match-5').textContent = `${matchingResult[5]}개`;
  $('#match-bonus').textContent = `${matchingResult['bonus']}개`;
  $('#match-6').textContent = `${matchingResult[6]}개`;

  const profitRateText = `당신의 총 수익률은 ${profitRate}%입니다.`;
  $('#profit-rate').textContent = profitRateText;
};

const setupModalControl = () => {
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
