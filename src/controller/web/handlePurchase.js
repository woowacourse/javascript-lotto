import { LOTTO_NUMBER_SPLITER } from "../../constants/constant";
import LottoMachine from "../../domain/LottoMachine/LottoMachine";
import parseAndValidatePurchaseAmount from "../../domain/processors/parseAndValidatePurchaseAmount";
import DomSelector from "../../utils/domSelector";

const handlePurchase = () => {
  try {
    const purchase_amount = DomSelector.purchaseAmount;
    const purchase_count = DomSelector.purchaseCount;
    const reuslt_button = DomSelector.reusltButton;
    const lotto_pack = DomSelector.lottoPack;
    const answer_lotto_section = DomSelector.answerLottoSection;

    // 도메인 로직
    const purchaseAmount = parseAndValidatePurchaseAmount(purchase_amount.value);
    const lottoPack = LottoMachine(purchaseAmount);

    // ui 로직
    generateLottoPack(lotto_pack, lottoPack.lottos);
    purchase_count.textContent = `총 ${lottoPack.count}개를 구매했습니다.`;
    answer_lotto_section.classList.remove("opacity-0");
    reuslt_button.classList.remove("opacity-0");
    purchase_amount.blur();

    return { purchaseAmount, lottoPack };
  } catch (error) {
    purchase_amount.value = "";
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
