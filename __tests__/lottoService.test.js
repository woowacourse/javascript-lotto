import { lottoService } from "../src/service/lottoService.js";

describe("lottoService", () => {
  test("전달받은 count 개수만큼 Lotto 객체를 생성한다.", () => {
    const count = 3;
    const lottos = lottoService(3);
    expect(lottos.length).toBe(3);
  });
});
