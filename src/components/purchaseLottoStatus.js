import {
  pusrchaseCountMessage,
  eachLottoNumbers,
} from '../view/templates/lottoGame';

function purchaseLottoStatus(lottos) {
  const $board = document.createElement('div');
  const purchastCount = pusrchaseCountMessage(lottos.length);

  const $ticketContainer = document.createElement('div');

  $board.innerHTML = purchastCount;
  for (const lotto of lottos) {
    $ticketContainer.innerHTML += eachLottoNumbers(lotto);
  }

  $board.appendChild($ticketContainer);

  return $board;
}

export default function paintLottoStatus($root, lottos) {
  const $board = purchaseLottoStatus(lottos);
  $root.appendChild($board);
}
