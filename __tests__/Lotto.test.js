import { PRICE_NUM } from "../src/constants/lotto.js";
import { count } from "../src/utils/count.js";
import { createLotto } from "../src/domain/createLotto.js";
import Lotto from "../src/domain/Lotto.js";

// TODO : 추후 다른 폴더로 변경 예정
test("입력받은 금액에 해당하는 개수를 구한다.", () => {
  // given
  const money = 1000;

  // when
  const result = count(money, PRICE_NUM);

  // then
  expect(result).toBe(1);
});

//TODO : 추후 다른 폴더나 class로 변경 예정
test("정해진 개수만큼 로또를 생성한다.", () => {
  // given
  const lottoCount = 3;

  // when
  const lottos = createLotto(lottoCount);

  // then
  expect(lottos.length).toBe(lottoCount);
});

test("로또 번호를 가질 수 있다.", () => {
  // given
  const lottoNumbers = [1, 2, 3, 4, 5, 6];

  // when
  const lotto = new Lotto(lottoNumbers);

  // then
  expect(lotto.getLottoNumbers()).toEqual(lottoNumbers);
});

test("로또 번호는 오름차순으로 정렬된다", () => {
  // given
  const lottoNumbers = [4, 5, 6, 3, 2, 1];

  // when
  const lotto = new Lotto(lottoNumbers);

  // then
  expect(lotto.getLottoNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
});

test("하나의 로또 티켓 번호와 내가 입력한 로또 번호간의 공통된 번호 개수를 구한다.", () => {
  const lottoNumbers = [1, 2, 3, 4, 5, 6];
  const givenLottoNumber = [2, 3, 4, 5, 6, 7];

  const lotto = new Lotto(lottoNumbers);

  expect(lotto.getSameNumbers(givenLottoNumber)).toBe(5);
});
