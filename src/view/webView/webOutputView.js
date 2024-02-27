import prize from '../../domain/prize';
import formatNumber from '../../utils/formatNumber';

const webOutputView = {
  renderLottoList: (lottoTickets) => {
    const lottoListTemplate = lottoTickets
      .map(
        (lotto) => `<li>
        <span class="ticket-emoji">🎟️</span
        ><span class="lotto-number">${lotto.getNumbers().join(', ')}</span>
      </li>`,
      )
      .join('');
    document.querySelector('#lotto-list').innerHTML = lottoListTemplate;
  },

  renderTalbe: (totalResult) => {
    const tableHeader = `
    <tr id="reward-table-header">
    <th>일치 갯수</th>
    <th>당첨금</th>
    <th>당첨 갯수</th>
  </tr>
    `;

    const tableTemplate = Object.keys(totalResult).map(
      (rank) =>
        `<tr>
        <th>${prize.findMatchCountByRank(rank)}개</th>
        <th>${formatNumber(prize.findRewardByRank(rank))}</th>
        <th>${totalResult[rank]}개</th>
      </tr>`,
    );

    document.querySelector('#reward-table').innerHTML = `${tableHeader} ${tableTemplate.join('')}`;
  },

  renderProfit: (profit) => {
    const profitText = document.querySelector('#profit-text');
    const profitTemplate = `당신의 총 수익률은 ${profit}%입니다.`;

    profitText.innerHTML = profitTemplate;
  },

  clearLottoList: () => {
    // 로또 티켓이 표시되는 요소를 특정 ID나 클래스로 가정
    const lottoListContainer = document.querySelector('#lottoList-container');
    if (lottoListContainer) {
      lottoListContainer.innerHTML = ''; // 내부 HTML을 지워서 모든 자식 요소를 제거
    }
  },

  clearResults: () => {
    // 결과가 특정 ID나 클래스를 가진 테이블이나 다른 컨테이너에 표시되는 것으로 가정
    const resultsContainer = document.querySelector('#results-container');
    if (resultsContainer) {
      resultsContainer.innerHTML = ''; // 내부 HTML을 지워서 모든 자식 요소를 제거
    }

    // 결과를 표시하기 위해 모달을 사용하는 경우, 모달을 숨기고 싶을 수도 있습니다
    const resultModal = document.querySelector('#modal-background');
    if (resultModal) {
      resultModal.style.display = 'none';
    }
  },
};

export default webOutputView;
