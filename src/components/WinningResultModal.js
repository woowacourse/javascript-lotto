// WinningResultModal.js
class WinningResultModal {
  constructor() {
    // 모달을 렌더링할 루트를 잡습니다.
    // (HTML에서 <div id="modal-root"></div> 영역)
    this.modalRoot = document.querySelector('#modal-root');
  }

  /**
   * @param {Object} winningCounts 예: {3: 1, 4: 0, 5: 2, '5+bonus': 0, 6: 0}
   * @param {number} profitRate 예: 123.45
   */
  render(winningCounts, profitRate) {
    // 모달의 전체 구조(백드롭 + 내용)를 innerHTML로 선언형 UI 작성
    this.modalRoot.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-content">
          <button class="modal-close-button">✕</button>
          <h2>🏆 당첨 통계 🏆</h2>
          <table>
            <thead>
              <tr>
                <th>일치 개수</th>
                <th>당첨금</th>
                <th>당첨 개수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3개</td>
                <td>5,000</td>
                <td>${winningCounts[0] ?? 0}개</td>
              </tr>
              <tr>
                <td>4개</td>
                <td>50,000</td>
                <td>${winningCounts[1] ?? 0}개</td>
              </tr>
              <tr>
                <td>5개</td>
                <td>1,500,000</td>
                <td>${winningCounts[2] ?? 0}개</td>
              </tr>
              <tr>
                <td>5개 + 보너스볼</td>
                <td>30,000,000</td>
                <td>${winningCounts[3] ?? 0}개</td>
              </tr>
              <tr>
                <td>6개</td>
                <td>2,000,000,000</td>
                <td>${winningCounts[4] ?? 0}개</td>
              </tr>
            </tbody>
          </table>
          <strong>당신의 총 수익률은 ${profitRate}%입니다.</strong>
          <button class="big-button">다시 시작하기</button>
        </div>
      </div>
    `;

    // "다시 시작하기" 버튼을 눌렀을 때 모달을 닫고, 필요한 동작 수행
    const backdrop = this.modalRoot.querySelector('.modal-backdrop');
    const closeButton = this.modalRoot.querySelector('.modal-close-button');

    // 배경 클릭 시 모달 닫기 (옵션)
    backdrop.addEventListener('click', (event) => {
      // 단, 모달 내부(.modal-content)를 클릭한 경우에는 닫지 않도록 예외처리
      if (event.target === backdrop) {
        this.close();
      }
    });

    // 닫기 버튼 클릭 시 모달 닫기
    closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  bindEvents() {
    const restartButton = this.modalRoot.querySelector('.big-button');
    const main = document.querySelector('#main');

    // 재시작 버튼 클릭 시 닫기
    restartButton.addEventListener('click', () => {
      this.close();

      try {
        const event = new CustomEvent('restart', {
          bubbles: true,
        });
        main.dispatchEvent(event);
      } catch (e) {
        alert(e.message);
      }
    });
  }

  close() {
    // 모달 루트 컨테이너를 비워 모달을 닫음
    this.modalRoot.innerHTML = '';
  }
}

export default WinningResultModal;
