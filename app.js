/**
 * 學生身份 Vibe Coding 跨領域創新專案 - 鐵人賽科幻圖文檔案庫
 * CASE FILE 001 · 主案件：Vibe Coding 跨域創新事件調查
 * 核心互動邏輯與動態渲染引擎 (分頁一：三重視圖/四色連線/三大隱藏劇情 + 分頁二：Masonry 瀑布流)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. 取得全域資料
  // ==========================================
  const rawData = window.IRONMAN_DATA || { articles: [], case_arcs: {} };
  const articles = rawData.articles || [];
  const caseArcs = rawData.case_arcs || {};

  // 取得案件線索推理系統資料庫
  const evidenceSys = window.CASE_EVIDENCE_SYSTEM || {
    types: {},
    lines: {},
    hiddenStorylines: [],
    connections: [],
    exhibits: {}
  };
  const exhibitTypes = evidenceSys.types;
  const investLines = evidenceSys.lines;
  const hiddenStories = evidenceSys.hiddenStorylines;
  const allConnections = evidenceSys.connections;
  const exhibitsDb = evidenceSys.exhibits;

  // 狀態變數
  let currentTab = 'clueBoard'; // 'clueBoard' | 'articleCodex'
  let currentSubView = 'pinboard'; // 'pinboard' | 'timeline' | 'inference'
  let activeEvidenceType = 'ALL'; // 'ALL' | 'E1' ~ 'E6'
  let activeInvestLine = 'ALL'; // 'ALL' | 'LINE_A' ~ 'LINE_F'
  let activeStorylineId = null; // null | 'HIDDEN_01' ~ '03'
  let clueSearchKeyword = '';
  let codexSearchKeyword = '';
  let showNetLines = true;

  // 案件牆畫布平移與縮放狀態 (Pan & Zoom)
  let panX = 0;
  let panY = 0;
  let canvasScale = 1.0;
  let isDraggingCanvas = false;
  let startDragX = 0;
  let startDragY = 0;
  let dragDistance = 0;
  let hasDraggedFar = false;

  // DOM 元素引用 - 主分頁
  const tabBtnClue = document.getElementById('tabBtnClue');
  const tabBtnCodex = document.getElementById('tabBtnCodex');
  const viewClueBoard = document.getElementById('viewClueBoard');
  const viewArticleCodex = document.getElementById('viewArticleCodex');

  // DOM 元素引用 - 分頁一子視圖
  const btnSubViewPinboard = document.getElementById('btnSubViewPinboard');
  const btnSubViewTimeline = document.getElementById('btnSubViewTimeline');
  const btnSubViewInference = document.getElementById('btnSubViewInference');
  const subviewPinboard = document.getElementById('subviewPinboard');
  const subviewTimeline = document.getElementById('subviewTimeline');
  const subviewInference = document.getElementById('subviewInference');

  // DOM 元素引用 - 分頁一控制項
  const evidenceTypeGroup = document.getElementById('evidenceTypeGroup');
  const investigationLinesGroup = document.getElementById('investigationLinesGroup');
  const hiddenStorylinesBar = document.getElementById('hiddenStorylinesBar');
  const btnToggleNetLines = document.getElementById('btnToggleNetLines');
  const clueSearchInput = document.getElementById('clueSearchInput');
  const clueSearchIndicator = document.getElementById('clueSearchIndicator');

  // DOM 元素引用 - 隱藏劇情抽屜
  const storylineDrawer = document.getElementById('storylineDrawer');
  const drawerIcon = document.getElementById('drawerIcon');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerHypothesis = document.getElementById('drawerHypothesis');
  const drawerQuestion = document.getElementById('drawerQuestion');
  const drawerDaysPills = document.getElementById('drawerDaysPills');
  const btnDrawerClose = document.getElementById('btnDrawerClose');

  // DOM 元素引用 - 案件板平移視窗與縮放控制器
  const pinboardViewport = document.getElementById('pinboardViewport');
  const btnCanvasZoomIn = document.getElementById('btnCanvasZoomIn');
  const btnCanvasZoomReset = document.getElementById('btnCanvasZoomReset');
  const btnCanvasZoomOut = document.getElementById('btnCanvasZoomOut');

  // DOM 元素引用 - 案件板畫布與連線
  const pinboardContainer = document.getElementById('pinboardContainer');
  const clueWiresSvg = document.getElementById('clueWiresSvg');
  const clueCardsGrid = document.getElementById('clueCardsGrid');
  const wireTooltip = document.getElementById('wireTooltip');
  const timelineContainer = document.getElementById('timelineContainer');
  const inferenceContainer = document.getElementById('inferenceContainer');

  // DOM 元素引用 - 分頁二
  const codexMasonryWall = document.getElementById('codexMasonryWall');
  const codexSearchInput = document.getElementById('codexSearchInput');
  const codexFilterStats = document.getElementById('codexFilterStats');
  const totalImagesCount = document.getElementById('totalImagesCount');

  // DOM 元素引用 - Modal 檢視器
  const clueModal = document.getElementById('clueModal');
  const btnClueModalClose = document.getElementById('btnClueModalClose');
  const modalClueImg = document.getElementById('modalClueImg');
  const modalClueId = document.getElementById('modalClueId');
  const modalClueType = document.getElementById('modalClueType');
  const modalClueArc = document.getElementById('modalClueArc');
  const modalClueTitle = document.getElementById('modalClueTitle');
  const modalClueArticleSub = document.getElementById('modalClueArticleSub');
  const modalTagsRow = document.getElementById('modalTagsRow');
  const modalClueMeaning = document.getElementById('modalClueMeaning');
  const modalClueStory = document.getElementById('modalClueStory');
  const modalLinkedExhibitsList = document.getElementById('modalLinkedExhibitsList');
  const modalClueArticleBtn = document.getElementById('modalClueArticleBtn');

  // Lightbox 元素
  const lightboxModal = document.getElementById('lightboxModal');
  const btnLightboxClose = document.getElementById('btnLightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  // 計算並更新總圖片數
  let totalImgCounter = 0;
  articles.forEach(a => {
    totalImgCounter += (a.all_images ? a.all_images.length : 0);
  });
  if (totalImagesCount) {
    totalImagesCount.textContent = `${totalImgCounter} IMAGES`;
  }

  // 篩選出具備 AI 概念圖的 Day 1 ~ Day 28 文章
  const clueArticles = articles.filter(a => a.day !== null && a.ai_image && !a.is_extra);

  // ==========================================
  // 2. 主分頁切換邏輯 (Tab Switching)
  // ==========================================
  function switchTab(tabId) {
    currentTab = tabId;
    if (tabId === 'clueBoard') {
      tabBtnClue.classList.add('active');
      tabBtnCodex.classList.remove('active');
      viewClueBoard.classList.add('active');
      viewArticleCodex.classList.remove('active');
      if (currentSubView === 'pinboard') {
        setTimeout(renderNetLines, 200);
      }
    } else {
      tabBtnCodex.classList.add('active');
      tabBtnClue.classList.remove('active');
      viewArticleCodex.classList.add('active');
      viewClueBoard.classList.remove('active');
    }
  }

  tabBtnClue.addEventListener('click', () => switchTab('clueBoard'));
  tabBtnCodex.addEventListener('click', () => switchTab('articleCodex'));

  // ==========================================
  // 3. 子視圖切換邏輯 (Sub-View Switcher)
  // ==========================================
  function switchClueSubView(viewKey) {
    currentSubView = viewKey;

    // 更新按鈕樣式
    btnSubViewPinboard.classList.toggle('active', viewKey === 'pinboard');
    btnSubViewTimeline.classList.toggle('active', viewKey === 'timeline');
    btnSubViewInference.classList.toggle('active', viewKey === 'inference');

    // 切換面板容器
    subviewPinboard.classList.toggle('active', viewKey === 'pinboard');
    subviewTimeline.classList.toggle('active', viewKey === 'timeline');
    subviewInference.classList.toggle('active', viewKey === 'inference');

    if (viewKey === 'pinboard') {
      renderClueBoard();
      setTimeout(renderNetLines, 200);
    } else if (viewKey === 'timeline') {
      renderInvestigationTimeline();
    } else if (viewKey === 'inference') {
      renderInferenceGraph();
    }
  }

  btnSubViewPinboard.addEventListener('click', () => switchClueSubView('pinboard'));
  btnSubViewTimeline.addEventListener('click', () => switchClueSubView('timeline'));
  btnSubViewInference.addEventListener('click', () => switchClueSubView('inference'));

  // ==========================================
  // 4. 篩選與隱藏劇情互動事件
  // ==========================================

  // (1) 證物類型 (E1 ~ E6) 篩選
  if (evidenceTypeGroup) {
    evidenceTypeGroup.querySelectorAll('.f-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        evidenceTypeGroup.querySelectorAll('.f-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeEvidenceType = pill.dataset.type;
        refreshActiveSubView();
      });
    });
  }

  // (2) 六條跨域調查支線 (線索 A ~ F) 切換
  if (investigationLinesGroup) {
    investigationLinesGroup.querySelectorAll('.line-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        investigationLinesGroup.querySelectorAll('.line-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeInvestLine = btn.dataset.line;
        // 如果當前不在案件牆，切換回案件牆進行聚焦
        if (currentSubView !== 'pinboard' && activeInvestLine !== 'ALL') {
          switchClueSubView('pinboard');
        } else {
          refreshActiveSubView();
        }
      });
    });
  }

  // (4) 三大解鎖隱藏劇情觸發
  if (hiddenStorylinesBar) {
    hiddenStorylinesBar.querySelectorAll('.storyline-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const storyId = btn.dataset.story;
        if (activeStorylineId === storyId) {
          closeStorylineDrawer();
        } else {
          openStorylineDrawer(storyId);
        }
      });
    });
  }

  function openStorylineDrawer(storyId) {
    activeStorylineId = storyId;
    const story = hiddenStories.find(s => s.id === storyId);
    if (!story) return;

    // 高亮按鈕
    hiddenStorylinesBar.querySelectorAll('.storyline-trigger-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.story === storyId);
    });

    // 填寫抽屜內容
    drawerIcon.textContent = story.icon;
    drawerTitle.textContent = `隱藏劇情 ${story.number}｜${story.title}`;
    drawerHypothesis.textContent = story.hypothesis;
    drawerQuestion.textContent = story.unlockQuestion;

    // 證物鏈 Pills
    drawerDaysPills.innerHTML = '';
    story.days.forEach(dayNum => {
      const pill = document.createElement('span');
      const exInfo = exhibitsDb[dayNum] || {};
      pill.className = 'chain-pill';
      pill.textContent = `Day ${String(dayNum).padStart(2, '0')} · ${exInfo.caption || '證物'}`;
      pill.addEventListener('click', () => {
        const art = clueArticles.find(a => a.day === dayNum);
        if (art) openClueModal(art, exInfo);
      });
      drawerDaysPills.appendChild(pill);
    });

    storylineDrawer.classList.add('active');

    // 若不在案件牆，自動切換至案件牆並繪製專屬連線
    if (currentSubView !== 'pinboard') {
      switchClueSubView('pinboard');
    } else {
      renderClueBoard();
    }
  }

  function closeStorylineDrawer() {
    activeStorylineId = null;
    hiddenStorylinesBar.querySelectorAll('.storyline-trigger-btn').forEach(b => b.classList.remove('active'));
    storylineDrawer.classList.remove('active');
    refreshActiveSubView();
  }

  if (btnDrawerClose) {
    btnDrawerClose.addEventListener('click', closeStorylineDrawer);
  }

  // (5) 搜尋事件
  if (clueSearchInput) {
    clueSearchInput.addEventListener('input', (e) => {
      clueSearchKeyword = e.target.value.trim().toLowerCase();
      refreshActiveSubView();
    });
  }

  // (6) 連線開關按鈕
  if (btnToggleNetLines) {
    btnToggleNetLines.addEventListener('click', () => {
      showNetLines = !showNetLines;
      clueWiresSvg.style.display = showNetLines ? 'block' : 'none';
      const indicator = btnToggleNetLines.querySelector('.t-indicator');
      const text = btnToggleNetLines.querySelector('span:last-child');
      if (indicator) indicator.classList.toggle('active', showNetLines);
      if (text) text.textContent = `連線：${showNetLines ? '開' : '關'}`;
      if (showNetLines && currentSubView === 'pinboard') renderNetLines();
    });
  }

  function refreshActiveSubView() {
    if (currentSubView === 'pinboard') {
      renderClueBoard();
    } else if (currentSubView === 'timeline') {
      renderInvestigationTimeline();
    } else if (currentSubView === 'inference') {
      renderInferenceGraph();
    }
  }


  // ==========================================
  // 5. 渲染視圖 A：案件牆 (Clue Pinboard Wall)
  // 嚴格 16:9 劇院寬螢幕畫布 (2560 x 1440) + 智慧防重疊排列引擎
  // ==========================================
  const CARD_W = 230;
  const CARD_H_EST = 295;
  const SAFETY_MARGIN_X = 26; // 水平嚴格安全防護邊距
  const SAFETY_MARGIN_Y = 22; // 垂直嚴格安全防護邊距
  const BOARD_W = 2560;       // 16:9 寬螢幕基準寬度
  const BOARD_H = 1440;       // 16:9 寬螢幕基準高度

  function getFilteredClueArticles() {
    return clueArticles.filter(art => {
      const day = art.day;
      const exInfo = exhibitsDb[day] || {};

      // 1. 證物類型篩選 (E1 ~ E6)
      if (activeEvidenceType !== 'ALL') {
        const primary = exInfo.primaryType;
        const secondary = exInfo.secondaryTypes || [];
        if (primary !== activeEvidenceType && !secondary.includes(activeEvidenceType)) {
          return false;
        }
      }

      // 2. 調查支線篩選
      if (activeInvestLine !== 'ALL') {
        const line = investLines[activeInvestLine];
        if (line && !line.days.includes(day)) {
          return false;
        }
      }

      // 4. 隱藏劇情篩選
      if (activeStorylineId) {
        const story = hiddenStories.find(s => s.id === activeStorylineId);
        if (story && !story.days.includes(day)) {
          return false;
        }
      }

      // 5. 關鍵字搜尋
      if (clueSearchKeyword) {
        const titleMatch = art.title.toLowerCase().includes(clueSearchKeyword);
        const dayMatch = String(day).includes(clueSearchKeyword);
        const captionMatch = (exInfo.caption || '').toLowerCase().includes(clueSearchKeyword);
        const noteMatch = (exInfo.dossierNote || '').toLowerCase().includes(clueSearchKeyword);
        const tagMatch = (exInfo.tags || []).some(t => t.toLowerCase().includes(clueSearchKeyword));
        if (!titleMatch && !dayMatch && !captionMatch && !noteMatch && !tagMatch) {
          return false;
        }
      }

      return true;
    });
  }

  function renderClueBoard() {
    clueCardsGrid.innerHTML = '';
    const filtered = getFilteredClueArticles();

    if (clueSearchIndicator) {
      clueSearchIndicator.textContent = `${filtered.length} / ${clueArticles.length}`;
    }

    if (filtered.length === 0) {
      clueCardsGrid.innerHTML = '<p style="color:rgba(200,160,90,0.5);font-family:var(--font-typewriter);padding:80px;text-align:center;">--- 未檢索到任何相關案件證物 ---</p>';
      if (clueWiresSvg) clueWiresSvg.innerHTML = '';
      return;
    }

    const count = filtered.length;
    const placed = [];

    // 動態自適應計算欄數與槽位尺寸（全量 28 張時採用橫向 7 欄 x 4 排，完美呈現 16:9 寬螢幕全景）
    let cols = 7;
    if (count <= 3) {
      cols = Math.max(count, 1);
    } else if (count <= 6) {
      cols = 3;
    } else if (count <= 10) {
      cols = 5;
    } else if (count <= 16) {
      cols = 6;
    } else {
      cols = 7;
    }

    const paddingX = 70;
    const usableW = BOARD_W - paddingX * 2;
    const colWidth = usableW / cols;
    const paddingY = 55;
    const usableH = BOARD_H - paddingY * 2;
    const rows = Math.ceil(count / cols);
    const rowHeight = Math.max(315, usableH / Math.max(rows, 1));
    const startY = paddingY;

    // 剛性防重疊檢測器：回傳是否有任何交集
    function hasOverlap(x, y, w, h, placedList, marginX = SAFETY_MARGIN_X, marginY = SAFETY_MARGIN_Y) {
      for (const r of placedList) {
        if (
          x < r.x + r.w + marginX &&
          x + w + marginX > r.x &&
          y < r.y + r.h + marginY &&
          y + h + marginY > r.y
        ) {
          return true;
        }
      }
      return false;
    }

    filtered.forEach((art, index) => {
      const day = art.day;
      const exInfo = exhibitsDb[day] || {};
      const typeDef = exhibitTypes[exInfo.primaryType] || { badgeText: 'E1 證物', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', icon: '⚙️' };

      const card = document.createElement('div');
      card.className = 'clue-card';
      card.dataset.day = day;
      card.dataset.arc = art.arc ? art.arc.arc_id : 'NONE';

      const arcCode = art.arc ? art.arc.arc_code : 'DOSSIER';
      const cleanCaption = exInfo.caption || (art.ai_image ? art.ai_image.caption : art.title);
      const imgSrc = (art.ai_image && art.ai_image.local_file) ? art.ai_image.local_file : (art.ai_image ? art.ai_image.online_url : '');
      const fallbackUrl = (art.ai_image && art.ai_image.online_url) ? art.ai_image.online_url : '';

      // 標籤預覽 (最多 2 個)
      const tagsHtml = (exInfo.tags || []).slice(0, 2).map(t => `<span class="card-tag-pill">${t}</span>`).join('');
      // 推理狀態
      const statusText = exInfo.status || '已建立關聯';

      card.innerHTML = `
        <div class="clue-top-bar">
          <span class="clue-num">EXHIBIT #D${String(day).padStart(2, '0')}</span>
          <span class="clue-arc-badge">${arcCode}</span>
        </div>
        <div class="clue-thumb-wrap">
          <img src="${imgSrc}" 
               alt="${cleanCaption}" 
               loading="lazy" 
               referrerpolicy="no-referrer"
               onerror="this.onerror=null; this.src='${fallbackUrl}'">
        </div>
        <div class="clue-meta-desc">
          <div class="exhibit-type-capsule" style="background:${typeDef.bg}; color:${typeDef.color}; border:1px solid ${typeDef.border};">
            <span>${typeDef.icon}</span>
            <span>${typeDef.badgeText}</span>
          </div>
          <div class="clue-meaning-tag">${cleanCaption}</div>
          <div class="clue-title-sub">篇章：${art.title}</div>
          <div class="exhibit-tags-row">
            <span class="exhibit-status-badge">[${statusText}]</span>
            ${tagsHtml}
          </div>
        </div>
        <div class="clue-card-footer">
          <span>INVESTIGATION // VERIFIED</span>
          <span class="btn-inspect-mini">檢驗證物 ↗</span>
        </div>
      `;

      card.addEventListener('click', () => {
        if (hasDraggedFar) return;
        openClueModal(art, exInfo);
      });

      // 計算基礎格位 (Grid Slot)
      const col = index % cols;
      const row = Math.floor(index / cols);

      // 偶數排稍微交錯 (Staggered)，營造蜂巢錯落的真實案情板感
      const staggerX = (row % 2 === 1 && cols > 3) ? 30 : 0;
      const slotBaseX = paddingX + col * colWidth + staggerX;
      const slotBaseY = startY + row * rowHeight;

      // 槽內安全有機擾動範圍 (在槽內微位移，保證不會跑到鄰居槽內)
      const maxJitterX = Math.max(0, colWidth - CARD_W - SAFETY_MARGIN_X);
      const maxJitterY = Math.max(0, rowHeight - CARD_H_EST - SAFETY_MARGIN_Y);

      // 以索引為種子產生穩定的有機微位移
      const pseudoRandX = ((index * 37 + 13) % 100) / 100;
      const pseudoRandY = ((index * 53 + 29) % 100) / 100;
      let targetX = Math.round(slotBaseX + pseudoRandX * maxJitterX);
      let targetY = Math.round(slotBaseY + pseudoRandY * maxJitterY);

      // 雙重防護：若有任何重疊碰撞，向下推移避開，保證 100% 絕對零重疊
      let attempts = 0;
      while (hasOverlap(targetX, targetY, CARD_W, CARD_H_EST, placed, SAFETY_MARGIN_X, SAFETY_MARGIN_Y) && attempts < 50) {
        targetY += 20;
        attempts++;
      }

      card.style.left = targetX + 'px';
      card.style.top  = targetY + 'px';
      placed.push({ x: targetX, y: targetY, w: CARD_W, h: CARD_H_EST });

      // Noir 大頭針微旋轉：使用受控微角度 (-2.4° ~ +2.4°)
      const fineRotations = [-2.4, -1.8, -1.0, -0.4, 0, 0.4, 1.0, 1.8, 2.4];
      const rot = fineRotations[(index * 3) % fineRotations.length];
      card.style.transform = `rotate(${rot}deg)`;
      card.style.setProperty('--card-rot', `${rot}deg`);

      clueCardsGrid.appendChild(card);
    });

    // 維持 16:9 比例邊界
    const maxY = Math.max(placed.reduce((m, r) => Math.max(m, r.y + r.h), 0) + 80, BOARD_H);
    clueCardsGrid.style.minHeight = maxY + 'px';
    pinboardContainer.style.minHeight = maxY + 'px';
    pinboardContainer.style.width = BOARD_W + 'px';
    clueCardsGrid.style.width = BOARD_W + 'px';

    setTimeout(renderNetLines, 140);
  }

  // ==========================================
  // 6. 四色 SVG 案件連線繪製引擎 (Multi-Color Crime Wires)
  // ==========================================
  function renderNetLines() {
    if (!showNetLines || currentTab !== 'clueBoard' || currentSubView !== 'pinboard') {
      clueWiresSvg.innerHTML = '';
      return;
    }

    const renderedCards = {};
    clueCardsGrid.querySelectorAll('.clue-card').forEach(card => {
      const d = parseInt(card.dataset.day, 10);
      renderedCards[d] = card;
    });

    const containerRect = pinboardContainer.getBoundingClientRect();
    let svgContent = '';

    // 連線樣式配色與設定
    const wireStyles = {
      red: {
        color: '#ef4444',
        shadow: 'rgba(239, 68, 68, 0.25)',
        dash: '',
        width: 2.2,
        name: '🔴 敘事推進'
      },
      blue: {
        color: '#38bdf8',
        shadow: 'rgba(56, 189, 248, 0.25)',
        dash: '6 4',
        width: 2.0,
        name: '🔵 概念呼應'
      },
      yellow: {
        color: '#f59e0b',
        shadow: 'rgba(245, 158, 11, 0.25)',
        dash: '8 3',
        width: 2.0,
        name: '🟡 矛盾反例'
      },
      purple: {
        color: '#a855f7',
        shadow: 'rgba(168, 85, 247, 0.25)',
        dash: '3 3',
        width: 2.2,
        name: '🟣 隱藏關聯'
      }
    };

    // 篩選要畫出的連線
    let connectionsToDraw = allConnections;

    // 若聚焦在特定支線，只畫該支線的連線
    if (activeInvestLine !== 'ALL') {
      connectionsToDraw = connectionsToDraw.filter(c => c.lineId === activeInvestLine);
    }
    // 若聚焦在隱藏劇情，只畫該劇情 Days 間的連線
    if (activeStorylineId) {
      const story = hiddenStories.find(s => s.id === activeStorylineId);
      if (story) {
        connectionsToDraw = connectionsToDraw.filter(c => story.days.includes(c.from) && story.days.includes(c.to));
      }
    }

    connectionsToDraw.forEach((conn, idx) => {
      const card1 = renderedCards[conn.from];
      const card2 = renderedCards[conn.to];
      if (!card1 || !card2) return;

      // 使用內部絕對坐標，不受畫布平移與縮放干擾
      const x1 = card1.offsetLeft + card1.offsetWidth / 2;
      const y1 = card1.offsetTop  + card1.offsetHeight / 2;
      const x2 = card2.offsetLeft + card2.offsetWidth / 2;
      const y2 = card2.offsetTop  + card2.offsetHeight / 2;

      // 弧度控制點
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.hypot(dx, dy);
      const curvature = Math.min(dist * 0.15, 60);
      const cx = (x1 + x2) / 2 - (dy / dist) * curvature;
      const cy = (y1 + y2) / 2 + (dx / dist) * curvature;

      const style = wireStyles[conn.type] || wireStyles.red;
      const pathId = `wire_path_${idx}`;

      // 外層發光陰影
      svgContent += `
        <path d="M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}" 
              stroke="${style.shadow}" 
              stroke-width="7" 
              stroke-linecap="round" 
              fill="none" />
      `;

      // 主線路 (帶事件互動)
      const dashAttr = style.dash ? `stroke-dasharray="${style.dash}"` : '';
      svgContent += `
        <path id="${pathId}" 
              class="crime-wire" 
              data-type="${conn.type}" 
              data-from="${conn.from}" 
              data-to="${conn.to}" 
              data-reason="${escapeHtml(conn.reason)}" 
              data-typename="${style.name}"
              d="M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}" 
              stroke="${style.color}" 
              stroke-width="${style.width}" 
              ${dashAttr} 
              stroke-linecap="round" 
              fill="none" 
              style="cursor:pointer;" />
      `;

      // 端點圖釘
      svgContent += `
        <circle cx="${x1}" cy="${y1}" r="4" fill="${style.color}" stroke="#100d0a" stroke-width="1.5" />
        <circle cx="${x2}" cy="${y2}" r="4" fill="${style.color}" stroke="#100d0a" stroke-width="1.5" />
      `;
    });

    clueWiresSvg.innerHTML = svgContent;
    bindWireHoverEvents();
  }

  // 綁定連線 Hover 提示 (Tooltip)
  function bindWireHoverEvents() {
    clueWiresSvg.querySelectorAll('.crime-wire').forEach(wire => {
      wire.addEventListener('mouseenter', (e) => {
        wire.setAttribute('stroke-width', '4');
        const reason = wire.dataset.reason;
        const typeName = wire.dataset.typename;
        const from = wire.dataset.from;
        const to = wire.dataset.to;

        if (wireTooltip) {
          wireTooltip.innerHTML = `
            <div class="wt-type">${typeName} · Day ${String(from).padStart(2, '0')} ➔ Day ${String(to).padStart(2, '0')}</div>
            <div class="wt-reason">${reason}</div>
          `;
          wireTooltip.style.display = 'block';
          updateTooltipPos(e);
        }
      });

      wire.addEventListener('mousemove', (e) => {
        updateTooltipPos(e);
      });

      wire.addEventListener('mouseleave', () => {
        const origType = wire.dataset.type;
        const origW = (origType === 'red' || origType === 'purple') ? 2.2 : 2.0;
        wire.setAttribute('stroke-width', origW);
        if (wireTooltip) wireTooltip.style.display = 'none';
      });
    });
  }

  function updateTooltipPos(e) {
    if (!wireTooltip || !pinboardViewport) return;
    const viewportRect = pinboardViewport.getBoundingClientRect();
    const x = e.clientX - viewportRect.left + 16;
    const y = e.clientY - viewportRect.top + 16;
    wireTooltip.style.left = `${x}px`;
    wireTooltip.style.top = `${y}px`;
  }

  // ==========================================
  // 6.5 案件牆畫布拖動平移與縮放引擎 (Pan & Zoom Engine)
  // ==========================================
  function initPanZoomEngine() {
    if (!pinboardViewport || !pinboardContainer) return;

    function updateCanvasTransform(animate = false) {
      // 限制縮放範圍 0.35x ~ 1.8x
      canvasScale = Math.min(Math.max(canvasScale, 0.35), 1.8);

      // 邊界保護：防止拖出可視區域太遠 (依據 16:9 畫布 2560 x 1440)
      const vpW = pinboardViewport.clientWidth || 1100;
      const vpH = pinboardViewport.clientHeight || 620;
      const boardW = 2560 * canvasScale;
      const boardH = 1440 * canvasScale;

      const minX = vpW - boardW - 100;
      const maxX = 100;
      const minY = vpH - boardH - 100;
      const maxY = 100;

      panX = Math.min(Math.max(panX, minX), maxX);
      panY = Math.min(Math.max(panY, minY), maxY);

      pinboardContainer.style.transition = animate ? 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
      pinboardContainer.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${canvasScale})`;

      if (btnCanvasZoomReset) {
        btnCanvasZoomReset.textContent = `${Math.round(canvasScale * 100)}%`;
      }
    }

    // 1. 滑鼠拖曳 (Mouse Drag to Pan)
    pinboardViewport.addEventListener('mousedown', (e) => {
      if (e.target.closest('#canvasFloatingControls')) return;

      isDraggingCanvas = true;
      startDragX = e.clientX - panX;
      startDragY = e.clientY - panY;
      dragDistance = 0;
      hasDraggedFar = false;
      pinboardViewport.classList.add('is-panning');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingCanvas) return;
      const newX = e.clientX - startDragX;
      const newY = e.clientY - startDragY;
      dragDistance += Math.hypot(newX - panX, newY - panY);
      if (dragDistance > 6) {
        hasDraggedFar = true;
      }
      panX = newX;
      panY = newY;
      updateCanvasTransform(false);
    });

    window.addEventListener('mouseup', () => {
      if (isDraggingCanvas) {
        isDraggingCanvas = false;
        pinboardViewport.classList.remove('is-panning');
        setTimeout(() => { hasDraggedFar = false; }, 60);
      }
    });

    // 2. 觸控支援 (Touch Move & Pinch Zoom)
    let initialTouchDist = 0;
    let initialTouchScale = 1;

    pinboardViewport.addEventListener('touchstart', (e) => {
      if (e.target.closest('#canvasFloatingControls')) return;
      if (e.touches.length === 1) {
        isDraggingCanvas = true;
        startDragX = e.touches[0].clientX - panX;
        startDragY = e.touches[0].clientY - panY;
        dragDistance = 0;
        hasDraggedFar = false;
        pinboardViewport.classList.add('is-panning');
      } else if (e.touches.length === 2) {
        isDraggingCanvas = false;
        initialTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialTouchScale = canvasScale;
      }
    }, { passive: true });

    pinboardViewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDraggingCanvas) {
        const newX = e.touches[0].clientX - startDragX;
        const newY = e.touches[0].clientY - startDragY;
        dragDistance += Math.hypot(newX - panX, newY - panY);
        if (dragDistance > 6) hasDraggedFar = true;
        panX = newX;
        panY = newY;
        updateCanvasTransform(false);
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (initialTouchDist > 0) {
          canvasScale = initialTouchScale * (dist / initialTouchDist);
          updateCanvasTransform(false);
        }
      }
    }, { passive: true });

    pinboardViewport.addEventListener('touchend', () => {
      if (isDraggingCanvas) {
        isDraggingCanvas = false;
        pinboardViewport.classList.remove('is-panning');
        setTimeout(() => { hasDraggedFar = false; }, 60);
      }
      initialTouchDist = 0;
    });

    // 3. 滾輪縮放 (Wheel Zoom)
    pinboardViewport.addEventListener('wheel', (e) => {
      if (e.ctrlKey || Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.08 : -0.08;
        canvasScale += delta;
        updateCanvasTransform(false);
      }
    }, { passive: false });

    // 4. 按鈕縮放控制
    if (btnCanvasZoomIn) {
      btnCanvasZoomIn.addEventListener('click', () => {
        canvasScale += 0.15;
        updateCanvasTransform(true);
      });
    }
    if (btnCanvasZoomOut) {
      btnCanvasZoomOut.addEventListener('click', () => {
        canvasScale -= 0.15;
        updateCanvasTransform(true);
      });
    }
    if (btnCanvasZoomReset) {
      btnCanvasZoomReset.addEventListener('click', () => {
        centerInitialView();
      });
    }

    // 初始居中與 16:9 自適應定位
    function centerInitialView() {
      const vpW = pinboardViewport.clientWidth || 1100;
      const vpH = pinboardViewport.clientHeight || 620;

      // 自適應計算符合當前 16:9 視窗的最佳全景縮放比例
      const fitScale = Math.min(vpW / 2560, vpH / 1440);
      canvasScale = Math.max(0.42, Math.min(fitScale * 1.05, 0.9));

      // 居中對齊
      panX = Math.round((vpW - 2560 * canvasScale) / 2);
      panY = Math.round((vpH - 1440 * canvasScale) / 2);

      updateCanvasTransform(true);
    }

    centerInitialView();
    window.addEventListener('resize', centerInitialView);
  }

  // ==========================================
  // 7. 渲染視圖 B：時間線進程 (Timeline Progression)
  // ==========================================
  function renderInvestigationTimeline() {
    if (!timelineContainer) return;
    timelineContainer.innerHTML = '';

    const sortedArticles = [...clueArticles].sort((a, b) => a.day - b.day);

    sortedArticles.forEach((art, index) => {
      const day = art.day;
      const exInfo = exhibitsDb[day] || {};
      const typeDef = exhibitTypes[exInfo.primaryType] || { badgeText: 'E1 證物', color: '#3b82f6', icon: '⚙️' };
      const isLeft = index % 2 === 0;

      const cleanCaption = exInfo.caption || (art.ai_image ? art.ai_image.caption : art.title);
      const imgSrc = (art.ai_image && art.ai_image.local_file) ? art.ai_image.local_file : (art.ai_image ? art.ai_image.online_url : '');
      const note = exInfo.dossierNote || art.title;

      const item = document.createElement('div');
      item.className = `timeline-item ${isLeft ? 'left' : 'right'}`;

      item.innerHTML = `
        <div class="timeline-node-pin"></div>
        <div class="timeline-card">
          <img class="tl-thumb" src="${imgSrc}" alt="${cleanCaption}" referrerpolicy="no-referrer" onerror="handleImgError(this)">
          <div class="tl-info">
            <div class="tl-meta">
              <span class="tl-day-chip">DAY-${String(day).padStart(2, '0')}</span>
              <span class="card-tag-pill" style="color:${typeDef.color};">${typeDef.badgeText}</span>
              <span class="card-tag-pill">[${exInfo.status || '已建立關聯'}]</span>
            </div>
            <h4 class="tl-title">${cleanCaption}</h4>
            <p class="tl-note">${note}</p>
          </div>
        </div>
      `;

      item.querySelector('.timeline-card').addEventListener('click', () => {
        openClueModal(art, exInfo);
      });

      timelineContainer.appendChild(item);
    });
  }

  // ==========================================
  // 8. 渲染視圖 C：關聯推理網絡 (Inference Graph)
  // ==========================================
  function renderInferenceGraph() {
    if (!inferenceContainer) return;
    inferenceContainer.innerHTML = '';

    // (1) 六條調查支線卡片網格
    const linesSec = document.createElement('div');
    linesSec.innerHTML = `
      <div class="inference-sub-heading">
        <span>🔗</span>
        <span>六條跨卷宗調查支線 (CROSS-DOSSIER INVESTIGATION LINES)</span>
      </div>
    `;

    const linesGrid = document.createElement('div');
    linesGrid.className = 'lines-grid';

    Object.values(investLines).forEach(line => {
      const card = document.createElement('div');
      card.className = 'investigation-line-card';

      // 鏈路 Days Pills
      const chainHtml = line.days.map((d, i) => {
        const arrow = (i < line.days.length - 1) ? '<span class="il-arrow">➔</span>' : '';
        return `<span class="il-day-tag" data-day="${d}">D${String(d).padStart(2, '0')}</span> ${arrow}`;
      }).join('');

      card.innerHTML = `
        <div class="il-header">
          <span class="il-badge" style="background:rgba(245,158,11,0.2); color:${line.color}; border:1px solid ${line.color};">${line.code}</span>
          <span style="font-family:var(--font-typewriter); font-size:11px; color:rgba(200,160,90,0.6);">${line.days.length} EXHIBITS</span>
        </div>
        <h3 class="il-title">${line.name}</h3>
        <p class="il-hypothesis">${line.hypothesis}</p>
        <div class="il-chain">
          ${chainHtml}
        </div>
        <button class="btn-focus-line" data-lineid="${line.id}">在案件牆聚焦此支線連線 ↗</button>
      `;

      // 點選節點直接開啟對應證物
      card.querySelectorAll('.il-day-tag').forEach(tag => {
        tag.addEventListener('click', () => {
          const d = parseInt(tag.dataset.day, 10);
          const art = clueArticles.find(a => a.day === d);
          if (art) openClueModal(art, exhibitsDb[d] || {});
        });
      });

      // 聚焦支線按鈕
      card.querySelector('.btn-focus-line').addEventListener('click', () => {
        activeInvestLine = line.id;
        if (investigationLinesGroup) {
          investigationLinesGroup.querySelectorAll('.line-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.line === line.id);
          });
        }
        switchClueSubView('pinboard');
      });

      linesGrid.appendChild(card);
    });

    linesSec.appendChild(linesGrid);
    inferenceContainer.appendChild(linesSec);

    // (2) 三大隱藏劇情專區
    const storySec = document.createElement('div');
    storySec.style.marginTop = '20px';
    storySec.innerHTML = `
      <div class="inference-sub-heading">
        <span>🔍</span>
        <span>三大可解鎖隱藏劇情 (UNLOCKED NARRATIVE ENIGMAS)</span>
      </div>
    `;

    const storyGrid = document.createElement('div');
    storyGrid.className = 'storylines-full-grid';

    hiddenStories.forEach(story => {
      const card = document.createElement('div');
      card.className = 'storyline-card-full';

      const daysChainHtml = story.days.map((d, i) => {
        const arrow = (i < story.days.length - 1) ? '<span class="il-arrow">➔</span>' : '';
        return `<span class="il-day-tag" data-day="${d}">Day ${String(d).padStart(2, '0')}</span> ${arrow}`;
      }).join('');

      card.innerHTML = `
        <div class="sc-header">
          <span class="sc-icon">${story.icon}</span>
          <h3 class="sc-title">劇情 ${story.number}｜${story.title}</h3>
        </div>
        <p class="sc-hypothesis">${story.hypothesis}</p>
        <div class="sc-question-box">
          <strong>【核心解鎖問題】</strong><br>${story.unlockQuestion}
        </div>
        <div class="il-chain" style="margin-bottom:12px;">
          ${daysChainHtml}
        </div>
        <button class="btn-focus-line" data-storyid="${story.id}">解鎖並在案件牆檢驗此劇情 ↗</button>
      `;

      card.querySelectorAll('.il-day-tag').forEach(tag => {
        tag.addEventListener('click', () => {
          const d = parseInt(tag.dataset.day, 10);
          const art = clueArticles.find(a => a.day === d);
          if (art) openClueModal(art, exhibitsDb[d] || {});
        });
      });

      card.querySelector('.btn-focus-line').addEventListener('click', () => {
        openStorylineDrawer(story.id);
      });

      storyGrid.appendChild(card);
    });

    storySec.appendChild(storyGrid);
    inferenceContainer.appendChild(storySec);
  }

  // ==========================================
  // 9. 分頁二：Masonry 圖片瀑布流渲染
  // ==========================================
  // ==========================================
  // 9. 分頁二：Masonry 圖片瀑布流渲染
  // ==========================================
  function renderArticleCodex() {
    if (!codexMasonryWall) return;
    codexMasonryWall.innerHTML = '';

    const kw = codexSearchKeyword.toLowerCase();
    const matchedImgs = [];

    articles.forEach(art => {
      const artTitle = art.title || '';
      const dayStr = art.day !== null ? `Day ${art.day}` : '額外文章';
      const artLink = art.link || '#';
      const images = art.all_images || [];

      images.forEach((imgObj, idx) => {
        const caption = imgObj.caption || '';
        const meaning = imgObj.meaning || '';
        const isMatch = !kw ||
          artTitle.toLowerCase().includes(kw) ||
          dayStr.toLowerCase().includes(kw) ||
          caption.toLowerCase().includes(kw) ||
          meaning.toLowerCase().includes(kw);

        if (isMatch) {
          matchedImgs.push({
            art,
            dayStr,
            artTitle,
            artLink,
            imgObj,
            idx
          });
        }
      });
    });

    if (codexFilterStats) {
      codexFilterStats.textContent = `顯示 ${matchedImgs.length} 張圖片`;
    }

    if (matchedImgs.length === 0) {
      codexMasonryWall.innerHTML = '<p class="codex-empty-msg" style="color:rgba(200,160,90,0.6);font-family:var(--font-typewriter);padding:60px;text-align:center;">--- 未找到符合的圖片檔案 ---</p>';
      return;
    }

    matchedImgs.forEach(item => {
      const brick = document.createElement('div');
      brick.className = 'masonry-brick';

      // 取得圖片真實路徑（修正：從 imgObj.src 取用，若為 AI 概念圖優先使用本地快取）
      const onlineSrc = item.imgObj.src || item.imgObj.online_url || '';
      let imgSrc = onlineSrc;
      if (item.art.ai_image && (onlineSrc === item.art.ai_image.online_url || item.idx === 0) && item.art.ai_image.local_file) {
        imgSrc = item.art.ai_image.local_file;
      }
      const fallbackSrc = onlineSrc || (item.art.ai_image ? item.art.ai_image.online_url : '');
      const captionText = item.imgObj.caption || `配圖 #${item.idx + 1}`;

      brick.innerHTML = `
        <span class="masonry-corner-tag">${item.dayStr}</span>
        <img src="${imgSrc}" 
             alt="${escapeHtml(captionText)}" 
             loading="lazy" 
             referrerpolicy="no-referrer"
             onerror="this.onerror=null; if(this.src!=='${fallbackSrc}' && '${fallbackSrc}'){ this.src='${fallbackSrc}'; } else { this.style.opacity='0.4'; }">
        <div class="masonry-overlay">
          <span class="masonry-day-tag">${item.dayStr}</span>
          <p class="masonry-caption">${escapeHtml(captionText)}</p>
          <span class="masonry-article-title">${escapeHtml(item.artTitle)}</span>
        </div>
        <a href="${item.artLink}" target="_blank" rel="noopener" class="masonry-link-btn" title="查看原始文章">↗</a>
      `;

      // 點擊卡片放大檢視燈箱（點擊右下角按鈕直接開啟文章）
      brick.addEventListener('click', (e) => {
        if (e.target.closest('.masonry-link-btn')) return;
        const currentSrc = brick.querySelector('img').src || imgSrc;
        openLightbox(currentSrc, `${item.dayStr} · ${captionText}`);
      });

      codexMasonryWall.appendChild(brick);
    });
  }

  if (codexSearchInput) {
    codexSearchInput.addEventListener('input', (e) => {
      codexSearchKeyword = e.target.value.trim();
      renderArticleCodex();
    });
  }

  // ==========================================
  // 10. 升級版深層證物檢視器 (Dossier Modal)
  // ==========================================
  function openClueModal(art, exInfo) {
    if (!exInfo) exInfo = exhibitsDb[art.day] || {};

    const imgSrc = (art.ai_image && art.ai_image.local_file) ? art.ai_image.local_file : (art.ai_image ? art.ai_image.online_url : '');
    const fallbackUrl = (art.ai_image && art.ai_image.online_url) ? art.ai_image.online_url : '';
    const cleanCaption = exInfo.caption || (art.ai_image ? art.ai_image.caption : art.title);
    const typeDef = exhibitTypes[exInfo.primaryType] || { badgeText: 'E1 實驗證物', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', icon: '⚙️' };

    modalClueImg.src = imgSrc;
    modalClueImg.onerror = () => { modalClueImg.src = fallbackUrl; };
    modalClueId.textContent = `EXHIBIT #DAY-${String(art.day).padStart(2, '0')}`;

    // 證物類型
    if (modalClueType) {
      modalClueType.textContent = typeDef.badgeText;
      modalClueType.style.color = typeDef.color;
      modalClueType.style.background = typeDef.bg;
      modalClueType.style.border = `1px solid ${typeDef.border}`;
    }

    modalClueArc.textContent = art.arc ? `${art.arc.arc_code} · ${art.arc.arc_name}` : '未歸檔';
    modalClueTitle.textContent = cleanCaption;
    modalClueArticleSub.textContent = `篇章：${art.title}`;

    // 標籤群組
    if (modalTagsRow) {
      modalTagsRow.innerHTML = '';
      (exInfo.tags || []).forEach(tag => {
        const chip = document.createElement('span');
        chip.className = 'modal-tag-chip';
        chip.textContent = tag;
        modalTagsRow.appendChild(chip);
      });
    }

    modalClueMeaning.textContent = art.ai_image ? (art.ai_image.meaning || art.ai_image.caption) : cleanCaption;
    modalClueStory.textContent = exInfo.dossierNote || art.title;
    modalClueArticleBtn.href = art.link;

    // 關聯證物清單與關聯理由 (Linked Exhibits & Rationales)
    if (modalLinkedExhibitsList) {
      modalLinkedExhibitsList.innerHTML = '';
      const linked = exInfo.linkedDays || [];

      if (linked.length === 0) {
        modalLinkedExhibitsList.innerHTML = '<p style="color:rgba(200,160,90,0.5);font-size:11px;margin:4px 0;">--- 目前為獨立觀察節點 ---</p>';
      } else {
        linked.forEach(l => {
          const targetDay = l.day;
          const targetArt = clueArticles.find(a => a.day === targetDay);
          const targetEx = exhibitsDb[targetDay] || {};

          const row = document.createElement('div');
          row.className = 'linked-exhibit-row';

          let wireBadgeText = '🔴 敘事推進';
          let wireColor = '#ef4444';
          if (l.type === 'blue') { wireBadgeText = '🔵 概念呼應'; wireColor = '#38bdf8'; }
          else if (l.type === 'yellow') { wireBadgeText = '🟡 矛盾反例'; wireColor = '#f59e0b'; }
          else if (l.type === 'purple') { wireBadgeText = '🟣 隱藏關聯'; wireColor = '#a855f7'; }

          row.innerHTML = `
            <div class="ler-left">
              <div class="ler-badge-line">
                <span class="ler-day">Day ${String(targetDay).padStart(2, '0')}</span>
                <span class="ler-type" style="color:${wireColor}; background:rgba(0,0,0,0.4); border:1px solid ${wireColor};">${wireBadgeText}</span>
                <span style="font-size:11px; color:#f5eedc; font-weight:600;">${targetEx.caption || (targetArt ? targetArt.title : '')}</span>
              </div>
              <p class="ler-reason">${l.reason}</p>
            </div>
            <button class="btn-jump-exhibit" data-targetday="${targetDay}">檢驗此證物 ➔</button>
          `;

          row.querySelector('.btn-jump-exhibit').addEventListener('click', () => {
            if (targetArt) {
              openClueModal(targetArt, targetEx);
            }
          });

          modalLinkedExhibitsList.appendChild(row);
        });
      }
    }

    clueModal.classList.add('active');
  }

  function closeClueModal() {
    clueModal.classList.remove('active');
  }

  btnClueModalClose.addEventListener('click', closeClueModal);
  clueModal.addEventListener('click', (e) => {
    if (e.target === clueModal) closeClueModal();
  });

  // Lightbox 燈箱
  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '展示配圖';
    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
  }

  btnLightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // 全域鍵盤 ESC 關閉 Modal / Lightbox
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeClueModal();
      closeLightbox();
      closeStorylineDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (currentTab === 'clueBoard' && currentSubView === 'pinboard' && showNetLines) {
      renderNetLines();
    }
  });

  // 工具函式
  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  window.handleImgError = function(img) {
    img.onerror = null;
    img.style.opacity = '0.5';
    img.parentElement.style.background = '#0a0f1d';
  };

  // ==========================================
  // 11. 背景動態微粒 Canvas (Quantum Particles)
  // ==========================================
  const canvas = document.getElementById('quantumCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function initQuantumParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 20), 65);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.fillStyle = `rgba(0, 245, 255, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(0, 245, 255, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', initQuantumParticles);
  initQuantumParticles();
  animateParticles();

  // 初始渲染
  renderClueBoard();
  renderArticleCodex();
  initPanZoomEngine();
});
