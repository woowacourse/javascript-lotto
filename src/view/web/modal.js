import content from './content';
import { $ } from './utils/dom';

export default function modal(element) {
  const handleCloseBtn = (event) => {
    event.preventDefault();
    $('#modal-container').style.visibility = 'hidden';
  };

  const handleRetryBtn = (event) => {
    event.preventDefault();
    content(document.querySelector('article'));
    $('#modal-container').style.visibility = 'hidden';
  };

  const render = (element) => {
    element.innerHTML = `
      <main>
        <section id="close-btn-container"><button id="close-btn"><span id="close-btn-text">X</span></button></section>
        
        <section id="statistics-title-container"><h1>🏆 당첨 통계 🏆</h1></section>
        
        <section id="statistics-container">
          <table id="statistics">
            <thead>
              <tr>
                <th>일치 갯수</th>
                <th>당첨금</th>
                <th>당첨 갯수</th>
              </tr>
            </thead>
            <tbody>
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
                <td>5개 + 보너스볼</td>
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
        </section>
        
        <section id="profit-container">
          <span id="profit">당신의 총 수익률은 %입니다.</span>
        </section>

        <section id="retry-btn-container">
          <button id="retry-btn">다시 시작하기</button>
        </section>
      </main>
    `;
  };

  render(element);
  $('#close-btn').addEventListener('click', handleCloseBtn);
  $('#retry-btn').addEventListener('click', handleRetryBtn);
}
