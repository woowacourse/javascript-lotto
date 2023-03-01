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

function addEnterWinningNumberEventListener($root) {
  const $container = $root.querySelector('.number-container');
  const $button = $root.querySelector('#check-result');

  $container.addEventListener('keyup', (e) => keyUpEventListener(e, $button));
}

function enterWinningNumber() {
  const $enterBoard = document.createElement('form');

  $enterBoard.innerHTML = `
    ${enterWinNumberMessage}
    ${numberTitleContainer}
    ${winNumberEnterContainer()}
    ${resultButton}
  `;

  return $enterBoard;
}

export function paintEnterWinningNumber($root, eventHandler) {
  const $gameBoard = enterWinningNumber();
  $root.appendChild($gameBoard);

  addEnterWinningNumberEventListener($root);
  $gameBoard.addEventListener('submit', eventHandler);

  $gameBoard.querySelector('input[name=win-number]').focus();
}

export function getWinNumberAndBonusNumber($root) {
  const $winNumbers = $root.querySelectorAll('input[name="win-number"]');
  const $bonusNumber = $root.querySelector('input[name="bonus-number"]');

  const winningNumbers = [...$winNumbers.values()].map(({ value }) =>
    Number(value)
  );
  const bonusNumber = Number($bonusNumber.value);

  return { winningNumbers, bonusNumber };
}
