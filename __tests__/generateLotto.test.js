import LOTTO from '../src/constant/lotto.js';

import { generateLotto } from '../src/LottoStore.js';



test(`1~45 사이의 ${LOTTO.LENGTH}개의 숫자로 이루어진 로또를 생성한다.`, () => {
  const lotto = generateLotto();

  expect(lotto.length).toBe(LOTTO.LENGTH);
})