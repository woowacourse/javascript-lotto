import { LOTTO_LENGTH } from '../data/Constants';
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
    .map(() => numberInput('winNumber'))
    .join('');

  $winningContainer.innerHTML = $inputArrays;
  return $winningContainer;
}

function numberEnterContainer() {
  const $container = document.createElement('div');
  $container.className = 'flex-justify-between number-container';

  const $winNumberContainer = winningNumberContainer();
  const $bonusNumberInput = numberInput('bonusNumber');
  $container.appendChild($winNumberContainer);
  $container.innerHTML += $bonusNumberInput;

  return $container;
}

function checkResultButton() {
  const $button = document.createElement('button');

  $button.id = 'checkResult';
  $button.className = 'caption large-button';
  $button.type = 'button';
  $button.textContent = '결과 확인하기';
  $button.disabled = true;

  return $button;
}

function enterGameBoard() {
  const enterBoard = document.createElement('div');

  enterBoard.innerHTML = enterWinNumberMessage;
  enterBoard.appendChild(numberTitleContainer());
  enterBoard.appendChild(numberEnterContainer());
  enterBoard.appendChild(checkResultButton());

  return enterBoard;
}

export default function paintEnterWinningNumber() {
  const $lottoSection = document.querySelector('.lotto-section');
  $lottoSection.appendChild(enterGameBoard());
}
