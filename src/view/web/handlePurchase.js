import { LOTTO_NUMBER_SPLITER } from "../../constants/constant";
import LottoMachine from "../../domain/LottoMachine/LottoMachine";
import parseAndValidatePurchaseAmount from "../../domain/processors/parseAndValidatePurchaseAmount";

const handlePurchase = () => {
  try {
    const purchase_amount_input = document.querySelector("#purchaseAmount");
    const purchase_count = document.querySelector(".purchase_count");
    const lotto_pack = document.querySelector(".lotto_pack");
    const answer_lotto_section = document.querySelector(".answer_lotto_section");
    const reuslt_button = document.querySelector(".reuslt_button_section #resultButton");

    const purchaseAmount = parseAndValidatePurchaseAmount(purchase_amount_input.value);
    const lottoPack = LottoMachine(purchaseAmount);

    purchase_count.textContent = `총 ${lottoPack.count}개를 구매했습니다.`;

    generateLottoPack(lotto_pack, lottoPack.lottos);

    answer_lotto_section.classList.remove("opacity-0");
    reuslt_button.classList.remove("opacity-0");
    purchase_amount_input.blur();

    return { purchaseAmount, lottoPack };
  } catch (error) {
    purchase_amount_input.value = "";
    alert(error);
  }
};

const generateLottoPack = (lotto_pack, lottos) => {
  lottos.forEach((lotto) => {
    lotto_pack.innerHTML += `
            <div class="lotto">
                <img src="ticket.png" alt="로또" width="34px" height="36px" />
                <span>${lotto.lottoNumbers.join(`${LOTTO_NUMBER_SPLITER} `)}</span>
            </div>
              `;
  });
};

export default handlePurchase;
