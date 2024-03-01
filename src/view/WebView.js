const WebView = {
  readWebViewExactValue(config) {
    console.log(config);

    const inputString = document.querySelector(`.${config.value}`).value;
    console.log(inputString);
    try {
      return config.factory(inputString);
    } catch (e) {
      alert(e.message);
    }
  },
};

export default WebView;
