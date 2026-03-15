import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { Main } from "./components/Main.js";
import { Modal } from "./common/Modal.js";
import { LottoStatistics } from "./components/LottoStatistics.js";

export const App = ($app, { lottoService }) => {
  let state = {
    purchasedAmount: "",
    lottos: [],
  };

  const statistics = LottoStatistics({ onRetry });
  const modal = Modal({ onClose, children: statistics.$section });
  const { $main, render } = Main({ onPurchase, onShowResult });

  $app.append(Header(), $main, modal.$overlay, Footer());

  const setState = (newState) => {
    state = { ...state, ...newState };
    render(state);
  };

  function onPurchase(amount) {
    const { lottos, purchasedAmount } = lottoService.purchase(amount);
    setState({ lottos, purchasedAmount });
  }

  function onShowResult({ winningNumbers, bonusNumber }) {
    const result = lottoService.getStatistics({
      lottosRaw: state.lottos,
      purchasedRaw: state.purchasedAmount,
      winningNumbers,
      bonusNumber,
    });
    statistics.render({
      lottoResult: result.lottosResult,
      profitRate: result.profitRate,
    });
    modal.open();
  }

  function onClose() {
    modal.close();
  }

  function onRetry() {
    setState({
      purchasedAmount: 0,
      lottos: [],
    });
    modal.close();
  }
};
