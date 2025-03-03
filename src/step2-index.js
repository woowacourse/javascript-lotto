import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from './constants/common.js';
import LottoMachine from './Model/LottoMachine.js';
import Validate from './Model/Validate.js';
import { createResultButton } from './ui/button.js';
import { paintNumberInputs } from './ui/input.js';
import { paintLottoCount, paintLottos } from './ui/lotto.js';
import { createInputNotice } from './ui/text.js';

const input_price = document.querySelector('.input_price');
const button_price = document.querySelector('.input_button');

// 로또 생성
function createLotto() {
  const lottoMachine = new LottoMachine();
  return lottoMachine.generateLotto(input_price.value);
}

// 사용자가 입력한 당첨 번호와 보너스 번호 반환
export function getWinningNumbers() {
  const winningNumbers = [...document.querySelectorAll('.winning_number')].map((el) => Number(el.value));
  const bonusNumber = Number(document.querySelector('.bonus_number').value);
  return { winningNumbers, bonusNumber };
}

// 로또 구매 및 UI 초기화
function restartGame() {
  const modal = document.querySelector('.modal');
  const lottoContainer = document.querySelector('.lotto_container');
  const winningContainer = document.querySelector('.winning_container');
  const numberContainer = document.querySelector('.number_container');
  const numberText = document.querySelector('.number_text');
  const resultButton = document.querySelector('.result_button');
  const buyCount = document.querySelector('.buy_count');

  if (modal) modal.remove();
  if (lottoContainer) lottoContainer.remove();
  if (winningContainer) winningContainer.remove();
  if (numberContainer) numberContainer.remove();
  if (numberText) numberText.remove();
  if (resultButton) resultButton.remove();
  if (buyCount) buyCount.remove();

  input_price.value = '';
  button_price.disabled = false;
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
    paintLottos(lottos);
    createInputNotice();
    paintNumberInputs();
    createResultButton(lottos);

    button_price.disabled = true;
  } catch (error) {
    alert(error.message);
  }
}

// 입력 필드에 대한 로또 번호 유효성 검사
export function validateLottoNumber(input_element) {
  input_element.addEventListener('input', () => {
    let value = Number(input_element.value);
    if (isNaN(value)) {
      input_element.value = '';
      return;
    }
    if (value < MIN_LOTTO_NUMBER - 1) {
      input_element.value = MIN_LOTTO_NUMBER;
      return;
    }
    if (value > 45) {
      input_element.value = MAX_LOTTO_NUMBER;
      return;
    }
  });
}

// 모달 내부 이벤트 설정
export function setupModalEvents(modal, modalPopup) {
  const closeButton = modalPopup.querySelector('.button_close');
  const restartButton = modalPopup.querySelector('.button_restart');

  modal.addEventListener('click', () => modal.remove());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modal.remove();
    }
  });
  closeButton.addEventListener('click', () => modal.remove());
  restartButton.addEventListener('click', restartGame);
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
