import { createTag, getById, querySelector } from '../../utils/DOM.js';

const OutputView = {
  show($target) {
    $target.classList.remove('hidden');
  },

  disable(className) {
    const $target = getById(className);
    $target.disabled = true;
  },

  createDiv(padding, margin) {
    const $container = createTag('div');

    if (padding) $container.style.padding = padding;
    if (margin) $container.style.margin = margin;

    return $container;
  },

  printPurchaseLottos(lottoCount, lottos) {
    const $lottoList = querySelector('.lottoList');

    this.show($lottoList);
    const $lottoCountDescDiv = this.createDiv('1rem 0');
    $lottoCountDescDiv.textContent = `총 ${lottoCount}개를 구매하였습니다.`;
    $lottoList.appendChild($lottoCountDescDiv);

    this.printLottos(lottos, $lottoList);
    this.disablePurchase();
  },

  printLottos(lottos, $target) {
    const $lottoListDiv = this.createDiv('0.5rem 0');
    $lottoListDiv.classList.add('lottoContainer');

    lottos.forEach((lotto) => {
      this.makeLotto($lottoListDiv, lotto.numbers);
    });

    $target.appendChild($lottoListDiv);
  },

  makeLotto($lottoListDiv, lotto) {
    const $lottoDiv = this.createDiv();
    $lottoDiv.classList.add('lottoItem');

    const $imoji = createTag('span');
    $imoji.textContent = '🎟️';
    $imoji.classList.add('lottoImoji');

    const $lottoText = document.createTextNode(`${lotto.join(', ')}`);

    $lottoDiv.appendChild($imoji);
    $lottoDiv.appendChild($lottoText);
    $lottoListDiv.appendChild($lottoDiv);
  },

  disablePurchase() {
    this.disable('purchaseInput');
    this.disable('purchaseButton');
  },
};

export default OutputView;
