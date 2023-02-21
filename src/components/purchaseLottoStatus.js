import {
  pusrchaseCountMessage,
  eachLottoNumbers,
} from '../view/templates/lottoGame';

export default function purchaseLottoStatus(lottos) {
  const board = document.createElement('div');
  const purchastCount = pusrchaseCountMessage(lottos.length);

  board.innerHTML = purchastCount;
  for (const lotto of lottos) {
    board.innerHTML += eachLottoNumbers(lotto);
  }

  return board;
}
