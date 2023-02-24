import { LOTTO_LENGTH } from '../data/Constants';
import { keyUpEventListener } from '../utils/eventListener';
import {
  enterWinNumberMessage,
  winNumberMessage,
  bonusNumberMessage,
  numberInput,
} from '../view/templates/lottoGame';

function numberTitleContainer() {
  const $container = document.createElement('div');
  $container.className = 'flex-justify-between';

  $container.innerHTML += winNumberMessage + bonusNumberMessage;

  return $container;
}

function winningNumberContainer() {
  const $winningContainer = document.createElement('div');

  const $inputArrays = Array.from({ length: LOTTO_LENGTH })
    .map(() => numberInput('win-number'))
    .join('');

  $winningContainer.innerHTML = $inputArrays;
  return $winningContainer;
}

function numberEnterContainer() {
  const $container = document.createElement('div');
  $container.className = 'flex-justify-between number-container';

  const $winNumberContainer = winningNumberContainer();
  const $bonusNumberInput = numberInput('bonus-number');
  $container.appendChild($winNumberContainer);
  $container.innerHTML += $bonusNumberInput;

  return $container;
}

function checkResultButton() {
  const $button = document.createElement('button');

  $button.id = 'check-result';
  $button.className = 'caption large-button';
  $button.type = 'button';
  $button.textContent = '결과 확인하기';
  $button.disabled = true;

  return $button;
}

function addEnterGameBoardEventListener($root, eventHandler) {
  const $container = $root.querySelector('.number-container');
  const $button = $root.querySelector('#check-result');

  $container.addEventListener('keyup', (e) => keyUpEventListener(e, $button));
  $button.addEventListener('click', eventHandler);
}

function enterGameBoard() {
  const $enterBoard = document.createElement('div');

  $enterBoard.innerHTML = enterWinNumberMessage;
  $enterBoard.appendChild(numberTitleContainer());
  $enterBoard.appendChild(numberEnterContainer());
  $enterBoard.appendChild(checkResultButton());

  return $enterBoard;
}

export function paintEnterWinningNumber($root, eventHandler) {
  const $gameBoard = enterGameBoard();
  $root.appendChild($gameBoard);

  addEnterGameBoardEventListener($root, eventHandler);
  $gameBoard.querySelector('input[name=win-number]').focus();
}

export function getWinNumberAndBonusNumber() {
  const $winNumbers = document.querySelectorAll('input[name="win-number"]');
  const $bonusNumber = document.querySelector('input[name="bonus-number"]');

  const winningNumbers = [...$winNumbers.values()].map(({ value }) =>
    Number(value)
  );
  const bonusNumber = Number($bonusNumber.value);

  return { winningNumbers, bonusNumber };
}
