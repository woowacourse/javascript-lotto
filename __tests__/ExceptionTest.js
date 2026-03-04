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
    test('1 ~ 45가 아닌 입력 예외 테스트', async () => {
        const expectedAnswer = ['1000', '1,2,3,5,6,46', '1,2,3,4,5,6'];
        expectedAnswer.forEach((answer) => {
            readLine.mockImplementationOnce(() => {
                return answer;
            });
        });

        const app = new App();
        await app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 1 ~ 45 이내 숫자만 입력 가능합니다.');
    });

    test('겹치는 당첨 번호 입력 예외 테스트', async () => {
        const expectedAnswer = ['1000', '1,1,2,3,4,5', '1,2,3,4,5,6'];
        expectedAnswer.forEach((answer) => {
            readLine.mockImplementationOnce(() => {
                return answer;
            });
        });

        const app = new App();
        await app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 중복 당첨 번호 입력은 불가 합니다.');
    });

    test('정수가 아닌 당첨 번호 입력 예외 테스트', async () => {
        const expectedAnswer = ['1000', 'a,1,2,3,4,5', '1,2,3,4,5,6'];
        expectedAnswer.forEach((answer) => {
            readLine.mockImplementationOnce(() => {
                return answer;
            });
        });

        const app = new App();
        await app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 당첨 번호는 숫자만 입력 가능합니다.');
    });
});

describe('보너스 번호 입력 예외 테스트', () => {
    test('1 ~ 45가 아닌 보너스 번호 입력 예외 테스트', async () => {
        const expectedAnswer = ['1000', '1,2,3,4,5,6', '46', '10'];
        expectedAnswer.forEach((answer) => {
            readLine.mockImplementationOnce(() => {
                return answer;
            });
        });

        const app = new App();
        await app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 보너스 번호는 1 ~ 45 이내 숫자여야 합니다.');
    });

    test('당첨 번호와 동일한 입력 예외 테스트', async () => {
        const expectedAnswer = ['1000', '1,2,3,4,5,6', '3', '41'];
        expectedAnswer.forEach((answer) => {
            readLine.mockImplementationOnce(() => {
                return answer;
            });
        });

        const app = new App();
        await app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
    });

    test('정수가 아닌 보너스 번호 입력 예외 테스트', async () => {
        const expectedAnswer = ['1000', 'a,1,2,3,4,5', '1,2,3,4,5,6', 'z', '21'];
        expectedAnswer.forEach((answer) => {
            readLine.mockImplementationOnce(() => {
                return answer;
            });
        });

        const app = new App();
        await app.run();

        expect(logSpy).toHaveBeenCalledWith('[ERROR] 보너스 번호는 숫자여야 합니다.');
    });
});
