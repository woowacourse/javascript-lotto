import Lotto from '../../src/domain/Lotto.js';
import LottoMachine from '../../src/domain/LottoMachine.js';

const AMOUNT = 8000;
const PRICE = 1000;
const LOTTO_COUNT = AMOUNT / PRICE;
const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
const DRAWING_NUMBERS = {
  winningNumbers: [1, 2, 3, 4, 5, 6],
  bonusNumber: 7,
};

const generateLotto = ({ lottoCount, lottoNumbers, drawingNumbers }) =>
  Array(lottoCount)
    .fill()
    .map(() => new Lotto(lottoNumbers).setDrawingNumbers(drawingNumbers));

describe('LottoMachine 클래스', () => {
  test('purchase : 구입 금액만큼 로또 인스턴스를 생성하여 배열로 담아 반환한다.', () => {
    const lottoList = LottoMachine.purchase(LOTTO_COUNT);

    expect(lottoList.length).toBe(LOTTO_COUNT);
  });

  test.each([
    {
      lottoCount: 1,
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      drawingNumbers: {
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
      winningPlace: 6,
    },
    {
      lottoCount: 1,
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      drawingNumbers: {
        winningNumbers: [1, 2, 3, 4, 5, 42],
        bonusNumber: 6,
      },
      winningPlace: 'BONUS',
    },
    {
      lottoCount: 1,
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      drawingNumbers: {
        winningNumbers: [1, 2, 3, 4, 5, 32],
        bonusNumber: 44,
      },
      winningPlace: 5,
    },
  ])(
    'draw : 로또 번호와 당첨 번호, 보너스 번호를 받아 비교하여 당첨 결과를 반환한다.',
    ({ lottoCount, lottoNumbers, drawingNumbers, winningPlace }) => {
      const [lotto] = generateLotto({ lottoCount, lottoNumbers, drawingNumbers });

      const result = LottoMachine.draw(lotto);

      expect(result).toBe(winningPlace);
    }
  );

  test('calculateStatistics : 로또 리스트를 받아 당첨 통계를 계산한다.', () => {
    const lottoList = generateLotto({
      lottoCount: LOTTO_COUNT,
      lottoNumbers: LOTTO_NUMBERS,
      drawingNumbers: DRAWING_NUMBERS,
    });

    const statistics = LottoMachine.calculateStatistics(lottoList);

    expect(statistics).toEqual({
      6: 8,
    });
  });

  test('calculateEarningRate : 로또 리스트를 받아 총 수익률을 계산한다.', () => {
    const lottoList = generateLotto({
      lottoCount: LOTTO_COUNT,
      lottoNumbers: LOTTO_NUMBERS,
      drawingNumbers: DRAWING_NUMBERS,
    });

    const earningRate = LottoMachine.calculateEarningRate(lottoList);

    expect(earningRate).toBe((200_000_000).toFixed(1));
  });
});
