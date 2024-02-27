import '../../css/lottoNumbers.css';
import { appendChildren, makeElementWithClassName } from '../../utils';

const LottoNumbersComponents = Object.freeze({
  makeLottoResults: () => {
    const resultContainer = makeElementWithClassName('div', 'resultContainer');
    const resultTitle = makeElementWithClassName('div', 'resultTitle');
    resultTitle.innerText = `총 7개를 구매하였습니다.`;
    const resultNumbersContainer = makeElementWithClassName('div', 'resultNumbersContainer');
    appendChildren(
      resultNumbersContainer,
      Array.from({ length: 7 }, () => LottoNumbersComponents.makeOneLottoNumbers()),
    );

    appendChildren(resultContainer, [resultTitle, resultNumbersContainer]);
    return resultContainer;
  },

  makeOneLottoNumbers: () => {
    const lottoNumberDiv = makeElementWithClassName('div', 'lottoNumberDiv');
    const lottoIcon = makeElementWithClassName('div', 'lottoIcon');
    lottoIcon.innerText = `🎟️`;
    const lottoNumbers = makeElementWithClassName('div', 'lottoNumbers');
    lottoNumbers.innerText = `9, 19, 34, 37, 41, 42`;
    appendChildren(lottoNumberDiv, [lottoIcon, lottoNumbers]);
    return lottoNumberDiv;
  },
});

export default LottoNumbersComponents;
