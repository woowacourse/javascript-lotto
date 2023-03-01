import {
  closeButtonContainer,
  endContainer,
  resultTitle,
  tableContent,
} from '../view/templates/lottoResult';

function addLottoResultEventListener($root, { restart, closeHandler }) {
  $root.querySelector('#retry').addEventListener('click', restart);
  $root
    .querySelector('.modal-close-button')
    .addEventListener('click', closeHandler);
}

export default function paintLottoResultBoard(
  { winCount, earningRate },
  handlers
) {
  const $board = document.createElement('div');

  $board.innerHTML = `
    ${closeButtonContainer}
    ${resultTitle}
    ${tableContent(winCount)}
    ${endContainer({ earningRate })}
  `;

  addLottoResultEventListener($board, handlers);

  return $board;
}
