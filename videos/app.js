// 부기 홍보 영상 모음. 목록은 data.js(window.BOOKIE_VIDEOS)에서 읽는다.
(() => {
  const D = window.BOOKIE_VIDEOS;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const RN = { h: '가로', v: '세로' }, EN = { qr: 'QR', app: '앱스토어' };
  const POST = 'assets/posters/';
  const PLAY = '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
  const WORKS = {};
  D.sections.forEach(s => s.works.forEach(w => { WORKS[w.key] = w; }));

  const mmss = t => { t = Math.round(t); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };
  const ratios = w => [...new Set(w.cuts.flatMap(c => Object.keys(c.files)))];
  const hasEnds = w => w.cuts.some(c => Object.values(c.files).some(f => f.qr && f.app));

  // ── 첫 화면 숫자 ──
  const durs = Object.values(WORKS).flatMap(w => w.cuts.map(c => c.dur));
  const lo = Math.min(...durs), hi = Math.max(...durs);
  const fmt = t => (t < 60 ? `${Math.round(t)}초` : `${Math.round(t / 60)}분`);
  $('#stats').innerHTML = [
    [`${Object.keys(WORKS).length}편`, '홍보 영상'],
    [`${D.files}개`, '내려받을 수 있는 파일'],
    [`${fmt(lo)}~${fmt(hi)}`, '영상 길이'],
    ['가로 · 세로', '유튜브·쇼츠·릴스용 화면'],
  ].map(([b, s]) => `<div class="hs"><b>${b}</b><span>${s}</span></div>`).join('');
  $('#updated').textContent = `목록 갱신 ${D.updated.replace(/-/g, '.')}.`;
  // 첫 화면 오른쪽: 세로 영상 포스터 세 장
  const vpost = k => { const w = WORKS[k]; const c = w && w.cuts.find(x => x.poster.v); return c ? POST + c.poster.v : null; };
  $('#heroArt').innerHTML = ['book-tokki', 'question', 'parent'].map(vpost).filter(Boolean).map(s => `<img src="${s}" alt="">`).join('');
  $('#nav').innerHTML = D.sections.map(s => `<a href="#sec-${s.id}">${esc(s.title)}</a>`).join('');

  // ── 카드 ──
  function shot(w, big) {
    const c = w.cuts[0], p = c.poster;
    const dur = w.cuts.length > 1 ? w.cuts.map(x => x.label).join(' · ') : mmss(c.dur);
    const play = `<span class="play">${PLAY}</span><span class="dur">${dur}</span>`;
    if (p.h) return `<div class="shot"><img src="${POST}${p.h}" alt="" loading="${big ? 'eager' : 'lazy'}">${play}</div>`;
    return `<div class="shot tall"><img class="bg" src="${POST}${p.v}" alt="" loading="lazy"><img class="fg" src="${POST}${p.v}" alt="" loading="lazy">${play}</div>`;
  }
  function card(w, feat) {
    const tags = ratios(w).map(r => `<span class="tag">${RN[r]}</span>`).join('') + (hasEnds(w) ? '<span class="tag">QR · 앱스토어 끝화면</span>' : '') + `<span class="tag d">${esc(w.date)}</span>`;
    return `<button class="card${feat ? ' feat' : ''}" type="button" data-w="${w.key}" aria-label="${esc(w.title)} 재생">
      ${shot(w, feat)}
      <div class="card-tx">${feat ? '<span class="badge">새 영상</span>' : ''}<h3>${esc(w.title)}</h3><p class="desc">${esc(w.desc)}</p><div class="tags">${tags}</div></div>
    </button>`;
  }
  $('#sections').innerHTML = D.sections.map((s, si) => `
    <section class="sec" id="sec-${s.id}"><div class="wrap">
      <div class="sec-hd"><h2>${esc(s.title)}</h2><p>${esc(s.lead)}</p></div>
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
  function seg(label, items, cur, key) {
    return `<div class="opt"><span>${label}</span><div class="seg" role="group" aria-label="${label}">${items.map(([v, t, on]) =>
      `<button type="button" data-k="${key}" data-v="${v}" aria-pressed="${v === cur}"${on ? '' : ' disabled'}>${t}</button>`).join('')}</div></div>`;
  }
  function render(keepFrame) {
    const { w, ci, r, e } = st, c = w.cuts[ci], f = c.files[r][e];
    $('#plKick').textContent = `${w.date} · ${c.label} · ${RN[r]}${e === 'one' ? '' : ' · 끝화면 ' + EN[e]}`;
    $('#plTitle').textContent = w.title;
    $('#plDesc').textContent = w.desc;
    if (!keepFrame) $('#plStage').innerHTML = `<iframe class="${r}" src="https://drive.google.com/file/d/${f.id}/preview" allow="autoplay; fullscreen" allowfullscreen title="${esc(w.title)} 영상"></iframe>`;
    let o = '';
    if (w.cuts.length > 1) o += seg('길이', w.cuts.map((x, i) => [String(i), x.label, true]), String(ci), 'c');
    o += seg('화면', ['h', 'v'].map(x => [x, RN[x], !!c.files[x]]), r, 'r');
    if (e !== 'one') o += seg('끝화면', ['qr', 'app'].map(x => [x, EN[x], !!c.files[r][x]]), e, 'e');
    $('#plOpts').innerHTML = o;
    $('#plOpen').href = `https://drive.google.com/file/d/${f.id}/view`;
    $('#plDown').href = `https://drive.google.com/uc?export=download&id=${f.id}`;
    $('#plDown').textContent = `내려받기 (${f.mb}MB)`;
    $('#plMsg').textContent = '';
    const q = new URLSearchParams({ w: w.key, c: String(ci), r, e });
    history.replaceState(null, '', '#' + q.toString());
  }
  function open(key, ci = 0, r = 'h', e = 'qr') {
    const w = WORKS[key]; if (!w) return;
    st = pick(w, ci, r, e); render();
    if (!dlg.open) dlg.showModal();
  }
  $('#plOpts').addEventListener('click', ev => {
    const b = ev.target.closest('button[data-k]'); if (!b || b.disabled) return;
    const k = b.dataset.k, v = b.dataset.v;
    st = pick(st.w, k === 'c' ? +v : st.ci, k === 'r' ? v : st.r, k === 'e' ? v : st.e); render();
  });
  $('#plClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', ev => { if (ev.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { $('#plStage').innerHTML = ''; history.replaceState(null, '', location.pathname + location.search); });
  $('#plCopy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); $('#plMsg').textContent = '주소를 복사했습니다.'; }
    catch { $('#plMsg').textContent = location.href; }
  });
  $('#heroPlay').addEventListener('click', () => open(D.sections[0].works[0].key));

  // 주소에 #w=... 가 있으면 그 영상을 바로 연다 (복사한 주소로 들어온 경우)
  const q = new URLSearchParams(location.hash.slice(1));
  if (q.get('w')) open(q.get('w'), +(q.get('c') || 0), q.get('r') || 'h', q.get('e') || 'qr');
})();
