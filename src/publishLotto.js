import Lotto from "./Lotto.js";

export default publishLotto = (price) => {
  let lottos = [];
  for (let i = 0; i < price / 1000; i++) {
    const numbers = [1, 2, 3, 4, 5, 6]; //TODO
    lottos.push(new Lotto(numbers));
  }
  return lottos;
};
