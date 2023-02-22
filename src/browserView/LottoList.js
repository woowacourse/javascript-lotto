import { QuerySelector, Tag } from '../constants/HTML';
import { $, makeNode } from '../utils/DomUtils';
import Convertor from '../utils/Convertor';

class LottoList {
  constructor() {
    this.lottoListField = $(QuerySelector.LOTTO_LIST_FIELD);
  }

  create = (purchaseCount, lottos) => {
    console.log(purchaseCount, lottos);
    this.purchaseMessageEl = makeNode(Tag.DIV);
    this.purchaseMessageEl.className = QuerySelector.PURCHASE_MESSAGE;
    this.purchaseMessageEl.innerText = Convertor.purchaseCount(purchaseCount);

    this.lottoListEl = makeNode(Tag.UL);
    this.lottoListEl.className = QuerySelector.LOTTO_LIST;

    lottos.forEach((lotto) => {
      const lottoEl = makeNode(Tag.LI);
      lottoEl.className = QuerySelector.LOTTO;
      lottoEl.innerText = Convertor.lottoWithIcon(lotto);
      this.lottoListEl.appendChild(lottoEl);
    });
  };

  render = () => {
    this.lottoListField.innerText = '';

    this.lottoListField.appendChild(this.purchaseMessageEl);
    this.lottoListField.appendChild(this.lottoListEl);

    $('.content').classList.add('height_auto');
  };
}

export default LottoList;
