import InputView from "./InputView.js";
import LottoStore from "./LottoStore.js";

async function main() {
  const amount = await InputView.askAmount();
  const lottos = LottoStore.purchaseLottos(amount);
  lottos.forEach((lotto) => console.log(lotto.getNumbers()));
}

main();
