const mockLottoMachineGetLottoTickets = jest.fn();
const mockLottoResultGetResult = jest.fn();
let mockViewInstance;

/* 외부 의존성 모킹 */
jest.mock("../../src/step2/js/views/LottoView.js", () => {
  return jest.fn().mockImplementation(() => mockViewInstance);
});

jest.mock("../../src/services/LottoMachine.js", () => {
  return jest.fn().mockImplementation(() => ({
    getLottoTickets: mockLottoMachineGetLottoTickets,
  }));
});

jest.mock("../../src/services/LottoResult.js", () => {
  return jest.fn().mockImplementation(() => ({
    getResult: mockLottoResultGetResult,
  }));
});

import { ERROR_MESSAGE } from "../../src/constants/message.js";
import MainController from "../../src/step2/js/controllers/MainController.js";
import LottoMachine from "../../src/services/LottoMachine.js";
import LottoResult from "../../src/services/LottoResult.js";
import LottoView from "../../src/step2/js/views/LottoView.js";

describe("step2 MainController 전체 흐름 테스트", () => {
  /* 테스트 픽스처 */
  const mockTickets = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
  ];
  const mockResult = {
    resultData: [
      { matchCount: 3, requireBonus: false, count: 0 },
      { matchCount: 4, requireBonus: false, count: 0 },
      { matchCount: 5, requireBonus: false, count: 0 },
      { matchCount: 5, requireBonus: true, count: 0 },
      { matchCount: 6, requireBonus: false, count: 0 },
    ],
    profitRate: 0,
  };

  /* 테스트 초기화 */
  beforeEach(() => {
    mockViewInstance = {
      bindPurchase: jest.fn(),
      bindResult: jest.fn(),
      bindRestart: jest.fn(),
      renderLottoTickets: jest.fn(),
      renderResultModal: jest.fn(),
      resetUI: jest.fn(),
      focusPurchaseInput: jest.fn(),
      focusWinningInput: jest.fn(),
    };

    mockLottoMachineGetLottoTickets.mockReset().mockReturnValue(mockTickets);
    mockLottoResultGetResult.mockReset().mockReturnValue(mockResult);

    LottoView.mockClear();
    LottoMachine.mockClear();
    LottoResult.mockClear();

    global.alert = jest.fn();
  });

  afterEach(() => {
    delete global.alert;
  });

  /* 테스트 helper */
  function createController() {
    return new MainController();
  }

  function getPurchaseHandler() {
    return mockViewInstance.bindPurchase.mock.calls[0][0];
  }

  function getResultHandler() {
    return mockViewInstance.bindResult.mock.calls[0][0];
  }

  function getRestartHandler() {
    return mockViewInstance.bindRestart.mock.calls[0][0];
  }

  /* 동작 검증 */
  test("생성 시 뷰 이벤트를 바인딩한다.", () => {
    createController();

    expect(LottoView).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.bindPurchase).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.bindResult).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.bindRestart).toHaveBeenCalledTimes(1);
  });

  test("구매 성공 시 로또 티켓을 렌더링한다.", () => {
    createController();

    getPurchaseHandler()("2000");

    expect(LottoMachine).toHaveBeenCalledWith(2);
    expect(mockLottoMachineGetLottoTickets).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.renderLottoTickets).toHaveBeenCalledWith(mockTickets, 2);
    expect(global.alert).not.toHaveBeenCalled();
  });

  test("구매 실패 시 alert를 띄우고 구매 입력칸으로 포커스한다.", () => {
    createController();

    getPurchaseHandler()("1500");

    expect(global.alert).toHaveBeenCalledWith(ERROR_MESSAGE.PURCHASE.INVALID_UNIT);
    expect(mockViewInstance.focusPurchaseInput).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.renderLottoTickets).not.toHaveBeenCalled();
  });

  test("결과 계산 성공 시 결과 모달을 렌더링한다.", () => {
    createController();
    getPurchaseHandler()("2000");

    getResultHandler()(["1", "2", "3", "4", "5", "6"], "7");

    expect(LottoResult).toHaveBeenCalledTimes(1);
    expect(mockLottoResultGetResult).toHaveBeenCalledWith(2);
    expect(mockViewInstance.renderResultModal).toHaveBeenCalledWith(mockResult.resultData, mockResult.profitRate);
    expect(global.alert).not.toHaveBeenCalled();
  });

  test("결과 계산 실패 시 alert를 띄우고 당첨 번호 입력칸으로 포커스한다.", () => {
    createController();
    getPurchaseHandler()("2000");

    getResultHandler()(["1", "2", "3", "4", "5", "6"], "1");

    expect(global.alert).toHaveBeenCalledWith(ERROR_MESSAGE.BONUS.DUPLICATE);
    expect(mockViewInstance.focusWinningInput).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.renderResultModal).not.toHaveBeenCalled();
  });

  test("다시 시작 후에는 이전 구매 상태로 결과를 확인할 수 없다.", () => {
    const winningNumbers = ["1", "2", "3", "4", "5", "6"];
    const bonusNumber = "7";

    createController();

    getPurchaseHandler()("2000");

    global.alert.mockClear();
    mockViewInstance.focusWinningInput.mockClear();
    mockViewInstance.renderResultModal.mockClear();
    LottoResult.mockClear();

    getRestartHandler()();
    getResultHandler()(winningNumbers, bonusNumber);

    expect(mockViewInstance.resetUI).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.focusWinningInput).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.renderResultModal).not.toHaveBeenCalled();
    expect(LottoResult).not.toHaveBeenCalled();
  });
});
