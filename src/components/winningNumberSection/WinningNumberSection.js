import Component from '../Component';

class WinningNumberSection extends Component {
  render() {
    this.innerHTML = `
        <div>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
        <form id="lottoNumberForm">
          <div id="winningNumberWrapper">
            <div>당첨번호</div>
            <input class="winningNumberInput" type="number" />
            <input class="winningNumberInput" type="number" />
            <input class="winningNumberInput" type="number" />
            <input class="winningNumberInput" type="number" />
            <input class="winningNumberInput" type="number" />
            <input class="winningNumberInput" type="number" />
            <div id="lottoNumberError" class="hidden"></div>
          </div>
          <div id="bonusNumberWrapper">
            <div>보너스 번호</div>
            <input id="bonusNumberInput" />
          </div>
        </form>
        <button id="lottoResultButton" class="button">결과 확인하기</button>`;
  }
}

customElements.define('winning-number-section', WinningNumberSection);
