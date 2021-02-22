import { $ } from '../utils/dom.js';

export default class RewardModalDisplay {
  constructor(props) {
    this.props = props;
    this.$target = $('.modal');
    this.setup();
  }

  setup() {
    ({ lottoManager: this.lottoManager } = this.props);
    this.lottoManager.subscribe(this.render.bind(this));
    // this.lottoManager.subscribe(this.displayAlert.bind(this));
  }
  onModalShow() {
    this.$target.classList.add('open');
  }

  onModalClose() {
    this.$target.classList.remove('open');
  }

  // displayAlert() {
  //   if (this.lottoManager.message) {
  //     alert(this.lottoManager.message);
  //     this.lottoManager.message = '';
  //   }
  // }

  render() {
    if (this.lottoManager.winningCount) {
      this.onModalShow();
    }
  }
}
