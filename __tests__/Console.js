import console from "../src/utils/console.js";

const mockQuestion = (input) => {
  console.readLineAsync = jest.fn();
  console.readLineAsync.mockImplementation(() => {
    return Promise.resolve(input);
  });
};

describe("프롬프트 입력 받기", () => {
  test("입력받은 값을 담아 promose 객체로 return 한다", async () => {
    mockQuestion("1000");
    return expect(console.readLineAsync("입력 얀내 문구")).resolves.toBe(
      "1000"
    );
  });
});
