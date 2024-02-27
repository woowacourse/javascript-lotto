import '../../css/lottoNumbers.css';
import { appendChildren, makeElementWithClassName } from '../../utils';

const LottoNumbersComponent = Object.freeze({
  makeLottoResults: (boughtLottos) => {
    const resultContainer = makeElementWithClassName('div', 'resultContainer');
    const resultTitle = makeElementWithClassName('div', 'resultTitle');
    resultTitle.innerText = `총 ${boughtLottos.length}개를 구매하였습니다.`;
    const resultNumbersContainer = makeElementWithClassName('div', 'resultNumbersContainer');
    appendChildren(
      resultNumbersContainer,
      boughtLottos.map((lotto) => LottoNumbersComponent.makeOneLottoNumbers(lotto.getLottoNumbers())),
    );

    appendChildren(resultContainer, [resultTitle, resultNumbersContainer]);
    return resultContainer;
  },

  makeOneLottoNumbers: (numbers) => {
    const lottoNumberDiv = makeElementWithClassName('div', 'lottoNumberDiv');
    const lottoIcon = makeElementWithClassName('div', 'lottoIcon');
    lottoIcon.innerText = `🎟️`;
    const lottoNumbers = makeElementWithClassName('div', 'lottoNumbers');
    lottoNumbers.innerText = numbers.join(',');
    appendChildren(lottoNumberDiv, [lottoIcon, lottoNumbers]);
    return lottoNumberDiv;
  },
});

export default LottoNumbersComponent;
