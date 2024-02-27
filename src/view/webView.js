const WebView = {
  showLottoList(lottoNumberArray) {
    const list = document.getElementById("lotto_list");

    lottoNumberArray.forEach((lottoNumber) => {
      const li = document.createElement("li");
      li.innerText = lottoNumber.sort((a, b) => a - b);
      list.appendChild(li);
    });
  },
};
export default WebView;
