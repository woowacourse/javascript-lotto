import { divideByUnit } from "../src/utils/count.js";
import Lotto from "../src/domain/Lotto.js";
import { PRICE } from "../src/constants/price.js";
import Ticket from "../src/domain/Ticket.js";

test("입력받은 금액에 해당하는 개수를 구한다.", () => {
  // given
  const money = 1000;

  // when
  const result = divideByUnit(money, PRICE.UNIT);

  // then
  expect(result).toBe(1);
});

test("정해진 개수만큼 로또를 생성한다.", () => {
  // given
  const lottoCount = 3;

  // when
  const lottos = Ticket.createLottos(lottoCount);

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

test("로또 번호중에 중복된 숫자가 있으면 로또 객체가 생성이 되지 않는다.", () => {
  //given
  const lottoNumber = [1, 2, 3, 3, 4, 5];
  //when //then
  expect(() => {
    new Lotto(lottoNumber);
  }).toThrow("[ERROR]");
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

test("로또 번호에 보너스 번호가 포함되는지 확인한다.", () => {
  const lottoNumbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(lottoNumbers);
  const bonusNumber = 3;

  expect(lotto.hasBonusNumber(bonusNumber)).toBeTruthy();
});
