// 부기 홍보 영상 모음. 목록은 data.js(window.BOOKIE_VIDEOS)에서 읽는다.
(() => {
  const D = window.BOOKIE_VIDEOS;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const RN = { h: '가로', v: '세로' };
  const POST = 'assets/posters/';
  const PLAY = '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
  const WORKS = {};
  D.sections.forEach(s => s.works.forEach(w => { WORKS[w.key] = w; }));
  const mmss = t => { t = Math.round(t); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };

  // 첫 화면 오른쪽: 세로 영상 포스터 세 장
  const vpost = k => { const w = WORKS[k]; const c = w && w.cuts.find(x => x.poster.v); return c ? POST + c.poster.v : null; };
  $('#heroArt').innerHTML = ['book-tokki', 'question', 'parent'].map(vpost).filter(Boolean).map(s => `<img src="${s}" alt="">`).join('');
  $('#nav').innerHTML = D.sections.map(s => `<a href="#sec-${s.id}">${esc(s.title)}</a>`).join('');

  // ── 카드: 포스터와 제목 ──
  function shot(w, big) {
    const c = w.cuts[0], p = c.poster;
    const dur = w.cuts.length > 1 ? w.cuts.map(x => x.label).join(' · ') : mmss(c.dur);
    const play = `<span class="play">${PLAY}</span><span class="dur">${dur}</span>`;
    if (p.h) return `<div class="shot"><img src="${POST}${p.h}" alt="" loading="${big ? 'eager' : 'lazy'}">${play}</div>`;
    return `<div class="shot tall"><img class="bg" src="${POST}${p.v}" alt="" loading="lazy"><img class="fg" src="${POST}${p.v}" alt="" loading="lazy">${play}</div>`;
  }
  const card = (w, feat) => `<button class="card${feat ? ' feat' : ''}" type="button" data-w="${w.key}" aria-label="${esc(w.title)} 재생">${shot(w, feat)}<h3>${esc(w.title)}</h3></button>`;
  $('#sections').innerHTML = D.sections.map((s, si) => `
    <section class="sec" id="sec-${s.id}"><div class="wrap">
      <h2>${esc(s.title)}</h2>
      <div class="grid">${s.works.map((w, wi) => card(w, si === 0 && wi === 0)).join('')}</div>
    </div></section>`).join('');
  document.addEventListener('click', e => { const b = e.target.closest('.card'); if (b) open(b.dataset.w); });

  // ── 재생 창 ──
  const dlg = $('#player');
  let st = null;
  function pick(w, ci, r, e) {
    const c = w.cuts[ci] || w.cuts[0];
    const rs = Object.keys(c.files);
    if (!rs.includes(r)) r = rs.includes('h') ? 'h' : rs[0];
    const es = Object.keys(c.files[r]);
    if (!es.includes(e)) e = es.includes('qr') ? 'qr' : es[0];
    return { w, ci: w.cuts.indexOf(c), r, e };
  }
  const seg = (items, cur, key) => `<div class="seg" role="group">${items.map(([v, t]) =>
    `<button type="button" data-k="${key}" data-v="${v}" aria-pressed="${v === cur}">${t}</button>`).join('')}</div>`;
  function render() {
    const { w, ci, r, e } = st, c = w.cuts[ci], f = c.files[r][e];
    $('#plTitle').textContent = w.title;
    $('#plStage').innerHTML = `<iframe class="${r}" src="https://drive.google.com/file/d/${f.id}/preview" allow="autoplay; fullscreen" allowfullscreen title="${esc(w.title)} 영상"></iframe>`;
    let o = '';
    if (w.cuts.length > 1) o += seg(w.cuts.map((x, i) => [String(i), x.label]), String(ci), 'c');
    if (Object.keys(c.files).length > 1) o += seg(['h', 'v'].map(x => [x, RN[x]]), r, 'r');
    $('#plOpts').innerHTML = o;
    $('#plDown').href = `https://drive.google.com/uc?export=download&id=${f.id}`;
    history.replaceState(null, '', '#' + new URLSearchParams({ w: w.key, c: String(ci), r, e }).toString());
  }
  function open(key, ci = 0, r = 'h', e = 'qr') {
    const w = WORKS[key]; if (!w) return;
    st = pick(w, ci, r, e); render();
    if (!dlg.open) dlg.showModal();
  }
  $('#plOpts').addEventListener('click', ev => {
    const b = ev.target.closest('button[data-k]'); if (!b) return;
    const k = b.dataset.k, v = b.dataset.v;
    st = pick(st.w, k === 'c' ? +v : st.ci, k === 'r' ? v : st.r, st.e); render();
  });
  $('#plClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', ev => { if (ev.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { $('#plStage').innerHTML = ''; history.replaceState(null, '', location.pathname + location.search); });
  $('#heroPlay').addEventListener('click', () => open(D.sections[0].works[0].key));

  // 주소에 #w=... 가 있으면 그 영상을 바로 연다
  const q = new URLSearchParams(location.hash.slice(1));
  if (q.get('w')) open(q.get('w'), +(q.get('c') || 0), q.get('r') || 'h', q.get('e') || 'qr');
})();
