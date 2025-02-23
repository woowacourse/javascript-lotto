export default function rankToString(prize) {
  if (prize === 'first') return '6개 일치';
  if (prize === 'second') return '5개 일치, 보너스 볼 일치';
  if (prize === 'third') return '5개 일치';
  if (prize === 'fourth') return '4개 일치';
  if (prize === 'fifth') return '3개 일치';

  return '';
}
