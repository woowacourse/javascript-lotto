import {
  pusrchaseCountMessage,
  ticketContainer,
} from '../view/templates/lottoGame';

function purchaseLottoStatus(lottos) {
  const $board = document.createElement('div');
  const purchastCount = pusrchaseCountMessage(lottos.length);
  $board.innerHTML = purchastCount + ticketContainer(lottos);

  return $board;
}

export default function paintLottoStatus($root, lottos) {
  const $board = purchaseLottoStatus(lottos);
  $root.appendChild($board);
}
