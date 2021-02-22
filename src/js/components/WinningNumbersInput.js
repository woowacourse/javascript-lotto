import LottoManager from '../model/LottoManager.js';
import { $, $$ } from '../utils/dom.js';

export default class WinningNumbersInput {
  constructor(props) {
    this.props = props;
    this.$target = $('#lotto-winning-number-input-container');
    this.winningNumbers = [];
    this.bonusNumber = [];
    this.setup();
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.openResultModalButton = $('.open-result-modal-button');
    this.winningNumbersInput = $$('.winning-number');
    this.bonusNumberInput = $('.bonus-number');
  }

  setup() {
    ({ lottoManager: this.lottoManager } = this.props);
    this.lottoManager.subscribe(this.render.bind(this));
  }

  onClickButton() {
    const winningNumberTemp = [];
    const bonusNumber = Number(this.bonusNumberInput.value);
    this.winningNumbersInput.forEach(input => {
      const number = Number(input.value);
      winningNumberTemp.push(number);
    });

    const errorMessage = LottoManager.isValidLottoNumbers2(
      winningNumberTemp,
      bonusNumber,
    );
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    this.setState({
      winningNumbers: winningNumberTemp,
      bonusNumber,
    });
    this.lottoManager.decideWinners(this.winningNumbers, this.bonusNumber);
  }

  bindEvent() {
    this.openResultModalButton.addEventListener(
      'click',
      this.onClickButton.bind(this),
    );
  }

  setState({ winningNumbers, bonusNumber }) {
    this.winningNumbers = winningNumbers ?? this.winningNumbers;
    this.bonusNumber = bonusNumber ?? this.bonusNumber;
  }

  render() {
    // d-none 풀기
    this.$target.classList.remove('d-none');
  }
}
