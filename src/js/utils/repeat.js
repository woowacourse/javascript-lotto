const repeatCallback = (count, callback) => {
  for (let i = 0; i < count; i += 1) {
    callback();
  }
};

export default repeatCallback;
