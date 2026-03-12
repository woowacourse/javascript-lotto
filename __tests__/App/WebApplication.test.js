import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "../../index.html"));

describe("웹 로또 앱 테스트", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  test("jsdom 테스트", async () => {
    const logo = document.querySelector(".logo");
    expect(logo.textContent.trim()).toBe("🎱 행운의 로또");
  });
});
