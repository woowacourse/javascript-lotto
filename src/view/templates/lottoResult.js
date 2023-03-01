const resultEndContent = (earningRate) => `
  <p class="caption">당신의 총 수익률은 ${earningRate}%입니다.</p>
  <button id="retry" type="button" class="caption large-button ">다시 시작하기</button>
`;

export const tableContent = (winCount) => `
<table class="result-table">
  <thead class="caption">
    <tr>
      <th><span class="top-bottom-margin-8">일치 갯수</span></th>
      <th><span class="top-bottom-margin-8">당첨금</span></th>
      <th><span class="top-bottom-margin-8">당첨 갯수</span></th>
    </tr>
  </thead>
  <tbody class="body">
    <tr>
      <td><span class="top-bottom-margin-8">3개</span></td>
      <td><span class="top-bottom-margin-8">5,000</span></td>
      <td><span class="top-bottom-margin-8">${winCount['FIFTH']}개</span></td>
    </tr>
    <tr>
      <td><span class="top-bottom-margin-8">4개</span></td>
      <td><span class="top-bottom-margin-8">50,000</span></td>
      <td><span class="top-bottom-margin-8">${winCount['FOURTH']}개</span></td>
    </tr>
    <tr>
      <td><span class="top-bottom-margin-8">5개</span></td>
      <td><span class="top-bottom-margin-8">1,5000,000</span></td>
      <td><span class="top-bottom-margin-8">${winCount['THIRD']}개</span></td>
    </tr>
    <tr>
      <td><span class="top-bottom-margin-8">5개+보너스볼</span></td>
      <td><span class="top-bottom-margin-8">30,000,000</span></td>
      <td><span class="top-bottom-margin-8">${winCount['SECOND']}개</span></td>
    </tr>
    <tr>
      <td><span class="top-bottom-margin-8">6개</span></td>
      <td><span class="top-bottom-margin-8">2,000,000,000</span></td>
      <td><span class="top-bottom-margin-8">${winCount['FIRST']}개</span></td>
    </tr>
  </tbody>
</table>
`;

export const resultTitle = `
  <p class="subtitle">🏆 당첨 통계 🏆</p>
`;

export const closeButtonContainer = `
  <div class="close-button-container">
    <button class="modal-close-button">❌</button>
  </div>
`;

export const endContainer = ({ earningRate }) =>
  ` <div class="result-end-container">${resultEndContent(earningRate)}</div>
`;
