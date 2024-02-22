const RetryOrEnd = async (method, context) => {
  while (true) {
    try {
      const result = await method.call(context);
      return result;
    } catch (err) {
      console.log(err.message);
    }
  }
};

export default RetryOrEnd;
