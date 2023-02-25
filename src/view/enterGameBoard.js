import { LOTTO_LENGTH } from '../data/Constants';
import { keyUpEventListener } from '../utils/eventListener';
import {
  enterWinNumberMessage,
  numberEnterContainer,
  numberInput,
  numberTitleContainer,
  resultButton,
  winningNumberContainer,
} from './templates/lottoGame';

function winningNumberInputs() {
  const $$input = Array.from({ length: LOTTO_LENGTH })
    .map(() => numberInput({ name: 'win-number' }))
    .join('');

  return $$input;
}

function winNumberEnterContainer() {
  const $winNumberContainer = winningNumberContainer(winningNumberInputs());
  const $bonusNumberInput = numberInput({ name: 'bonus-number' });

  return numberEnterContainer($winNumberContainer, $bonusNumberInput);
}

function addEnterGameBoardEventListener($root, eventHandler) {
  const $container = $root.querySelector('.number-container');
  const $button = $root.querySelector('#check-result');

  $container.addEventListener('keyup', (e) => keyUpEventListener(e, $button));
  $button.addEventListener('click', eventHandler);
}

function enterGameBoard() {
  const $enterBoard = document.createElement('div');

  $enterBoard.innerHTML = `
    ${enterWinNumberMessage}
    ${numberTitleContainer}
    ${winNumberEnterContainer()}
    ${resultButton}
  `;

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
