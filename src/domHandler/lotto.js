import { convertVisibilityToHidden, convertVisibilityToVisible } from './utils';

const $nextStepAfterBuyingLotto = document.querySelector('#next_step_buying_lotto');

const $lottoCount = document.querySelector('.lotto_count');
const $lottoList = document.querySelector('.lotto_list_box');

const lotto = {
  overwriteLottoCount(budget) {
    $lottoCount.innerText = `총 ${budget / 1000}개를 구매하였습니다.`;
  },

  overwriteBoughtLottos(lottos) {
    $lottoList.innerHTML = lottos.reduce((HTML, lotto) => {
      return (HTML += `
                    <div class='lotto'>
                      <div>🎟️</div>
                      <span>${lotto.join(', ')}</span>
                    </div>`);
    }, '');
  },

  nextStepAfterBuyingLottoToVisible() {
    convertVisibilityToVisible($nextStepAfterBuyingLotto);
  },

  nextStepAfterBuyingLottoToHidden() {
    convertVisibilityToHidden($nextStepAfterBuyingLotto);
  },
};

export default lotto;
