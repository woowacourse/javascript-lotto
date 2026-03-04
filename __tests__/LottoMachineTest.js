import { LottoMachine } from '../src/step1/LottoMachine';
import { pickNumberInRange } from "../src/step1/Utils";

jest.mock('../src/step1/Utils');

describe('로또 머신 테스트', () => {
    test('로또 생성 테스트', () => {
        pickNumberInRange.mockReturnValueOnce([1, 4, 5, 6, 8, 9]);

        const lottoMachine = new LottoMachine();

        expect(lottoMachine.createLotto()).toEqual([1, 4, 5, 6, 8, 9]);
    });
});
