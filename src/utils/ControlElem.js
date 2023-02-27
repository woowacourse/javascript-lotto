export const ControlElem = {
  makeDivElem(tag, text) {
    let property = value;
  },

  resetElem(elem, type) {
    if (type === "innerHTML") return (elem.innerHTML = "");
    if (type === "value") return (elem.value = "");
  },

  makeRandomLotto(numbers) {
    return `<div><span class="lottoImg">🎟</span><span class="randomLottoNumbers">${numbers}</span></div>`;
  },
};
