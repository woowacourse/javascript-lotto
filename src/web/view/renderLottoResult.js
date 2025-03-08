import { printLottoRank } from '../../common/utils/printLottoRank.js';
import { LOTTO_CONDITION } from '../../common/constants/constants.js';
import { createDOMElement } from '../utils/domUtils.js';
import LottoGame from '../../common/domain/LottoGame.js';

const $lottoResultTable = document.getElementById('lotto-result-table');
const $winningRate = document.getElementById('winningRate');

export function renderRankTable(state) {
  $lottoResultTable.insertAdjacentHTML(
    'afterbegin',
    `
        <tr>
          <th scope="col">일치 갯수</th>
          <th scope="col">당첨금</th>
          <th scope="col">당첨 갯수</th>
        </tr>`,
  );

  const rankList = printLottoRank(state.lottoGame.rank);
  appendTable(rankList);
}

function appendTable(rankList) {
  rankList.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.appendChild(createDOMElement('td', index === 3 ? `${row[0]}개+보너스볼` : `${row[0]}개`));
    tr.appendChild(createDOMElement('td', row[1]));
    tr.appendChild(createDOMElement('td', `${row[2]}개`));

    $lottoResultTable.appendChild(tr);
  });
}

export function renderWinningRate(state) {
  const winningRate = LottoGame.calculateWinningRate(
    LOTTO_CONDITION.PRICE * state.lottoMaker.lottoList.length,
    LottoGame.calculateTotalPrize(state.lottoGame.rank),
  );

  $winningRate.innerText = winningRate;
}
