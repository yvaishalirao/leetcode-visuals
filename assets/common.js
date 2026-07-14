/* Shared UI for all pages: drawer, search filter, arrow-key stepping. */
function toggleDrawer() {
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function buildProblemList(el, currentFile, hrefPrefix) {
  el.innerHTML = '';
  PROBLEMS.forEach(p => {
    const a = document.createElement('a');
    a.className = 'problem-item' + (p.file === currentFile ? ' active' : '');
    a.href = hrefPrefix + p.file;
    const num = document.createElement('span');
    num.className = 'p-num'; num.textContent = '#' + p.num;
    const title = document.createElement('span');
    title.className = 'p-title'; title.textContent = p.title;
    a.append(num, title);
    el.appendChild(a);
  });
}

function filterProblems() {
  const q = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.problem-item').forEach(el => {
    const num = el.querySelector('.p-num').textContent.toLowerCase();
    const title = el.querySelector('.p-title').textContent.toLowerCase();
    el.style.display = (num.includes(q) || title.includes(q)) ? '' : 'none';
  });
}

/* Each problem page registers its stepper so ←/→ work. */
let _pageFwd = null, _pageBack = null;
function initPage(currentFile, fwd, back) {
  _pageFwd = fwd; _pageBack = back;
  buildProblemList(document.getElementById('problem-list'), currentFile, '');
}
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === 'ArrowRight' && _pageFwd) _pageFwd();
  else if (e.key === 'ArrowLeft' && _pageBack) _pageBack();
});
