export default function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}
