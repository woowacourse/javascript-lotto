import Validate from '../Model/Validate.js';
import Winning from '../Model/Winning.js';
import { getWinningNumbers, setupModalEvents } from '../step2-index.js';
import { createCloseButton, createRestartButton } from './button.js';
import { createResultTable } from './table.js';
import { createModalTitle, createRateText } from './text.js';

// 모달 내부 팝업 UI 생성
function createModalPopup() {
  const modalPopup = document.createElement('div');
  modalPopup.classList.add('modal_popup');

  const closeButton = createCloseButton();
  const title = createModalTitle();
  const table = createResultTable();
  const rateText = createRateText();
  const restartButton = createRestartButton();

  modalPopup.appendChild(closeButton);
  modalPopup.appendChild(title);
  modalPopup.appendChild(table);
  modalPopup.appendChild(rateText);
  modalPopup.appendChild(restartButton);

  return modalPopup;
}

// 모달 생성
export function createModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalPopup = createModalPopup();
  modal.appendChild(modalPopup);
  document.body.appendChild(modal);

  setupModalEvents(modal, modalPopup);

  return modal;
}

// 수익률 정보 업데이트
function updateModalResults(modal, winning) {
  const input_price = document.querySelector('.input_price');

  for (const rank in winning.rankHistory) {
    modal.querySelector(`.${rank}`).innerText = winning.rankHistory[rank];
  }
  modal.querySelector('.rate_text').innerText = `당신의 총 수익률은 ${winning.getCalculatedPrizeRate(
    input_price.value,
  )}%입니다.`;
}

// 입력된 당첨 번호와 보너스 번호의 유효성을 검사
function validateWinningNumbers(winningNumbers, bonusNumber) {
  winningNumbers.forEach((number) => Validate.checkLottoNumberRange(number));
  Validate.checkWinningNumberCount(winningNumbers);
  Validate.checkWinningNumberDuplicate(winningNumbers);
  Validate.checkBonusNumberDuplicate(winningNumbers, bonusNumber);
}

// 결과 확인 및 모달 표시
export function handleResultCheck(lottos) {
  try {
    const { winningNumbers, bonusNumber } = getWinningNumbers();
    validateWinningNumbers(winningNumbers, bonusNumber);

    const winning = new Winning(winningNumbers, bonusNumber);
    winning.calculateRank(lottos);

    const modal = createModal();
    updateModalResults(modal, winning);
  } catch (error) {
    alert(error.message);
  }
}
