import {
  pusrchaseCountMessage,
  eachLottoNumbers,
} from '../templates/lottoGame';

export default function purchaseLottoStatus(lottos) {
  const board = document.createElement('div');
  const purchastCount = pusrchaseCountMessage(lottos.length);
  board.className = 'purchase-lotto-status-container';

  board.innerHTML = purchastCount;
  for (const lotto of lottos) {
    board.innerHTML += eachLottoNumbers(lotto);
  }

  return board;
}
