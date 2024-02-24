const RetryOrEnd = async ([method, context], prams) => {
  while (true) {
    try {
      const result = await method.call(context, prams);
      return result;
    } catch (err) {
      console.log(err.message);
    }
  }
};

export default RetryOrEnd;
