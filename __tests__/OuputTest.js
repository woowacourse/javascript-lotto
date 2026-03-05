import { LottoMachine } from '../src/step1/LottoMachine'
import { Output } from '../src/step1/Output'

const logSpy = jest.spyOn(console, 'log');

describe('출력 테스트', () =>{
    test('로또 번호 출력 테스트',() =>{

        const lottoMachine = new LottoMachine(5000);

        jest
        .spyOn(lottoMachine, 'createLotto')
        .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
        .mockReturnValueOnce([15, 11, 13, 12, 14, 10])
        .mockReturnValueOnce([6, 5, 4, 3, 2, 1])
        .mockReturnValueOnce([44, 43, 33, 32, 45, 30])
        .mockReturnValueOnce([20, 25, 30, 10, 15, 40]);

        Output.printLottos(lottoMachine.getLotto());
        
        expect(logSpy).toHaveBeenCalledWith('[1, 2, 3, 4, 5, 6]')
        expect(logSpy).toHaveBeenCalledWith('[10, 11, 12, 13, 14, 15]')
        expect(logSpy).toHaveBeenCalledWith('[1, 2, 3, 4, 5, 6]')
        expect(logSpy).toHaveBeenCalledWith('[30, 32, 33, 43, 44, 45]')
        expect(logSpy).toHaveBeenCalledWith('[10, 15, 20, 25, 30, 40]')
    });
});
