import { getKRString } from './utils/format.js';

export const getResultItemCountTemplate = (lottoItemCount) => {
  return `
    총 <span id="lotto-count">${lottoItemCount}</span>개를 구매하였습니다.
  `;
};

const getNumberListTemplate = ({lottoNumberList}) => {
  return lottoNumberList.join(', ');
};

export const getResultItemListTemplate = (lottoItemList) => {
  return lottoItemList
    .map(
      (lottoItem) =>
        ` 
        <div class="mx-1 text-4xl lotto-item">
          <span class="lotto-icon">🎟️</span>
          <span class="lotto-numbers">${getNumberListTemplate(lottoItem)}</span>
        </div>
      `
    )
    .join('');
};

export const getModalTbodyTemplate = (rankItemList) =>
  rankItemList.map(
    (rankItem) => `
    <tr class="text-center">
      <td class="p-3">${rankItem.matchCount}개 ${rankItem.isBonusMatched ? ' + 보너스볼' : ''}</td>
      <td class="p-3">${getKRString(rankItem.money)}</td>
      <td class="p-3">${rankItem.winCount}개</td>
    </tr>
    `
  ).join('');
