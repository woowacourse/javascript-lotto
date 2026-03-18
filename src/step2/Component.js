const Component = {
  errorMessage(message) {
    return `<p class="text-body error-message">${message}</p>`
  },

  purchaseLottoCount(count) {
    return `<p id="purchase-lotto-count-message">총 ${count}개를 구매했습니다.</p>`;
  },

  lottoList(lottoNumbers) {
    const listItems = lottoNumbers.map((lottoNumber) => {
      return `<li><span>🎟️</span>${lottoNumber.join(', ')}</li>`;
    });
    return `<ul id="purchase-lotto-list">${listItems.join('')}</ul>`;
  },

  lottoMatchResultTable(matchResultSummary) {
    const tableHeaders = ['일치 갯수', '당첨금', '당첨 갯수'].map((content) => {
      return `<th>${content}</th>`;
    });

    const tableRows = matchResultSummary.map((rowData) => {
      const cell = Object.values(rowData).map((cellData) => {
        return `<td>${cellData}</td>`;
      });
      return `<tr>${cell.join('')}</tr>`;
    });
    
    return `<table id="lotto-match-result"><thead><tr>${tableHeaders.join('')}</tr></thead><tbody>${tableRows.join('')}</tbody></table>`;
  },

  rateOfReturnMessage(rateOfReturn) {
    return `<p id="lotto-rate-of-return">당신의 총 수익률은 ${rateOfReturn}%입니다.</p>`;
  },

  restartButton() {
    return '<button type="button" id="restart-button">다시 시작하기</button>';
  }
}

export default Component
