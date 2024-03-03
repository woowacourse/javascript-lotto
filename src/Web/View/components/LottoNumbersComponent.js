import '../../css/lottoNumbers.css';
import { appendChildren, makeElementWithClassName } from '../../utils';

const LottoNumbersComponent = Object.freeze({
  makeLottoResults: (boughtLottos) => {
    const resultContainer = makeElementWithClassName('div', 'resultContainer');
    const resultNumbersContainer = LottoNumbersComponent.makeResultNumbersContainer(boughtLottos);
    appendChildren(resultContainer, [
      LottoNumbersComponent.makeResultTitle(boughtLottos.length),
      resultNumbersContainer,
    ]);
    return resultContainer;
  },

  makeResultNumbersContainer: (boughtLottos) => {
    const resultNumbersContainer = makeElementWithClassName('div', 'resultNumbersContainer');
    appendChildren(
      resultNumbersContainer,
      boughtLottos.map((lotto) => LottoNumbersComponent.makeOneLottoNumbers(lotto.getLottoNumbers())),
    );
    return resultNumbersContainer;
  },

  makeResultTitle: (count) => {
    const resultTitle = makeElementWithClassName('div', 'resultTitle');
    resultTitle.innerText = `총 ${count}개를 구매하였습니다.`;
    return resultTitle;
  },

  makeOneLottoNumbers: (numbers) => {
    const lottoNumberDiv = makeElementWithClassName('div', 'lottoNumberDiv');
    const lottoIcon = makeElementWithClassName('div', 'lottoIcon');
    lottoIcon.innerText = `🎟️`;
    const lottoNumbers = makeElementWithClassName('div', 'lottoNumbers');
    lottoNumbers.innerHTML = `<div>${numbers.join(', </div><div>')}</div>`;
    appendChildren(lottoNumberDiv, [lottoIcon, lottoNumbers]);
    return lottoNumberDiv;
  },
});

export default LottoNumbersComponent;
