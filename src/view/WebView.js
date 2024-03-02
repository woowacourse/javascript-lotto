const WebView = {
  readExactValue(config) {
    const inputString = config.value;
    try {
      return config.factory(inputString);
    } catch (e) {
      alert(e.message);
    }
  },
};

export default WebView;
