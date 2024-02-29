export default function ModalContent() {
  const main = document.createElement('main');
  // 닫기 버튼
  const closeButtonSection = document.createElement('section');
  closeButtonSection.setAttribute('id', 'close-btn-container');

  const closeButton = document.createElement('button');
  closeButton.setAttribute('id', 'close-btn');

  const closeBtnText = document.createElement('span');
  closeBtnText.setAttribute('id', 'close-btn-text');
  closeBtnText.innerText = 'X';

  closeButton.appendChild(closeBtnText);
  closeButtonSection.appendChild(closeButton);

  // 당첨 통계 제목
  const statisticsTitleContainer = document.createElement('section');
  statisticsTitleContainer.setAttribute('id', 'statistics-title-container');

  const h1 = document.createElement('h1');
  h1.innerText = '🏆 당첨 통계 🏆';

  statisticsTitleContainer.appendChild(h1);

  // 통계
  const statisticsContainer = document.createElement('section');
  statisticsContainer.setAttribute('id', 'statistics-container');

  const table = document.createElement('table');
  table.setAttribute('id', 'statistics');

  table.innerHTML = `
    <thead>
      <tr>
        <th>일치 갯수</th>
        <th>당첨금</th>
        <th>당첨 갯수</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  statisticsContainer.appendChild(table);

  // 이익 출력
  const profitContainer = document.createElement('section');
  profitContainer.setAttribute('id', 'profit-container');

  const profitText = document.createElement('span');
  profitText.setAttribute('id', 'profit');

  profitContainer.appendChild(profitText);

  // 재시작 버튼
  const retryButtonContainer = document.createElement('section');
  retryButtonContainer.setAttribute('id', 'retry-btn-container');

  const retryButton = document.createElement('button');
  retryButton.setAttribute('id', 'retry-btn');
  retryButton.innerText = '다시 시작하기';

  retryButtonContainer.appendChild(retryButton);

  // 합치기
  main.appendChild(closeButtonSection);
  main.appendChild(statisticsTitleContainer);
  main.appendChild(statisticsContainer);
  main.appendChild(profitContainer);
  main.appendChild(retryButtonContainer);

  return main;
}
