import { LottoMachine } from '../src/step1/LottoMachine';
import { pickNumberInRange } from "../src/step1/Utils";

jest.mock('../src/step1/Utils');

describe('로또 머신 테스트', () => {
    test('로또 생성 테스트', () => {
        pickNumberInRange.mockReturnValueOnce([1, 4, 5, 6, 8, 9]);

        const lottoMachine = new LottoMachine();

        expect(lottoMachine.createLotto()).toEqual([1, 4, 5, 6, 8, 9]);
    });

    test('로또 생성 개수 테스트', () =>{
        let lottoMachine = new LottoMachine(1000);
        
        expect(lottoMachine.purchaseCount).toBe(1);

        lottoMachine = new LottoMachine(5000)
        expect(lottoMachine.purchaseCount).toBe(5);

        lottoMachine = new LottoMachine(7000)
        expect(lottoMachine.purchaseCount).toBe(7);
    });

    test('구입 개수 만큼 로또 생성 테스트', () =>{
        pickNumberInRange
        .mockReturnValueOnce([1, 4, 5, 6, 8, 9])
        .mockReturnValueOnce([3, 17, 19, 21, 23, 31])
        .mockReturnValueOnce([35, 37, 39, 41, 42, 45]);
        const lottoMachine = new LottoMachine(3000);
        
        expect(lottoMachine.getLotto()).toEqual(
            [
                [1, 4, 5, 6, 8, 9],
                [3, 17, 19, 21, 23, 31],
                [35, 37, 39, 41, 42, 45],
            ]
        );
    });
});
