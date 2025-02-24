import LottoManager from '../src/Domain/Model/LottoManager.js';
import WinningLotto from '../src/Domain/Model/WinningLotto.js';

const fixedLottoNumbers = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 7],
  [1, 2, 3, 4, 5, 8],
  [1, 2, 3, 4, 8, 9],
  [1, 2, 3, 8, 9, 10],
];
let index = 0;
const fixedNumberGenerator = () =>
  fixedLottoNumbers[index++ % fixedLottoNumbers.length];

test('로또 장수에 따라 여러 장 발행한다.', () => {
  const lottoManager = new LottoManager();
  const lottoCount = 5;
  lottoManager.makeLottoList(lottoCount, fixedNumberGenerator);
  expect(lottoManager.getLottoList().length).toBe(lottoCount);
});

test('당첨 내역을 반환한다.', () => {
  const lottoManager = new LottoManager();
  const lottoCount = fixedLottoNumbers.length;
  lottoManager.makeLottoList(lottoCount, fixedNumberGenerator);

  const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
  const result = lottoManager.compareWinningLotto(winningLotto);

  expect(result).toEqual({
    FIRST_PRIZE: 1,
    SECOND_PRIZE: 1,
    THIRD_PRIZE: 1,
    FOURTH_PRIZE: 1,
    FIFTH_PRIZE: 1,
    NONE: 0,
  });
});
