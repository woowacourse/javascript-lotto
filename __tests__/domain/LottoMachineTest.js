import Purchase from "../../src/models/Purchase";
import LottoMachine from "../../src/services/LottoMachine";

describe("구입한 금액 만큼 로또가 발행된다.", () => {
  test("구입한 금액 만큼 로또가 발행된다.", () => {
    const INPUT = 5000;
    // 1. purchase 인스턴스를 만든다.
    const purchase = new Purchase(INPUT);
    // 2. purchase 인스턴스 안의 구입한 금액을 로또 갯수로 바꿔주는 함수로 로또 갯수를 저장한다.
    const lottoCount = purchase.getLottoTicketCount();
    // 3. lottoMachine 인스턴스에 구입한 개수를 넣어서 인스턴스를 만든다.
    const lottoMachine = new LottoMachine(lottoCount);
    // 4. lottoMachine 인스턴스 안의 로또 번호를 발행하는 함수로 로또 번호를 저장한다.
    const lottoNumbers = lottoMachine.getLottoTickets();

    expect(lottoNumbers.length).toBe(lottoCount);
  });
});
