import { readLine } from '../src/step1/Utils.js';
import App from '../src/step1/App.js';

jest.mock('../src/step1/Utils.js', () => ({
    readLine: jest.fn(),
    read: { close: jest.fn() },
}));
const logSpy = jest.spyOn(console, 'log');

describe('구입 금액 입력예외 테스트', () => {
    test('1000원 단위가 아닌 입력예외 테스트', async () => {
        const expectedAnswer = ['600', '1000'];
        expectedAnswer.forEach((answer) => {
            readLine.mockImplementationOnce(() => {
                return answer;
            });
        });

        const app = new App();
        await app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 1000원 단위만 입력 가능합니다.');
    });

    test('정수가 아닌 입력 예외 테스트', async () => {
        const expectedAnswer = ['ㅁ', '1000'];
        expectedAnswer.forEach((answer) => {
            readLine.mockImplementationOnce(() => {
                return answer;
            });
        });
        const app = new App();
        await app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 숫자만 입력해 주세요.');
    });
});

describe('당첨 번호 입력 예외 테스트', () =>{
    test('1 ~ 45가 아닌 입력 예외 테스트', async () =>{
        const expectedAnswer = ['1000' , '1,1,2,3,4,5', '1,2,3,4,5,6'];
        expectedAnswer.forEach((answer) => {
            readLine.mockImplementationOnce(() => {
                return answer;
            });
        });

        const app = new App();
        await app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 같은 숫자는 입력이 불가능 합니다.');
    });
})

