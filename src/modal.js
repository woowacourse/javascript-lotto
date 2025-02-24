window.addEventListener("load", function () {
  const btnLottoResult = document.getElementById("open-modal-btn");
  const modalContainer = document.getElementById("modal-background");

  btnLottoResult.addEventListener("click", () => {
    modalContainer.innerHTML = `
    <div class="modal-box" id="modal-box">
        <div class="modal-content">
          <div class="close-modal-btn" id="close-modal-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black"/>
            </svg>
          </div>
          <h2>🏆 당첨 통계 🏆</h2>
          <table>
          <tr>
            <th class="modal-table-1th">일치 갯수</th>
            <th class="modal-table-2th">당첨금</th>
            <th class="modal-table-3th">당첨 갯수</th>
          </tr>
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
          </table>

          <p>당신의 총 수익률은 %입니다.</p>
          <button>다시 시작하기</button>
        </div>
      </div>
      `;

    modalContainer.classList.add("show");

    document.getElementById("close-modal-btn").addEventListener("click", () => {
      modalContainer.classList.remove("show");
    });
  });
});
