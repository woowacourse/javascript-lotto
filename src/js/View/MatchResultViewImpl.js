import MatchResultView from '../EventListener/MatchResultView.js';
import WinningNumberValue from './WinningNumberValue.js';
import { $, $$ } from '../utils/index.js';
import { MATCH_COUNT_OF_LOTTO_RANKING } from '../constant/index.js';

export default class MatchResultViewImpl extends MatchResultView {
  constructor() {
    super(new WinningNumberValue());
    this.$lottoMatchArea = $('#lotto-match-area');
    this.$modal = $('#match-modal');
    this.$winningLottoCounts = $$('.winning-lotto-count');
  }

  render({ matchResult, rateOfReturn }) {
    this.renderMatchTable(matchResult);
    this.$modal.querySelector('.rate-of-return').innerText = rateOfReturn;
  }

  renderMatchTable(matchResult) {
    this.$winningLottoCounts[0].innerText = matchResult[MATCH_COUNT_OF_LOTTO_RANKING.FIFHT];
    this.$winningLottoCounts[1].innerText = matchResult[MATCH_COUNT_OF_LOTTO_RANKING.FORUTH];
    this.$winningLottoCounts[2].innerText = matchResult[MATCH_COUNT_OF_LOTTO_RANKING.THRID];
    this.$winningLottoCounts[3].innerText = matchResult[MATCH_COUNT_OF_LOTTO_RANKING.SECOND];
    this.$winningLottoCounts[4].innerText = matchResult[MATCH_COUNT_OF_LOTTO_RANKING.FIRST];
  }

  moveTabToEmptyInput() {
    this.inputInstance.focusEmptyInput();
  }

  show() {
    this.$lottoMatchArea.classList.add('show');
  }

  hide() {
    this.$lottoMatchArea.classList.remove('show');
  }

  onModal() {
    this.$modal.classList.remove('hide');
    setTimeout(() => {
      this.$modal.classList.add('on');
    }, 0);
  }

  offModal() {
    this.$modal.classList.remove('on');
    setTimeout(() => {
      this.$modal.classList.add('hide');
    }, 4000);
  }
}
