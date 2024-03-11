const ResultModal = (rankList, profit) => {
  return /* html */ `<button id="modal-close-button">✖️</button>
  <table id="winning-result-table">
  <tr>
    <th>일치 개수</th>
    <th>당첨금</th>
    <th>당첨 개수</th>
  </tr>
  <tr>
    <td>3개</td>
    <td>5,000</td>
    <td>${rankList[5]}개</td>
  </tr>
  <tr>
    <td>4개</td>
    <td>50,000</td>
    <td>${rankList[4]}개</td>
  </tr>
  <tr>
    <td>5개</td>
    <td>1,500,000</td>
    <td>${rankList[3]}개</td>
  </tr>
  <tr>
    <td>5개+보너스볼</td>
    <td>30,000,000</td>
    <td>${rankList[2]}개</td>
  </tr>
  <tr>
    <td>6개</td>
    <td>2,000,000,000</td>
    <td>${rankList[1]}개</td>
  </tr>
</table>
<div id="winning-result-profit">
  <span>당신의 총 수익률은 ${profit}%입니다.</span>
</div>
<button id="lotto-result-restart-button">다시 시작하기</button>`;
};

export default ResultModal;
