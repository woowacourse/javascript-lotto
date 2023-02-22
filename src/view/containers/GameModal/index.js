/* eslint-disable no-undef */
const GameModal = (num) => {
  return `
  <!-- The Modal -->
  <div id="game-modal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <div>
        <span class="game-modal-open-button">&times;</span>
      </div>
      <div>
        <div>🏆 당첨 통계${num} 🏆</div>
        <table>
          <thead>
            <tr>
              <th>일치 갯수</th>
              <th>당첨금</th>
              <th>당첨 갯수</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr>
              <td>3개</td>
              <td>5,000</td>
              <td>n개</td>
            </tr>
            <tr>
              <td>4개</td>
              <td>50,000</td>
              <td>n개</td>
            </tr>
            <tr>
              <td>5개</td>
              <td>1,500,000</td>
              <td>n개</td>
            </tr>
            <tr>
              <td>5개+보너스볼</td>
              <td>30,000,000</td>
              <td>n개</td>
            </tr>
            <tr>
              <td>6개</td>
              <td>2,000,000,000</td>
              <td>n개</td>
            </tr>
          </tbody>
        </table>
        <div>
          당신의 총 수익률은 &입니다.
        </div>
        <button>다시 시작하기</button>
      </div>
    </div>

  </div>

`;
};
export default GameModal;
