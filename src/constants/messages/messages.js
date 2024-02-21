import { SYMBOLS } from '../symbols.js';

export const INPUT_MESSAGE = Object.freeze({
  buyLottoPrice: '> 구입금액을 입력해 주세요. ',
});

export const FORMAT_MESSAGE = Object.freeze({
  lottoCountToString(lottoCount) {
    return `${lottoCount}개를 구매했습니다.`;
  },

  lottoNumbersToString(lottoNumbers) {
    return lottoNumbers
      .map((lottoNumber) => `[${lottoNumber.join(`${SYMBOLS.comma} `)}]`)
      .join('\n');
  },
});
