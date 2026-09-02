/* 부기 홍보 페이지 — 라우터 + 인터랙션 (제품 코드 아님)
   아이콘: 이모지 대신 직접 그린 라인 아이콘 (부기 디자인 지침) */
(function () {
  'use strict';
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
  function $(id){ return document.getElementById(id); }

  /* ── 라인 아이콘 세트 ────────────────────── */
  var P = {
    compass:'<circle cx="12" cy="12" r="8.6"/><path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z"/>',
    book:'<path d="M12 7.2C10.6 5.9 8.7 5.4 4.5 5.6v11.9c4.2-.2 6.1.3 7.5 1.6 1.4-1.3 3.3-1.8 7.5-1.6V5.6c-4.2-.2-6.1.3-7.5 1.6z"/><path d="M12 7.2v11.9"/>',
    chat:'<path d="M20.4 11.8a7.9 7.9 0 0 1-8.4 7.9 8.6 8.6 0 0 1-2.6-.4L4.6 21 6 16.7a7.7 7.7 0 0 1-1.4-4.5A7.9 7.9 0 0 1 12.4 4a7.9 7.9 0 0 1 8 7.8z"/><path d="M9.1 12h.01"/><path d="M12.4 12h.01"/><path d="M15.7 12h.01"/>',
    sprout:'<path d="M12 20.2v-7.6"/><path d="M12 12.6C12 9.4 9.4 6.8 6.2 6.8c0 3.2 2.6 5.8 5.8 5.8z"/><path d="M12 14.6c0-3.2 2.6-5.8 5.8-5.8 0 3.2-2.6 5.8-5.8 5.8z"/>',
    board:'<rect x="3.5" y="4" width="17" height="11.6" rx="2"/><path d="M12 15.6V20"/><path d="M8.6 20h6.8"/><path d="M7.4 8.4h6.2"/><path d="M7.4 11.4h3.8"/>',
    keypad:'<rect x="3" y="8.4" width="4.6" height="7.2" rx="1.4"/><rect x="9.7" y="8.4" width="4.6" height="7.2" rx="1.4"/><rect x="16.4" y="8.4" width="4.6" height="7.2" rx="1.4"/>',
    medal:'<circle cx="12" cy="14.6" r="5.4"/><path d="M8.8 9.6L6.1 3.6h11.8l-2.7 6"/><path d="M12 12.4l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3z"/>',
    shelf:'<rect x="4" y="5" width="4.2" height="14" rx="1.2"/><rect x="9.8" y="5" width="4.2" height="14" rx="1.2"/><path d="M16.3 6.6l3.4 1L16.8 19.7l-3.4-1z"/>',
    bars:'<path d="M3.5 20h17"/><path d="M7 20v-6.4"/><path d="M12 20V7.4"/><path d="M17 20v-9.4"/>',
    building:'<path d="M3 20h18"/><path d="M5.6 20V9.5L12 5.5l6.4 4V20"/><path d="M9.9 20v-5h4.2v5"/><path d="M9.6 11.6h.9"/><path d="M13.5 11.6h.9"/>',
    flame:'<path d="M12 20.4c2.9 0 5.3-2.3 5.3-5.2 0-3.6-3.4-5.2-3.4-9.2-1.9 1-2.9 2.7-2.9 4.6C9.6 9 8.2 8.1 8.2 8.1c-.9 1.2-1.5 2.7-1.5 4.3 0 4.4 2.5 8 5.3 8z"/>',
    target:'<circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="4.4"/><path d="M12 12h.01"/>',
    users:'<circle cx="9.2" cy="8.6" r="3.1"/><path d="M3.6 19.4c0-3 2.5-5.1 5.6-5.1s5.6 2.1 5.6 5.1"/><path d="M16.4 6.3a3.1 3.1 0 0 1 0 6.1"/><path d="M17.4 14.7c1.9.6 3.1 2.4 3.1 4.7"/>',
    camera:'<path d="M3.5 8.6A1.6 1.6 0 0 1 5.1 7h2.2l1.2-2h7l1.2 2h2.2A1.6 1.6 0 0 1 20.5 8.6v8.8A1.6 1.6 0 0 1 18.9 19H5.1a1.6 1.6 0 0 1-1.6-1.6z"/><circle cx="12" cy="13" r="3.3"/>',
    clock:'<circle cx="12" cy="12" r="8.4"/><path d="M12 7.4V12l3 1.8"/>',
    image:'<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="8.6" cy="10" r="1.5"/><path d="M4.2 16.6l4.4-4 3.4 3 3-2.5 4.8 4.4"/>',
    clipboard:'<path d="M9.2 5H7.1a1.6 1.6 0 0 0-1.6 1.6v11.8A1.6 1.6 0 0 0 7.1 20h9.8a1.6 1.6 0 0 0 1.6-1.6V6.6A1.6 1.6 0 0 0 16.9 5h-2.1"/><rect x="9.2" y="3.4" width="5.6" height="3.1" rx="1"/><path d="M8.6 11h6.8"/><path d="M8.6 14.4h4.8"/>',
    download:'<path d="M12 4.2v9.6"/><path d="M8.2 10.4L12 14.2l3.8-3.8"/><path d="M4.6 18.8h14.8"/>',
    quote:'<path d="M9.4 6.6C6.9 7.9 5.4 10.1 5.4 12.9V17.2h5.1v-5.1H7.8c.2-1.6 1-2.8 2.4-3.6z"/><path d="M18.4 6.6c-2.5 1.3-4 3.5-4 6.3v4.3h5.1v-5.1h-2.7c.2-1.6 1-2.8 2.4-3.6z"/>',
    pen:'<path d="M16.6 4.4l3 3L9.1 18 5 19l1-4.1z"/><path d="M14.6 6.4l3 3"/>',
    bulb:'<path d="M9.6 17.4h4.8"/><path d="M10.2 20.4h3.6"/><path d="M12 3.6a5.4 5.4 0 0 1 3.1 9.8c-.5.4-.7.9-.7 1.4v.6H9.6v-.6c0-.5-.2-1-.7-1.4A5.4 5.4 0 0 1 12 3.6z"/>',
    seed:'<path d="M12 20.4c-3.4 0-6.1-2.8-6.1-6.2S8.6 8 12 8s6.1 2.8 6.1 6.2-2.7 6.2-6.1 6.2z"/><path d="M12 8c0-1.9 1.2-3.4 3.1-4"/>',
    tree:'<path d="M12 20.4v-4.2"/><path d="M12 16.2l-5.4-3.1h2.2L5.2 10h2L12 3.6 16.8 10h2l-3.6 3.1h2.2z"/>',
    forest:'<path d="M8 20.4v-3.2"/><path d="M8 17.2l-4.3-2.4h1.8L2.9 12.2h1.6L8 7.4l3.5 4.8h1.6l-2.6 2.6h1.8z"/><path d="M16.5 20.4v-2.6"/><path d="M16.5 17.8l-3.5-2h1.5l-2.1-2.1h1.3l2.8-3.9 2.8 3.9h1.3l-2.1 2.1h1.5z"/>',
    grid:'<rect x="3.6" y="3.6" width="7" height="7" rx="1.6"/><rect x="13.4" y="3.6" width="7" height="7" rx="1.6"/><rect x="3.6" y="13.4" width="7" height="7" rx="1.6"/><rect x="13.4" y="13.4" width="7" height="7" rx="1.6"/>'
  };
  function ico(name, cls) {
    return '<svg class="ico'+(cls?' '+cls:'')+'" viewBox="0 0 24 24" aria-hidden="true">' + (P[name]||'') + '</svg>';
  }
  // <i data-ico="name" class="lg"> → SVG
  document.querySelectorAll('[data-ico]').forEach(function (el) {
    var w = document.createElement('span');
    w.innerHTML = ico(el.dataset.ico, el.className || '');
    el.replaceWith(w.firstChild);
  });


  /* ── 차례 ─────────────────────────────────────
     장 단위로만 싣습니다. 쪽 목록이 아니라 다섯 덩어리입니다. (2026-08-30 대표님 지시)
     장 이름·차례 줄·쪽 범위가 전부 아래 BOOK 배열에서 나오므로 여기를 손댈 일은 없습니다.
     장을 누르면 그 장의 첫 쪽으로 갑니다. */
  var CHCOLOR = { '부기를 만든 이유': 'var(--gold)', '부기 학생 기능 소개': 'var(--g3)',
                  '부기 교사 기능 소개': 'var(--g5)', '부기 관리 기능 소개': 'var(--g6)',
                  '사용 후기와 신청': 'var(--brand)' };
  // 차례 카드의 설명 줄은 대표님 지시로 뺐습니다 (2026-09-02). 되살리려면 buildToc 의 td 줄을 다시 넣으세요.
  var CHSUM = {
    '부기를 만든 이유':    '한 쪽에 모르는 낱말 서너 개면 아이는 멈춥니다. PISA 14.7%, 어휘 98% 임계값, 마태 효과, 상승 나선.',
    '부기 학생 기능 소개': '낱말 뜻풀이, 원문과 재구성, 부기와의 대화, 아바타와 소품, 서고와 배지, 우리 반 작품.',
    '부기 교사 기능 소개': '온책읽기 8차시를 골라 담고, 학급 코드로 아이들을 들이고, 상담에 쓸 기록을 받습니다.',
    '부기 관리 기능 소개': '학교와 학급 현황에서 아이 한 명까지. 관리자는 조회만 하고 담당 학교 밖은 보지 못합니다.',
    '사용 후기와 신청':    '써 보신 뒤 사진과 후기를 남겨 주세요. 신청은 QR로 받습니다.'
  };

  function buildToc() {
    var seen = {}, order = [];
    BOOK.forEach(function (b, i) {
      if (!i) return;                                   // 차례 자신은 싣지 않습니다
      if (!seen[b.ch]) { seen[b.ch] = { first: b.r, from: i, to: i }; order.push(b.ch); }
      else seen[b.ch].to = i;
    });
    // 장 이름 아래에 그 장에 실린 쪽 제목을 그대로 깝니다 (2026-09-02).
    // 지어낸 요약이 아니라 BOOK 배열의 제목이라 쪽을 고치면 차례도 따라옵니다.
    $('hub').innerHTML = order.map(function (ch) {
      var c = seen[ch], range = c.from === c.to ? c.from + '쪽' : c.from + '–' + c.to + '쪽';
      // 쪽번호를 앞세운 작은 차례 항목으로 (2026-09-02: 점으로 이어 붙인 낱말 나열이 «의미 없는 열거»로 보인다는 지적)
      var titles = BOOK.map(function (b, i) { return i && b.ch === ch
                       ? '<span class="ti' + (/준비 중/.test(b.t) ? ' soon' : '') + '"><i>' + i + '</i>' + esc(b.t) + '</span>' : ''; }).join('');
      return '<button class="tocch2" type="button" data-go="' + c.first + '"'
           + ' style="--c:' + (CHCOLOR[ch] || 'var(--brand)') + '">'
           + '<span class="tt">' + esc(ch) + '</span>'
           + '<span class="tn">' + range + '</span>'
           + '<span class="tl">' + titles + '</span>'
           + '</button>';
    }).join('');
  }

  // 시험 사용 신청 메뉴는 대표님 지시로 잠시 뺌 (2026-08-24) — 다시 넣을 때:
  // + '<a href="#/apply" data-nav="/apply" style="color:var(--brand);font-weight:700">시험 사용 신청</a>'
  $('topnav').innerHTML = '<a href="#/" data-nav="/">차례</a><button type="button" id="printBtn">인쇄</button>';
  $('printBtn').addEventListener('click', function () { window.print(); });

  /* ── 라우터 ──────────────────────────────── */
  function go(r){ if (location.hash !== '#'+r) location.hash = r; else route(); }

  /* ── 책장 넘기기 ──────────────────────────────
     넘어가는 종이의 앞면에 지금 화면을 그대로 복제해 붙이고, 그 아래에서 다음 쪽이
     드러납니다. 앞으로 갈 때는 책등(왼쪽)을, 뒤로 갈 때는 오른쪽을 축으로 돕니다.
     머리글은 책의 겉장이라 여겨 그 아래에서만 종이가 넘어갑니다. */
  /* ── 책의 차례 ────────────────────────────────
     0번은 차례 쪽(쪽번호 없음), 1번부터가 본문 1쪽입니다.
     쪽을 넣고 빼려면 여기만 고치면 됩니다. 넘김 줄·쪽번호·차례 카드가 전부 따라갑니다. */
  var BOOK = [
    { r:'/',          t:'차례' },
    { r:'/why',       t:'책을 덮게 되는 순간',        ch:'부기를 만든 이유' },
    { r:'/ai',        t:'AI에 맡기지 않는 자리',      ch:'부기를 만든 이유' },
    { r:'/gap',       t:'한 반에 서너 명',            ch:'부기를 만든 이유' },
    { r:'/adults',    t:'학교를 떠난 뒤',             ch:'부기를 만든 이유' },
    { r:'/threshold', t:'모르는 낱말 2%',             ch:'부기를 만든 이유' },
    { r:'/matthew',   t:'마태 효과',                  ch:'부기를 만든 이유' },
    { r:'/spiral',    t:'책 읽기의 상승 나선 효과',                  ch:'부기를 만든 이유' },
    { r:'/read',      t:'아이마다 다른 화면',         ch:'부기 학생 기능 소개' },
    { r:'/word',      t:'낱말 뜻은 그 자리에서',      ch:'부기 학생 기능 소개' },
    { r:'/vi',        t:'다양한 언어로 읽기 (준비 중)',  ch:'부기 학생 기능 소개' },
    { r:'/level',     t:'원문, 재구성, 교훈',         ch:'부기 학생 기능 소개' },
    { r:'/chat',      t:'부기와의 대화',              ch:'부기 학생 기능 소개' },
    { r:'/diagnose',  t:'문해력 수준 점검 (준비 중)',   ch:'부기 학생 기능 소개' },
    { r:'/fun',       t:'양치기 소년의 지팡이',       ch:'부기 학생 기능 소개' },
    { r:'/props',     t:'책마다 다른 소품',           ch:'부기 학생 기능 소개' },
    { r:'/shelf',     t:'나만의 서고 만들기',  ch:'부기 학생 기능 소개' },
    { r:'/gallery',   t:'우리 반 작품 보기',          ch:'부기 학생 기능 소개' },
    { r:'/next',      t:'안데르센에게 묻기',          ch:'부기 학생 기능 소개' },
    { r:'/teacher',   t:'온책읽기 8차시',             ch:'부기 교사 기능 소개' },
    { r:'/material',  t:'차시 PPT와 과정안',          ch:'부기 교사 기능 소개' },
    { r:'/code',      t:'학급 코드로 들어가기',        ch:'부기 교사 기능 소개' },
    { r:'/class',     t:'학생 독서현황 살펴보기',    ch:'부기 교사 기능 소개' },
    { r:'/admin',     t:'한눈에 보는 독서 현황',       ch:'부기 관리 기능 소개' },
    { r:'/apply',     t:'사용 후기 제출',             ch:'사용 후기와 신청' }
  ];
  var LAST = BOOK.length - 1;
  function bookAt(r){ for (var i=0;i<BOOK.length;i++) if (BOOK[i].r === r) return i; return -1; }
  function here(){ return bookAt(location.hash.replace(/^#/,'') || '/'); }
  var noAnim = matchMedia('(prefers-reduced-motion:reduce)');

  /* ── 넘김 ─────────────────────────────────────
     실제 부기 리더(build.js)와 같은 StPageFlip 을 씁니다.
     낱쪽(.bkpage)을 넘겨 주면 라이브러리가 두 쪽씩 짝지어 펼치고, 모서리 그림자까지 그립니다.
     리더와 다른 점은 useMouseEvents 를 끈 것 하나입니다 — 쪽 위에 눌러 볼 수 있는
     화면(수업 패널·6자리 코드·신청 폼)이 얹혀 있어서, 마우스를 라이브러리가 먼저 가로채면
     그 화면들을 누를 수 없게 됩니다. 넘김은 아래 넘김 줄과 좌우 방향키로 합니다. */
  var paper = $('bk-paper'), stash = $('bk-stash'), host = null, pf = null, buildTry = 0;
  var LEAVES = [].slice.call(stash.querySelectorAll('.bkpage'));   // 낱쪽 50장
  var SPREADS = [];                                                // 펼침면 = 낱쪽 두 장
  LEAVES.forEach(function (el, i) { if (i % 2 === 0) SPREADS.push(el.dataset.spread); });

  /* 폰·좁은 창에서는 두 쪽 펼침이 들어가지 않습니다. 한 쪽씩, 화면 폭을 다 씁니다.
     이 값 하나로 넘김 판(StPageFlip)과 CSS(@media 760px)가 같은 기준을 봅니다. */
  // 폭이 좁거나(폰) 화면이 세로로 길면(태블릿 세로) 두 쪽 펼침이 들어가지 않습니다.
  // CSS 의 @media (max-width:900px),(max-aspect-ratio:115/100) 과 같은 기준입니다.
  function narrow() { return innerWidth < 900 || innerWidth / innerHeight < 1.15; }
  function pageBox() {
    var w = paper.clientWidth - 32, h = paper.clientHeight - 28;
    if (narrow()) {
      // 한 쪽이 너무 넓어지면 글줄이 길어 읽기 나쁩니다. 680px 에서 멈추고 가운데 둡니다.
      return { pageW: Math.max(260, Math.min(Math.floor(w), 680)), pageH: Math.max(420, Math.floor(h)) };
    }
    var pageW = Math.floor(Math.min(w, 1460) / 2);
    var pageH = Math.min(h, Math.round(pageW * 1.32));
    return { pageW: Math.max(260, pageW), pageH: Math.max(320, pageH) };
  }

  // StPageFlip 의 destroy() 는 호스트를 DOM 에서 지웁니다. 낱쪽은 우리 것이니
  // 지우기 전에 보관함으로 도로 옮겨 두어야 그 안의 데모와 이벤트가 살아남습니다.
  function build(keep) {
    // 아직 자리가 잡히지 않았으면(폭 0) 잠시 뒤 다시 — 이때 지으면 쪽이 최소 크기로 굳습니다.
    // requestAnimationFrame 이 아니라 setTimeout 인 이유: 창이 숨겨진 상태에서는 rAF 가 아예 돌지 않습니다.
    if (paper.clientWidth < 200 && buildTry < 20) { buildTry++; setTimeout(function(){ build(keep); }, 60); return; }
    buildTry = 0;
    var idx = (keep && pf) ? want : 0;
    if (pf) { LEAVES.forEach(function (el){ stash.appendChild(el); }); try { pf.destroy(); } catch (e) {} pf = null; }
    paper.innerHTML = '';
    host = document.createElement('div'); host.id = 'bk-flip';
    paper.appendChild(host);
    var box = pageBox(); lastBox = box;
    LEAVES.forEach(function (el) { el.style.width = box.pageW + 'px'; el.style.height = box.pageH + 'px'; host.appendChild(el); });
    pf = new St.PageFlip(host, {
      width: box.pageW, height: box.pageH, size: 'fixed',
      usePortrait: true, showCover: false, drawShadow: true,
      flippingTime: 650, maxShadowOpacity: 0.4, mobileScrollSupport: true,
      useMouseEvents: false, showPageCorners: false, swipeDistance: 30
    });
    pf.loadFromHTML(host.querySelectorAll('.bkpage'));
    pf.on('flip', onFlip);
    // 넘김 중에만 3D 합성 레이어를 켭니다(정지 상태에선 글자가 또렷하도록) — 리더와 같은 처리
    pf.on('changeState', function (e) {
      try { var st = e && e.data; document.body.classList.toggle('is-flipping', !!st && st !== 'read'); } catch (_) {}
    });
    want = Math.max(0, Math.min(idx, LEAVES.length - 1));
    if (want > 0) { try { pf.turnToPage(want); } catch (e) {} }
    syncRail(); fitLive(); fitSpots(); fitFill(); fitToc();
  }

  function spreadNow() { return pf ? Math.floor(want / 2) : 0; }
  /* 한 쪽씩 보는 화면에서는 낱쪽 하나씩 움직입니다.
     StPageFlip 의 portrait 모드에서 flipNext()/flipPrev() 가 듣지 않아(2026-09-02 확인)
     낱쪽 번호를 직접 세어 turnToPage 로 옮깁니다. 이걸 안 하면 오른쪽 쪽(글이 실린 쪽)에
     아예 닿지 못합니다. */
  /* 넘김이 끝나기 전에는 getCurrentPageIndex() 가 옛 값을 줍니다(넘김 650ms).
     그 값으로 다음 자리를 셈하면 '이전'을 눌렀는데 앞으로 가는 일이 생깁니다.
     그래서 지금 가려는 낱쪽 번호를 따로 들고 다닙니다. */
  var want = 0;
  var lastBox = null;

  /* ── 인쇄: A4 가로 한 장에 펼침면 하나, 화면과 똑같이 ──────────
     StPageFlip 은 펼쳐진 두 쪽만 보이게 하므로 그대로 인쇄하면 한 펼침면만 나온다.
     인쇄 직전에 낱쪽을 **복제**해(원본은 넘김 판에 그대로 — 판의 그리기 루프가 원본 인라인 스타일을 되씌운다)
     두 장씩 .prsheet 로 묶고, 화면 쪽 크기(lastBox) 그대로 A4 여백 안(281×194mm)에 들어가게 통째로 줄인다.
     인쇄 매체에서는 vw 글자 크기·max-height 미디어쿼리가 화면과 달리 풀리므로, 화면에서 계산된 값
     (글자 크기·행간·여백·간격·격자·그림 높이)을 복제본에 인라인으로 고정해 화면과 같은 모습으로 찍는다.
     펼침면(대략 2.2:1)이 A4 가로(1.45:1)보다 납작해 위아래 띠가 남는 것은 화면과 같게 두는 대가다. (2026-09-02) */
  var PIN = ['font-size','line-height','letter-spacing','padding-top','padding-right','padding-bottom','padding-left',
             'margin-top','margin-right','margin-bottom','margin-left','row-gap','column-gap','grid-template-columns'];
  function pinStyles(src, dst) {
    var a = [src].concat([].slice.call(src.querySelectorAll('*'))), b = [dst].concat([].slice.call(dst.querySelectorAll('*')));
    for (var i = 0; i < a.length && i < b.length; i++) {
      var cs = getComputedStyle(a[i]), st = b[i].style;
      for (var k = 0; k < PIN.length; k++) { var v = cs.getPropertyValue(PIN[k]); if (v) st.setProperty(PIN[k], v); }
      // 그림은 높이만 고정(폭까지 박으면 fitSpots 가 높이를 바꿀 때 비율이 깨진다)
      if (a[i].tagName === 'IMG') { st.setProperty('height', cs.height); st.setProperty('max-height', cs.maxHeight); }
    }
  }
  function toPrint() {
    if (document.body.classList.contains('printing')) return;
    // 쪽 폭은 화면 그대로(글줄 바꿈·글자 크기가 화면과 같게), 높이는 큰 모니터에서 보이는 최대 비율(폭×1.32 — pageBox 의 상한).
    // 그 펼침면 비율(1.52:1)이 A4 가로 여백(1.45:1)과 거의 같아 종이가 찬다. 맥북처럼 낮은 창에서 찍어도 결과가 같다.
    var box = lastBox || pageBox(), W = box.pageW, H = Math.round(W * 1.32);
    var PX = 96 / 25.4, z = Math.min((281 * PX) / (W * 2), (194 * PX) / H) * 0.995;
    var out = document.createElement('div'); out.id = 'bk-print';
    for (var i = 0; i < LEAVES.length; i += 2) {
      var sh = document.createElement('div'); sh.className = 'prsheet';
      var inn = document.createElement('div'); inn.className = 'prin'; inn.style.zoom = z; sh.appendChild(inn);
      [LEAVES[i], LEAVES[i + 1]].forEach(function (el) {
        if (!el) return;
        var c = el.cloneNode(true);
        // 넘김 판이 보이는 쪽에 주는 상태(display:block)와 같게 — 화면과 같은 보정 함수가 그대로 맞는다
        c.style.cssText = 'display:block;position:relative;width:' + W + 'px;height:' + H + 'px';
        pinStyles(el, c);
        inn.appendChild(c);
      });
      out.appendChild(sh);
    }
    // 복제본을 화면 밖에 잠깐 펼쳐 놓고, 화면과 같은 채움 보정(가운데 내림·삽화 높이·데모 축소·차례 벌림)을 인쇄 높이로 다시 잰다.
    // fit* 는 document 의 모든 .bkpage 를 훑으므로 복제본도 함께 맞춰진다(원본은 같은 값이 다시 계산될 뿐).
    out.style.cssText = 'display:block;position:absolute;left:-99999px;top:0;width:' + (W * 2) + 'px';
    document.body.appendChild(out);
    try { fitLive(); fitSpots(); fitFill(); } catch (e) {}   // build() 와 같은 순서 — fitFill 이 먼저 오면 데모 상자가 커진 뒤 여백이 남아 넘친다
    var tc = out.querySelector('.bkpage.toc-list'), hub = tc && tc.querySelector('#hub');
    if (hub) {
      // 차례는 남는 높이만큼 통째로 키운다(글자·번호·여백이 함께 커짐, 최대 1.4배). 넘치면 조인 뒤 줄인다.
      // (2026-09-02 사용자: «카드는 늘었는데 글자 크기는 그대로네» → 여백 대신 배율)
      hub.style.height = 'auto'; hub.style.zoom = ''; hub.classList.remove('tight');
      // 화면에서 고정한 격자 열 너비(px)는 확대하면 쪽 밖으로 삐져나간다 → 차례 안에서는 풀어 CSS(1fr auto·auto-fill)대로 다시 흐르게
      hub.style.gridTemplateColumns = ''; hub.querySelectorAll('[style]').forEach(function (e) { e.style.gridTemplateColumns = ''; });
      // ⚠️ 치수는 getBoundingClientRect(화면 px — 시트 zoom·차례 zoom 이 섞임)가 아니라 offset/client(요소 자기 css px)로 잰다.
      //    room·need 는 쪽 좌표의 css px, 차례에 zoom z 를 걸면 차례 안 css px = 쪽 css px / z 이므로 높이는 room/z 를 넣는다.
      var padB = parseFloat(getComputedStyle(tc).paddingBottom) || 0;
      var room = tc.clientHeight - padB - hub.offsetTop, need = hub.offsetHeight;
      if (need > room) { hub.classList.add('tight'); need = hub.offsetHeight; room = tc.clientHeight - padB - hub.offsetTop; }
      var z = Math.max(0.55, Math.min(1.4, room / need));
      for (var t = 0; t < 12; t++) {
        hub.style.zoom = z; hub.style.height = (room / z) + 'px';
        if (hub.scrollHeight <= hub.clientHeight + 1 || z <= 0.55) break;   // 확대로 줄 수가 늘어 넘치면 조금씩 줄인다
        z -= 0.03;
      }
    }
    out.style.cssText = '';   // 다시 감춤 — 인쇄 매체에서만 보인다(#bk-print 규칙)
    document.body.classList.add('printing');
  }
  function fromPrint() {
    var out = $('bk-print'); if (out) out.remove();
    document.body.classList.remove('printing');
  }
  addEventListener('beforeprint', toPrint);
  addEventListener('afterprint', fromPrint);
  function leafNow() { return want; }
  /* 앞뒤로 한 칸 옮기기.
     flipNext()/flipPrev() 는 turnToPage 로 옮긴 뒤에 방향이 어긋나는 일이 있어(2026-09-02 확인)
     쓰지 않습니다. 갈 자리를 번호로 정해 놓고 그리로 보냅니다.
     넓은 화면은 펼침면(낱쪽 두 장) 단위, 좁은 화면은 낱쪽 한 장 단위입니다. */
  function goTo(i, animate) {
    if (!pf) return;
    want = Math.max(0, Math.min(i, LEAVES.length - 1));
    try {
      if (animate && typeof pf.flip === 'function') pf.flip(want);
      else pf.turnToPage(want);
    } catch (e) { try { pf.turnToPage(want); } catch (_) {} }
    syncRail();
    setTimeout(function () { onFlip(); }, 780);   // 넘김이 끝난 뒤 주소·넘김 줄을 맞춥니다
  }
  function stepNext() { if (!pf) return; goTo(narrow() ? leafNow() + 1 : (spreadNow() + 1) * 2, !narrow()); }
  function stepPrev() { if (!pf) return; goTo(narrow() ? leafNow() - 1 : (spreadNow() - 1) * 2, !narrow()); }
  function goSpread(n) {
    if (!pf) return;
    n = Math.max(0, Math.min(n, SPREADS.length - 1));
    want = n * 2;
    try { pf.turnToPage(want); } catch (e) {}
  }
  function onFlip() {
    var key = SPREADS[spreadNow()];
    var r = key === 'home' ? '/' : '/' + key;
    if (location.hash !== '#' + r) { skipRoute = true; location.hash = r; }
    syncRail(); fitLive(); chrome(r);
  }

  var resizeT = 0;
  addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () { build(true); }, 180);
  });

  var skipRoute = false;
  function chrome(r) {
    document.querySelectorAll('[data-nav]').forEach(function (a){ a.classList.toggle('on', a.dataset.nav === r); });
    document.title = r === '/' ? '부기 · 교실을 위한 어린이 명작 도서관'
      : ((BOOK[bookAt(r)] || {t:'부기'}).t + ' · 부기');
  }
  function route() {
    if (skipRoute) { skipRoute = false; return; }
    var r = location.hash.replace(/^#/,'') || '/';
    var key = r === '/' ? 'home' : r.replace(/^\//, '');
    var n = SPREADS.indexOf(key);
    if (n < 0) { n = 0; r = '/'; }
    chrome(r);
    if (spreadNow() !== n) goSpread(n);
    else { syncRail(); fitLive(); }
  }


  /* ── 쪽 넘김 줄 ──────────────────────────────
     쪽마다 두지 않고 화면 아래 하나로 둡니다. 책을 든 손처럼 자리가 고정됩니다. */
  var rail = $('rail');
  rail.innerHTML = '<div class="rl">'
    + '<button class="pv" type="button"><b>이전</b><span></span></button>'
    + '<span class="folio"></span>'
    + '<button class="nx" type="button"><b>다음</b><span></span></button></div>';
  var rPrev = rail.querySelector('.pv'), rNext = rail.querySelector('.nx'),
      rFolio = rail.querySelector('.folio');
  rPrev.addEventListener('click', stepPrev);
  rNext.addEventListener('click', stepNext);

  /* ── 폰에서 좌우로 밀어 넘기기 (2026-09-02) ────
     StPageFlip 의 자체 터치 처리는 꺼 두었습니다 — 켜면 쪽 위의 데모(수업 패널·코드칸·신청 폼)를
     누를 수 없습니다. 그래서 '가로로 60px 넘게, 세로보다 확실히 많이' 민 것만 골라 직접 넘깁니다.
     탭과 세로 스크롤은 그대로 둡니다. */
  (function () {
    var x0 = 0, y0 = 0, t0 = 0, on = false;
    paper.addEventListener('touchstart', function (e) {
      if (!narrow() || e.touches.length !== 1) { on = false; return; }
      on = true; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
    }, { passive: true });
    paper.addEventListener('touchend', function (e) {
      if (!on || !pf) return;
      on = false;
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      if (Date.now() - t0 > 800) return;                       // 천천히 끈 것은 넘김이 아닙니다
      if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.7) return;
      if (dx < 0) stepNext(); else stepPrev();
    }, { passive: true });
  })();
  /* ── 장치를 쪽 크기에 맞춤 ────────────────────
     왼쪽 쪽에 얹은 실제 화면이 종이보다 크면, 스크롤 대신 통째로 줄여 앉힙니다.
     종이 위에 화면을 얹어 놓은 모양이 됩니다. */
  document.querySelectorAll('.bkpage.live').forEach(function (l) {
    var box = document.createElement('div');
    box.className = 'livebox';
    while (l.firstChild) box.appendChild(l.firstChild);
    l.appendChild(box);
  });
  // 낱쪽은 모두 미리 크기가 정해져 있으므로 한 번에 전부 맞춥니다.
  // (전에는 펼쳐진 쪽만 맞춰서, 아직 안 넘긴 쪽의 화면이 쪽 밖으로 넘쳤습니다)
  // 쪽에 얹은 화면을 쪽 크기에 맞춰 통째로 줄입니다. 스크롤은 두지 않습니다.
  // 세로만 보면 가로로 넘치는 경우를 놓치므로 둘 중 더 빡빡한 쪽에 맞춥니다.
  function fitLive() {
    document.querySelectorAll('.bkpage.live').forEach(function (l) {
      var box = l.querySelector('.livebox');
      if (!box) return;
      // StPageFlip 은 펼쳐진 두 쪽만 display 를 켭니다. 나머지는 크기를 잴 수 없으므로
      // 재는 동안만 잠깐 켰다가 되돌립니다.
      var hidden = getComputedStyle(l).display === 'none', prev = l.style.display;
      if (hidden) l.style.display = 'flex';
      box.style.zoom = '';
      var cs = getComputedStyle(l);
      var availH = l.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      var availW = l.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (availH > 0 && availW > 0) {
        // 줄이기만 하지 않고 남는 만큼 키웁니다. 쪽을 가득 채워야 책처럼 보입니다.
        // 장치는 쪽 높이만큼 늘어나므로(CSS), 여기서는 넘칠 때만 줄입니다.
        var needH = box.scrollHeight, needW = box.scrollWidth;
        // 폰에서는 쪽이 세로로 스크롤되므로 가로만 맞춥니다. 세로까지 맞추면 글씨가 못 읽게 작아집니다.
        var kW = needW > availW ? availW / needW : 1;
        var k = narrow() ? kW : Math.min(needH > availH ? availH / needH : 1, kW);
        // 0.99~1 사이를 그냥 두면 1%(6px쯤) 넘쳤습니다. 조금 더 줄여 딱 맞춥니다 (2026-09-02)
        if (k < 1) box.style.zoom = Math.max(0.42, k * 0.995).toFixed(3);
      }
      // 폰에서는 쪽 안에서 세로로 넘겨 볼 수 있어야 합니다
      l.style.overflow = narrow() ? '' : 'hidden';
      if (hidden) l.style.display = prev;
    });
  }
  addEventListener('resize', fitLive);
  // 이미지가 fitLive 뒤에 로드되면 장치 높이가 달라질 수 있어, 로드가 끝나면 한 번 더 맞춥니다.
  addEventListener('load', fitLive);

  /* ── 삽화 없는 쪽을 세로 가운데로 ───────────────
     StPageFlip이 쪽에 display:block을 박아 flex 세로 정렬이 죽어 있습니다(지뢰 11).
     그래서 삽화가 없는 쪽은 글이 위로 몰리고 아래가 300~460px씩 빕니다.
     남는 높이를 재서 절반만 첫 자식 위에 얹으면 내용이 쪽 가운데로 내려옵니다.
     삽화가 있는 쪽은 fitSpots()가 이미 채우므로 건드리지 않습니다.
     **쪽(.bkpage) 자체에 인라인 style을 주면 안 됩니다 — StPageFlip이 통째로 덮어씁니다(지뢰 1).**
     그래서 여백은 첫 자식에 넣습니다. 자식의 style은 건드리지 않으니 살아남습니다.
     반드시 fitLive()·fitSpots() 뒤에 부를 것 — 앞서 부르면 장치 높이를 잘못 잽니다. */
  function fitFill() {
    // 폰에서는 fitSpots·fitToc 이 쉬므로 모든 쪽을 여기서 가운데로 내립니다.
    // 넘치는 쪽은 room 이 음수라 저절로 건너뜁니다.
    var nar = narrow();
    document.querySelectorAll('.bkpage').forEach(function (p) {
      // 먼저 되돌리고 다시 잽니다 (첫 자식이든 둘째든 지난번에 넣은 값을 지웁니다)
      for (var i = 0; i < 2 && p.children[i]; i++) p.children[i].style.marginTop = '';
      if (!nar) {
        if (p.querySelector('.spot')) return;
        if (p.classList.contains('bookcover') || p.classList.contains('toc-list')) return;
        if (p.classList.contains('art') || p.classList.contains('wide')) return;
      }
      var hidden = getComputedStyle(p).display === 'none', prev = p.style.display;
      if (hidden) p.style.display = 'block';
      var kids = [].slice.call(p.children).filter(function (e) {
        var s = getComputedStyle(e);
        return s.display !== 'none' && s.visibility !== 'hidden' && e.getBoundingClientRect().height > 0;
      });
      if (kids.length) {
        var pr = p.getBoundingClientRect(), cs = getComputedStyle(p);
        var bottom = Math.max.apply(null, kids.map(function (e) { return e.getBoundingClientRect().bottom; }));
        var room = pr.bottom - (parseFloat(cs.paddingBottom) || 0) - bottom;
        // 장 이름(.ch)은 쪽 맨 위에 붙어 있어야 하므로 그 아래부터 내립니다.
        var top = (kids[0].classList.contains('ch') && kids[1]) ? kids[1] : kids[0];
        if (room > 90) top.style.marginTop = ((parseFloat(getComputedStyle(top).marginTop) || 0) + room / 2) + 'px';
      }
      if (hidden) p.style.display = prev;
    });
  }
  addEventListener('resize', fitFill);
  addEventListener('load', fitFill);

  /* ── 차례를 쪽 높이에 맞춰 벌림 ────────────────
     장 단위 차례는 다섯 줄뿐이라 그냥 두면 쪽 아래가 250px쯤 빕니다(빈 곳 금지 지시).
     삽화와 같은 방법으로 남는 높이를 실측해 #hub를 늘리면,
     space-between이 다섯 줄을 고르게 벌려 쪽이 찹니다. */
  function fitToc() {
    var p = document.querySelector('.bkpage.toc-list'), hub = $('hub');
    if (!p || !hub) return;
    hub.style.height = 'auto'; hub.style.zoom = ''; hub.classList.remove('tight');
    if (narrow()) return;
    var hidden = getComputedStyle(p).display === 'none', prev = p.style.display;
    if (hidden) p.style.display = 'block';
    var room = p.clientHeight - hub.offsetTop - parseFloat(getComputedStyle(p).paddingBottom || 0);
    // 창이 낮아 다섯 장이 다 안 들어가면: ① 카드를 한 단계 조이고(.tight) ② 그래도 넘치면 통째로 줄인다.
    // 어느 높이에서도 «사용 후기와 신청»까지 다 보여야 한다 (2026-09-02 사용자 지적).
    if (hub.scrollHeight > room) hub.classList.add('tight');
    if (hub.scrollHeight > room) hub.style.zoom = Math.max(0.55, room / hub.scrollHeight);
    else if (room > hub.scrollHeight) hub.style.height = room + 'px';
    if (hidden) p.style.display = prev;
  }
  addEventListener('resize', fitToc);
  addEventListener('load', fitToc);

  /* ── 삽화를 남는 공간에 맞춤 ──────────────────
     StPageFlip이 쪽에 display:block을 인라인으로 박아 flex 배치가 무시됩니다.
     그래서 삽화(.spot)의 높이는 쪽마다 실제로 재서 넣습니다:
     일부러 2000px로 키워 넘친 양을 재면, 2000 - 넘침 = 쓸 수 있는 높이입니다. */
  function fitSpots() {
    document.querySelectorAll('.bkpage').forEach(function (p) {
      var s = p.querySelector('.spot');
      // 도판 쪽(.art)의 큰 그림도 같은 방법으로 맞춥니다 (bleed 제외)
      if (!s && p.classList.contains('art') && !p.classList.contains('bleed')) s = p.querySelector('img');
      if (!s) return;
      if (narrow()) { s.style.display = ''; s.style.height = ''; s.style.maxHeight = ''; return; }
      var hidden = getComputedStyle(p).display === 'none', prev = p.style.display;
      if (hidden) p.style.display = 'block';
      s.style.display = 'block'; s.style.maxHeight = 'none'; s.style.height = '2000px';
      var h = 2000 - (p.scrollHeight - p.clientHeight) - 2;
      if (h < 56) { s.style.display = 'none'; s.style.height = ''; }   // 자리가 없으면 그림을 접습니다
      else s.style.height = h + 'px';
      if (hidden) p.style.display = prev;
    });
  }
  addEventListener('resize', fitSpots);
  addEventListener('load', fitSpots);

  function syncRail() {
    var i = pf ? spreadNow() : here();
    if (i < 0) i = 0;
    if (narrow() && pf) {
      var li = leafNow();
      rPrev.disabled = li <= 0;
      rNext.disabled = li >= LEAVES.length - 1;
    } else {
      rPrev.disabled = i <= 0;
      rNext.disabled = i >= LAST;
    }
    rPrev.querySelector('span').textContent = i > 0 ? '← ' + BOOK[i-1].t : '';
    rNext.querySelector('span').textContent = i < LAST ? BOOK[i+1].t + ' →' : '';
    rFolio.innerHTML = i ? '<em>' + i + '</em> / ' + LAST + ' 쪽' : '차례';
  }

  /* ── 좌우 방향키로 넘기기 ─────────────────── */
  addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
    var t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    if (!pf) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); stepNext(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); stepPrev(); }
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-go]');
    if (b) { e.preventDefault(); go(b.dataset.go); }
  });
  addEventListener('hashchange', route);

  /* ── 캡처 자리표시 ───────────────────────── */
  document.querySelectorAll('.shot img').forEach(function (im) {
    im.addEventListener('error', function () {
      var f = document.createElement('div'); f.className = 'shot-ph';
      f.innerHTML = '<b>실제 화면 캡처 자리</b><span>assets/shots/'+im.getAttribute('src').split('/').pop()+'</span>';
      im.replaceWith(f);
    });
    var src = im.getAttribute('src');
    if (/\.png$/.test(src)) im.setAttribute('src', src.replace(/\.png$/, '.webp'));
  });

  /* ── 낱말 툴팁 ───────────────────────────── */
  var tip = $('tip');
  function showTip(el) {
    var r = el.getBoundingClientRect();
    tip.querySelector('b').textContent = el.dataset.t;
    tip.querySelector('span').textContent = el.dataset.d;
    tip.classList.add('on');
    var tw = tip.offsetWidth, left = r.left + r.width/2 - tw/2;
    tip.style.left = Math.max(12, Math.min(left, innerWidth - tw - 12)) + 'px';
    tip.style.top = Math.max(12, r.top - tip.offsetHeight - 10) + 'px';
  }
  function hideTip(){ tip.classList.remove('on'); }
  document.addEventListener('click', hideTip);
  addEventListener('scroll', hideTip, { passive:true });
  function wireWords(root){ root.addEventListener('click', function (e) {
    var w = e.target.closest('.w'); if (w) { showTip(w); e.stopPropagation(); } else hideTip(); }); }

  /* ── 리더 ────────────────────────────────── */
  var TEXT = {
    ko:{ book:'토끼와 거북이', author:'이솝 · Aesop (BC)', hint:'밑줄 친 낱말을 누르면 뜻을 볼 수 있어요',
      html:'<p>발 빠른 토끼가 늘 자랑했어요.</p><p>"내가 제일 빨라!"</p><p>그 말을 들은 거북이가 말했어요.</p>'
        +'<p>"그럼 나랑 <span class="w" data-t="시합" data-d="누가 더 잘하나 겨루는 것">시합</span>하자!"</p>'
        +'<p>토끼는 <span class="w" data-t="코웃음" data-d="상대를 얕보며 콧숨으로 웃는 것">코웃음</span>을 치며 대답했어요.</p><p>"좋아, 해 보자!"</p>' },
    vi:{ book:'Thỏ và Rùa', author:'Aesop (BC)', hint:'Nhấp vào các từ có gạch chân để kiểm tra ý nghĩa',
      html:'<p>Chú thỏ nhanh chân luôn khoe khoang.</p><p>\'Tôi là người nhanh nhất!\'</p><p>Nghe vậy, chú rùa nói.</p>'
        +'<p>\'Vậy thì hãy <span class="w" data-t="thi đấu" data-d="Cuộc tranh tài xem ai giỏi hơn">thi đấu</span> với tôi!\'</p>'
        +'<p>Thỏ cười khẩy trả lời.</p><p>\'Được thôi, hãy thử xem!\'</p>' } };
  var rdr = $('rdr'), STEPS = [16,19,22,26], step = 1, lang = 'ko';
  function paint(){ var t = TEXT[lang]; rdr.innerHTML = t.html; $('hint').textContent = t.hint;
    $('dBook').textContent = t.book; $('dAuthor').textContent = t.author; rdr.style.fontSize = STEPS[step]+'px'; hideTip(); }
  wireWords(rdr);
  document.querySelectorAll('[data-lang]').forEach(function (b){ b.addEventListener('click', function () {
    document.querySelectorAll('[data-lang]').forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on'); lang = b.dataset.lang; paint(); }); });
  $('fPlus').addEventListener('click', function(){ step=Math.min(3,step+1); rdr.style.fontSize=STEPS[step]+'px'; hideTip(); });
  $('fMinus').addEventListener('click', function(){ step=Math.max(0,step-1); rdr.style.fontSize=STEPS[step]+'px'; hideTip(); });
  paint();

  /* ── 수준별 글 ───────────────────────────── */
  var MODES = {
    orig:{ hint:'원문: 원작의 문장과 호흡을 살려 읽는 글',
      html:'<p>카렌이라는 가난한 소녀가 있었다. 신발 한 켤레 없이 맨발로 다닐 만큼 어렵게 자랐는데, 어느 날 마음씨 좋은 늙은 부인이 외로운 카렌을 양딸로 거두어 곱게 길렀다. 부인은 카렌에게 깨끗한 옷과 신발을 사 주고 글도 가르쳤으며, 사람들은 카렌이 참 곱다고 칭찬했다.</p><p>그러던 어느 날, 카렌은 구둣방 진열장에서 새빨갛게 반짝이는 예쁜 가죽 구두를 보고 그만 마음을 온통 빼앗기고 말았다. 어찌나 갖고 싶었던지, 카렌은 눈이 어두운 양어머니를 졸라 기어이 그 빨간 구두를 손에 넣었다.</p>' },
    easy:{ hint:'재구성: 같은 장면을 학년 눈높이에 맞춰 다시 쓴 글',
      html:'<p><span class="w" data-t="가난한" data-d="돈이나 물건이 넉넉하지 않은">가난한</span> 카렌이라는 소녀가 있었어요. 신발도 없이 <span class="w" data-t="맨발" data-d="아무것도 신지 않은 발">맨발</span>로 다녔죠. 어느 날, 마음씨 좋은 할머니가 외로운 카렌을 데려다 딸처럼 키워 주셨어요.</p><p>어느 날, 카렌은 반짝이는 <span class="w" data-t="새빨간" data-d="아주 짙고 선명한 빨간색의">새빨간</span> 가죽 구두를 보았어요. 너무 갖고 싶어서 할머니를 <span class="w" data-t="조르고 졸라" data-d="자꾸자꾸 해 달라고 부탁해서">조르고 졸라</span> 빨간 구두를 가지게 되었답니다.</p>' },
    lesson:{ hint:'교훈: 짧은 서평과 한 줄 정리',
      html:'<p>갖고 싶은 마음 자체가 잘못은 아닙니다. 다만 그 마음이 나를 어디까지 끌고 가는지는 살펴볼 필요가 있습니다.</p><p style="text-indent:0;margin-top:18px;color:var(--brand);font-weight:600">교훈 — 갖고 싶은 마음보다 먼저, 그 마음을 바라보는 눈이 필요하다.</p>' } };
  var rdr2 = $('rdr2');
  function paint2(m){ rdr2.innerHTML = MODES[m].html; $('hint2').textContent = MODES[m].hint; hideTip(); }
  wireWords(rdr2);
  document.querySelectorAll('[data-mode]').forEach(function (b){ b.addEventListener('click', function () {
    document.querySelectorAll('[data-mode]').forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on'); paint2(b.dataset.mode); }); });
  paint2('orig');

  /* ── 부기와 대화 ─────────────────────────────
     실제 부기와 같은 얼개입니다. 부기가 지도안의 발문을 순서대로 건네고, 아이가 답하면
     한 번만 되묻고 다음 발문으로 넘어갑니다. 여기서는 아이의 답을 칩으로 고릅니다. */
  var ME = '<img src="assets/char-new-face.webp" alt="">';
  var BK = '<img src="assets/char-new-face.webp" alt="">';
  var CHATS = {
    tokki: { hd:'<b>부기와 이야기 나누기</b><span>「토끼와 거북이」 2차시 · 인물 만나기 · 발문 3개</span>',
      steps:[
        { q:'토끼는 어떤 친구인 것 같아? 그렇게 생각한 까닭도 말해 줘.',
          a:[['잘난 척을 많이 해. "내가 제일 빨라!" 하고 자랑했잖아.','맞아, 자랑하는 말에서 그런 마음이 보이지. 그럼 자랑을 들은 거북이는 기분이 어땠을까?'],
             ['빠른 친구야. 진짜로 빠르니까.','빠른 건 사실이야. 그런데 빠른 걸 어떻게 말했는지도 떠올려 볼래?']] },
        { q:'거북이는 어떤 친구야? 어디서 알 수 있었어?',
          a:[['포기하지 않는 친구야. 느려도 계속 걸었으니까.','끝까지 걸은 걸 놓치지 않았네. 거북이가 시합하자고 한 까닭은 뭘까?'],
             ['용감해. 토끼한테 먼저 시합하자고 했어.','먼저 말한 게 용감했다고 봤구나. 그때 거북이는 이길 수 있다고 생각했을까?']] },
        { q:'너라면 토끼와 거북이 중 누구랑 친구가 되고 싶어?',
          a:[['거북이. 약속을 지키고 끝까지 하니까.','그런 친구가 곁에 있으면 든든하지. 오늘 이야기는 여기까지야. 잘 이야기했어!'],
             ['토끼. 같이 놀면 재미있을 것 같아.','재미있는 친구도 소중하지. 오늘 이야기는 여기까지야. 잘 이야기했어!']] } ] },
    karen: { hd:'<b>부기와 이야기 나누기</b><span>「토끼와 거북이」 4차시 · 마음 헤아리기 · 발문 2개</span>',
      steps:[
        { q:'토끼가 나무 그늘에서 잠들 때, 마음속으로 무슨 생각을 했을까?',
          a:[['"거북이는 한참 뒤에 있으니까 잠깐 자도 돼."','그렇게 믿었겠지. 그 믿음이 어떤 결과로 이어졌어?'],
             ['"오늘은 정말 쉽게 이기겠다."','쉽게 이길 거라고 생각했구나. 그 생각이 토끼를 어떻게 만들었을까?']] },
        { q:'결승선에 먼저 닿은 거북이는 어떤 마음이었을까?',
          a:[['기뻤을 거야. 그리고 조금 놀랐을 것 같아.','기쁘고 놀란 마음, 둘 다 있었을 것 같아. 오늘 이야기는 여기까지야. 잘 이야기했어!'],
             ['뿌듯했을 거야. 포기하지 않았으니까.','포기하지 않은 자기가 자랑스러웠겠지. 오늘 이야기는 여기까지야. 잘 이야기했어!']] } ] }
  };
  var curChat = 'tokki', stepI = 0;
  function addMsg(who, face, text) {
    var d = document.createElement('div'); d.className = 'msg' + (who==='me' ? ' me' : '');
    d.innerHTML = '<span class="fa">'+face+'</span><span class="bb">'+esc(text)+'</span>';
    $('msgs').appendChild(d);
    $('msgs').scrollTop = $('msgs').scrollHeight;
  }
  function renderAsks() {
    var c = CHATS[curChat], st = c.steps[stepI];
    if (!st) { $('asks').innerHTML = '<p class="askdone">대화가 끝났습니다. 이 대화는 아이의 서고에 「토끼와 거북이」 기록으로 남습니다.</p>'; return; }
    $('asks').innerHTML = '<p class="askhint">내 답을 골라 보세요</p>' + st.a.map(function (q,i) {
      return '<button class="ask" type="button" data-q="'+i+'">'+esc(q[0])+'</button>'; }).join('');
    $('asks').querySelectorAll('[data-q]').forEach(function (b) {
      b.addEventListener('click', function () {
        var pair = st.a[+b.dataset.q];
        addMsg('me', ME, pair[0]); $('asks').innerHTML = '';
        setTimeout(function(){ addMsg('ch', BK, pair[1]); stepI++;
          var nx = c.steps[stepI];
          if (nx) setTimeout(function(){ addMsg('ch', BK, nx.q); renderAsks(); }, 700); else renderAsks();
        }, 420);
      });
    });
  }
  function loadChat(k) {
    curChat = k; stepI = 0;
    var c = CHATS[k];
    $('chatHd').innerHTML = c.hd;
    $('msgs').innerHTML = '';
    addMsg('ch', BK, c.steps[0].q);
    renderAsks();
  }
  document.querySelectorAll('[data-ch]').forEach(function (b){ b.addEventListener('click', function () {
    document.querySelectorAll('[data-ch]').forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on'); loadChat(b.dataset.ch); }); });
  loadChat('tokki');


  /* ── 진단 5단계 ──────────────────────────── */
  var LV = [
    ['씨앗','Level 1','기본 읽기 · 단순 내용 이해','한 쪽에 두세 문장짜리 재구성. 그림을 크게 붙이고 어휘 도움말을 넉넉히 답니다.','재구성 · 짧게'],
    ['새싹','Level 2','중심 내용 이해 · 간단한 추론','재구성 전문을 줍니다. 어려운 어휘에만 도움말이 붙고 읽기 전 질문이 하나 붙습니다.','재구성 · 전문'],
    ['성장','Level 3','내용 분석 · 자기 의견 표현','재구성과 원문을 오갑니다. 인물에게 묻는 대화 활동이 열립니다.','재구성 ↔ 원문'],
    ['나무','Level 4','비판적 읽기 · 다양한 관점 이해','원문을 그대로 줍니다. 교훈 대신 스스로 한 줄을 쓰게 하고 토론 활동을 붙입니다.','원문'],
    ['숲','Level 5','심층 독해와 토론','원문에 확장 읽기를 더합니다. 다른 판본과 관련 작품을 이어 주고 창작 활동으로 넘어갑니다.','원문 + 확장']
  ];
  var LVICO = ['seed','sprout','sprout','tree','forest'];
  var curLv = 1;
  function renderLv() {
    $('levels').innerHTML = LV.map(function (l,i) {
      return '<button class="lv'+(i===curLv?' on':'')+'" type="button" data-l="'+i+'">'
        + '<span class="em">'+ico(LVICO[i])+'</span><b>'+l[0]+' 단계</b><span>'+l[1]+'</span></button>'; }).join('');
    $('levels').querySelectorAll('[data-l]').forEach(function (b){
      b.addEventListener('click', function(){ curLv = +b.dataset.l; renderLv(); }); });
    var l = LV[curLv];
    $('lvout').innerHTML = '<b>'+l[0]+' 단계: '+esc(l[2])+'</b><p>'+esc(l[3])+'</p>'
      + '<span class="give">「빨간 구두」를 이렇게 받습니다: '+esc(l[4])+'</span>';
  }
  renderLv();

  /* ── 교사: 구성 · 차시 · 지도안 ──────────── */
  var PLANS = [
    { id:'whole', ic:'book', name:'온책읽기 8차시', desc:'만나기→인물→사건→마음→나눔으로 이어지는 온책읽기 기본 구성',
      s:[['책 만나기','표지와 제목을 보고 「토끼와 거북이」의 내용을 상상하여 말할 수 있다.',['표지·제목으로 상상하기','질문 만들며 시작하기','생각 나누기·발표']],
         ['인물 만나기','토끼와 거북이의 성격과 특징을 파악할 수 있다.',['지난 차시 떠올리기','인물 마음 지도 그리기','부기와 대화하기']],
         ['사건 따라가기','자랑 → 시합 → 낮잠 → 역전으로 이어지는 흐름을 정리할 수 있다.',['소리 내어 함께 읽기','사건 순서 정리하기','짝·모둠 토의']],
         ['마음 헤아리기','장면마다 토끼와 거북이의 마음과 까닭을 짐작할 수 있다.',['혼자 깊이 읽기','인물 마음 지도 그리기','부기와 대화하기']],
         ['생각 넓히기','이야기에서 얻은 생각을 내 경험과 이어 말할 수 있다.',['독서록 쓰기','생각 나누기·발표']],
         ['인상 깊은 장면','가장 인상 깊은 장면을 골라 까닭과 함께 나눌 수 있다.',['장면 고르기','그림으로 표현하기']],
         ['함께 토론하기','토끼와 거북이 중 누가 더 잘했는지 근거를 들어 말할 수 있다.',['짝·모둠 토의','토론방 열기']],
         ['독후 작품 만들기','읽은 내용을 바탕으로 독후 작품을 만들어 전시할 수 있다.',['작품 만들기','우리 반 작품에 올리기','평가']]] },
    { id:'korean', ic:'clock', name:'국어수업 4차시', desc:'국어 수업 시간에 맞춘 짧은 구성 · 시수가 빠듯할 때',
      s:[['작품 읽고 이해하기','작품을 읽고 인물·사건·배경을 파악할 수 있다.',['소리 내어 함께 읽기','사건 순서 정리하기']],
         ['인물의 마음 알기','인물의 마음을 짐작하고 까닭을 말할 수 있다.',['인물 마음 지도 그리기','부기와 대화하기']],
         ['내 생각 쓰기','작품에 대한 내 생각을 글로 쓸 수 있다.',['독서록 쓰기','활동지 작성']],
         ['나누고 마무리','친구들과 생각을 나누고 배운 점을 정리할 수 있다.',['생각 나누기·발표','평가']]] },
    { id:'picture', ic:'image', name:'그림책 3차시', desc:'저학년 그림책 수업 · 듣기·관찰·표현 중심',
      s:[['그림책 만나기','표지와 그림을 보고 무슨 이야기일지 상상하여 말할 수 있다.',['표지·제목으로 상상하기','그림 자세히 보기']],
         ['들으며 느끼기','선생님이 읽어 주는 이야기를 듣고 마음을 나눌 수 있다.',['읽어 주기','마음 카드 고르기']],
         ['표현하기','기억에 남는 장면을 그림이나 말로 표현할 수 있다.',['그림으로 표현하기','우리 반 작품에 올리기']]] },
    { id:'morning', ic:'sprout', name:'아침활동 4차시', desc:'아침 10분 독서 루틴 · 짧은 기록과 활동지 중심',
      s:[['오늘의 한 쪽','아침마다 책을 펴고 한 쪽씩 읽는 습관을 기른다.',['혼자 깊이 읽기','한 줄 기록']],
         ['오늘의 어휘','오늘 읽은 쪽에서 새 어휘를 하나 찾는다.',['어휘 찾기','활동지 작성']],
         ['오늘의 문장','마음에 남은 문장을 옮겨 적는다.',['문장 수집하기']],
         ['한 주 돌아보기','한 주 동안 읽은 것을 돌아본다.',['독서록 쓰기','생각 나누기·발표']]] },
    { id:'dlp', ic:'clipboard', name:'디지털 독서지도안', desc:'읽기 전·중·후 발문, 부기 활동, 우리 반 결과를 한자리에서 확인',
      s:[['읽기 전','질문으로 배경지식을 떠올린다.',['질문 만들며 시작하기','표지·제목으로 상상하기']],
         ['읽는 중','디지털 리더로 읽으며 어휘와 장면을 짚는다.',['어휘 뜻 확인','부기와 대화하기']],
         ['읽은 후','우리 반 결과를 한자리에서 확인한다.',['우리 반 작품 보기','학급 리포트 보기']]] }
  ];
  var GUIDE = { title:'2차시 「인물 만나기」 교수·학습 과정안', goal:'토끼와 거북이의 성격과 특징을 파악할 수 있다.',
    rows:[['마음 열기','5분','지난 차시에 상상한 내용과 실제 첫 장면을 비교하며 수업을 시작합니다.',['표지를 보고 상상한 이야기와 어떻게 달랐나요?']],
      ['함께 읽기','15분','선생님이 자랑과 도전 장면까지 읽어 주며 두 인물의 모습을 살펴봅니다. 토끼의 자만과 거북이의 끈기가 어떻게 드러나는지 함께 찾습니다.',['토끼는 무엇을 자랑했나요?','거북이는 토끼에게 무엇을 하자고 했나요?']],
      ['인물 살펴보기','10분','부기와 대화하며 거북이에게 직접 묻듯 마음을 짐작해 봅니다. 답은 하나로 정하지 않고, 근거가 있는 다양한 생각을 받아 줍니다.',['토끼는 어떤 성격일까요? 그렇게 생각한 까닭은 무엇인가요?','거북이가 시합을 하자고 한 까닭은 무엇일까요?']],
      ['정리하기','10분','인물 카드를 만들며 오늘 찾은 성격과 그 까닭을 정리합니다.',['우리 반이 찾은 토끼의 성격은 무엇인가요?']]] };
  var cur = 'whole', SHOWN = 1;   // 소개용으로 앞 3차시만 펼칩니다
  function renderModes() {
    $('modes').innerHTML = PLANS.map(function (p) {
      return '<button class="mode'+(p.id===cur?' on':'')+'" type="button" data-plan="'+p.id+'"><span class="ic">'+ico(p.ic)+'</span>'
        +'<span><b>'+esc(p.name)+'</b><span>'+esc(p.desc)+'</span></span><span class="arw">'+(p.id===cur?'▾':'›')+'</span></button>'; }).join('');
    $('modes').querySelectorAll('[data-plan]').forEach(function (b) {
      b.addEventListener('click', function(){ cur = b.dataset.plan; renderModes(); renderSessions(); $('guideBox').innerHTML=''; }); });
  }
  function renderSessions() {
    var p = PLANS.filter(function(x){ return x.id===cur; })[0];
    $('sessions').innerHTML = '<p style="font-size:13px;color:var(--ink-faint);margin:18px 0 12px">'+esc(p.name)+' · <strong>지도안</strong>을 누르면 차시별 발문까지 볼 수 있습니다.</p>'
      + p.s.slice(0, SHOWN).map(function (s,i) {
        return '<div class="sess"><div class="sess-h"><span class="sess-n">'+(i+1)+'</span><span><b>'+esc(s[0])+'</b><span>토끼와 거북이: '+esc(s[1])+'</span></span></div>'
          +'<div class="acts">'+s[2].map(function(a){ return '<span class="act">'+esc(a)+'</span>'; }).join('')+'<span class="act plus">+ 활동 추가</span></div>'
          +'<div class="mats"><button class="mat" type="button">PPT</button><button class="mat" type="button">활동지</button>'
          +'<button class="mat guide-btn" type="button">지도안</button><button class="mat" type="button">미리보기</button>'
          +'<button class="mat send" type="button">학생에게 배포</button></div></div>'; }).join('')
      + (p.s.length > SHOWN ? '<p class="more-n">…이하 ' + (p.s.length - SHOWN) + '차시가 더 있습니다. 실제 화면에서는 전체 차시를 볼 수 있습니다.</p>' : '')
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:16px">'
      + '<b style="font-family:var(--serif);color:var(--brand-deep)">토끼와 거북이 · '+esc(p.name)+'</b>'
      + '<span style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap">'
      + '<button class="mat" type="button" style="display:inline-flex;align-items:center;gap:7px">'+ico('download','sm')+'전체 PPT 묶음</button>'
      + '<button class="mat on" type="button">이 구성으로 우리 반에 적용 →</button></span></div>';
    $('sessions').querySelectorAll('.guide-btn').forEach(function (b){ b.addEventListener('click', renderGuide); });
  }
  function renderGuide() {
    $('guideBox').innerHTML = '<div class="guide"><span class="gm">수업 지도안</span><h4>'+esc(GUIDE.title)+'</h4>'
      + '<div class="grow"><b>학습 목표</b><p style="margin:0">'+esc(GUIDE.goal)+'</p></div>'
      + GUIDE.rows.map(function (r) { return '<div class="grow"><b>'+esc(r[0])+'<em>('+r[1]+')</em></b><div><p>'+esc(r[2])+'</p>'
        +'<div class="qbox"><div class="ql">'+ico('quote','sm')+'발문 예시</div><ul>'+r[3].map(function(q){ return '<li>'+esc(q)+'</li>'; }).join('')+'</ul></div></div></div>'; }).join('')
      + '<p style="font-size:13.5px;color:var(--ink-faint);margin:14px 0 0">그대로 쓰셔도 되고, 발문만 우리 반 말투에 맞게 고쳐 쓰셔도 됩니다. 한글(.hwpx)로 내보낼 수 있습니다.</p></div>';
  }
  renderModes(); renderSessions();

  /* ── 학급 코드 ────────────────────────────────
     실제 흐름: 학급 코드(영문·숫자 여섯 자) → 명단에서 내 이름 → 짧은 비밀번호 → 우리 반. */
  var ins = [].slice.call(document.querySelectorAll('#digits input'));
  var codeBox = document.querySelector('.codebox');
  function codeReset() {
    ins.forEach(function (x){ x.value = ''; });
    codeBox.classList.remove('done'); $('codeIn').hidden = true;
    $('codePick').hidden = false; $('codePw').hidden = true; $('codeCard').hidden = true;
    $('codeReader').hidden = true; $('pwIn').value = '';
    $('codeMsg').textContent = '영문·숫자 여섯 자를 넣어 보세요 (아무 글자나 됩니다)';
    ins[0].focus();
  }
  function codeCheck() {
    var v = ins.map(function(x){ return x.value; }).join('');
    if (v.length === 6) {                     // 여섯 자를 다 넣으면 명단이 열립니다
      codeBox.classList.add('done'); $('codeIn').hidden = false; fitLive();
    } else {
      $('codeMsg').textContent = v.length===0 ? '영문·숫자 여섯 자를 넣어 보세요 (아무 글자나 됩니다)' : v.length + ' / 6';
    }
  }
  ins.forEach(function (el, i) {
    el.addEventListener('input', function () {
      var d = el.value.replace(/[^0-9a-zA-Z]/g,'').toLowerCase();
      el.value = d.slice(0,1);
      for (var k = 1; k < d.length && i+k < ins.length; k++) ins[i+k].value = d[k];
      var last = Math.min(i + Math.max(d.length,1), ins.length-1);
      if (el.value) ins[last].focus();
      codeCheck();
    });
    el.addEventListener('focus', function (){ el.select(); });
    el.addEventListener('keydown', function (e){ if (e.key==='Backspace' && !el.value && i>0) ins[i-1].focus(); });
  });
  document.querySelectorAll('#codePick .pick').forEach(function (b) {
    b.addEventListener('click', function () {
      $('pwWho').textContent = b.dataset.name; $('cardWho').textContent = b.dataset.name;
      $('codePick').hidden = true; $('codePw').hidden = false; $('pwIn').focus(); fitLive();
    });
  });
  function pwGo() {
    if ($('pwIn').value.length < 1) { $('pwIn').focus(); return; }
    $('codePw').hidden = true; $('codeCard').hidden = false; fitLive();
  }
  $('pwGo').addEventListener('click', pwGo);
  $('pwIn').addEventListener('keydown', function (e){ if (e.key==='Enter') pwGo(); });
  $('codeAgain').addEventListener('click', codeReset);
  // '읽으러 가기'는 쪽을 옮기지 않고 이 쪽 안에서 읽기 화면을 엽니다
  $('codeRead').addEventListener('click', function () {
    $('codeCard').hidden = true; $('codeReader').hidden = false; fitLive();
  });
  $('codeBack').addEventListener('click', function () {
    $('codeReader').hidden = true; $('codeCard').hidden = false; fitLive();
  });

  /* ── 전시장 ──────────────────────────────── */
  var TYPEICO = { '그림':'image', '독후감':'pen', '생각':'bulb' };
  var WORKS = [
    ['경주가 시작돼요','그림','책읽는토끼',21,'#f5c98a',0],['가장 멋진 장면','생각','조용한바람',7,'#f7dfa0',0],
    ['결승선의 거북이','그림','느림보거북',14,'#f3b98d',1],['느려도 괜찮아','독후감','초록나무',18,'#f7d08a',0],
    ['토끼의 낮잠','그림','구름빵',11,'#e8d3a8',0],['내가 거북이라면','독후감','별빛도서관',9,'#f0cfa4',0],
    ['우리 반 달리기','그림','달려라햄스터',16,'#f5c3a0',0],['포기하지 않기','생각','호기심상자',6,'#efdcb4',0]];
  var FIL = ['전체','그림','독후감','생각'], curF = '전체';
  function renderGal() {
    $('galfil').innerHTML = FIL.map(function (f){ return '<button class="pill'+(f===curF?' on':'')+'" type="button" data-f="'+f+'">'+f+'</button>'; }).join('');
    $('galfil').querySelectorAll('[data-f]').forEach(function (b){ b.addEventListener('click', function(){ curF = b.dataset.f; renderGal(); }); });
    $('gcards').innerHTML = WORKS.filter(function(w){ return curF==='전체' || w[1]===curF; }).map(function (w) {
      return '<div class="gcard'+(w[5]?' mine':'')+'"><div class="th" style="background:'+w[4]+'">'
        +(w[5]?'<span class="mn">내 작품</span>':'')+'<span class="kind">'+w[1]+'</span>'+ico(TYPEICO[w[1]])+'</div>'
        +'<div class="bd"><b>'+esc(w[0])+'</b><span>'+esc(w[2])+'</span><span class="lk">♥ '+w[3]+'</span></div></div>'; }).join('');
  }
  renderGal();

  /* ── 학생별 독서 요약 (교사 화면은 학생 이름으로 보입니다) ── */
  var STU = [['김하늘','#5b8def',12,1840,9,7],['이서준','#e8518f',15,2010,12,8],
    ['박다은','#f0a92e',5,680,3,4],['최윤우','#3fae63',11,1720,7,7],
    ['정하린','#8a6bd1',16,2150,14,8],['강지호','#3aa6d8',9,1280,5,6],
    ['윤서아','#f47a8b',7,920,4,5],['한도윤','#2f9e8f',13,1880,8,7]];
  function renderStu() {
    $('stuList').innerHTML = STU.slice(0, 3).map(function (s){ var n = s[0];
      return '<div class="stu"><span class="av" style="background:'+s[1]+'">'+n.charAt(0)+'</span>'
        +'<span><b>'+esc(n)+'</b><span>완독 '+s[2]+'권 · 독서 스코어 '+s[3].toLocaleString()+' · 연속 '+s[4]+'일</span></span>'
        +'<span class="lv2">Lv.'+s[5]+'</span></div>'; }).join('')
      + '<p class="more-n">…이하 ' + (STU.length - 3) + '명이 더 있습니다.</p>';
  }
  renderStu();

  /* ── 기관 관리자 드릴다운 ────────────────── */
  var KIDS31 = [['김도윤',6,350,10,'2026-07-14','#d59a3a'],['이서아',6,357,10,'2026-07-11','#8c6193'],['박지호',6,364,10,'2026-07-09','#5d87ab'],
    ['정하린',5,316,9,'2026-07-02','#2f7d4f'],['최은우',5,323,9,'2026-06-27','#cf7150'],['한소율',5,330,9,'2026-06-25','#cf7150'],
    ['윤민준',5,282,8,'2026-06-18','#d59a3a'],['장예린',5,289,8,'2026-06-11','#8c6193'],['조시우',4,261,7,'2026-06-04','#479b94'],
    ['서다은',4,248,7,'2026-05-28','#479b94'],['신건우',4,255,7,'2026-05-21','#479b94'],['오유나',4,227,6,'2026-05-13','#479b94']];
  var SCHOOLS = [
    { name:'은하수초등학교', cls:4, stu:96, tea:4, done:500, per:'5.2', c:'var(--g2)', w:100,
      classes:[['3학년 1반','김하늘',24,132,KIDS31],['3학년 2반','박서연',23,118,null],['4학년 1반','이준호',25,141,null],['4학년 2반','최민정',24,109,null]] },
    { name:'미리내초등학교', cls:4, stu:88, tea:4, done:452, per:'5.1', c:'var(--g3)', w:90,
      classes:[['3학년 1반','정민서',22,121,null],['3학년 2반','오지훈',22,110,null],['4학년 1반','배수아',22,118,null],['4학년 2반','임태윤',22,103,null]] },
    { name:'노을빛초등학교', cls:3, stu:52, tea:3, done:288, per:'5.5', c:'var(--g5)', w:58,
      classes:[['5학년 1반','문가온',18,102,null],['5학년 2반','조하람',17,95,null],['6학년 1반','권도현',17,91,null]] },
    { name:'달마루초등학교', cls:2, stu:28, tea:2, done:167, per:'6.0', c:'var(--g6)', w:34,
      classes:[['2학년 1반','신유리',14,86,null],['2학년 2반','홍재민',14,81,null]] }];
  var MONTHS = [['3월',188,'#e0a24a'],['4월',232,'#6fa86a'],['5월',270,'#5e93ad'],['6월',306,'#8580c4'],['7월',351,'#b4657f'],['8월',60,null]];
  var KPI = [['참여 학교','4','▲ 1개교'],['운영 학급','13','▲ 2학급'],['참여 학생','264','▲ 9%'],['완독 기록','1,407','▲ 18%']];
  var view = { l:'org', s:0, c:0 };
  function renderAdmin() {
    var cr = ['<button type="button" data-av="org">담당 학교</button>'];
    if (view.l !== 'org') {
      var sc = SCHOOLS[view.s]; cr.push('<span class="sep">›</span>');
      cr.push(view.l==='school' ? '<span class="now">'+esc(sc.name)+'</span>' : '<button type="button" data-av="school">'+esc(sc.name)+'</button>');
      if (view.l==='class') cr.push('<span class="sep">›</span><span class="now">'+esc(sc.classes[view.c][0])+'</span>');
    }
    $('crumb').innerHTML = cr.join('');
    $('crumb').querySelectorAll('[data-av]').forEach(function (b){ b.addEventListener('click', function(){ view.l = b.dataset.av; renderAdmin(); }); });

    var av2 = $('adminView');
    if (view.l === 'org') {
      av2.innerHTML = '<div class="stats4">' + KPI.map(function (k) {
          return '<div class="stat"><div class="up">'+k[2]+'<em>지난달 대비</em></div><div class="v">'+k[1]+'</div><div class="k">'+k[0]+'</div></div>'; }).join('') + '</div>'
        + '<div class="chart"><h3>월별 완독 추이</h3><div class="bars">' + MONTHS.map(function (m) {
            var h = Math.round(m[1]/351*62) + 14;
            return '<div class="bcol'+(m[2]?'':' now')+'"><span class="bv">'+m[1]+'</span><span class="bb2" style="height:'+h+'px'+(m[2]?';background:'+m[2]:'')+'"></span><span class="bl">'+m[0]+'</span></div>'; }).join('')
        + '</div><p style="text-align:right;font-size:13px;color:var(--ink-faint);margin:34px 0 0">8월은 진행 중입니다</p></div>'
        + '<h3 style="font-size:18px;margin:0 0 4px">담당 학교</h3><p style="font-size:13.5px;color:var(--ink-faint);margin:0 0 16px">학교를 누르면 학급 목록이 열립니다</p>'
        + '<div class="schools">' + SCHOOLS.slice(0, 2).map(function (s,i) {
            return '<button class="school" type="button" data-sc="'+i+'" style="border-left-color:'+s.c+'"><h4>'+esc(s.name)+'</h4>'
              +'<div class="m">학급 '+s.cls+' · 학생 '+s.stu+' · 교사 '+s.tea+'</div>'
              +'<div class="d" style="color:'+s.c+'">'+s.done+' <small>권 완독 · 학생당 '+s.per+'권</small></div>'
              +'<div class="pb"><i style="width:'+s.w+'%;background:'+s.c+'"></i></div><span class="go">자세히 →</span></button>'; }).join('') + '</div>';
      av2.querySelectorAll('[data-sc]').forEach(function (b){ b.addEventListener('click', function(){ view.s = +b.dataset.sc; view.l='school'; renderAdmin(); }); });

    } else if (view.l === 'school') {
      var s2 = SCHOOLS[view.s];
      av2.innerHTML = '<h3 style="font-size:22px;margin:0 0 4px">'+esc(s2.name)+'</h3>'
        +'<p style="font-size:13.5px;color:var(--ink-faint);margin:0 0 18px">학급 '+s2.cls+' · 학생 '+s2.stu+' · 1학기 완독 '+s2.done+'권</p>'
        +'<h3 style="font-size:18px;margin:0 0 4px">학급 현황</h3><p style="font-size:13.5px;color:var(--ink-faint);margin:0 0 16px">학급을 누르면 학생 목록이 열립니다</p>'
        +'<div class="schools">' + s2.classes.map(function (c,i) {
            return '<button class="school" type="button" data-cl="'+i+'" style="border-left-color:'+s2.c+'"><h4>'+esc(c[0])+'</h4>'
              +'<div class="m">담임 '+esc(c[1])+' 선생님 · 학생 '+c[2]+'명</div>'
              +'<div class="d" style="color:var(--brand)">완독 '+c[3]+' <small>권</small></div>'
              +'<div class="pb"><i style="width:'+Math.round(c[3]/141*100)+'%;background:'+s2.c+'"></i></div><span class="go">아이들 보기 →</span></button>'; }).join('') + '</div>';
      av2.querySelectorAll('[data-cl]').forEach(function (b){ b.addEventListener('click', function(){ view.c = +b.dataset.cl; view.l='class'; renderAdmin(); }); });

    } else {
      var s3 = SCHOOLS[view.s], c3 = s3.classes[view.c], kids = c3[4];
      av2.innerHTML = '<h3 style="font-size:22px;margin:0 0 4px">'+esc(c3[0])+'</h3>'
        +'<p style="font-size:13.5px;color:var(--ink-faint);margin:0 0 18px">'+esc(s3.name)+' · 담임 '+esc(c3[1])+' · 학생 '+c3[2]+'명 · 완독 '+c3[3]+'권</p>'
        + (kids ? '<h3 style="font-size:18px;margin:0 0 4px">학급 아이들</h3><p style="font-size:13.5px;color:var(--ink-faint);margin:0 0 16px">아이를 누르면 개인 이력이 열립니다</p><div class="kids">'
            + kids.map(function (k) { return '<div class="kid"><div class="ph"><img src="assets/char-new-face.webp" alt="">'
              +'<span class="cap" style="background:'+k[5]+'"></span></div>'
              +'<b>'+esc(k[0])+'</b><div class="lvp"><em>Lv.'+k[1]+'</em>'+k[2]+'P</div><div class="dn2">완독 '+k[3]+'권</div>'
              +'<div class="dt">최근 완독 '+k[4]+'</div></div>'; }).join('') + '</div>'
          : '<div class="shot-ph" style="padding:44px 20px"><b>이 학급의 아이들 데이터는 예시에 포함하지 않았습니다</b><span>은하수초등학교 3학년 1반을 눌러 보세요</span></div>');
    }
  }

  /* ── 사용 후기 제출 폼 ─────────────────────────
     시험 사용 신청은 24쪽 오른쪽 QR(구글 폼)로 받습니다. 이 폼은 이미 써 보신 선생님이
     후기와 수업 사진을 보내는 자리입니다. 접수는 별도의 Apps Script 웹앱이 받아
     구글 시트에 한 줄 쓰고, 사진은 드라이브에 넣은 뒤 그 주소를 시트에 적습니다.
     설치·배포 방법은 web/apps-script/README.md 의 「사용 후기」 절을 보세요. */
  // 후기용 Apps Script 웹앱을 배포한 뒤 나온 /exec 주소를 여기에 넣으세요.
  // (신청용으로 쓰던 주소와 다른 것입니다. 그쪽은 건드리지 않았습니다.)
  var FEEDBACK_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzNDTm-K70EwhrRIN-Ci6f5I5WnQ4WUiwNB1fnX1f7opm5v1fFGSwBIiQHoSiookGEj/exec';

  /* 사진 장수에는 제한을 두지 않습니다 (2026-08-31 대표님 지시).
     대신 총량이 커지면 되돌려 보내지 않고 더 작게 다시 굽습니다. Apps Script가 한 번에
     받을 수 있는 양에는 물리적 한계가 있어서, 거절 대신 화질을 낮추는 쪽을 골랐습니다.
     선생님이 스무 장을 올리든 접수는 됩니다. 다만 장수가 많으면 한 장씩은 덜 선명해집니다. */
  var SHOT_STEPS = [              // 긴 변 px, JPEG 품질 — 총량이 넘치면 아래로 한 칸씩
    { edge: 1600, qual: 0.82 },
    { edge: 1280, qual: 0.75 },
    { edge: 1024, qual: 0.70 },
    { edge:  800, qual: 0.62 }
  ];
  var SHOT_BUDGET = 7 * 1024 * 1024;   // 한 번에 보낼 총량 목표(줄인 뒤 기준)

  (function feedbackForm() {
    var form = $('fbForm'); if (!form) return;
    var GRADES = ['1학년','2학년','3학년','4학년','5학년','6학년','전학년'];
    $('f-grades').innerHTML = GRADES.map(function (g) {
      return '<label class="gchk"><input type="checkbox" value="'+g+'"><span>'+g+'</span></label>'; }).join('');

    function fldOf(el){ return el.closest('.fld'); }
    function bad(el, on){ var f = fldOf(el); if (f) f.classList.toggle('bad', !!on); }
    form.querySelectorAll('input,select,textarea').forEach(function (el) {
      el.addEventListener('input', function(){ bad(el, false); });
      el.addEventListener('change', function(){ bad(el, false); });
    });

    function msg(kind, text) {
      var m = $('fbMsg');
      m.className = 'formmsg on ' + kind;
      m.innerHTML = text;
    }

    /* ── 사진 고르기 ───────────────────────────
       원본을 그대로 보내면 한 장에 5MB가 넘어 Apps Script가 받다 끊깁니다.
       캔버스로 줄여서 보냅니다. 장수 제한은 없고, 총량이 넘치면 더 작게 다시 굽습니다. */
    var shots = [];       // { file, name, mime, data(base64), url(미리보기) }
    var shotStep = 0;     // 지금 쓰고 있는 SHOT_STEPS 단계

    function drawThumbs() {
      $('f-thumbs').innerHTML = shots.map(function (s, i) {
        return '<span class="thumb"><img src="' + s.url + '" alt="">'
             + '<button type="button" data-x="' + i + '" aria-label="' + esc(s.name) + ' 빼기">×</button></span>';
      }).join('');
      $('f-thumbs').querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          URL.revokeObjectURL(shots[+b.dataset.x].url);
          shots.splice(+b.dataset.x, 1); drawThumbs(); fitLive();
        });
      });
    }

    function shrink(file, step) {
      var S = SHOT_STEPS[step];
      return new Promise(function (done, fail) {
        var img = new Image(), url = URL.createObjectURL(file);
        img.onload = function () {
          var k = Math.min(1, S.edge / Math.max(img.width, img.height));
          var c = document.createElement('canvas');
          c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          URL.revokeObjectURL(url);
          var dataUrl = c.toDataURL('image/jpeg', S.qual);
          done({ file: file, name: file.name, mime: 'image/jpeg',
                 data: dataUrl.slice(dataUrl.indexOf(',') + 1),
                 url: dataUrl });
        };
        img.onerror = function () { URL.revokeObjectURL(url); fail(new Error(file.name)); };
        img.src = url;
      });
    }

    function bytes() {
      return shots.reduce(function (n, s) { return n + s.data.length * 0.75; }, 0);
    }
    function mb(n) { return (n / 1024 / 1024).toFixed(1); }

    // 총량이 목표를 넘으면 전부 한 단계 작게 다시 굽습니다. 마지막 단계까지 가면 거기서 멈춥니다.
    function refit() {
      if (bytes() <= SHOT_BUDGET || shotStep >= SHOT_STEPS.length - 1) return Promise.resolve();
      shotStep++;
      return Promise.all(shots.map(function (s) { return shrink(s.file, shotStep); }))
        .then(function (list) { shots = list; return refit(); });
    }

    $('f-shots').addEventListener('change', function (e) {
      var files = [].slice.call(e.target.files || []);
      e.target.value = '';                       // 같은 파일을 다시 고를 수 있게
      if (!files.length) return;
      msg('ok', '사진 ' + files.length + '장을 담는 중입니다.');
      Promise.all(files.map(function (f) { return shrink(f, shotStep); })).then(function (list) {
        shots = shots.concat(list);
        var before = shotStep;
        return refit().then(function () {
          drawThumbs(); fitLive();
          if (shotStep > before) {
            msg('ok', '사진 ' + shots.length + '장을 담았습니다. 양이 많아 화질을 조금 낮췄습니다. ('
                    + mb(bytes()) + 'MB)');
          } else {
            msg('ok', '사진 ' + shots.length + '장을 담았습니다. (' + mb(bytes()) + 'MB)');
          }
        });
      }).catch(function () {
        msg('no', '사진을 읽지 못했습니다. 다른 파일로 해 보시겠어요?');
      });
    });

    /* ── 보내기 ───────────────────────────────── */
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = {
        org:    $('f-org').value.trim(),
        name:   $('f-name').value.trim(),
        note:   $('f-note').value.trim(),
        grades: [].slice.call($('f-grades').querySelectorAll('input:checked')).map(function(c){ return c.value; }),
        agreePromo:   $('a-promo').checked,
        photos: shots.map(function (s) { return { name: s.name, mime: s.mime, data: s.data }; })
      };

      var first = null;
      function need(el, ok){ if (!ok) { bad(el, true); if (!first) first = el; } return ok; }
      need($('f-org'),  v.org.length > 0);
      need($('f-name'), v.name.length > 0);
      need($('f-note'), v.note.length > 0);
      if (first) { first.focus(); msg('no', '표시된 항목을 확인해 주세요.'); return; }

      var btn = $('fbBtn');
      function wake(text) { btn.disabled = false; btn.textContent = '후기 보내기'; if (text) msg('no', text); }
      btn.disabled = true; btn.textContent = '보내는 중…';
      msg('ok', v.photos.length ? '후기와 사진을 보내고 있습니다. 사진이 있으면 조금 걸립니다.' : '후기를 보내고 있습니다.');

      if (!FEEDBACK_ENDPOINT) {
        wake('아직 접수 서버가 연결되지 않았습니다. <code>web/app.js</code>의 <b>FEEDBACK_ENDPOINT</b>에 '
           + 'Apps Script 웹앱 주소를 넣어 주세요. 설치 방법은 <code>web/apps-script/README.md</code>에 있습니다.');
        return;
      }

      fetch(FEEDBACK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },   // preflight 회피
        body: JSON.stringify(v)
      })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res.ok) {
          form.style.display = 'none';
          $('doneWho').textContent = v.name + ' 선생님(' + v.org + ')께서 보내 주신 후기를 받았습니다.'
            + (v.photos.length ? ' 사진 ' + v.photos.length + '장도 함께 받았습니다.' : '');
          $('fbDone').style.display = 'block';
          fitLive(); fitSpots();   // 완료 상자로 바뀌며 높이가 달라졌으니 다시 맞춥니다
        } else {
          wake((res && res.error) || '접수에 실패했습니다. 잠시 뒤 다시 시도해 주세요.');
        }
      })
      .catch(function () {
        wake('연결에 실패했습니다. 인터넷 상태를 확인하시고 다시 시도해 주세요. 계속 안 되면 msecm@msecm.co.kr 로 보내 주세요.');
      });
    });
  })();

  renderAdmin();

  // 백 칸 격자 — data-on 만큼 칠합니다. 소수점은 마지막 한 칸을 옅게 칠해 표시합니다.
  document.querySelectorAll('.dots').forEach(function (d) {
    var on = parseFloat(d.dataset.on) || 0, html = '';
    for (var i = 0; i < 100; i++) html += '<i class="' + (i < Math.floor(on) ? 'on' : (i < Math.ceil(on) ? 'edge' : '')) + '"></i>';
    d.innerHTML = html;
  });

  buildToc();
  build(false);
  route();
})();
