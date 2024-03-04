export default function ModalContent() {
  const main = document.createElement('main');
  main.classList.add('modal-content');

  const closeButtonSection = document.createElement('section');
  closeButtonSection.classList.add('close-button-container');

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.setAttribute('id', 'close-button');

  const closeButtonText = document.createElement('span');
  closeButtonText.classList.add('close-button-text');
  closeButtonText.innerText = 'X';

  closeButton.appendChild(closeButtonText);
  closeButtonSection.appendChild(closeButton);

  // 당첨 통계 제목
  const statisticsTitleContainer = document.createElement('section');
  statisticsTitleContainer.classList.add('statistics-title-container');

  const h1 = document.createElement('h1');
  h1.innerText = '🏆 당첨 통계 🏆';

  statisticsTitleContainer.appendChild(h1);

  // 통계
  const statisticsContainer = document.createElement('section');

  const table = document.createElement('table');
  table.classList.add('statistics');

  table.innerHTML = `
    <thead>
      <tr>
        <th>일치 갯수</th>
        <th>당첨금</th>
        <th>당첨 갯수</th>
      </tr>
    </thead>
    <tbody id="statistics-content">
    </tbody>
  `;

  statisticsContainer.appendChild(table);

  // 이익 출력
  const profitContainer = document.createElement('section');
  profitContainer.classList.add('profit-container');

  const profitText = document.createElement('span');
  profitText.classList.add('profit');
  profitText.setAttribute('id', 'profit');

  profitContainer.appendChild(profitText);

  // 재시작 버튼
  const retryButtonContainer = document.createElement('section');
  retryButtonContainer.classList.add('retry-button-container');

  const retryButton = document.createElement('button');
  retryButton.setAttribute('id', 'retry-button');
  retryButton.classList.add('retry-button');
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
