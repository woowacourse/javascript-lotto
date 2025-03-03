// 결과 테이블 헤더 생성
function createTableHead() {
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const headers = ['일치 갯수', '당첨금', '당첨 갯수'];

  headers.forEach((text) => {
    const th = document.createElement('th');
    th.innerText = text;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  return thead;
}

// 결과 테이블의 데이터 반환
function getTableRows() {
  return [
    { matches: '3개', prize: '5,000', className: 'fifth' },
    { matches: '4개', prize: '50,000', className: 'fourth' },
    { matches: '5개', prize: '1,500,000', className: 'third' },
    { matches: '5개+보너스볼', prize: '30,000,000', className: 'second' },
    { matches: '6개', prize: '2,000,000,000', className: 'first' },
  ];
}

// 개별 당첨 결과 행 생성
function createTableRow(row) {
  const tr = document.createElement('tr');

  const tdMatches = document.createElement('td');
  tdMatches.innerText = row.matches;

  const tdPrize = document.createElement('td');
  tdPrize.innerText = row.prize;

  const tdRank = document.createElement('td');
  tdRank.classList.add('rank', row.className);

  tr.appendChild(tdMatches);
  tr.appendChild(tdPrize);
  tr.appendChild(tdRank);

  return tr;
}

// 결과 테이블 본문 생성
function createTableBody() {
  const tbody = document.createElement('tbody');
  const rows = getTableRows();

  rows.forEach((row) => {
    tbody.appendChild(createTableRow(row));
  });

  return tbody;
}

// 결과 테이블 생성
export function createResultTable() {
  const table = document.createElement('table');
  table.appendChild(createTableHead());
  table.appendChild(createTableBody());
  return table;
}
