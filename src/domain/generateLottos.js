import { LOTTO } from "../constants";
import Lotto from "./Lotto";
import lottoGenerator from "./LottoGenerator";

export const generateLottos = (money) => {
  const lottos = Array.from({ length: money / LOTTO.price }, () => new Lotto(lottoGenerator()));
  return lottos;
};
