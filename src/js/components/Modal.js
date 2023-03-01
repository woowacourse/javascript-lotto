const Modal = ({ statstics, profitRate }) => {
  return `
      <div class="modal-window">
        <button id="modal-close-button" type="button">X</button>
          <div class="win-title subtitle">🏆 당첨 통계 🏆</div>
          <table class="win-statstics">
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
              ${statstics
                .map(({ condition, reward, count }) => {
                  return `
                    <tr>
                      <td>${condition}</td>
                      <td>${reward.toLocaleString('ko-KR')}</td>
                      <td>${count}</td>
                    </tr>
                  `;
                })
                .join('')}
          </table>
          <div class="profit-rate">당신의 총 수익률은 ${profitRate}%입니다.</div>
        <button class="lotto-button restart-button" type="button">다시 시작하기</button>
      </div>
    `;
};

export default Modal;
