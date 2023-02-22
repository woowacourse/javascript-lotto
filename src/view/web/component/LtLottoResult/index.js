import LottoResult from '../../../../domain/LottoResult';
import Reward from '../../../../domain/reward/Reward';
import LtComponent from '../LtComponent';
import LtTypography from '../LtTypography';
import template from './index.html';

class LtLottoResult extends LtComponent {
  /** @type {HTMLTableSectionElement} */
  $lottoResultRewards;

  /** @type {LtTypography} */
  $lottoResultProfitRate;

  /** @type {HTMLTemplateElement} */
  $lottoResultRewardTemplate;

  /** @type {LottoResult | null} */
  #lottoResult = null;

  /** @type {Reward[]} */
  #rewards = [];

  get lottoResult() {
    return this.#lottoResult;
  }

  set lottoResult(lottoResult) {
    this.#lottoResult = lottoResult;
    this.render();
  }

  get rewards() {
    return this.#rewards;
  }

  set rewards(rewards) {
    this.#rewards = rewards;
    this.render();
  }

  getRenderContent() {
    return template;
  }

  render() {
    super.render();

    if (!this.#lottoResult) return;

    this.$lottoResultRewards.innerHTML = '';
    this.$lottoResultRewards.append(
      ...this.#lottoResult.getRewards().map((reward) => {
        const $lottoResultReward = this.$lottoResultRewardTemplate.content.cloneNode(true);
        const count = this.#rewards.filter((_reward) => _reward === reward).length;

        [
          [reward.getMatchCount(), '.match-count'],
          [reward.getMoney().toLocaleString(), '.reward-money'],
          [count, '.count'],
        ].forEach(([content, targetId]) => {
          console.log($lottoResultReward.querySelector(targetId));
          $lottoResultReward.querySelector(targetId).innerText = content;
        });
        return $lottoResultReward;
      }),
    );
  }
}

export default LtLottoResult;
