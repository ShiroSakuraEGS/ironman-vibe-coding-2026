/**
 * VIBE CODING 案件線索板 - 深度調查推理知識圖譜數據層
 * CASE FILE 001 · 主案件：Vibe Coding 跨域創新事件調查
 * 包含：證物分類 (E1-E6)、跨卷宗調查支線 (A-F)、隱藏劇情 (01-03)、四色關聯連線與推理理由
 */

window.CASE_EVIDENCE_SYSTEM = {
  // ==========================================
  // 1. 六種證物類型定義 (E1 ~ E6)
  // ==========================================
  types: {
    E1: {
      id: "E1",
      code: "E1",
      name: "實驗證物",
      badgeText: "E1 ｜ 實驗證物",
      color: "#3b82f6", // 科技亮藍
      bg: "rgba(59, 130, 246, 0.15)",
      border: "rgba(59, 130, 246, 0.4)",
      icon: "⚙️",
      desc: "硬體、網頁、部署、工具整合、產品拆解。",
      days: [1, 2, 14, 18, 24, 25]
    },
    E2: {
      id: "E2",
      code: "E2",
      name: "跨域證物",
      badgeText: "E2 ｜ 跨域證物",
      color: "#10b981", // 翡翠翠綠
      bg: "rgba(16, 185, 129, 0.15)",
      border: "rgba(16, 185, 129, 0.4)",
      icon: "🌐",
      desc: "不同領域的知識、工作流程和體驗設計相互轉譯。",
      days: [3, 7, 8, 9, 13, 15, 16, 17]
    },
    E3: {
      id: "E3",
      code: "E3",
      name: "角色證物",
      badgeText: "E3 ｜ 角色證物",
      color: "#ec4899", // 霓虹粉紫
      bg: "rgba(236, 72, 153, 0.15)",
      border: "rgba(236, 72, 153, 0.4)",
      icon: "🎭",
      desc: "AI 角色、擬人化、遊戲化、角色扮演與情境演繹。",
      days: [4, 6, 9, 10, 21, 22]
    },
    E4: {
      id: "E4",
      code: "E4",
      name: "風險證物",
      badgeText: "E4 ｜ 風險證物",
      color: "#ef4444", // 警示血紅
      bg: "rgba(239, 68, 68, 0.15)",
      border: "rgba(239, 68, 68, 0.4)",
      icon: "⚠️",
      desc: "法律、著作權、學術誠信、AI 依賴及人機界線。",
      days: [12, 19, 20, 23]
    },
    E5: {
      id: "E5",
      code: "E5",
      name: "心智證物",
      badgeText: "E5 ｜ 心智證物",
      color: "#a855f7", // 神祕深紫
      bg: "rgba(168, 85, 247, 0.15)",
      border: "rgba(168, 85, 247, 0.4)",
      icon: "🧠",
      desc: "學習困境、自我懷疑、身分衝突、時間管理與價值反思。",
      days: [5, 11, 22, 26, 27, 28]
    },
    E6: {
      id: "E6",
      code: "E6",
      name: "反諷證物",
      badgeText: "E6 ｜ 反諷證物",
      color: "#f59e0b", // 琥珀警示黃
      bg: "rgba(245, 158, 11, 0.15)",
      border: "rgba(245, 158, 11, 0.4)",
      icon: "🃏",
      desc: "吐槽、自嘲、荒謬反差、第四面牆與不可靠敘事。",
      days: [4, 17, 20, 25, 28]
    }
  },

  // ==========================================
  // 2. 六條跨卷宗調查支線 (Lines A ~ F)
  // ==========================================
  lines: {
    LINE_A: {
      id: "LINE_A",
      code: "線索 A",
      name: "從想法到實體",
      color: "#38bdf8", // 天藍
      days: [1, 2, 6, 14, 18, 25],
      hypothesis: "從硬體、網頁、瀏覽器寵物、行動開發到裝置拆解與部署：創意如何一步步突破純文字構想，落實為隨處可運行的操作系統？",
      coreQuestion: "降低程式門檻後，非本科生能不能把天馬行空的想像打磨成穩固上線的軟硬體產品？"
    },
    LINE_B: {
      id: "LINE_B",
      code: "線索 B",
      name: "知識如何變成體驗",
      color: "#34d399", // 薄荷綠
      days: [3, 7, 9, 10, 13, 15, 16],
      hypothesis: "從數位內容、劇場排練工作流、精品咖啡科學到河川水文生態與未來學沙盤：技術如何成為文科專業知識與世界對話的轉譯媒介？",
      coreQuestion: "跨領域專業知識，如何透過情境化互動與視覺包裝，轉譯成大眾容易參與感知的沈浸體驗？"
    },
    LINE_C: {
      id: "LINE_C",
      code: "線索 C",
      name: "角色如何改變互動",
      color: "#f472b6", // 櫻花粉
      days: [4, 6, 9, 10, 21, 22],
      hypothesis: "AI 伴侶、網頁桌寵、咖啡知識化身、絕地武士與病嬌女友電台：角色化究竟是在改善軟體介面體驗，還是在悄然扭曲使用者與系統的情感界線？",
      coreQuestion: "當冷冰冰的代碼披上人格與情緒外衣，人機互動是變得更人性化，還是讓使用者墜入依賴陷阱？"
    },
    LINE_D: {
      id: "LINE_D",
      code: "線索 D",
      name: "成果背後的責任",
      color: "#fb7185", // 珊瑚紅
      days: [12, 17, 18, 19, 20, 23],
      hypothesis: "從模型商用條款、企業網頁逆向探測到神性投射反思與學術誠信邊界：做得出來，不代表可以直接使用，更不代表創作者已經理解其法律與社會後果。",
      coreQuestion: "在生成式 AI 狂飆的時代，創新產能急速膨脹的背後，個人創作者該如何承擔起版權與倫理防護責任？"
    },
    LINE_E: {
      id: "LINE_E",
      code: "線索 E",
      name: "創作者逐漸變成調查對象",
      color: "#c084fc", // 丁香紫
      days: [5, 11, 22, 24, 26, 27, 28],
      hypothesis: "從深夜音訊剪輯、知識膨脹焦慮、心智怪物到工具疲勞與時空護照：問題焦點逐漸從「AI 能為我做什麼」，反轉成「我如何在與 AI 瘋狂交鋒中保全自己的身心主權」。",
      coreQuestion: "隨著創作速度被 AI 加速十倍，創作者自己的情緒、體力、時間邊界是否正在被工具反向殖民？"
    },
    LINE_F: {
      id: "LINE_F",
      code: "線索 F",
      name: "誰才是真正的操作者？",
      color: "#fbbf24", // 燦金
      days: [3, 11, 17, 23, 25, 26, 28],
      hypothesis: "當 AI 能生動寫出文學切片、逆向分析商業情報、輔助學術探究，甚至代勞寫下自己的學習心得時，創作者的核心價值究竟還剩下什麼？",
      coreQuestion: "如果程式碼、邏輯架構與文字產出都能由模型代勞，所謂的「作者主體性」究竟體現在哪裡？"
    }
  },

  // ==========================================
  // 3. 三條隱藏解鎖劇情 (Hidden Storylines)
  // ==========================================
  hiddenStorylines: [
    {
      id: "HIDDEN_01",
      number: "01",
      title: "AI 伴侶的變形記",
      icon: "🕵️",
      days: [4, 6, 9, 21],
      themeColor: "#ec4899",
      hypothesis: "一開始只是孤獨深夜裡對 AI 虛擬伴侶的調侃幻想（Day 04），接著演變成常駐桌面的靈魂桌寵（Day 06），隨後化身為理性傳遞專業知識的咖啡助教（Day 09），最後竟反噬侵入原本嚴肅的音樂剪輯工具，變成了宣洩極端情緒的地雷系病嬌電台（Day 21）。",
      unlockQuestion: "角色化（Persona）究竟只是前端介面的視覺包裝，還是會反客為主，徹底重塑整個人機互動與軟體架構的本質？"
    },
    {
      id: "HIDDEN_02",
      number: "02",
      title: "工具越多，自由越多？",
      icon: "⚙️",
      days: [1, 14, 18, 24, 25],
      themeColor: "#38bdf8",
      hypothesis: "最初摸索 micro:bit 硬體期待突破邊界（Day 01），進而嘗試便攜式行動端無拘編程（Day 14），再攻克 3D 複雜零件爆炸圖（Day 18），最後引入 Google AI Studio 與 Antigravity 聯動（Day 24），卻發現工具鏈越長，維護、驗收與除錯的心理負擔越是呈指數級暴增，最終被迫轉向 GitHub Pages 尋求極簡收斂（Day 25）。",
      unlockQuestion: "現代開發工具大幅降低了單點的「撰寫難度」，但多工具拼接所帶來的驗收、除錯與架構認知成本，是否悄然剝奪了創作者最初的創作自由？"
    },
    {
      id: "HIDDEN_03",
      number: "03",
      title: "創作者失蹤案",
      icon: "👤",
      days: [3, 17, 23, 25, 26, 28],
      themeColor: "#fbbf24",
      hypothesis: "調查焦點的奇妙位移：起初以中文系身份自信宣告自己是現代數位魔法師（Day 03），到 Day 17 嘲諷依賴 AI 的大腦外包，接著在 Day 23 的學術論文警報中冷汗直流，隨後在 Day 25 驚恐發現「我已淪落到靠 AI 幫我整理輸出」，直到 Day 28 迎來終極大拷問——究竟是誰在操控這場 28 天的創作實驗？",
      unlockQuestion: "當 AI 參與了提案、撰碼、除錯、排版乃至成果發布的所有環節，究竟是誰在做最終的價值裁決？人類留下的作者意識到底是什麼？"
    }
  ],

  // ==========================================
  // 4. 四種連線語意規則 (Wired Network Relations)
  // ==========================================
  connections: [
    // --- 🔴 紅線：敘事推進 (Solid Red) ---
    {
      from: 1, to: 2,
      type: "red",
      typeName: "敘事推進",
      lineId: "LINE_A",
      reason: "第一天硬體接線踩坑的挫折，直接推動創作者轉入門檻較低、能快速看到成果的純網頁切版實驗。"
    },
    {
      from: 7, to: 8,
      type: "red",
      typeName: "敘事推進",
      lineId: "LINE_B",
      reason: "從劇場排練的團隊流程重構，進一步推進到難度更高、要求嚴格安全規範的香港建築工安認證學習。"
    },
    {
      from: 10, to: 11,
      type: "red",
      typeName: "敘事推進",
      lineId: "LINE_B",
      reason: "從光劍規則查詢的表層 Prompt，驟然撞擊進高維向量數學與政大 RAG 向量星雲的深水區。"
    },
    {
      from: 15, to: 16,
      type: "red",
      typeName: "敘事推進",
      lineId: "LINE_B",
      reason: "地圖空間的未來情境推演，實體降維為以 QR Code 觸發的文本改編電影線上策展體驗。"
    },
    {
      from: 25, to: 26,
      type: "red",
      typeName: "敘事推進",
      lineId: "LINE_F",
      reason: "當產品在 GitHub Pages 正式部署上線，成果不再只是自娛自樂，必須建立自動化渠道收割與社群傳播。"
    },
    {
      from: 27, to: 28,
      type: "red",
      typeName: "敘事推進",
      lineId: "LINE_E",
      reason: "多重身份的時間主權保衛戰宣告結束，迎來 28 天創作歷程的終極大總結——人機磨合的價值共識。"
    },

    // --- 🔵 藍色虛線：概念呼應 (Dashed Blue) ---
    {
      from: 4, to: 21,
      type: "blue",
      typeName: "概念呼應",
      lineId: "LINE_C",
      reason: "【隱藏劇情 01 關鍵呼應】Day 04 初步構思的虛擬伴侶互動，在 Day 21 蛻變為具備情緒拉扯的病嬌音樂電台原型。"
    },
    {
      from: 6, to: 9,
      type: "blue",
      typeName: "概念呼應",
      lineId: "LINE_C",
      reason: "從純陪伴性質的常駐桌寵（Day 06），升級為乘載精品咖啡科學專業知識的互動化身（Day 09）。"
    },
    {
      from: 2, to: 25,
      type: "blue",
      typeName: "概念呼應",
      lineId: "LINE_A",
      reason: "從 Day 02 困惑於『網頁又是網頁』的單點切版，到 Day 25 掌握整體專案架構並成功部署於 GitHub Pages。"
    },
    {
      from: 12, to: 20,
      type: "blue",
      typeName: "概念呼應",
      lineId: "LINE_D",
      reason: "從被動研讀各大開源模型的使用者條款（Day 12），主動演化為將歐盟 3D 商標判決可視化的法規戰略系統（Day 20）。"
    },

    // --- 🟡 黃色標記線：矛盾或反例 (Warning Amber) ---
    {
      from: 11, to: 22,
      type: "yellow",
      typeName: "矛盾反例",
      lineId: "LINE_E",
      reason: "Day 11 驚喜於高維向量星雲帶來的知識秩序感；Day 22 卻在持續跨領域吸收中反向孵化出了混亂暴走的『學習怪物』。"
    },
    {
      from: 17, to: 23,
      type: "yellow",
      typeName: "矛盾反例",
      lineId: "LINE_D",
      reason: "Day 17 嘲笑『外包大腦給 AI 做商業分析』是雜魚行為；但在 Day 23 卻驚覺學術研究若不加約束，自己也將滑入誠信危機的深淵。"
    },
    {
      from: 24, to: 28,
      type: "yellow",
      typeName: "矛盾反例",
      lineId: "LINE_F",
      reason: "Day 24 相信工具整合（Google AI Studio + Antigravity）能帶來完美效率；Day 28 卻證實 AI 運算往往硬生生給出另一套架構，人機磨合才是常態。"
    },

    // --- 🟣 紫色點線：隱藏關聯 (Dotted Purple) ---
    {
      from: 9, to: 13,
      type: "purple",
      typeName: "隱藏關聯",
      lineId: "LINE_B",
      reason: "表面上是咖啡科學 vs 河川永續，實質底層完全一致：皆在探索『如何將艱澀冷門的文科或自然領域專業，透過數位互動轉化為大眾可體驗之感知』。"
    },
    {
      from: 5, to: 21,
      type: "purple",
      typeName: "隱藏關聯",
      lineId: "LINE_E",
      reason: "兩篇皆以音訊為實驗媒介：Day 05 追求理性的自動化精華剪輯，Day 21 卻走向感性極端，將音訊轉化為病嬌情緒陪伴電台。"
    },
    {
      from: 3, to: 27,
      type: "purple",
      typeName: "隱藏關聯",
      lineId: "LINE_F",
      reason: "Day 03 中文系面對數位多重身份的撕裂與好奇，在 Day 27 轉化為『賽博時空簽證護照』的實體化身份印章系統。"
    }
  ],

  // ==========================================
  // 5. 28 個 Day 證物詳細資料庫 (Exhibits Database)
  // ==========================================
  exhibits: {
    1: {
      day: 1,
      exhibitId: "EXHIBIT 001",
      arcId: "CASE-ARC-01",
      arcName: "卷宗 I：初心破壁",
      primaryType: "E1",
      secondaryTypes: ["E2"],
      narrativeRole: "起因：破除創作門檻第一擊",
      status: "已建立關聯",
      caption: "硬體通訊小信使原型",
      articleTitle: "第一天就來弄硬體裝置！超硬的說！",
      tags: ["#硬體原型", "#micro:bit", "#創作門檻", "#中文系跨界"],
      dossierNote: "中文系踏入科技管理的第一道震撼彈。不寫一行傳統 C/C++，嘗試純粹運用自然語言提示詞驅動實體微控制器點亮 LED 與蜂鳴器，驗證文科生進行 Vibe Coding 的破壁可行性。",
      linkedDays: [
        { day: 2, type: "red", reason: "硬體實體接線踩坑的阻力，直接推動創作者退回看似門檻較低的純網頁前端實驗。" },
        { day: 14, type: "blue", reason: "便攜式開發思想的起點：從最初手握硬體晶片，延續到 Day 14 嘗試用手機行動裝置進行 Vibe Coding。" }
      ]
    },
    2: {
      day: 2,
      exhibitId: "EXHIBIT 002",
      arcId: "CASE-ARC-01",
      arcName: "卷宗 I：初心破壁",
      primaryType: "E1",
      secondaryTypes: ["E6"],
      narrativeRole: "轉折：避開底層卻陷介面泥淖",
      status: "已建立關聯",
      caption: "網頁多重介面迭代切片",
      articleTitle: "網頁，網頁又是網頁！",
      tags: ["#網頁開發", "#介面迭代", "#視覺疲勞", "#反諷自嘲"],
      dossierNote: "以為網頁開發比硬體輕鬆，卻立刻陷入 CSS 切版、視窗排版與多重響應式佈局的無窮迭代。創作者開始感受到『畫面跑得動，但結構被 AI 牽著走』的初期徵兆。",
      linkedDays: [
        { day: 1, type: "red", reason: "因硬體受挫而轉向網頁，形成前因後果。" },
        { day: 6, type: "blue", reason: "從單純的死板網頁框架，演變為讓網頁內部生長出具有生命感的常駐瀏覽器桌寵。" },
        { day: 25, type: "blue", reason: "從單頁面切版的無奈，跨越 23 天最終演變為能正式部署至 GitHub Pages 的完整專案體系。" }
      ]
    },
    3: {
      day: 3,
      exhibitId: "EXHIBIT 003",
      arcId: "CASE-ARC-01",
      arcName: "卷宗 I：初心破壁",
      primaryType: "E2",
      secondaryTypes: ["E6"],
      narrativeRole: "定位：定義跨域轉譯使命",
      status: "已建立關聯",
      caption: "現代數位魔法師的符號轉譯",
      articleTitle: "中文系搞數位內容？",
      tags: ["#中文系跨域", "#符號轉譯", "#數位內容", "#魔法師隱喻"],
      dossierNote: "釐清自身的核心優勢不在底層編譯器，而在於對自然語言符號與文本語意的精準駕馭。創作者自封為『數位魔法師』，開始嘗試將古典人文修養轉化為向大模型施法的咒語。",
      linkedDays: [
        { day: 7, type: "blue", reason: "文科思維轉譯的第一步落地：將文學敘事經驗導入劇場與商管排程矩陣。" },
        { day: 11, type: "blue", reason: "符號學的極致碰撞：中文系筆下的感性散文，在 Day 11 轉化為數學空間中精確的 768 維高維向量。" },
        { day: 28, type: "yellow", reason: "終極反詰：當初自信滿滿的『數位魔法師』，到了 Day 28 是否已淪為 AI 提示詞的奴僕？" }
      ]
    },
    4: {
      day: 4,
      exhibitId: "EXHIBIT 004",
      arcId: "CASE-ARC-01",
      arcName: "卷宗 I：初心破壁",
      primaryType: "E3",
      secondaryTypes: ["E6"],
      narrativeRole: "探索：虛擬人格與情感投射",
      status: "已建立關聯",
      caption: "虛擬伴侶白櫻仔的人設符咒",
      articleTitle: "可悲啊～如果這麼簡單就可以製作出自己的AI女友跟男友的話",
      tags: ["#AI伴侶", "#白櫻仔", "#防討好機制", "#反諷人設"],
      dossierNote: "【隱藏劇情 01 起點】拒絕市面上千篇一律的無腦討好型虛擬助手，運用細膩的文科人設雕琢技術，打造具備毒舌反思、防討好機制的 AI 虛擬伴侶『白櫻仔』，開啟角色化探索。",
      linkedDays: [
        { day: 6, type: "blue", reason: "角色從純文字對話窗口，具象化降臨到瀏覽器桌面上成為會動的互動桌寵。" },
        { day: 21, type: "blue", reason: "【隱藏劇情 01 關鍵呼應】角色化全面升級為病嬌地雷系女友電台，情感操控與依賴感加劇。" },
        { day: 19, type: "yellow", reason: "倫理警戒：從虛擬女友的趣味設定，走向 Day 19 對『把 AI 視為過世親人或神明』的嚴厲批判。" }
      ]
    },
    5: {
      day: 5,
      exhibitId: "EXHIBIT 005",
      arcId: "CASE-ARC-01",
      arcName: "卷宗 I：初心破壁",
      primaryType: "E5",
      secondaryTypes: ["E1"],
      narrativeRole: "心智：深夜自動化與精力透支",
      status: "已建立關聯",
      caption: "深夜 ASMR 聲學音訊自動剪輯台",
      articleTitle: "深夜最適合弄ASMR精華剪輯了！嗯？你說為什麼是弄，而不是聽？欸秘密！",
      tags: ["#ASMR剪輯", "#音訊自動化", "#深夜高壓", "#精力透支"],
      dossierNote: "創作者首次面臨『身兼數職的時間黑洞』。為了解決繁瑣的影片後製痛點，深夜打造出 ASMR 聲波自動分析與精華切片工具，技術跑通的同時，身體疲勞與心智消耗也悄然顯現。",
      linkedDays: [
        { day: 11, type: "purple", reason: "熬夜爆肝探索技術的孤獨心智狀態，與 Day 11 面對 RAG 課堂時的自我質疑形成精神呼應。" },
        { day: 21, type: "purple", reason: "同樣是音訊實驗：Day 05 是冷靜理性的工具剪輯，Day 21 卻成了病嬌情緒宣洩的收容所。" },
        { day: 27, type: "blue", reason: "深夜失眠與工作過載，直接逼出了 Day 27 打造時空護照進行時間主權保衛戰。" }
      ]
    },
    6: {
      day: 6,
      exhibitId: "EXHIBIT 006",
      arcId: "CASE-ARC-02",
      arcName: "卷宗 II：實體穿透",
      primaryType: "E3",
      secondaryTypes: ["E1"],
      narrativeRole: "推進：常駐桌面的人機共生",
      status: "已建立關聯",
      caption: "桌面賽博桌寵心靈信標",
      articleTitle: "你的網頁瀏覽器寵物？我的網頁瀏覽器寵物～",
      tags: ["#桌面桌寵", "#Chrome插件", "#人機共生", "#陪伴感"],
      dossierNote: "打破單純的靜態網頁瀏覽，開發出在 Chrome 瀏覽器角落活動、具備呼吸微動效與即時反應的桌面桌寵。將 AI 與介面從冷漠的工作工具，演進為長伴左右的賽博小夥伴。",
      linkedDays: [
        { day: 4, type: "blue", reason: "承接 Day 04 虛擬伴侶的情感投射，賦予其實體桌面陪伴的視覺與互動外殼。" },
        { day: 9, type: "blue", reason: "桌寵的角色化互動機制，轉譯應用至精品咖啡科學的知識導引助手。" }
      ]
    },
    7: {
      day: 7,
      exhibitId: "EXHIBIT 007",
      arcId: "CASE-ARC-02",
      arcName: "卷宗 II：實體穿透",
      primaryType: "E2",
      secondaryTypes: ["E1"],
      narrativeRole: "跨界：表演藝術工作流與商管嫁接",
      status: "已建立關聯",
      caption: "劇場排練與商管報告排程矩陣",
      articleTitle: "把劇場工作與商管工作結合！！！",
      tags: ["#劇場工作流", "#排練節奏", "#商管報告", "#流程優化"],
      dossierNote: "大膽將劇場幕後排演的『場次調度、燈光提示與情緒曲線』控制論，導入商業管理團隊的專案甘特圖與簡報流程中。示範了跨領域轉譯不僅限於寫程式，更是一種流程架構重組。",
      linkedDays: [
        { day: 3, type: "blue", reason: "將中文系現代戲劇背景，轉譯為商管數位工具的流程治理架構。" },
        { day: 8, type: "red", reason: "跨界治理經驗，直接推進到香港建築工地嚴苛的工安法規學習領域。" }
      ]
    },
    8: {
      day: 8,
      exhibitId: "EXHIBIT 008",
      arcId: "CASE-ARC-02",
      arcName: "卷宗 II：實體穿透",
      primaryType: "E2",
      secondaryTypes: ["E4"],
      narrativeRole: "考驗：硬核法規學習遊戲化",
      status: "已建立關聯",
      caption: "建築平安卡工安教育遊戲化介面",
      articleTitle: "一起來預習香港的強制性基本安全訓練課程（平安卡）吧！（？）",
      tags: ["#平安卡", "#建築工安", "#法規遊戲化", "#學習轉譯"],
      dossierNote: "挑戰文科生極少涉足的硬核領域——香港建築工地強制性基本安全訓練（平安卡）。將死板繁瑣的條例法規與意外事故防範措施，編織成趣味過關的互動測驗與模擬情境系統。",
      linkedDays: [
        { day: 7, type: "red", reason: "由劇場排練的嚴格流程控制，推展到現實工地的生命安全規章學習。" },
        { day: 15, type: "blue", reason: "工安空間法規進一步放大為全工廠園區的未來學情境預測與數位空間沙盤。" }
      ]
    },
    9: {
      day: 9,
      exhibitId: "EXHIBIT 009",
      arcId: "CASE-ARC-02",
      arcName: "卷宗 II：實體穿透",
      primaryType: "E3",
      secondaryTypes: ["E2"],
      narrativeRole: "深化：專業科學知識的擬人化轉譯",
      status: "已建立關聯",
      caption: "SCA 精品咖啡科學擬人化助手",
      articleTitle: "咖啡色計劃的心跳瞬間！SCA 的文章化成活潑的女角色！與你進行咖啡學問探討之旅～",
      tags: ["#SCA咖啡科學", "#知識角色化", "#烘焙曲線", "#擬人助教"],
      dossierNote: "把精品咖啡協會（SCA）極其繁雜的烘焙化學反應、萃取率 TDS 計算公式，轉化為個性鮮明的咖啡師二次元女主角，透過對話引導使用者不知不覺掌握嚴謹的食品科學理論。",
      linkedDays: [
        { day: 4, type: "blue", reason: "將純娛樂型 AI 伴侶人設，成功改造為兼具專業學術知識的教育引導角色。" },
        { day: 13, type: "purple", reason: "【隱藏關聯】與 Day 13 河川永續共享核心本質：如何把非大眾的生硬科學知識，轉譯為親切有感的情境體驗。" },
        { day: 21, type: "blue", reason: "【隱藏劇情 01 推進】知識角色化的巔峰，為後續情感失控的地雷系電台埋下伏筆。" }
      ]
    },
    10: {
      day: 10,
      exhibitId: "EXHIBIT 010",
      arcId: "CASE-ARC-03",
      arcName: "卷宗 III：高維向量",
      primaryType: "E2",
      secondaryTypes: ["E3"],
      narrativeRole: "引線：星戰世界觀包裹法規比對",
      status: "已建立關聯",
      caption: "光劍法規查核與絕地武士修行場",
      articleTitle: "我要讓大家逐漸變成絕地武士！不單單是虛擬的！還要推現實的！",
      tags: ["#光劍競技", "#星戰世界觀", "#運動法規", "#知識檢索"],
      dossierNote: "調用 Google AI 模式查證法國擊劍協會（FFE）正式認可的光劍競技規則。利用星戰絕地武士的世界觀包裝繁複的賽事規範，體驗從天馬行空想像到現實世界規程的查證過程。",
      linkedDays: [
        { day: 9, type: "blue", reason: "延續用趣味 IP 與角色扮演包裝專業規則的體驗設計路線。" },
        { day: 11, type: "red", reason: "單點法規檢索無法滿足需求，直接觸發了下一篇對高維向量資料庫（FAISS）的底層探索。" }
      ]
    },
    11: {
      day: 11,
      exhibitId: "EXHIBIT 011",
      arcId: "CASE-ARC-03",
      arcName: "卷宗 III：高維向量",
      primaryType: "E5",
      secondaryTypes: ["E1"],
      narrativeRole: "核心高光：文字星雲與自我懷疑",
      status: "已建立關聯",
      caption: "487篇文學切片之三維向量星雲",
      articleTitle: "助教呀～～～～我不懂AIRAGCNN啊！！！不是，我不就是那個助教了嗎！？",
      tags: ["#三維文學宇宙", "#FAISS", "#RAG檢索", "#768維坐標", "#助教焦慮"],
      dossierNote: "全系列核心高光時刻！走進政大課堂，將個人創作的 487 篇文學篇章切片，透過 Embedding 轉為 768 維幾何坐標，在三維物理世界綻放為發光星雲。伴隨身為助教卻對底層演算法充滿恐懼的強烈身份撕裂感。",
      linkedDays: [
        { day: 3, type: "blue", reason: "中文系符號學的極致昇華：浪漫文學在三維向量空間找到了幾何數學坐標。" },
        { day: 22, type: "yellow", reason: "【矛盾反例】高維向量帶來的是知識的明晰，還是催生了 Day 22 吞噬自我的認知怪物？" },
        { day: 28, type: "yellow", reason: "【終極辯證】當文學化為距離公式，文字最深處的靈魂是否真能被模型計算？" }
      ]
    },
    12: {
      day: 12,
      exhibitId: "EXHIBIT 012",
      arcId: "CASE-ARC-03",
      arcName: "卷宗 III：高維向量",
      primaryType: "E4",
      secondaryTypes: ["E2"],
      narrativeRole: "警報：模型使用條款與商用雷區",
      status: "已建立關聯",
      caption: "各大商用模型 TOS 條款雷區掃描圖",
      articleTitle: "AIGC生成與使用！著作權商用權利AI標示，這些使用者條款你都認識嗎！？",
      tags: ["#使用者條款", "#著作權", "#商用授權", "#AI標示義務"],
      dossierNote: "首次拉響法律警報。深入研讀 OpenAI、Anthropic、Midjourney 等模型供應商繁雜的使用條款（TOS）。提醒創作者：產出酷炫成果不等於擁有合法著作權，商業授權條款暗藏諸多法律陷阱。",
      linkedDays: [
        { day: 17, type: "blue", reason: "從閱讀靜態條款，上升為在商業情報探測中如何拿捏法律倫理界線。" },
        { day: 20, type: "blue", reason: "法規焦慮直接落地為 Day 20 的歐盟 3D 商標司法大數據可視化判讀。" },
        { day: 23, type: "blue", reason: "授權雷區延伸至學術論文撰寫時的誠信倫理防護線。" }
      ]
    },
    13: {
      day: 13,
      exhibitId: "EXHIBIT 013",
      arcId: "CASE-ARC-03",
      arcName: "卷宗 III：高維向量",
      primaryType: "E2",
      secondaryTypes: ["E1"],
      narrativeRole: "擴展：生態環境與後端架構初探",
      status: "已建立關聯",
      caption: "河川水文生態後端監測架構",
      articleTitle: "會去了解後端的原因，是因為河川永續！？！？",
      tags: ["#河川永續", "#後端架構", "#水文監測", "#ESG倡議"],
      dossierNote: "看似突兀的題目，揭示了文科生為何踏入資料庫後端：為呈現淡水河與基隆河的永續水質監測資料，被迫掌握資料庫拉取與 API 串接。體會到『為了傳遞理念，技術架構不得不長出來』的自然演進。",
      linkedDays: [
        { day: 9, type: "purple", reason: "【隱藏關聯】與 Day 09 咖啡科學高度呼應：皆是將艱澀專業資料透過前端互動打造成大眾可參與的議題。" },
        { day: 15, type: "blue", reason: "河流生態監測與 Day 15 的全區未來地圖沙盤連成一氣，構成完整的空間數位敘事。" }
      ]
    },
    14: {
      day: 14,
      exhibitId: "EXHIBIT 014",
      arcId: "CASE-ARC-03",
      arcName: "卷宗 III：高維向量",
      primaryType: "E1",
      secondaryTypes: ["E6"],
      narrativeRole: "實驗：隨處寫作的極致行動工作流",
      status: "已建立關聯",
      caption: "行動裝置便攜式開發生態試驗",
      articleTitle: "便攜式 vibe coding！放假了，我想要不用電腦也能 vibe coding！",
      tags: ["#便攜式編程", "#行動工作流", "#工具狂熱", "#iPad開發"],
      dossierNote: "渴望擺脫厚重的桌面電腦，探索用平板、手機與自然語言在假日時隨時隨地敲出完整專案。展現了創作者對『隨身 Vibe Coding 自由』的狂熱追求與其伴隨的微小挫敗。",
      linkedDays: [
        { day: 1, type: "blue", reason: "呼應 Day 01 對隨身實體硬體的執念，嘗試徹底脫離笨重主機的束縛。" },
        { day: 18, type: "blue", reason: "便攜簡單的願景，在 Day 18 面對複雜 3D 模型渲染時遭遇算力與環境壁壘。" }
      ]
    },
    15: {
      day: 15,
      exhibitId: "EXHIBIT 015",
      arcId: "CASE-ARC-04",
      arcName: "卷宗 IV：智財法規",
      primaryType: "E2",
      secondaryTypes: ["E1"],
      narrativeRole: "轉譯：地域文化與未來情境沙盤",
      status: "已建立關聯",
      caption: "傳統工廠區未來學情境推演沙盤",
      articleTitle: "我們從地圖出發，用遊戲化的方式，不單單是要了解地域文化，向前推演，還要看這個地方的未來！",
      tags: ["#未來學情境", "#地圖遊戲化", "#工業區轉型", "#地域振興"],
      dossierNote: "將台灣老舊工業區的歷史沿革，透過地圖遊戲化介面進行沉浸式重構。結合未來學（Futures Studies）的情境預測法，推演工廠區在科技轉型下的三種未來可能世界。",
      linkedDays: [
        { day: 16, type: "red", reason: "地圖沙盤的空間體驗，直接引出 Day 16 結合線下實體掃描的線上策展。" },
        { day: 8, type: "blue", reason: "工安知識遊戲化（Day 08）延伸至宏觀產業園區歷史演進（Day 15）。" }
      ]
    },
    16: {
      day: 16,
      exhibitId: "EXHIBIT 016",
      arcId: "CASE-ARC-04",
      arcName: "卷宗 IV：智財法規",
      primaryType: "E2",
      secondaryTypes: ["E1"],
      narrativeRole: "穿透：實體條碼串連虛擬策展",
      status: "已建立關聯",
      caption: "文本改編電影線上策展與實體條碼信號",
      articleTitle: "文本？電影海報？線上策展？繞這麼多，其實最後是想要講 QR Code！",
      tags: ["#QR碼實體串聯", "#線上策展", "#電影海報", "#文本轉譯"],
      dossierNote: "看似普通的二維條碼，被設計為打通實體電影海報與數位虛擬展廳的通道。讀者掃碼即可穿越到改編自文學小說的互動電影檔案庫，完成實體與虛擬的無縫跨越。",
      linkedDays: [
        { day: 15, type: "red", reason: "承接 Day 15 的空間敘事，將數位展示錨定回現實世界的實體紙張與牆面。" },
        { day: 7, type: "blue", reason: "舞台劇場的宣傳媒介與數位前端的再次雜交。" }
      ]
    },
    17: {
      day: 17,
      exhibitId: "EXHIBIT 017",
      arcId: "CASE-ARC-04",
      arcName: "卷宗 IV：智財法規",
      primaryType: "E6",
      secondaryTypes: ["E4", "E2"],
      narrativeRole: "反諷：外包大腦的商業情報探針",
      status: "已建立關聯",
      caption: "逆向解構官網代碼之商業情報探測儀",
      articleTitle: "邪門歪道！從企業官網的網頁結構分析企業！",
      tags: ["#商業情報", "#逆向工程", "#反諷自嘲", "#外包大腦吐槽"],
      dossierNote: "【隱藏劇情 03 核心節點】以極具嘲諷的語氣抨擊『只會把資料丟給 ChatGPT 求分析』的庸碌做法。透過直接爬取企業官網的 HTML 標籤結構、第三方埋點與 CDN 配置，實施另類的商業競爭力逆向透視。",
      linkedDays: [
        { day: 12, type: "blue", reason: "爬蟲技術與商業情報探測，直接撞上 Day 12 所列出的法律侵權與未授權爬取紅線。" },
        { day: 23, type: "yellow", reason: "【矛盾反例】在商管作業中大膽走偏鋒，但到了 Day 23 學術研究領域時，深知此舉將引發致命後果。" }
      ]
    },
    18: {
      day: 18,
      exhibitId: "EXHIBIT 018",
      arcId: "CASE-ARC-04",
      arcName: "卷宗 IV：智財法規",
      primaryType: "E1",
      secondaryTypes: ["E5"],
      narrativeRole: "極限：三維立體爆炸分解圖的挫折",
      status: "已建立關聯",
      caption: "三維立體爆炸分解圖互動視圖",
      articleTitle: "用電腦模擬一個裝置爆開，然後看見裏面的零件，這種畫面我還是做不來嗎？",
      tags: ["#3D爆炸圖", "#零件分解", "#渲染瓶頸", "#技術受挫"],
      dossierNote: "【隱藏劇情 02 關鍵挫折】試圖透過 Three.js 與 Prompt 搓出精密的機械硬體零件爆炸分解動畫，卻遭遇幾何模型破面與矩陣變換的嚴酷數學壁壘，坦承 Vibe Coding 在純空間幾何渲染上的瓶頸。",
      linkedDays: [
        { day: 14, type: "blue", reason: "從便攜式編程的美好幻想，撞上真實 3D 渲染複雜度的殘酷現實。" },
        { day: 24, type: "blue", reason: "促使創作者在 Day 24 尋求更強大的專業模型聯動（Google AI Studio）來補齊短板。" }
      ]
    },
    19: {
      day: 19,
      exhibitId: "EXHIBIT 019",
      arcId: "CASE-ARC-04",
      arcName: "卷宗 IV：智財法規",
      primaryType: "E4",
      secondaryTypes: ["E5"],
      narrativeRole: "警醒：賽博招魂與人機神格化批判",
      status: "已建立關聯",
      caption: "神性投射與賽博招魂破相碑",
      articleTitle: "娃啊～你著相了～AI不是你的神明，不是你最愛的那位，更不是你已去世的那位～",
      tags: ["#賽博招魂", "#情感過載", "#佛學破相", "#倫理邊界"],
      dossierNote: "全篇最具人文哲思的篇章。以佛學『著相』為鏡，嚴厲批判當前社會將 AI 奉為全知神明、或利用模型重現逝去親人進行賽博招魂的情感沉溺現象。明確劃定人機之間的情感隔離牆。",
      linkedDays: [
        { day: 4, type: "yellow", reason: "【矛盾反例】回看 Day 04 玩得不亦樂乎的虛擬伴侶，此處嚴肅指出其一旦越界的恐怖後果。" },
        { day: 21, type: "blue", reason: "即便在此處立下警告，在 Day 21 依舊難逃被地雷系情緒電台所吸引的心智考驗。" }
      ]
    },
    20: {
      day: 20,
      exhibitId: "EXHIBIT 020",
      arcId: "CASE-ARC-05",
      arcName: "卷宗 V：心智模型",
      primaryType: "E4",
      secondaryTypes: ["E6", "E1"],
      narrativeRole: "攻堅：歐盟 3D 商標司法判決實戰",
      status: "已建立關聯",
      caption: "歐盟 3D 商標裁決大數據可視化判讀",
      articleTitle: "要碰法律真的有點痛苦呢～但畢竟是作業",
      tags: ["#3D商標審查", "#歐盟智慧財產局", "#司法判例", "#作業折磨"],
      dossierNote: "科智所研究生無可迴避的深水區作業。面對歐盟智慧財產局（EUIPO）成千上萬頁的 3D 商標立體形狀駁回與爭議案例，運用代碼將抽象判例準則提煉為多維雷達圖與比對矩陣。",
      linkedDays: [
        { day: 12, type: "blue", reason: "從紙上談兵的授權閱讀，進入司法實戰層面的商標立體保護爭端解析。" },
        { day: 23, type: "blue", reason: "法律法規的嚴密邏輯，直接過渡為 Day 23 學術誠信的自我審判。" }
      ]
    },
    21: {
      day: 21,
      exhibitId: "EXHIBIT 021",
      arcId: "CASE-ARC-05",
      arcName: "卷宗 V：心智模型",
      primaryType: "E3",
      secondaryTypes: ["E5"],
      narrativeRole: "失控：音樂剪輯工具突變地雷電台",
      status: "已建立關聯",
      caption: "病嬌地雷系女友情緒電台原型",
      articleTitle: "本來只想打造一個自動編輯音樂影片的工具，結果她好像變成了一個病嬌女友電台？",
      tags: ["#病嬌電台", "#地雷系人格", "#多模態音訊", "#人機失控"],
      dossierNote: "【隱藏劇情 01 終極高潮】本意僅是編寫一個能自動剪輯背景音樂的純工具，但在反覆給予人格特徵與互動回饋後，程式逐漸演變為一個具有濃厚病嬌個性、逼迫使用者聽歌的虛擬電台。人機主從關係徹底逆轉。",
      linkedDays: [
        { day: 4, type: "blue", reason: "【隱藏劇情 01 關鍵呼應】Day 04 的虛擬女友在音樂媒介中死灰復燃，人格具象化全面升級。" },
        { day: 5, type: "purple", reason: "Day 05 的音訊剪輯工具是聽話的僕人；Day 21 的音訊電台卻成了控制使用者的女主人。" },
        { day: 9, type: "blue", reason: "從咖啡師的正向知識引導，走向了極端情緒索取的暗黑反面。" }
      ]
    },
    22: {
      day: 22,
      exhibitId: "EXHIBIT 022",
      arcId: "CASE-ARC-05",
      arcName: "卷宗 V：心智模型",
      primaryType: "E5",
      secondaryTypes: ["E3"],
      narrativeRole: "反思：過量跨域學習孵化出的怪物",
      status: "存在矛盾",
      caption: "自體吞噬的認知混亂聚合獸",
      articleTitle: "關於學習到底可以產生什麼怪物出來？",
      tags: ["#認知過載", "#學習怪物", "#思維異化", "#文理撕裂"],
      dossierNote: "22 天的高強度跨領域資訊狂轟濫炸後，創作者發現自己的思維被硬體信號、高維矩陣、商標法條與二次元人設撕裂成四不像。質疑這究竟是通才式的創新，還是心智遭受工具異化的病態產物？",
      linkedDays: [
        { day: 11, type: "yellow", reason: "【矛盾反例】Day 11 擁抱高維向量以為獲得新知，Day 22 驚覺這股力量正在反噬宿主的大腦架構。" },
        { day: 27, type: "blue", reason: "認知怪物的失控狂奔，迫使創作者在 Day 27 建立嚴格的『時空簽證護照』以自保。" }
      ]
    },
    23: {
      day: 23,
      exhibitId: "EXHIBIT 023",
      arcId: "CASE-ARC-05",
      arcName: "卷宗 V：心智模型",
      primaryType: "E4",
      secondaryTypes: ["E6"],
      narrativeRole: "防線：學術誠信與道德不可踰越之界",
      status: "已建立關聯",
      caption: "學術誠信邊界與文科倫理防護網",
      articleTitle: "用 Vibe Coding 做學術研究會出大事吧！！！",
      tags: ["#學術誠信", "#道德底線", "#論文剽竊風險", "#冷汗直流"],
      dossierNote: "【隱藏劇情 03 關鍵節點】在見識到 AI 強悍的文獻梳理與論證生成能力後，創作者後背發涼：若將此流程毫無底線地移植至研究生學術論文中，學術共同體的信任將毀於一旦。設立不可妥協的學術道德防火牆。",
      linkedDays: [
        { day: 17, type: "yellow", reason: "【矛盾反例】在商界可以耍『邪門歪道』，但在學界哪怕踩線一步也是萬劫不復。" },
        { day: 28, type: "blue", reason: "直接過渡至 Day 28 的終極辯證：到底什麼部分必須由人類大腦親手鍛造？" }
      ]
    },
    24: {
      day: 24,
      exhibitId: "EXHIBIT 024",
      arcId: "CASE-ARC-05",
      arcName: "卷宗 V：心智模型",
      primaryType: "E1",
      secondaryTypes: ["E5"],
      narrativeRole: "整合：頂級工作流聯動與整合疲勞",
      status: "已建立關聯",
      caption: "多代理人多工作流聯合指揮座",
      articleTitle: "Google AI Studio x Antigravity 聯動！我要把之前做出來的東西做得更好！",
      tags: ["#GoogleAIStudio", "#Antigravity", "#多代理人協同", "#架構疲倦"],
      dossierNote: "【隱藏劇情 02 推進】動用最高階的 Google AI Studio API 結合新一代 Antigravity 輔助工具，嘗試重構前 23 天所有的半成品。雖然威力驚人，但管理眾多 Agent 帶來的溝通疲勞也達到了臨界值。",
      linkedDays: [
        { day: 18, type: "blue", reason: "為了解決 Day 18 的技術瓶頸而引入最強工具，卻發現整合本身的複雜度同樣致命。" },
        { day: 25, type: "red", reason: "工具鏈堆砌到頂點後，決心轉向極簡，回歸單純的 GitHub Pages 上線部署。" }
      ]
    },
    25: {
      day: 25,
      exhibitId: "EXHIBIT 025",
      arcId: "CASE-ARC-06",
      arcName: "卷宗 VI：終極共識",
      primaryType: "E1",
      secondaryTypes: ["E6"],
      narrativeRole: "自省：工具代勞寫作的作者危機",
      status: "已建立關聯",
      caption: "GitHub Pages 開源戰略矩陣首頁",
      articleTitle: "我已經淪落到要 Vibe Coding 工具幫我寫文章了嗎",
      tags: ["#GitHubPages", "#開源上線", "#作者身份動搖", "#靈魂拷問"],
      dossierNote: "【隱藏劇情 03 核心拷問】成功利用 GitHub Pages 將所有成果部署為公開網站，但文章內文的結構化編輯卻大量依賴自動化工具。創作者自嘲：『我到底是在創作，還是成了一名審批 AI 文稿的無情蓋章機器？』",
      linkedDays: [
        { day: 2, type: "blue", reason: "從 Day 02 切不出網頁的菜鳥，走向獨立部署上線整座專案戰略首頁。" },
        { day: 26, type: "red", reason: "專案落地後，隨即引發如何自動化向外界傳播的社群發布管線。" },
        { day: 28, type: "yellow", reason: "為最後一天的犯錯辯證埋下最沉重的伏筆。" }
      ]
    },
    26: {
      day: 26,
      exhibitId: "EXHIBIT 026",
      arcId: "CASE-ARC-06",
      arcName: "卷宗 VI：終極共識",
      primaryType: "E5",
      secondaryTypes: ["E2"],
      narrativeRole: "擴散：社群演算法與智慧果實收割",
      status: "已建立關聯",
      caption: "跨平台社群貼文自動化收割鏈",
      articleTitle: "自己寫的文章已經足夠多了，是時候要去摘一下智慧果實了呢～",
      tags: ["#LinkedIn演算法", "#成果收割", "#商業貼文轉化", "#自動化宣傳"],
      dossierNote: "26 天沉澱出龐大的文字與代碼資產。建構一套能精準吃透 LinkedIn 演算法、富含商務架構與 Emoji 視覺層次的貼文生成工作流，讓沈睡的鐵人賽文章轉化為能破圈傳播的智慧成果。",
      linkedDays: [
        { day: 25, type: "red", reason: "網站正式上線後，啟動專門的商務社群擴散渠道。" },
        { day: 27, type: "red", reason: "宣傳與學業多重並進，直接引發 Day 27 身份分裂的極限時間管理題。" }
      ]
    },
    27: {
      day: 27,
      exhibitId: "EXHIBIT 027",
      arcId: "CASE-ARC-06",
      arcName: "卷宗 VI：終極共識",
      primaryType: "E5",
      secondaryTypes: ["E1"],
      narrativeRole: "主權：用賽博護照奪回時間掌控權",
      status: "已建立關聯",
      caption: "賽博時空簽證護照與身份印章",
      articleTitle: "時間管理！但我不是大師！不過我有我的想法",
      tags: ["#時空護照", "#身份簽證", "#時間主權", "#儀式感管理"],
      dossierNote: "拒絕死板的番茄鐘與行事曆。打造一套具有『時空印章、身份簽證頁面與出入境計時器』的賽博護照系統。為自己中文系、研究生、工程自造者等多重身份分配專屬時區，奪回時間主權。",
      linkedDays: [
        { day: 22, type: "blue", reason: "用具象化的護照儀式，馴服並安撫 Day 22 橫衝直撞的思維怪物。" },
        { day: 28, type: "red", reason: "心智與時間的梳理完畢，迎接第 28 天終極大結案。" }
      ]
    },
    28: {
      day: 28,
      exhibitId: "EXHIBIT 028",
      arcId: "CASE-ARC-06",
      arcName: "卷宗 VI：終極共識",
      primaryType: "E5",
      secondaryTypes: ["E6"],
      narrativeRole: "結案：人機犯錯光譜與終極價值共識",
      status: "已形成結論",
      caption: "人機犯錯光譜與終極價值共識天平",
      articleTitle: "錯的到底是我！還是這個世界！！！（？）",
      tags: ["#人機磨合", "#犯錯光譜", "#價值共識", "#終極結案", "#作者主體性"],
      dossierNote: "全案終極大辯證！下對 Prompt，AI 跑出另一套做法；下錯 Prompt，AI 卻意外產出堪用成品。究竟是誰在犯錯？最終得出共識：AI 不是神明，也不是奴隸；創作者真正的不可替代性，在於面對意外時的審美裁決、犯錯容忍與定義問題的終極靈魂！",
      linkedDays: [
        { day: 3, type: "blue", reason: "回扣 Day 03 最初的『現代魔法師』宣言，給出了歷經 28 天淬鍊後的成熟答案。" },
        { day: 11, type: "yellow", reason: "平息 Day 11 助教心魔：技術不需要全懂，但對方向與意圖的掌舵權必須牢牢抓在手中。" },
        { day: 25, type: "yellow", reason: "解答 Day 25 的主體性焦慮：只要驗收、價值與終極判斷在於人類，創作的主體性便永不磨滅。" }
      ]
    }
  }
};
