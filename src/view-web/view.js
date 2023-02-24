import { PLACE } from "../domain/constants";
import { MESSAGE } from "../domain/message";
import { getAscendingSortedNumbers } from "../utils";

const $purchaseAmountMessageSpan = document.getElementById("message-purchaseAmount");
const $lottos = document.getElementById("lottos");
const $placeNumbers = document.querySelectorAll(".place-number");
const $rateOfReturn = document.getElementById("rate-of-return");

export const view = {
  // rendering
  printNumberOfPurchasedLottos(numberOfPurchasedLottos) {
    $purchaseAmountMessageSpan.textContent =
      MESSAGE.OUTPUT.numberOfPurchasedMessage(numberOfPurchasedLottos);
  },

  printLottos(lottos) {
    $lottos.innerHTML = "";
    const lottoTags = lottos
      .map(
        (lotto) =>
          `<div class="lotto">
      <span class="emoji-lotto">🎟️</span
      ><span class="lottoNumber">${getAscendingSortedNumbers(lotto.numbers).join(", ")}</span>
    </div>`
      )
      .join("");
    $lottos.innerHTML = lottoTags;
  },

  printPlacesOfLottos(placesOfLottos) {
    const keys = [PLACE.fifth, PLACE.fourth, PLACE.third, PLACE.second, PLACE.first];
    $placeNumbers.forEach(
      (place, index) => (place.textContent = `${placesOfLottos[keys[index]]}개`)
    );
  },

  printRateOfReturn(rateOfReturn) {
    $rateOfReturn.textContent = MESSAGE.OUTPUT.rateOfReturnMessage(rateOfReturn.toLocaleString());
  },
};
