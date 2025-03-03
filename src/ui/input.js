import { LOTTO_NUMBER_LENGTH } from '../constants/common.js';
import { validateLottoNumber } from '../step2-index.js';

// 숫자 입력 UI 생성
export function createNumberInput(className) {
  const input_number = document.createElement('input');
  input_number.classList.add('input_number', className);
  input_number.type = 'number';
  validateLottoNumber(input_number);
  return input_number;
}

// 당첨 번호 입력 UI 요소 생성
export function createWinningInputUI() {
  const winning_box = document.createElement('div');
  winning_box.classList.add('winning_wrap');
  for (let i = 0; i < LOTTO_NUMBER_LENGTH; i++) {
    winning_box.appendChild(createNumberInput('winning_number'));
  }
  return winning_box;
}

// 보너스 번호 입력 UI 요소 생성
export function createBonusInputUI() {
  const bonus_box = document.createElement('div');
  bonus_box.appendChild(createNumberInput('bonus_number'));

  return bonus_box;
}

// 당첨 번호 및 보너스 번호 입력 UI를 화면에 추가
export function paintNumberInputs() {
  const main_container = document.getElementById('main_container');
  const number_container = document.createElement('section');
  number_container.classList.add('number_container');
  number_container.appendChild(createWinningInputUI());
  number_container.appendChild(createBonusInputUI());
  main_container.appendChild(number_container);
}
