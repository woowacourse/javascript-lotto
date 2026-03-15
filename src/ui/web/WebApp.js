import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { Main } from "./components/Main.js";

export const App = ($app, { lottoService }) => {
  let state = {
    purchasedAmount: "",
    lottos: [],
    lottoResult: [],
    profitRate: null,
  };

  const main = Main({ onPurchase, onShowResult, onRetry });
  $app.append(Header(), main.$main, Footer());

  const setState = (newState) => {
    state = { ...state, ...newState };
    main.render(state);
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
    setState({
      lottoResult: result.lottosResult,
      profitRate: result.profitRate,
    });
  }

  function onRetry() {
    setState({
      purchasedAmount: 0,
      lottos: [],
      lottoResult: [],
      profitRate: null,
    });
  }
};
