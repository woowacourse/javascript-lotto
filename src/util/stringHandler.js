const stringHandler = (function () {
  return {
    addComma(value) {
      return value.toLocaleString('en-US');
    },
  };
})();

export default stringHandler;
