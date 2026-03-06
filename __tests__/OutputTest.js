import { LottoMachine } from '../src/step1/LottoMachine'
import { Output } from '../src/step1/Output'
import { pickNumberInRange } from '../src/step1/Utils.js';

const logSpy = jest.spyOn(console, 'log');
jest.mock('../src/step1/Utils.js', () => ({
    readLine: jest.fn(),
    read: { close: jest.fn() },
    pickNumberInRange: jest.fn(),
}));

describe('출력 테스트', () =>{
    beforeEach(() => {
        pickNumberInRange.mockReturnValue([1, 2, 3, 4, 5, 6]);
    });

    test('구입한 로또 개수 출력 테스트', ()=>{
        const lottoMachine = new LottoMachine(8000);

        Output.printPurchaseLottoCount(lottoMachine.purchaseCount);

        expect(logSpy).toHaveBeenCalledWith('\n8개를 구매했습니다.\n');
    });

    test('로또 번호 출력 테스트',() =>{
        pickNumberInRange
        .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
        .mockReturnValueOnce([15, 11, 13, 12, 14, 10])
        .mockReturnValueOnce([6, 5, 4, 3, 2, 1])
        .mockReturnValueOnce([44, 43, 33, 32, 45, 30])
        .mockReturnValueOnce([20, 25, 30, 10, 15, 40]);

        const lottoMachine = new LottoMachine(5000);

        Output.printLottos(lottoMachine.lottos);

        expect(logSpy).toHaveBeenCalledWith('[1, 2, 3, 4, 5, 6]')
        expect(logSpy).toHaveBeenCalledWith('[10, 11, 12, 13, 14, 15]')
        expect(logSpy).toHaveBeenCalledWith('[1, 2, 3, 4, 5, 6]')
        expect(logSpy).toHaveBeenCalledWith('[30, 32, 33, 43, 44, 45]')
        expect(logSpy).toHaveBeenCalledWith('[10, 15, 20, 25, 30, 40]')
    });

    test('최종 결과 출력 테스트', ()=>{
        const lottoMachine = new LottoMachine(5000);
        lottoMachine.matchResult = new Map([
            [1, 6],
            [2, 10],
            [3, 3],
            [4, 4],
            [5, 5],
        ]);

        Output.printResult(lottoMachine);

        expect(logSpy).toHaveBeenCalledWith('3개 일치 (5,000원) - 5개');
        expect(logSpy).toHaveBeenCalledWith('4개 일치 (50,000원) - 4개');
        expect(logSpy).toHaveBeenCalledWith('5개 일치 (1,500,000원) - 3개');
        expect(logSpy).toHaveBeenCalledWith('5개 일치, 보너스 볼 일치 (30,000,000원) - 10개');
        expect(logSpy).toHaveBeenCalledWith('6개 일치 (2,000,000,000원) - 6개');
    });
});
