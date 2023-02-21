import {
  pusrchaseCountMessage,
  eachLottoNumbers,
} from '../view/templates/lottoGame';

function purchaseLottoStatus(lottos) {
  const board = document.createElement('div');
  const purchastCount = pusrchaseCountMessage(lottos.length);

  board.innerHTML = purchastCount;
  for (const lotto of lottos) {
    board.innerHTML += eachLottoNumbers(lotto);
  }

  return board;
}

export default function paintLottoStatus(lottos) {
  const $lottoSection = document.querySelector('.lotto-section');
  const $board = purchaseLottoStatus(lottos);
  $lottoSection.appendChild($board);
}
