import { getById, querySelector } from '../../utils/DOM.js';

const OutputView = {
  show($target) {
    $target.classList.remove('hidden');
  },

  createDiv(padding, margin) {
    const $container = document.createElement('div');

    if (padding) $container.style.padding = padding;
    if (margin) $container.style.margin = margin;

    return $container;
  },

  printPurchaseLottos(lottoCount, lottos) {
    const $lottoList = querySelector('.lottoList');

    this.show($lottoList);
    const $lottoCountDescDiv = this.createDiv('1rem 0');
    const $lottoCountDescText = document.createTextNode(`총 ${lottoCount}개를 구매하였습니다.`);

    $lottoCountDescDiv.appendChild($lottoCountDescText);
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
    const $imoji = document.createElement('span');
    $imoji.textContent = '🎟️';
    $imoji.classList.add('lottoImoji');
    const $lottoText = document.createTextNode(`${lotto.join(', ')}`);

    $lottoDiv.appendChild($imoji);
    $lottoDiv.appendChild($lottoText);
    $lottoListDiv.appendChild($lottoDiv);
  },

  disablePurchase() {
    const $purchaseInput = getById('purchaseInput');
    const $purchaseButton = getById('purchaseButton');

    $purchaseInput.disabled = true;
    $purchaseButton.disabled = true;
  },
};

export default OutputView;
