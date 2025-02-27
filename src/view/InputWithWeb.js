const InputWithWeb = {
  retry: (callback) => {
    try {
      return callback();
    } catch (e) {
      console.log(e.message);
      alert(e.message);
    }
  },
};

export default InputWithWeb;
