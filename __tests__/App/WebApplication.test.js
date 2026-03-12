describe("웹 로또 앱 테스트", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = `
      <input id="name-input" />
      <button id="submit-btn">확인</button>
      <p id="result"></p>
    `;
  });

  test("jsdom 테스트", async () => {
    const input = document.querySelector("#name-input");
    const button = document.querySelector("#submit-btn");
    const result = document.querySelector("#reuslt");

    input.value = "철수";

    button.click();

    expect(result.textContent).toBe("안녕하세요 철수");
  });
});
