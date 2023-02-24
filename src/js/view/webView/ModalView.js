import { $ } from '../../util/dom';

$('.modal').innerHTML = `
<div class="modalBackground"></div>
<form class="modalBox"></form>
`;

$('.modalBox').innerHTML = `
<div class="exitDiv">
  <button class="exit">X</button>
</div>
<h2>🏆 당첨 통계 🏆</h2>
<table class="winningStatistics"></table>
<h3>당신의 총 수익률은 <span class="profitRate">100</span>%입니다.</h3>
<button class="restartButton" type="submit">다시 시작하기</button>
`;

$('.winningStatistics').innerHTML = `
<thead>
              <tr>
                <th>일치 갯수</th>
                <th>당첨금</th>
                <th>당첨 갯수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>3개</th>
                <th>5,000</th>
                <th><span class="matchCount">n</span>개</th>
              </tr>
              <tr>
                <th>4개</th>
                <th>50,000</th>
                <th><span class="matchCount">n</span>개</th>
              </tr>
              <tr>
                <th>5개</th>
                <th>1,500,000</th>
                <th><span class="matchCount">n</span>개</th>
              </tr>
              <tr>
                <th>5개+보너스볼</th>
                <th>30,000,000</th>
                <th><span class="matchCount">n</span>개</th>
              </tr>
              <tr>
                <th>6개</th>
                <th>2,000,000,000</th>
                <th><span class="matchCount">n</span>개</th>
              </tr>
            </tbody>
`;
