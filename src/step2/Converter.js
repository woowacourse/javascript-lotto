const Converter = {
  matchResultSummary(summary) {
    return summary.map(({ label, prize, result }) => ({
      label: label.replaceAll('일치', ''),
      prize,
      result,
    }));
  }
}

export default Converter;
