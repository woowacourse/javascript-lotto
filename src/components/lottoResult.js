import {
  resultEndContent,
  resultTitle,
  tableContent,
} from '../view/templates/lottoResult';

function closeButtonContainer() {
  const $container = document.createElement('div');
  $container.className = 'close-button-container';

  const $button = document.createElement('button');
  $button.type = 'button';
  $button.className = 'modal-close-button';
  $button.innerText = '❌';

  $container.appendChild($button);

  return $container;
}

function tableContainer(winCount) {
  const $table = document.createElement('table');
  $table.className = 'result-table';

  $table.innerHTML = tableContent(winCount);

  return $table;
}

function endContainer(earningRate) {
  const $container = document.createElement('div');
  $container.className = 'result-end-container';

  $container.innerHTML = resultEndContent(earningRate);

  return $container;
}

export default function lottoResultBoard(winCount, earningRate) {
  const $board = document.createElement('div');

  $board.appendChild(closeButtonContainer());
  $board.innerHTML += resultTitle;
  $board.appendChild(tableContainer(winCount));
  $board.appendChild(endContainer(earningRate));

  return $board;
}
