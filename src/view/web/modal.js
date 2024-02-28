import { $ } from './utils/dom';

export default function modal(element) {
  const handleCloseBtn = (event) => {
    event.preventDefault();
    $('#modal-container').style.visibility = 'hidden';
  };

  const handleRetryBtn = (event) => {
    event.preventDefault();
    $('#buy-lotto-form').reset();
    $('#winning-lotto-form').reset();
    $('#step2').style.visibility = 'hidden';
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
            </tbody>
          </table>
        </section>
        
        <section id="profit-container">
          <span id="profit"></span>
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
