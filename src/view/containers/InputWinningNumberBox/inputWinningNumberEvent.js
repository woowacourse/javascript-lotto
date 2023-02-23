/* eslint-disable no-undef */

const inputWinningNumberEvent = () => {
  const form = document.getElementById("winning-number-submit");

  form.onsubmit = function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log({
      main: [
        formData.get('main0'),
        formData.get('main1'),
        formData.get('main2'),
        formData.get('main3'),
        formData.get('main4'),
        formData.get('main5'),
      ],
      bonus: formData.get('bonus'),
    });
    // try {
    //   LottoValidator.checkMoney(money);
    //   store['lottos'] = generateLottos((money));
    //   event.target.money.value = '';
    //   Render.container("purchase-result", () => PurchaseResults(), () => { });
    //   Render.container("input-winning-number", () => InputWinningNumberBox(), () => { });
    // } catch (error) {
    //   alert(error.message);
    // }
  };
};

export default inputWinningNumberEvent;
