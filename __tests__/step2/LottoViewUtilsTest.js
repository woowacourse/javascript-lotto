import { createResultTableRowsHTML, createTicketsHTML, findRankCount, getWinningFocusTarget, getWinningFormValues, normalizeWinningInputValue } from "../../src/step2/js/views/LottoViewUtils.js";

describe("LottoViewUtils", () => {
  test.each([
    ["a046", "4"],
    ["99", "45"],
    ["0", ""],
    ["", ""],
    ["1", "1"],
    ["45", "45"],
    ["46", "45"],
  ])("당첨 번호 입력값 %p를 %p로 정제한다.", (input, expected) => {
    expect(normalizeWinningInputValue(input)).toBe(expected);
  });

  test("당첨 번호 입력값에서 마지막 번호를 보너스 번호로 분리한다.", () => {
    const winningNumberInputs = [{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }, { value: "5" }, { value: "6" }];
    const bonusInput = { value: "7" };

    expect(getWinningFormValues(winningNumberInputs, bonusInput)).toEqual({
      winningNumbers: ["1", "2", "3", "4", "5", "6"],
      bonusNumber: "7",
    });
  });

  test("비어 있는 첫 번째 입력칸을 포커스 대상으로 찾는다.", () => {
    const winningInputs = [{ value: "1" }, { value: "2" }, { value: "" }, { value: "4" }];

    expect(getWinningFocusTarget(winningInputs)).toBe(winningInputs[2]);
  });

  test("모든 입력칸이 채워져 있으면 마지막 입력칸을 포커스 대상으로 찾는다.", () => {
    const winningInputs = [{ value: "1" }, { value: "2" }, { value: "3" }];

    expect(getWinningFocusTarget(winningInputs)).toBe(winningInputs[2]);
  });

  test("결과 데이터에서 등수별 당첨 개수를 찾는다.", () => {
    const resultData = [
      { matchCount: 3, requireBonus: false, count: 1 },
      { matchCount: 5, requireBonus: true, count: 2 },
    ];

    expect(findRankCount(resultData, 3, false)).toBe(1);
    expect(findRankCount(resultData, 5, true)).toBe(2);
    expect(findRankCount(resultData, 6, false)).toBe(0);
  });

  test("로또 티켓 배열을 결과 HTML 문자열로 만든다.", () => {
    const html = createTicketsHTML([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ]);

    expect(html).toContain("1, 2, 3, 4, 5, 6");
    expect(html).toContain("7, 8, 9, 10, 11, 12");
    expect(html.match(/lotto-result-line/g)).toHaveLength(2);
  });

  test("결과 표 행 HTML을 설정값으로 만든다.", () => {
    const html = createResultTableRowsHTML([
      { rankKey: "5th", label: "3개" },
      { rankKey: "2nd", label: "5개+보너스볼" },
    ]);

    expect(html).toContain('data-rank-key="5th"');
    expect(html).toContain("<th scope=\"row\">3개</th>");
    expect(html).toContain("<td>5,000</td>");
    expect(html).toContain("<td>30,000,000</td>");
  });
});
