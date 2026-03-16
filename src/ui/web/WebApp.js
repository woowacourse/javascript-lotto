import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { Main } from "./components/Main.js";
import { Modal } from "./common/Modal.js";
import { LottoStatistics } from "./components/LottoStatistics.js";

export const App = ($app, { lottoFacade }) => {
  let state = {
    purchasedAmount: "",
    lottos: [],
  };

  const statistics = LottoStatistics({ onRetry });
  const modal = Modal({ onClose, children: statistics.$section });
  const { $main, render } = Main({ onPurchase, onShowResult });

  $app.append(Header(), $main, modal.$overlay, Footer());
  render(state);

  const setState = (newState) => {
    state = { ...state, ...newState };
    render(state);
  };

  function onPurchase(amountRaw) {
    try {
      const { lottos, purchasedAmount } = lottoFacade.purchase({ amountRaw });
      setState({ lottos, purchasedAmount });
    } catch (e) {
      alert(e.message);
    }
  }

  function onShowResult({ winningNumbers, bonusNumber }) {
    try {
      const stats = lottoFacade.getStatistics({
        lottosRaw: state.lottos,
        purchasedRaw: state.purchasedAmount,
        winningNumbersRaw: winningNumbers,
        bonusNumberRaw: bonusNumber,
      });

      statistics.render({
        lottoResult: stats.lottosResult,
        profitRate: stats.profitRate,
      });
      modal.open();
    } catch (e) {
      alert(e.message);
    }
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
