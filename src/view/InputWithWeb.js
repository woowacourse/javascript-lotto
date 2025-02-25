const InputWithWeb = {
  retry: (callback) => {
    try {
      return callback();
    } catch (e) {
      console.log(e.message);
    }
  },
};

export default InputWithWeb;
