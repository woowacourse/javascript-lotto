import { LOTTO_LENGTH } from '../data/Constants';
import { clearConatiner } from '../utils/Utils';
import { showModal } from '../view/modal';
import {
  enterWinNumberMessage,
  winNumberMessage,
  bonusNumberMessage,
  numberInput,
} from '../view/templates/lottoGame';
import lottoResultBoard from './lottoResult';

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
  $container.className = 'flex-justify-between';

  const $winNumberContainer = winningNumberContainer();
  const $bonusNumberInput = numberInput('bonusNumber');
  $container.appendChild($winNumberContainer);
  $container.innerHTML += $bonusNumberInput;

  return $container;
}

function checkResultButton(callback) {
  const $button = document.createElement('button');
  $button.id = 'checkResult';
  $button.className = 'caption large-button';
  $button.type = 'button';
  $button.textContent = '결과 확인하기';
  $button.addEventListener('click', callback);

  return $button;
}

function enterGameBoard(callback) {
  const enterBoard = document.createElement('div');

  enterBoard.innerHTML = enterWinNumberMessage;
  enterBoard.appendChild(numberTitleContainer());
  enterBoard.appendChild(numberEnterContainer());
  enterBoard.appendChild(checkResultButton(callback));

  return enterBoard;
}

const showResultButton = () => {
  showModal();
  const $modalContent = document.querySelector('.modal-content');
  clearConatiner($modalContent);
  $modalContent.appendChild(
    lottoResultBoard(
      {
        FIFTH: 0,
        FOURTH: 0,
        THIRD: 0,
        SECOND: 0,
        FIRST: 0,
      },
      0.0
    )
  );
};

export default function paintEnterWinningNumber() {
  const $lottoSection = document.querySelector('.lotto-section');
  $lottoSection.appendChild(enterGameBoard(showResultButton));
}
