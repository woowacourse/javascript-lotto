import Component from './Component';

class WinningLottoInput extends Component {
  template() {
    return `    
        <form class="winning-lotto-form">
            <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
            <section>
                <section>
                    <label>당첨 번호</label>
                    <input class="winning-number" type="text"></input>
                    <input class="winning-number" type="text"></input>
                    <input class="winning-number" type="text"></input>
                    <input class="winning-number" type="text"></input>
                    <input class="winning-number" type="text"></input>
                    <input class="winning-number" type="text"></input>
                </section>
                <section>
                    <label>보너스 번호</label>
                    <input class="bonus-number" type="text"></input>
                </section>
                <input id="winning-lotto-btn" type="submit" value="결과 확인하기"></input>
            </section>
        </form>
    `;
  }

  setEvent() {
    this.$target
      .querySelector('.winning-lotto-form')
      .addEventListener('submit', (event) => this.onFormSubmit(event));
  }

  onFormSubmit(event) {
    event.preventDefault();
    const winningNumbers = [...this.$target.querySelectorAll('.winning-number')].map(
      (el) => el.value,
    );
    const bonusNumber = this.$target.querySelector('.bonus-number').value;
    this.props.makeWinningLotto(winningNumbers, bonusNumber);
  }
}

export default WinningLottoInput;
