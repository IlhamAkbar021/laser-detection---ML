/* ═══════════════════════════════
   CONSTANTS
═══════════════════════════════ */
const GRID_CM   = 0.25;   // cm per small grid square (2.5 mm)
const MIN_UNIT  = 0.125;  // cm (half a small grid square = 1.25 mm)

/* ═══════════════════════════════
   i18n
═══════════════════════════════ */
const LANG = { current: 'zh' };
const STRINGS = {
  'header.title': { zh: '雷射點座標辨識工具', en: 'Laser Spot Coordinate Tool' },
  'header.sub': { zh: 'Accuracy & Repeatability — Laser Coordinate Tool v2', en: 'Accuracy & Repeatability — Laser Coordinate Tool v2' },
  'step.1': { zh: '上傳圖片', en: 'Upload' },
  'step.2': { zh: '檢查座標', en: 'Review' },
  'step.3': { zh: '輸出結果', en: 'Output' },
  'cal.title.unset': { zh: '鏡頭校正基準：尚未設定', en: 'Lens Calibration: Not Set' },
  'cal.title.set': { zh: '鏡頭校正基準：已設定', en: 'Lens Calibration: Set' },
  'cal.sub.unset': { zh: '建議先設定一次鏡頭校正基準，完成後的座標軸曲線將套用至所有照片的辨識與座標計算。<br>上傳含完整座標紙的參考圖，在開啟的調整視窗中標定各參考點，再按「📐 設為鏡頭校正基準」。', en: 'Recommended: set a lens calibration reference first. The resulting axis curve will be applied to all images.<br>Upload a reference image with a full grid sheet, mark reference points in the adjustment window, then click "Set as Lens Calibration".' },
  'cal.upload': { zh: '📷 上傳校正參考圖', en: '📷 Upload Calibration Image' },
  'cal.reset': { zh: '⟳ 重新校正', en: '⟳ Recalibrate' },
  'settings.k1.label': { zh: '球面像差修正 k₁', en: 'Lens Distortion k₁' },
  'settings.k1.tip': { zh: '廣角鏡頭桶形畸變：k₁ = 負值修正（如 −0.2 到 −0.5）；0 = 不修正', en: 'Wide-angle barrel distortion: k₁ = negative (e.g. −0.2 to −0.5); 0 = none' },
  'settings.autorot.label': { zh: '自動翻轉偵測', en: 'Auto-flip Detection' },
  'settings.autorot.on': { zh: '啟用（偵測 180° 倒置）', en: 'Enabled (detect 180° flip)' },
  'settings.autorot.off': { zh: '停用', en: 'Disabled' },
  'upload.h2': { zh: '拖曳或點擊選擇 JPG 圖片', en: 'Drag & drop or click to select JPG images' },
  'upload.p': { zh: '最多 30 張 ｜ 每格 2.5mm ｜ 座標單位 cm ｜ 最小精度 0.125 cm', en: 'Max 30 images | 2.5 mm/cell | Unit: cm | Min precision: 0.125 cm' },
  'upload.btn': { zh: '選擇圖片', en: 'Select Images' },
  'action.loaded': { zh: '已載入', en: 'Loaded' },
  'action.of30': { zh: '/ 30 張', en: '/ 30' },
  'action.add': { zh: '＋ 新增', en: '＋ Add' },
  'action.detect': { zh: '▶ 自動辨識全部', en: '▶ Auto-detect All' },
  'action.clear': { zh: '清除全部', en: 'Clear All' },
  'session.btn.savezip':     { zh: '💾 儲存', en: '💾 Save .zip' },
  'session.btn.savexlsx':    { zh: '📋 .xlsx', en: '📋 Save .xlsx' },
  'session.btn.load':        { zh: '📂 讀取', en: '📂 Load' },
  'session.btn.excel2chart': { zh: '📈 Excel→圖表', en: '📈 Excel→Chart' },
  'session.btn.sop':         { zh: '📖 操作說明', en: '📖 SOP' },
  'session.tip.sop':         { zh: '開啟操作說明書（SOP）', en: 'Open Standard Operating Procedure (SOP)' },
  'session.btn.confluence':  { zh: '📘 Confluence', en: '📘 Confluence' },
  'session.tip.confluence':  { zh: '開啟 Confluence 上的完整 SOP（新分頁）', en: 'Open full SOP on Confluence (new tab)' },
  'session.btn.feedback':    { zh: '💬 回饋', en: '💬 Feedback' },
  'session.tip.feedback':    { zh: '寄信回饋給開發者', en: 'Send feedback to the developer' },
  'session.tip.savezip':     { zh: '存成 .zip（含原圖，可完整還原）', en: 'Save full session as .zip (includes images, full restore)' },
  'session.tip.savexlsx':    { zh: '存成 .xlsx（不含原圖、檔案小）', en: 'Save parameters as .xlsx (no images, smaller file)' },
  'session.tip.load':        { zh: '讀回 .zip 或 .xlsx 存檔', en: 'Load a saved .zip or .xlsx session' },
  'session.tip.excel2chart': { zh: '從 5 欄 Excel（jpg,x1,y1,x2,y2）直接畫 Page 3', en: 'Build Page 3 chart directly from a 5-column Excel (jpg,x1,y1,x2,y2)' },
  'prog.processing': { zh: '處理中...', en: 'Processing...' },
  'p2.title': { zh: '座標審閱與編輯', en: 'Coordinate Review & Edit' },
  'p2.note': { zh: '雙擊座標格可直接編輯 ｜ 點擊縮圖可開啟手動校正視窗', en: 'Double-click a cell to edit | Click thumbnail to open manual adjustment' },
  'p2.back': { zh: '← 返回', en: '← Back' },
  'p2.next': { zh: '下一步：輸出結果 →', en: 'Next: Output →' },
  'p2.th.no': { zh: '編號', en: '#' },
  'p2.th.status': { zh: '狀態', en: 'Status' },
  'p2.th.rot': { zh: '旋轉', en: 'Rotate' },
  'p2.th.fname': { zh: '原圖檔名', en: 'Filename' },
  'p2.th.img': { zh: '原圖', en: 'Image' },
  'p2.th.saved': { zh: '儲存', en: 'Saved' },
  'p3.title': { zh: '輸出結果', en: 'Output Results' },
  'p3.back': { zh: '← 返回', en: '← Back' },
  'p3.dl.chart': { zh: '⬇ 下載分析圖 (PNG)', en: '⬇ Download Chart (PNG)' },
  'p3.dl.excel': { zh: '⬇ 下載 Excel', en: '⬇ Download Excel' },
  'p3.iso.sheet':     { zh: '📊 打開 ISO Lab Recording Sheet', en: '📊 Open ISO Lab Recording Sheet' },
  'p3.iso.sheet.tip': { zh: '開啟 ISO Lab Recording Sheet（Google Sheets 新分頁）', en: 'Open ISO Lab Recording Sheet (Google Sheets, new tab)' },
  'p3.analysis.title': { zh: '準確度與重複性分析', en: 'Accuracy & Repeatability Analysis' },
  'p3.settings.h3': { zh: '分析設定', en: 'Analysis Settings' },
  'p3.testid.label': { zh: '圖表標題 ID', en: 'Chart Title ID' },
  'p3.testid.note': { zh: '（如 AC3110-EVT2-18）', en: '(e.g. AC3110-EVT2-18)' },
  'p3.plotmode.label': { zh: '繪製座標', en: 'Plot Coordinates' },
  'p3.plotmode.x2y2': { zh: 'x2 / y2（右側雷射點）', en: 'x2 / y2 (right laser spot)' },
  'p3.plotmode.x1y1': { zh: 'x1 / y1（左側雷射點）', en: 'x1 / y1 (left laser spot)' },
  'p3.plotmode.mid': { zh: '中點 ((x1+x2)/2, (y1+y2)/2)', en: 'Midpoint ((x1+x2)/2, (y1+y2)/2)' },
  'p3.refx.label': { zh: '參考點 X (cm)', en: 'Reference X (cm)' },
  'p3.refy.label': { zh: '參考點 Y (cm)', en: 'Reference Y (cm)' },
  'p3.accthresh.label': { zh: '準確度容忍值 (cm)', en: 'Accuracy Tolerance (cm)' },
  'p3.customrp.label': { zh: '自訂 Rp 容忍值 (cm)', en: 'Custom Rp Tolerance (cm)' },
  'p3.customrp.note': { zh: '— 留空則自動計算 (mean + 3σ)', en: '— leave blank for auto (mean + 3σ)' },
  'p3.customrp.ph': { zh: '自動', en: 'auto' },
  'p3.stats.h3': { zh: '統計結果', en: 'Statistics' },
  'p3.stats.n': { zh: '有效點數', en: 'Valid Points' },
  'p3.stats.ap': { zh: '準確度 Ap (cm)', en: 'Accuracy Ap (cm)' },
  'p3.stats.rp': { zh: '重複性 Rp (cm)', en: 'Repeatability Rp (cm)' },
  'p3.stats.pass': { zh: '通過準確度', en: 'Pass Accuracy' },
  'modal.prev': { zh: '‹ 上一張', en: '‹ Prev' },
  'modal.next': { zh: '下一張 ›', en: 'Next ›' },
  'modal.rot180': { zh: '↻ 旋轉180°', en: '↻ Rotate 180°' },
  'modal.ops.h4': { zh: '操作模式', en: 'Operation Mode' },
  'modal.mode.auto': { zh: '🔍 自動重新偵測', en: '🔍 Auto Re-detect' },
  'modal.mode.origin': { zh: '⊕ 設定原點（十字交叉）', en: '⊕ Set Origin (crosshair)' },
  'modal.mode.p1': { zh: '● 設定雷射點 1（左）', en: '● Set Laser Spot 1 (left)' },
  'modal.mode.p2': { zh: '● 設定雷射點 2（右）', en: '● Set Laser Spot 2 (right)' },
  'modal.cal.lock': { zh: '🔒 <strong>座標軸已鎖定</strong>（第一頁校正基準）<br>僅可<b>拖動原點</b>平移 或 <b>拖動旋轉把手</b>（X軸末端綠圓）旋轉整個座標系<br>參考點相對位置固定，不可個別移動', en: '🔒 <strong>Axis Locked</strong> (page-1 calibration)<br>You may only <b>drag the origin</b> to translate or <b>drag the rotation handle</b> (green circle at X-axis end) to rotate.<br>Ref point relative positions are fixed.' },
  'modal.fov': { zh: 'FOV外', en: 'Skip' },
  'modal.fov.title': { zh: 'FOV視野外，略過此點', en: 'Outside FOV, skip this point' },
  'modal.coords.label': { zh: '座標值 (cm) — 雙擊數字可修改', en: 'Coordinates (cm) — double-click to edit' },
  'modal.axis.h4': { zh: '軸向校正資訊', en: 'Axis Calibration Info' },
  'modal.axis.x.default': { zh: 'X軸: 使用預設（水平）', en: 'X-axis: default (horizontal)' },
  'modal.axis.y.default': { zh: 'Y軸: 使用預設（垂直）', en: 'Y-axis: default (vertical)' },
  'modal.scale.h4': { zh: '比例尺 / 格線', en: 'Scale / Grid' },
  'modal.scale.pxcm': { zh: 'px/cm:', en: 'px/cm:' },
  'modal.scale.ph': { zh: '自動', en: 'auto' },
  'modal.scale.gridlines': { zh: '偵測到的格線數:', en: 'Grid lines detected:' },
  'modal.k1':         { zh: 'k₁ 修正:', en: 'k₁ correction:' },
  'modal.zoom.out':   { zh: '縮小 (−)', en: 'Zoom out (−)' },
  'modal.zoom.in':    { zh: '放大 (+)', en: 'Zoom in (+)' },
  'modal.zoom.fit':   { zh: '適合視窗', en: 'Fit window' },
  'modal.setcal.tip': { zh: '將目前的座標軸曲線儲存為鏡頭校正基準，套用至所有照片', en: 'Save the current axis curve as the lens calibration baseline, applied to all images' },
  'modal.fisheye.h4': { zh: '魚眼曲率校正', en: 'Fisheye Curvature' },
  'modal.fisheye.kx': { zh: 'X 軸曲率 (kx)', en: 'X-axis curvature (kx)' },
  'modal.fisheye.ky': { zh: 'Y 軸曲率 (ky)', en: 'Y-axis curvature (ky)' },
  'modal.fisheye.reset': { zh: '⟳ 重置曲率', en: '⟳ Reset Curvature' },
  'modal.fisheye.tip': { zh: '上拖 = 桶形校正 下拖 = 枕形校正<br>曲線=橙色、對角線=無失真', en: 'Drag up = barrel Drag down = pincushion<br>Curve=orange, diagonal=undistorted' },
  'modal.legend.h4': { zh: '圖例', en: 'Legend' },
  'modal.legend.origin': { zh: '原點 (0,0)', en: 'Origin (0,0)' },
  'modal.legend.p1': { zh: '雷射點 1', en: 'Laser Spot 1' },
  'modal.legend.p2': { zh: '雷射點 2', en: 'Laser Spot 2' },
  'modal.legend.ref.est': { zh: '預計 R1/R2 位置', en: 'Est. R1/R2 position' },
  'modal.legend.r1': { zh: 'R1 (3,0) 已確認', en: 'R1 (3,0) confirmed' },
  'modal.legend.r2': { zh: 'R2 (6,0) 已確認', en: 'R2 (6,0) confirmed' },
  'modal.legend.grid': { zh: '座標格線', en: 'Coord grid' },
  'modal.dist': { zh: 'P1↔P2 距離: —', en: 'P1↔P2 distance: —' },
  'modal.cursor': { zh: '游標位置: —', en: 'Cursor position: —' },
  'modal.cancel': { zh: '取消', en: 'Cancel' },
  'modal.setcal': { zh: '📐 設為鏡頭校正基準', en: '📐 Set as Lens Calibration' },
  'modal.save': { zh: '✔ 儲存此張', en: '✔ Save This Image' },
  'js.saved': { zh: '✔ 已儲存', en: '✔ Saved' },
  'js.cal.set': { zh: '✔ 已設為校正基準', en: '✔ Set as calibration' },
  'js.cal.setbtn': { zh: '📐 設為鏡頭校正基準', en: '📐 Set as Lens Calibration' },
  'js.cal.need2ref': { zh: '請先標定至少 2 個以上的參考點以建立座標軸曲線，再設為校正基準。', en: 'Please mark at least 2 reference points to build an axis curve before setting as calibration.' },
  'js.cal.confirmreset': { zh: '確定要清除目前的鏡頭校正基準嗎？', en: 'Clear the current lens calibration?' },
  'js.cal.applying': { zh: '套用校正至第', en: 'Applying calibration image' },
  'js.cal.applying2': { zh: ' 張...', en: '...' },
  'js.max30': { zh: '最多 30 張', en: 'Maximum 30 images allowed' },
  'js.clearconfirm': { zh: '清除全部圖片？', en: 'Clear all images?' },
  'js.noimages': { zh: '請先上傳圖片', en: 'Please upload images first' },
  'js.done': { zh: '完成', en: 'Done' },
  'js.detecting': { zh: '辨識中', en: 'Detecting' },
  'js.badge.ok': { zh: '✔ 正常', en: '✔ OK' },
  'js.badge.ok.ref': { zh: '✔ 正常', en: '✔ OK' },
  'js.badge.low': { zh: '⚠ 低信心', en: '⚠ Low confidence' },
  'js.badge.unclear': { zh: '✗ 辨識不清楚', en: '✗ Unclear' },
  'js.unclear': { zh: '辨識不清楚', en: 'Unclear' },
  'js.p3.unclear': { zh: '⚠ 辨識不清楚', en: '⚠ Unclear' },
  'js.modal.calmode': { zh: '📐 校正模式 — ', en: '📐 Calibration Mode — ' },
  'js.modal.imgof': { zh: '圖片', en: 'Image' },
  'js.axis.x.default': { zh: 'X軸: 使用預設（水平）', en: 'X-axis: default (horizontal)' },
  'js.axis.y.default': { zh: 'Y軸: 使用預設（垂直）', en: 'Y-axis: default (vertical)' },
  'js.dist.dash': { zh: 'P1↔P2 距離: —', en: 'P1↔P2 distance: —' },
  'js.chart.nodata': { zh: '無資料可顯示', en: 'No data to display' },
  'js.chart.nodata2': { zh: '無有效資料', en: 'No valid data' },
  'js.chart.pending': { zh: '待輸入', en: 'Enter ID' },
  'js.rot180': { zh: '旋轉180°', en: 'Rotate 180°' },
  'js.rotated': { zh: ' 已轉', en: ' Rotated' },
  'js.detect.area': { zh: '偵測區域', en: 'Detection Area' },
  'js.rotate.handle': { zh: '旋轉', en: 'Rotate' },
  'js.sag.x': { zh: 'X曲', en: 'X-sag' },
  'js.sag.y': { zh: 'Y曲', en: 'Y-sag' },
  'js.dist.val.pre': { zh: 'P1↔P2:', en: 'P1↔P2:' },
  'js.dist.val.suf': { zh: 'cm （應為 6.00 cm）', en: 'cm  (expected 6.00 cm)' },
  'js.cursor.pre': { zh: '游標: x=', en: 'Cursor: x=' },
  'js.cursor.mid': { zh: ', y=', en: ', y=' },
  'js.cursor.suf': { zh: ' cm', en: ' cm' },
  'js.cursor.px.pre': { zh: '游標像素: (', en: 'Cursor pixel: (' },
  'action.detect.loading': { zh: '⌛ OpenCV 載入中...', en: '⌛ Loading OpenCV...' },
};

function t(key) {
  const s = STRINGS[key];
  if (!s) return key;
  return s[LANG.current] || s['zh'] || key;
}

function setLang(lang) {
  LANG.current = lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
  const btnZh = document.getElementById('lang-btn-zh');
  const btnEn = document.getElementById('lang-btn-en');
  if (btnZh) { btnZh.style.fontWeight = lang === 'zh' ? '800' : '400'; btnZh.style.opacity = lang === 'zh' ? '1' : '0.55'; }
  if (btnEn) { btnEn.style.fontWeight = lang === 'en' ? '800' : '400'; btnEn.style.opacity = lang === 'en' ? '1' : '0.55'; }
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    const key = el.getAttribute('data-i18n');
    const s = STRINGS[key];
    if (!s) return;
    const val = s[lang] || s['zh'];
    const attr = el.getAttribute('data-i18n-attr');
    if (attr === 'placeholder') { el.placeholder = val; }
    else if (attr === 'title') { el.title = val; }
    else if (el.tagName === 'OPTION') { el.textContent = val; }
    else if (val.indexOf('<') !== -1) { el.innerHTML = val; }
    else { el.textContent = val; }
  });
  document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
    const key = el.getAttribute('data-i18n-title');
    const s = STRINGS[key];
    if (!s) return;
    el.title = s[lang] || s['zh'];
  });
  if (typeof renderTable === 'function' && document.getElementById('coord-tbody') && document.getElementById('coord-tbody').children.length > 0) renderTable();
  if (document.getElementById('page-3') && document.getElementById('page-3').classList.contains('active')) {
    if (typeof renderPage3 === 'function') renderPage3();
    if (typeof drawChart === 'function') drawChart();
  }
  // Refresh imperatively-set modal title if modal is open
  const _mb = document.getElementById('modal-bg');
  if (_mb && _mb.classList.contains('open') && state.modalIdx != null) {
    const _f = state.files[state.modalIdx];
    if (_f) {
      const titleEl = el('modal-title');
      if (titleEl) {
        titleEl.textContent = _f._calRef
          ? `${t('js.modal.calmode')}${_f.name}`
          : `${t('js.modal.imgof')} ${state.modalIdx+1} / ${state.files.length} — ${_f.name}`;
      }
    }
  }
  if (typeof updateNextHint === 'function') updateNextHint();
}

/* ═══════════════════════════════
   OPENCV LOADING STATE
═══════════════════════════════ */
let _opencvReady = false;
let _opencvLoadFailed = false;
const _opencvCallbacks = [];

function _onOpenCvReady() {
  _opencvReady = true;
  _opencvCallbacks.forEach(function(fn) { fn(); });
  _opencvCallbacks.length = 0;
  console.info('OpenCV.js ready — using CV-powered detection.');
  const btn = document.getElementById('btn-detect');
  if (btn) { btn.textContent = t('action.detect'); btn.disabled = false; }
}

(function() {
  const ocvScript = document.getElementById('opencv-script');
  if (!ocvScript) return;
  // Show loading state on the detect button immediately
  const btn = document.getElementById('btn-detect');
  if (btn && !_opencvReady) { btn.textContent = t('action.detect.loading'); btn.disabled = true; }

  ocvScript.addEventListener('load', function() {
    if (typeof window.cv !== 'undefined' && window.cv.Mat) { _onOpenCvReady(); return; }
    if (typeof window.cv !== 'undefined') { window.cv['onRuntimeInitialized'] = _onOpenCvReady; return; }
    // cv global not yet set — poll for WASM init (up to 6 s)
    let n = 0;
    const poll = setInterval(function() {
      n++;
      if (typeof window.cv !== 'undefined') {
        clearInterval(poll);
        if (window.cv.Mat) _onOpenCvReady();
        else window.cv['onRuntimeInitialized'] = _onOpenCvReady;
      } else if (n > 20) {
        clearInterval(poll);
        _opencvLoadFailed = true;
        console.warn('OpenCV.js: cv global never appeared — using fallback detection.');
        const b2 = document.getElementById('btn-detect');
        if (b2) { b2.textContent = t('action.detect'); b2.disabled = false; }
      }
    }, 300);
  });
  ocvScript.addEventListener('error', function() {
    _opencvLoadFailed = true;
    console.warn('OpenCV.js failed to load — using fallback detection throughout.');
    const b2 = document.getElementById('btn-detect');
    if (b2) { b2.textContent = t('action.detect'); b2.disabled = false; }
  });
})();

/* ═══════════════════════════════
   STATE
═══════════════════════════════ */
const state = {
  files: [],    // {file, dataUrl, name, rotation}  (rotation: 0 | 180)
  results: [],  // {x1,y1,x2,y2, unclear, confidence, originPx, scalePxPerCm, spots, vLines, hLines}
  currentStep: 1,
  // Modal
  modalIdx: null,
  modalMode: 'origin',
  modalOrigin: null,   // {x,y} in display-canvas px
  modalScale: null,    // px/cm in display-canvas
  modalSpots: [],      // [{cx,cy}] in display-canvas px
  modalVLines: [],     // detected vertical grid lines (display-canvas px)
  modalHLines: [],     // detected horizontal grid lines (display-canvas px)
  modalImg: null,
  modalDispScale: 1,   // display canvas px / natural image px
  modalRotation: 0,    // current modal rotation (0 | 180)
  modalZoom: 1,        // current zoom multiplier for preview
  modalRefNeg3: null,   // clicked pixel for known point (-3,0)
  modalRefR1: null,     // clicked pixel for known point  (3,0)
  modalRefR2: null,     // clicked pixel for known point  (6,0)
  modalRef0_3: null,    // clicked pixel for known point  (0,3)
  modalRef0Neg3: null,  // clicked pixel for known point  (0,-3)
  modalRefNeg6: null,   // clicked pixel for known point (-6,0)
  modalRef0_6: null,    // clicked pixel for known point  (0,6)
  modalRef0Neg6: null,  // clicked pixel for known point  (0,-6)
  modalRefSkipped: {},  // {key:true} for ref points marked as FOV-outside
  modalAxisU: null,    // {x,y} px/cm  — X-axis direction vector (computed from ref points)
  modalAxisV: null,    // {x,y} px/cm  — Y-axis direction vector (computed from ref points)
  fisheyeKx: 0,        // X-axis barrel distortion coeff (persists across images)
  fisheyeKy: 0,        // Y-axis barrel distortion coeff (persists across images)
  axisPolyX: null,     // quadratic poly {ax,bx,cx,ay,by,cy} for X axis in canvas px
  axisPolyY: null,     // quadratic poly for Y axis in canvas px
  dragTarget: null,    // {key, startPx, startPy} — active drag state
  lensCal: null,       // {axisPolyX, axisPolyY, originPx, scale, imgName, imgDataUrl, refCount, timestamp}
  axisFromCal: false,  // true = polynomial came from lensCal (curvature locked; only translate/rotate allowed)
  calAxesTheta: 0,     // current rotation angle (radians) relative to calibration reference
};

/* ═══════════════════════════════
   UTILITIES
═══════════════════════════════ */
const el = id => document.getElementById(id);
const round125 = v => Math.round(v / MIN_UNIT) * MIN_UNIT;

/* ═══════════════════════════════
   LENS CALIBRATION
═══════════════════════════════ */

// Rotate + translate a calibration polynomial to a new origin and angle.
// Curvature magnitude is preserved; only direction (theta) and position change.
function rotateAndTranslatePoly(calPoly, newOrigin, theta) {
  if (!calPoly || !newOrigin) return null;
  const c = Math.cos(theta), s = Math.sin(theta);
  return {
    ax: calPoly.ax*c - calPoly.ay*s,  bx: calPoly.bx*c - calPoly.by*s,  cx: newOrigin.x,
    ay: calPoly.ax*s + calPoly.ay*c,  by: calPoly.bx*s + calPoly.by*c,  cy: newOrigin.y,
  };
}

// Convenience alias (theta = 0, i.e. pure translation)
function translatePoly(poly, calOrigin, newOrigin) {
  return rotateAndTranslatePoly(poly, newOrigin, 0);
}

function countCalRefs() {
  return ['modalRefNeg3','modalRefR1','modalRefR2','modalRefNeg6',
          'modalRef0_3','modalRef0Neg3','modalRef0_6','modalRef0Neg6']
    .filter(k => state[k] && !(state.modalRefSkipped||{})[k]).length;
}

function saveAsCalibration() {
  if (!state.axisPolyX || !state.modalOrigin || !state.modalScale) {
    alert(t('js.cal.need2ref'));
    return;
  }
  saveModalSilently(); // FIX: Save the reference points to the calibration image itself
  const imgFile = state.modalIdx != null ? state.files[state.modalIdx] : null;
  // Store polynomial with cx=cy=0 (relative to origin) so it can be placed at any detected origin
  const px = state.axisPolyX;
  const py = state.axisPolyY;
  state.lensCal = {
    axisPolyX:  { ax:px.ax, bx:px.bx, cx:0, ay:px.ay, by:px.by, cy:0 },
    axisPolyY:  py ? { ax:py.ax, bx:py.bx, cx:0, ay:py.ay, by:py.by, cy:0 } : null,
    originPx:   { ...state.modalOrigin },
    scale:      state.modalScale,
    imgName:    imgFile ? imgFile.name : '未知',
    imgDataUrl: imgFile ? imgFile.dataUrl : null,
    refCount:   countCalRefs(),
    timestamp:  new Date().toLocaleString('zh-TW'),
  };
  updateCalPanel();
  // Button flash feedback
  const btn = el('btn-set-cal');
  if (btn) {
    btn.textContent = t('js.cal.set');
    btn.classList.add('saved');
    setTimeout(() => { btn.textContent = t('js.cal.setbtn'); btn.classList.remove('saved'); }, 2200);
  }
  // Re-detect all uploaded images with the new calibration applied
  redetectAllWithCalibration();
}

// Re-run detection on every non-calibration image using the current lens calibration
async function redetectAllWithCalibration() {
  // FIX: Do not overwrite images that the user has already manually saved!
  const toProcess = state.files.map((f,i)=>({f,i})).filter(({f,i}) => !f._calRef && !(state.results[i] && state.results[i].manualSaved));
  if (!toProcess.length) return;
  const k1 = parseFloat(el('g-k1').value)||0;
  const subEl = el('cal-sub');
  const total = toProcess.length;
  for (const {f,i} of toProcess) {
    if (subEl) subEl.textContent = `${t('js.cal.applying')} ${i+1} / ${state.files.length}${t('js.cal.applying2')}`;
    state.results[i] = await detectImage(f.dataUrl, f.rotation||0, k1, false);
    await new Promise(r=>setTimeout(r,4));
  }
  updateUploadUI();
  if (state.currentStep===2) renderTable();
  // Restore status text
  if (subEl && state.lensCal) {
    const cal = state.lensCal;
    subEl.innerHTML = LANG.current==='zh'
      ? `參考圖：<strong style="color:#1e293b">${cal.imgName}</strong> 參考點：<strong style="color:var(--blue)">${cal.refCount}</strong> 個 設定時間：${cal.timestamp}`
      : `Ref image: <strong style="color:#1e293b">${cal.imgName}</strong>&emsp;Ref pts: <strong style="color:var(--blue)">${cal.refCount}</strong>&emsp;Set at: ${cal.timestamp}`;
  }
}

function resetCalibration() {
  if (!confirm(t('js.cal.confirmreset'))) return;
  state.lensCal = null;
  updateCalPanel();
}

function handleCalibFileSelect(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  ev.target.value = '';
  // Remove any previously-uploaded cal-ref entries so they don't accumulate
  for (let i = state.files.length - 1; i >= 0; i--) {
    if (state.files[i] && state.files[i]._calRef) {
      state.files.splice(i, 1);
      state.results.splice(i, 1);
    }
  }
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    const entry = { file, dataUrl, name: file.name, rotation: 0, _calRef: true };
    const idx = state.files.length;
    state.files.push(entry);
    state.results.push({});
    const k1 = parseFloat(el('g-k1').value) || 0;
    detectImage(dataUrl, 0, k1, true).then(r => {  // autoRot=true for calibration image
      state.results[idx] = r;
      // Apply auto-detected rotation to the file entry
      if (r._detectedRotation !== undefined) entry.rotation = r._detectedRotation;
      updateUploadUI();
      openModal(idx);
    });
  };
  reader.readAsDataURL(file);
}

function updateCalPanel() {
  if (typeof updateNextHint==='function') setTimeout(updateNextHint,0);
  const cal = state.lensCal;
  const panel      = el('cal-panel');
  const statusWrap = el('cal-status-wrap');
  const icon       = el('cal-icon');
  const title      = el('cal-title');
  const sub        = el('cal-sub');
  const resetBtn   = el('btn-cal-reset');
  const uploadBtn  = el('btn-cal-upload');
  const previewRow = el('cal-preview-row');
  const polyInfo   = el('cal-poly-info');

  if (!cal) {
    panel.classList.remove('cal-done');
    statusWrap.className = 'cal-status cal-uncal';
    icon.textContent = '⚠️';
    title.textContent = t('cal.title.unset');
    title.removeAttribute('data-i18n');
    title.setAttribute('data-i18n','cal.title.unset');
    sub.innerHTML = t('cal.sub.unset');
    sub.removeAttribute('data-i18n');
    sub.setAttribute('data-i18n','cal.sub.unset');
    if (resetBtn)   resetBtn.classList.add('hidden');
    if (uploadBtn)  uploadBtn.classList.remove('hidden');
    if (previewRow) previewRow.classList.add('hidden');
  } else {
    panel.classList.add('cal-done');
    statusWrap.className = 'cal-status cal-cal';
    icon.textContent = '✅';
    title.textContent = t('cal.title.set');
    title.removeAttribute('data-i18n');
    title.setAttribute('data-i18n','cal.title.set');
    sub.innerHTML = LANG.current==='zh'
      ? `參考圖：<strong style="color:#1e293b">${cal.imgName}</strong> 參考點：<strong style="color:var(--blue)">${cal.refCount}</strong> 個 設定時間：${cal.timestamp}`
      : `Ref image: <strong style="color:#1e293b">${cal.imgName}</strong>&emsp;Ref pts: <strong style="color:var(--blue)">${cal.refCount}</strong>&emsp;Set at: ${cal.timestamp}`;
    sub.removeAttribute('data-i18n');
    if (resetBtn)   resetBtn.classList.remove('hidden');
    if (uploadBtn)  uploadBtn.classList.add('hidden');
    if (previewRow) previewRow.classList.remove('hidden');

    const px = cal.axisPolyX, py = cal.axisPolyY;
    if (polyInfo) polyInfo.innerHTML =
      `<strong>X 軸多項式</strong><br>` +
      `曲率 ax = ${px.ax.toExponential(3)}<br>` +
      `斜率 bx = ${px.bx.toFixed(4)}<br>` +
      `原點 cx = ${Math.round(px.cx)} px<br><br>` +
      (py ?
        `<strong>Y 軸多項式</strong><br>` +
        `曲率 ay = ${py.ay.toExponential(3)}<br>` +
        `斜率 by = ${py.by.toFixed(4)}<br>` +
        `原點 cy = ${Math.round(py.cy)} px<br><br>` : '') +
      `<strong>比例尺</strong>：${cal.scale.toFixed(1)} px/cm<br>` +
      `<strong>原點畫素</strong>：(${Math.round(cal.originPx.x)}, ${Math.round(cal.originPx.y)})`;

    renderCalPreview();
    renderCalDistortion();
  }
}

// Draw the calibration reference image with polynomial axes overlaid
function renderCalPreview() {
  const cal = el('cal-img-cv');
  if (!cal || !state.lensCal) return;
  const ctx = cal.getContext('2d');
  const W = cal.width, H = cal.height;
  ctx.clearRect(0, 0, W, H);

  const drawAxes = (s, ox, oy) => {
    const px = state.lensCal.axisPolyX, py = state.lensCal.axisPolyY;
    ctx.save(); ctx.translate(ox, oy); ctx.scale(s, s);
    // X axis
    ctx.strokeStyle = 'rgba(29,78,216,0.92)'; ctx.lineWidth = 2/s; ctx.beginPath();
    for (let t = -20; t <= 20; t += 0.4) {
      const p = evalPoly(px, t);
      t === -20 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    // Y axis
    if (py) {
      ctx.strokeStyle = 'rgba(29,78,216,0.60)'; ctx.lineWidth = 1.5/s; ctx.beginPath();
      for (let t = -16; t <= 16; t += 0.4) {
        const p = evalPoly(py, t);
        t === -16 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    // Origin dot
    const orig = evalPoly(px, 0);
    ctx.fillStyle = '#22c55e'; ctx.beginPath();
    ctx.arc(orig.x, orig.y, 5/s, 0, 2*Math.PI); ctx.fill();
    ctx.restore();
  };

  if (state.lensCal.imgDataUrl) {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      const ox = (W - dw) / 2, oy = (H - dh) / 2;
      ctx.drawImage(img, ox, oy, dw, dh);
      drawAxes(s, ox, oy);
    };
    img.src = state.lensCal.imgDataUrl;
  } else {
    ctx.fillStyle = '#f1f5f9'; ctx.fillRect(0,0,W,H);
    drawAxes(1, 0, 0);
  }
}

// Draw the distortion deviation curve (how much polynomial bends vs. a straight line)
function renderCalDistortion() {
  const cv = el('cal-dist-cv');
  if (!cv || !state.lensCal) return;
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);

  const px = state.lensCal.axisPolyX, py = state.lensCal.axisPolyY;
  const scale = state.lensCal.scale; // px/cm
  if (!px || !scale) return;

  // Padding
  const pad = { l:36, r:10, t:24, b:32 };
  const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;

  // Compute deviation for each axis: quadratic term ax*t^2 (in cm)
  const tMin = -10, tMax = 10, steps = 80;
  const devX = [], devY = [];
  for (let i = 0; i <= steps; i++) {
    const t = tMin + (tMax - tMin) * i / steps;
    devX.push({ t, d: px.ax * t * t / scale }); // pixels → cm
    if (py) devY.push({ t, d: py.ay * t * t / scale });
  }

  const allDev = [...devX.map(d=>d.d), ...(py?devY.map(d=>d.d):[])];
  const maxAbs = Math.max(0.01, ...allDev.map(Math.abs));
  const yScale = cH / 2 / (maxAbs * 1.15);
  const xScale = cW / (tMax - tMin);

  // Background
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff'; ctx.fillRect(pad.l, pad.t, cW, cH);

  // Grid lines
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
  for (let t = tMin; t <= tMax; t += 5) {
    const x = pad.l + (t - tMin) * xScale;
    ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, pad.t + cH); ctx.stroke();
  }

  // Zero line
  const yMid = pad.t + cH / 2;
  ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad.l, yMid); ctx.lineTo(pad.l + cW, yMid); ctx.stroke();

  // Plot X deviation
  ctx.strokeStyle = 'rgba(29,78,216,0.85)'; ctx.lineWidth = 2; ctx.beginPath();
  devX.forEach((d, i) => {
    const x = pad.l + (d.t - tMin) * xScale;
    const y = yMid - d.d * yScale;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Plot Y deviation
  if (py && devY.length) {
    ctx.strokeStyle = 'rgba(29,78,216,0.40)'; ctx.lineWidth = 2; ctx.setLineDash([4,3]);
    ctx.beginPath();
    devY.forEach((d, i) => {
      const x = pad.l + (d.t - tMin) * xScale;
      const y = yMid - d.d * yScale;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke(); ctx.setLineDash([]);
  }

  // Axes labels
  ctx.fillStyle = '#64748b'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('−10', pad.l, pad.t + cH + 16);
  ctx.fillText('0', pad.l + cW/2, pad.t + cH + 16);
  ctx.fillText('+10', pad.l + cW, pad.t + cH + 16);
  ctx.fillText('cm', pad.l + cW/2, pad.t + cH + 26);

  // Y axis label (max deviation in cm)
  ctx.textAlign = 'right';
  ctx.fillText(`+${maxAbs.toFixed(2)}`, pad.l - 3, pad.t + 10);
  ctx.fillText(`−${maxAbs.toFixed(2)}`, pad.l - 3, pad.t + cH);
  ctx.fillText('0', pad.l - 3, yMid + 4);

  // Title
  ctx.textAlign = 'center'; ctx.fillStyle = '#334155'; ctx.font = 'bold 10px sans-serif';
  ctx.fillText('畸變量 (cm) — 實線=X軸 虛線=Y軸', pad.l + cW/2, pad.t - 8);

  // Border
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
  ctx.strokeRect(pad.l, pad.t, cW, cH);
}

/* ═══════════════════════════════
   STEP NAVIGATION
═══════════════════════════════ */
function goStep(n) {
  // Page 2 → Page 3: confirm the user has reviewed every image
  if (n === 3 && state.currentStep === 2) {
    if (!confirm(
      '前往輸出前 / Before exporting\n\n' +
      '是否已逐張確認以下 3 點對準？\n' +
      'Have you reviewed each image to verify all 3 are correctly aligned?\n' +
      '  • 原點 (0,0) / Origin\n' +
      '  • 座標軸 / Coordinate axes\n' +
      '  • 兩個雷射點 / Both laser points\n\n' +
      '【確定 / OK】 = 已確認，前往輸出 / Confirmed, go to output\n' +
      '【取消 / Cancel】 = 我要再檢查一次 / Let me review again'
    )) return;
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  el(`page-${n}`).classList.add('active');
  [1,2,3].forEach(i => {
    const s = el(`step-ind-${i}`);
    s.classList.remove('active','done');
    if (i < n) s.classList.add('done');
    else if (i === n) s.classList.add('active');
  });
  state.currentStep = n;
  if (n === 2) renderTable();
  if (n === 3) { renderPage3(); drawChart(); }
  if (typeof updateNextHint==='function') updateNextHint();
}

function tryGoStep(n) {
  const okN = state.results.filter(r => r && !r.unclear && r.confidence !== 'unclear').length;
  if (n === 2 && okN === 0) { alert(LANG.current==='en'?'Run auto-detection first (or upload images).':'請先上傳圖片並執行自動辨識'); return; }
  if (n === 3 && okN === 0) { alert(LANG.current==='en'?'No detected results to chart yet.':'尚無辨識結果可繪製'); return; }
  goStep(n);
}

function updateNextHint() {
  const hint = el('next-hint'); if (!hint) return;
  const msgEl = el('nh-msg'), btnEl = el('nh-action'), iconEl = el('nh-icon');
  // Exclude calibration reference images from user-facing counts
  const workingFiles = state.files.filter(f => !f._calRef);
  const workingResults = state.files.map((f, i) => f._calRef ? null : state.results[i]).filter(r => r);
  const N = workingFiles.length;
  const okCount = workingResults.filter(r => r && !r.unclear && r.confidence !== 'unclear').length;
  const manualCount = workingResults.filter(r => r && r.manualSaved).length;
  const step = state.currentStep || 1;
  const en = LANG.current === 'en';
  hint.classList.remove('success','warn');
  btnEl.style.display = 'none'; btnEl.onclick = null;
  document.querySelectorAll('.pulse-cta').forEach(b => b.classList.remove('pulse-cta'));
  const sb2 = el('step-ind-2'), sb3 = el('step-ind-3');
  if (sb2) sb2.classList.toggle('disabled', okCount === 0);
  if (sb3) sb3.classList.toggle('disabled', okCount === 0);
  if (step === 1) {
    if (N === 0) {
      iconEl.textContent = '👋';
      msgEl.innerHTML = en
        ? `<strong>Step 1:</strong> Drag images into the dashed box below, or click <strong>Select Images</strong> to begin.`
        : `<strong>第一步：</strong>拖曳照片到下方虛線框，或按「<strong>選擇圖片</strong>」開始`;
    } else if (!state.lensCal) {
      hint.classList.add('alert'); iconEl.textContent = '📐';
      msgEl.innerHTML = en
        ? `<strong>Recommended next:</strong> set lens calibration first — click <strong>📷 Upload Calibration Reference</strong> above to mark a reference image. (You may skip if you accept reduced accuracy.)`
        : `<strong>建議下一步：</strong>先設定鏡頭校正基準 — 按上方「<strong>📷 上傳校正參考圖</strong>」標定參考點（若不需要可略過直接辨識）`;
      const cb = el('btn-cal-upload'); if (cb) cb.classList.add('pulse-cta');
      btnEl.style.display = ''; btnEl.classList.add('pulse-cta');
      btnEl.textContent = en ? '📷 Set Calibration' : '📐 設定校正基準';
      btnEl.onclick = () => { const c = el('btn-cal-upload'); if (c) c.click(); };
    } else if (okCount === 0) {
      hint.classList.add('warn'); iconEl.textContent = '⚡';
      msgEl.innerHTML = en
        ? `<strong>${N}</strong> images loaded · ✓ Calibration ready — click <strong>▶ Auto-detect All</strong> to start.`
        : `已載入 <strong>${N}</strong> 張 · ✓ 校正已就緒，按「<strong>▶ 自動辨識全部</strong>」開始`;
      const db = el('btn-detect'); if (db) db.classList.add('pulse-cta');
    } else {
      hint.classList.add('success'); iconEl.textContent = '✅';
      msgEl.innerHTML = en
        ? `Detection done (<strong>${okCount}/${N}</strong>). Proceed to review →`
        : `辨識完成（<strong>${okCount}/${N}</strong>），前往審閱與微調 →`;
      btnEl.style.display = ''; btnEl.classList.add('pulse-cta');
      btnEl.textContent = en ? 'Next: Review →' : '下一步：檢查座標 →';
      btnEl.onclick = () => goStep(2);
    }
  } else if (step === 2) {
    const needs = N - okCount;
    iconEl.textContent = '🔍';
    if (needs > 0) {
      hint.classList.add('warn');
      msgEl.innerHTML = en
        ? `<strong>${okCount}/${N}</strong> auto-detected, <strong>${needs}</strong> need manual review — click any thumbnail to fine-tune.`
        : `<strong>${okCount}/${N}</strong> 已辨識，<strong>${needs}</strong> 張需手動確認 — 點縮圖開啟微調視窗`;
    } else {
      hint.classList.add('success');
      msgEl.innerHTML = en
        ? `All <strong>${N}</strong> images detected${manualCount?` (${manualCount} manually saved)`:''}. Please review each image to check that the origin and laser points are not offset; if all looks good, proceed to output →`
        : `全部 <strong>${N}</strong> 張已辨識${manualCount?`（${manualCount} 已手動確認）`:''}，請逐張檢查是否原點或雷射點有偏移，若沒問題可前往輸出 →`;
    }
    btnEl.style.display = ''; btnEl.classList.add('pulse-cta');
    btnEl.textContent = en ? 'Next: Output →' : '下一步：輸出結果 →';
    btnEl.onclick = () => goStep(3);
  } else if (step === 3) {
    hint.classList.add('success'); iconEl.textContent = '🎉';
    msgEl.innerHTML = en
      ? `Done! Click <strong>⬇ Download Chart (PNG)</strong> for the analysis chart, or <strong>⬇ Download Excel</strong> for the data.`
      : `完成！按「<strong>⬇ 下載分析圖 (PNG)</strong>」存圖表，或「<strong>⬇ 下載 Excel</strong>」存數據`;
  }
}

/* ═══════════════════════════════
   FILE UPLOAD
═══════════════════════════════ */
const dropZone = el('drop-zone');
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('drag-over'); addFiles(e.dataTransfer.files); });
el('fi').addEventListener('change', e => addFiles(e.target.files));

function addFiles(fileList) {
  const allowed = 30 - state.files.length;
  if (allowed <= 0) { alert(t('js.max30')); return; }
  const arr = Array.from(fileList).slice(0, allowed);
  let done = 0;
  arr.forEach(f => {
    const reader = new FileReader();
    reader.onload = ev => {
      state.files.push({ file:f, dataUrl:ev.target.result, name:f.name, rotation:0 });
      state.results.push({ unclear:true, confidence:'unclear' });
      if (++done === arr.length) { updateUploadUI(); if (typeof updateNextHint==='function') updateNextHint(); }
    };
    reader.readAsDataURL(f);
  });
}

// ─── Session save / load ─────────────────────────────────────────────────────
function _ts(){const d=new Date(),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes());}
function _readAsDataURL(blob){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(blob);});}
function _triggerDownload(blob,filename){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url);},0);}
function _readVal(id){const e=el(id);return e?e.value:null;}
function _writeVal(id,v){const e=el(id);if(e&&v!==null&&v!==undefined)e.value=v;}

function buildSessionJson(){
  return {
    version:2, savedAt:new Date().toISOString(),
    globalSettings:{
      k1:parseFloat(_readVal('g-k1'))||0,
      laserR:parseFloat(_readVal('g-laserR'))||0,
      autorot:_readVal('g-autorot')||'1'
    },
    page3Settings:{
      refX:parseFloat(_readVal('ref-x'))||0,
      refY:parseFloat(_readVal('ref-y'))||0,
      accThresh:parseFloat(_readVal('acc-thresh'))||5,
      customRp:_readVal('custom-rp')===''?null:parseFloat(_readVal('custom-rp')),
      plotMode:_readVal('plot-mode')||'x1y1',
      testId:_readVal('test-id')||''
    },
    lensCal:state.lensCal?JSON.parse(JSON.stringify(state.lensCal)):null,
    files:state.files.map((f,i)=>({
      name:f.name, rotation:f.rotation||0,
      isCalRef:!!f._calRef,
      result:JSON.parse(JSON.stringify(state.results[i]||{}))
    }))
  };
}

function applySessionToState(session,imageMap){
  state.files=[]; state.results=[]; state.lensCal=null;
  if (session.globalSettings){
    _writeVal('g-k1',session.globalSettings.k1);
    _writeVal('g-laserR',session.globalSettings.laserR);
    _writeVal('g-autorot',session.globalSettings.autorot);
  }
  if (session.page3Settings){
    _writeVal('ref-x',session.page3Settings.refX);
    _writeVal('ref-y',session.page3Settings.refY);
    _writeVal('acc-thresh',session.page3Settings.accThresh);
    _writeVal('custom-rp',session.page3Settings.customRp==null?'':session.page3Settings.customRp);
    _writeVal('plot-mode',session.page3Settings.plotMode);
    _writeVal('test-id',session.page3Settings.testId);
  }
  if (session.lensCal){
    state.lensCal=JSON.parse(JSON.stringify(session.lensCal));
    console.info('[Session] Lens calibration restored');
  }
  if (typeof updateCalPanel==='function'){try{updateCalPanel();}catch(_){}}
  const missing=[];
  const promises=(session.files||[]).map(async (entry)=>{
    const file=imageMap?imageMap[entry.name]:null;
    let dataUrl=null;
    if (file){try{dataUrl=await _readAsDataURL(file);}catch(_){}} else missing.push(entry.name);
    const slot={file:file||null,dataUrl,name:entry.name,rotation:entry.rotation||0};
    if (entry.isCalRef) slot._calRef=true;
    return {
      slot,
      result:entry.result||{unclear:true,confidence:'unclear'}
    };
  });
  return Promise.all(promises).then(arr=>{
    arr.forEach(({slot,result})=>{state.files.push(slot);state.results.push(result);});
    updateUploadUI();
    
    // FIX: Force the UI to refresh if you load the ZIP while on Page 2 or Page 3
    if (state.currentStep === 2 && typeof renderTable === 'function') renderTable();
    if (state.currentStep === 3) {
      if (typeof renderPage3 === 'function') renderPage3();
      if (typeof drawChart === 'function') drawChart();
    }
    
    console.info('[Session] Restored:',
      '\n  files='+state.files.length,
      '\n  lensCal='+(state.lensCal?'yes':'no'),
      '\n  calRefs='+state.files.filter(f=>f._calRef).length,
      '\n  manual='+state.results.filter(r=>r&&r.manualSaved).length,
      '\n  schema=v'+(session.version||1));
    if (typeof updateNextHint==='function') updateNextHint();
    if (missing.length){
      alert(
        '讀回 '+missing.length+' 張照片缺失\n（仍可看 Page 3 圖表，但 Page 2 modal 微調需重新上傳同名照片）\n' +
        '────────────────\n' +
        missing.length+' image(s) missing after restore\n(Page 3 chart still works, but to fine-tune in Page 2 modal please re-upload same-named photos)'
      );
      console.warn('[Session] Images missing:',missing);
    }
  });
}

async function saveSessionZip(){
  if (!state.results.length){alert('尚無資料可存檔\nNo data to save yet');return;}
  if (typeof JSZip==='undefined'){alert('JSZip 未載入，無法產生 .zip\nJSZip not loaded; cannot produce .zip');return;}
  const defaultName = 'laser-session-' + _ts();
  const userInput = prompt('請輸入存檔名稱（不含 .zip）\nEnter filename (without .zip):', defaultName);
  if (userInput === null) return;   
  const fname = (userInput.trim() || defaultName).replace(/[/\\:*?"<>|]/g, '_');
  const totalBytes=state.files.reduce((s,f)=>s+(f&&f.file?f.file.size:0),0);
  const totalMB=totalBytes/1024/1024;
  if (totalMB>100){
    if (!confirm(
      '預計 .zip 約 '+totalMB.toFixed(0)+' MB / Estimated .zip ~'+totalMB.toFixed(0)+' MB\n' +
      '（可能需要數十秒並佔用大量記憶體 / May take tens of seconds and use a lot of memory）\n\n' +
      '【確定 / OK】 = 繼續產生 .zip / Continue to generate .zip\n' +
      '【取消 / Cancel】 = 取消 / Abort'
    )) return;
  }
  try {
    const zip=new JSZip();
    const session=buildSessionJson();
    zip.file('session.json',JSON.stringify(session,null,2));
    const imgFolder=zip.folder('images');
    for (let i=0;i<state.files.length;i++){
      const f=state.files[i];
      if (f && f.file) imgFolder.file(f.name,f.file);
    }
    const blob=await zip.generateAsync(
      {type:'blob',compression:'DEFLATE'},
      function(meta){if (Math.round(meta.percent)%10===0) console.info('[ZIP] '+Math.round(meta.percent)+'%');}
    );
    _triggerDownload(blob, fname + '.zip');
    console.info('[ZIP] Saved '+(blob.size/1024/1024).toFixed(1)+' MB');
  } catch(e){console.error(e);alert('存檔失敗 / Save failed:\n'+e.message);}
}

function saveSessionXlsx(){
  if (!state.results.length){alert('尚無資料可存檔\nNo data to save yet');return;}
  const defaultName = 'laser-params-' + _ts();
  const userInput = prompt('請輸入存檔名稱（不含 .xlsx）\nEnter filename (without .xlsx):', defaultName);
  if (userInput === null) return;
  const fname = (userInput.trim() || defaultName).replace(/[/\\:*?"<>|]/g, '_');
  try {
    const session=buildSessionJson();
    const wb=XLSX.utils.book_new();
    const settingsRows=[['key','value']];
    Object.entries(session.globalSettings).forEach(([k,v])=>settingsRows.push(['global.'+k,v]));
    Object.entries(session.page3Settings).forEach(([k,v])=>settingsRows.push(['page3.'+k,v==null?'':v]));
    if (session.lensCal) {
      const cmi=Object.assign({},session.lensCal);
      delete cmi.imgDataUrl;  // Excel cell 32K limit
      settingsRows.push(['lensCal.json',JSON.stringify(cmi)]);
      settingsRows.push(['lensCal.note','imgDataUrl 未存入 xlsx；如需完整校正請使用 .zip']);
    }
    settingsRows.push(['_savedAt',session.savedAt]);
    settingsRows.push(['_version',session.version]);
    const wsS=XLSX.utils.aoa_to_sheet(settingsRows);
    wsS['!cols']=[{wch:18},{wch:30}];
    XLSX.utils.book_append_sheet(wb,wsS,'Settings');
    const coordRows=[['jpg','x1','y1','x2','y2','originX','originY','scale','rotation','refsJson','polysJson','homoJson','manualSaved']];
    session.files.forEach(f=>{
      if (f.isCalRef) return;   
      const r=f.result||{};
      const refs={};
      ['refNeg6','refNeg3','refR1','refR2','ref0Neg6','ref0Neg3','ref0_3','ref0_6'].forEach(k=>{if(r[k])refs[k]=r[k];});
      const polys=(r.axisPolyX||r.axisPolyY)?{x:r.axisPolyX,y:r.axisPolyY}:null;
      const homo=(r.homography||r.homographyInv)?{H:r.homography,Hinv:r.homographyInv}:null;
      coordRows.push([
        f.name,
        Number.isFinite(r.x1)?r.x1:'', Number.isFinite(r.y1)?r.y1:'',
        Number.isFinite(r.x2)?r.x2:'', Number.isFinite(r.y2)?r.y2:'',
        r.originPx?r.originPx.x:'', r.originPx?r.originPx.y:'',
        r.scalePxPerCm||'', f.rotation||0,
        Object.keys(refs).length?JSON.stringify(refs):'',
        polys?JSON.stringify(polys):'',
        homo?JSON.stringify(homo):'',
        r.manualSaved?1:0
      ]);
    });
    const wsC=XLSX.utils.aoa_to_sheet(coordRows);
    wsC['!cols']=[{wch:30},{wch:8},{wch:8},{wch:8},{wch:8},{wch:10},{wch:10},{wch:10},{wch:10},{wch:30},{wch:30},{wch:30},{wch:10}];
    XLSX.utils.book_append_sheet(wb,wsC,'Coordinates');
    XLSX.writeFile(wb, fname + '.xlsx');
  } catch(e){console.error(e);alert('存檔失敗 / Save failed:\n'+e.message);}
}

function _parseXlsxToSession(arrayBuffer){
  const wb=XLSX.read(arrayBuffer,{type:'array'});
  const session={version:1,savedAt:new Date().toISOString(),
    globalSettings:{k1:0,laserR:0,autorot:'1'},
    page3Settings:{refX:3,refY:0,accThresh:5,customRp:null,plotMode:'x1y1',testId:''},
    files:[]};
  const sNames=wb.SheetNames||[];
  if (sNames.includes('Settings')){
    const rows=XLSX.utils.sheet_to_json(wb.Sheets['Settings'],{header:1});
    rows.slice(1).forEach(row=>{
      const k=row[0],v=row[1]; if(!k)return;
      if (k.startsWith('global.')) session.globalSettings[k.slice(7)]=v;
      else if (k.startsWith('page3.')) session.page3Settings[k.slice(6)]=(v===''||v==null)?null:v;
      else if (k==='lensCal.json'&&v){try{session.lensCal=JSON.parse(v);}catch(_){}}
    });
  }
  const coordSheet=sNames.includes('Coordinates')?'Coordinates':sNames[0];
  if (coordSheet){
    const rows=XLSX.utils.sheet_to_json(wb.Sheets[coordSheet],{header:1});
    if (!rows.length) return session;
    const header=rows[0].map(s=>String(s||'').trim());
    const idx=name=>header.indexOf(name);
    const I={jpg:idx('jpg'),x1:idx('x1'),y1:idx('y1'),x2:idx('x2'),y2:idx('y2'),
      ox:idx('originX'),oy:idx('originY'),sc:idx('scale'),rot:idx('rotation'),
      refs:idx('refsJson'),polys:idx('polysJson'),homo:idx('homoJson'),ms:idx('manualSaved')};
    rows.slice(1).forEach(r=>{
      if (!r||!r[I.jpg]) return;
      const result={unclear:false,confidence:'ok',
        x1:I.x1>=0&&r[I.x1]!==''?Number(r[I.x1]):NaN,
        y1:I.y1>=0&&r[I.y1]!==''?Number(r[I.y1]):NaN,
        x2:I.x2>=0&&r[I.x2]!==''?Number(r[I.x2]):NaN,
        y2:I.y2>=0&&r[I.y2]!==''?Number(r[I.y2]):NaN,
        originPx:(I.ox>=0&&I.oy>=0&&r[I.ox]!==''&&r[I.oy]!=='')?{x:Number(r[I.ox]),y:Number(r[I.oy])}:null,
        scalePxPerCm:I.sc>=0&&r[I.sc]!==''?Number(r[I.sc]):null,
        spots:[],vLines:[],hLines:[],axisPolyX:null,axisPolyY:null,
        homography:null,homographyInv:null,refCount:0,
        manualSaved:I.ms>=0&&r[I.ms]==1};
      try{if(I.refs>=0&&r[I.refs])Object.assign(result,JSON.parse(r[I.refs]));}catch(_){}
      try{if(I.polys>=0&&r[I.polys]){const p=JSON.parse(r[I.polys]);result.axisPolyX=p.x;result.axisPolyY=p.y;}}catch(_){}
      try{if(I.homo>=0&&r[I.homo]){const h=JSON.parse(r[I.homo]);result.homography=h.H;result.homographyInv=h.Hinv;}}catch(_){}
      session.files.push({name:String(r[I.jpg]),rotation:I.rot>=0?(Number(r[I.rot])||0):0,result});
    });
  }
  return session;
}

async function loadSessionFromInput(ev){
  const f=ev.target.files&&ev.target.files[0]; if(!f)return;
  ev.target.value='';
  const ext=(f.name.split('.').pop()||'').toLowerCase();
  try {
    if (ext==='zip'){
      if (typeof JSZip==='undefined'){alert('JSZip 未載入，無法讀取 .zip\nJSZip not loaded; cannot read .zip');return;}
      const zip=await JSZip.loadAsync(f);
      const jsonEntry=zip.file('session.json');
      if (!jsonEntry){alert('壞掉的存檔：找不到 session.json\nCorrupt save file: session.json missing');return;}
      const session=JSON.parse(await jsonEntry.async('string'));
      const imageMap={};
      const filePaths=Object.keys(zip.files).filter(p=>p.startsWith('images/')&&!zip.files[p].dir);
      for (const p of filePaths){
        const fname=p.replace('images/','');
        const blob=await zip.files[p].async('blob');
        imageMap[fname]=new File([blob],fname,{type:blob.type||'image/jpeg'});
      }
      await applySessionToState(session,imageMap);
      console.info('[Session] Loaded .zip with '+filePaths.length+' images');
    } else if (ext==='xlsx'){
      const buf=await f.arrayBuffer();
      const session=_parseXlsxToSession(buf);
      await applySessionToState(session,{});
      console.info('[Session] Loaded .xlsx ('+session.files.length+' rows)');
    } else { alert('不支援的檔案格式 / Unsupported file format: '+ext); }
  } catch(e){console.error(e);alert('讀檔失敗 / Load failed:\n'+e.message);}
}

async function loadExcelToChartFromInput(ev){
  const f=ev.target.files&&ev.target.files[0]; if(!f)return;
  ev.target.value='';
  state.lensCal=null;
  if (typeof updateCalPanel==='function'){try{updateCalPanel();}catch(_){}}
  try {
    const buf=await f.arrayBuffer();
    const wb=XLSX.read(buf,{type:'array'});
    const ws=wb.Sheets[wb.SheetNames[0]];
    if (!ws){alert('Excel 沒有工作表\nExcel has no sheets');return;}
    const rows=XLSX.utils.sheet_to_json(ws,{header:1});
    if (!rows.length){alert('Excel 是空的\nExcel is empty');return;}
    const headerRow=rows[0];
    const looksLikeHeader=headerRow&&/jpg|x1/i.test(String(headerRow[0])+String(headerRow[1]||''));
    const dataRows=(looksLikeHeader?rows.slice(1):rows).filter(r=>r&&r.length>=5&&r[1]!==''&&r[1]!=null);
    if (!dataRows.length){alert('找不到有效資料列（需要 5 欄：jpg, x1, y1, x2, y2）\nNo valid rows found (need 5 columns: jpg, x1, y1, x2, y2)');return;}
    state.files=dataRows.map(r=>({name:String(r[0]||''),file:null,dataUrl:null,rotation:0}));
    state.results=dataRows.map(r=>({unclear:false,confidence:'ok',
      x1:Number(r[1]),y1:Number(r[2]),x2:Number(r[3]),y2:Number(r[4]),
      originPx:null,scalePxPerCm:null,spots:[],vLines:[],hLines:[],
      axisPolyX:null,axisPolyY:null,homography:null,homographyInv:null,refCount:0}));
    updateUploadUI();
    if (typeof goStep==='function') goStep(3);
    if (typeof drawChart==='function') drawChart();
    console.info('[Session] Excel→Chart: '+dataRows.length+' points loaded');
  } catch(e){console.error(e);alert('讀檔失敗 / Load failed:\n'+e.message);}
}

function updateUploadUI() {
  const visible = state.files.filter(f => !f._calRef);
  el('file-count').textContent = visible.length;
  el('action-bar').classList.toggle('hidden', visible.length === 0);
  const grid = el('file-grid');
  grid.innerHTML = '';
  state.files.forEach((f, i) => {
    if (f._calRef) return;
    const r = state.results[i] || {};
    const conf = r.confidence || 'unclear';
    const badgeC = conf==='ok'?'badge-ok':conf==='low'?'badge-warn':'badge-err';
    const badgeT = conf==='ok'?'✔':conf==='low'?'⚠':'✗';
    const rotStyle = f.rotation ? 'transform:rotate(180deg)' : '';
    const chip = document.createElement('div');
    chip.className = 'file-chip';
    chip.id = `chip-${i}`;
    const calBadge = f._calRef ? '<span style="font-size:.65rem;background:#eff6ff;color:var(--blue);border-radius:3px;padding:0 4px;font-weight:700;margin-left:2px">CAL</span>' : '';
    const imgEl = f.dataUrl
      ? `<img src="${f.dataUrl}" style="${rotStyle}" onclick="openModal(${i})">`
      : `<div style="width:100%;height:80px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:.8rem;border-radius:4px;cursor:pointer" onclick="openModal(${i})" title="原檔缺失">📂 缺檔</div>`;
    chip.innerHTML = `
      <span class="chip-num">${i+1}</span>
      <button class="chip-rot" title="${t('js.rot180')}" onclick="rotateChip(${i})">↻</button>
      ${imgEl}
      <div class="chip-name">${f.name}</div>
      <div class="chip-badge"><span class="badge ${badgeC}">${badgeT}</span>${calBadge}${f.rotation?`<span style="font-size:.65rem;color:var(--amber)">${t('js.rotated')}</span>`:''}</div>`;
    grid.appendChild(chip);
  });
}

function rotateChip(idx) {
  state.files[idx].rotation = state.files[idx].rotation === 180 ? 0 : 180;
  state.results[idx] = { unclear:true, confidence:'unclear' };
  updateUploadUI();
}

function clearAll() {
  if (!confirm(t('js.clearconfirm'))) return;
  state.files = []; state.results = [];
  updateUploadUI();
  el('prog-wrap').classList.add('hidden');
  if (typeof updateNextHint==='function') updateNextHint();
}

/* ═══════════════════════════════
   AUTO-DETECTION PIPELINE
═══════════════════════════════ */
async function runDetection() {
  if (!state.files.length) { alert(t('js.noimages')); return; }
  const manualCount = state.results.filter(r => r && r.manualSaved).length;
  let forceAll = false;
  if (manualCount > 0) {
    forceAll = confirm(
      manualCount + ' 張結果已手動微調 / ' + manualCount + ' results were manually saved\n\n' +
      '【確定 / OK】 = 一併重跑（會覆蓋微調）/ Re-run all (overwrites manual edits)\n' +
      '【取消 / Cancel】 = 略過這些張 / Skip these'
    );
  }
  el('btn-detect').disabled = true;
  el('prog-wrap').classList.remove('hidden');
  const k1 = parseFloat(el('g-k1').value) || 0;
  const autoRot = el('g-autorot').value === '1';

  let skipped = 0, noImg = 0;
  for (let i = 0; i < state.files.length; i++) {
    if (state.files[i]._calRef) continue;
    if (!state.files[i].dataUrl) {
      console.warn('[Detection] Skipping ' + state.files[i].name + ' — no image data');
      noImg++; continue;
    }
    if (state.results[i] && state.results[i].manualSaved && !forceAll) { skipped++; continue; }
    setProgress(i, state.files.length, state.files[i].name);
    state.results[i] = await detectImage(state.files[i].dataUrl, state.files[i].rotation, k1, autoRot);
    if (autoRot && state.results[i]._detectedRotation !== undefined) {
      state.files[i].rotation = state.results[i]._detectedRotation;
    }
    await new Promise(r => setTimeout(r, 8));
  }
  if (skipped) console.info('[Detection] Skipped ' + skipped + ' manually-saved result(s)');
  if (noImg)   console.info('[Detection] Skipped ' + noImg + ' result(s) — no image data');
  setProgress(state.files.length, state.files.length, t('js.done'));
  el('btn-detect').disabled = false;
  updateUploadUI();
  if (typeof updateNextHint==='function') updateNextHint();
  setTimeout(() => goStep(2), 500);
}

function setProgress(cur, total, name) {
  const pct = Math.round(cur/total*100);
  el('prog-fill').style.width = pct+'%';
  el('prog-pct').textContent = pct+'%';
  el('prog-text').textContent = `${t('js.detecting')} ${cur}/${total}`;
  el('prog-sub').textContent = name;
}

function detectImage(dataUrl, rotation, k1, autoRot) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(runDetectionOnImage(img, rotation, k1, autoRot));
    img.src = dataUrl;
  });
}

/* ───── MAIN DETECTION ───── */
async function runDetectionOnImage(img, rotation, k1, autoRot) {
  const W = img.naturalWidth, H = img.naturalHeight;
  const canvasEl = document.createElement('canvas');
  canvasEl.width = W; canvasEl.height = H;
  const ctx = canvasEl.getContext('2d');

  if (rotation === 180) {
    ctx.translate(W, H); ctx.rotate(Math.PI);
  }
  ctx.drawImage(img, 0, 0);
  if (rotation === 180) ctx.setTransform(1,0,0,1,0,0);

  const imageData = ctx.getImageData(0, 0, W, H);
  const data = imageData.data;

  let detectedRotation = rotation;
  if (autoRot) {
    const shouldRotate = isImageInverted(data, W, H);
    if (shouldRotate && rotation === 0) {
      detectedRotation = 180;
      ctx.translate(W,H); ctx.rotate(Math.PI);
      ctx.drawImage(img, 0, 0);
      ctx.setTransform(1,0,0,1,0,0);
      imageData.data.set(ctx.getImageData(0,0,W,H).data);
      data.set(imageData.data);
    }
  }

  const useCV = _opencvReady && typeof window.cv !== 'undefined' && !!window.cv.Mat;
  const paperBounds = useCV ? detectPaperBoundsCV(data, W, H) : detectPaperBounds(data, W, H);
  const calHint = state.lensCal ? state.lensCal.originPx : null;

  let axisLines = { xAxisY: null, yAxisX: null, x3X: null, x6X: null, scale: null };
  if (useCV) axisLines = detectColorAxisLinesCV(data, W, H, paperBounds);
  const axisOrigin = (axisLines.yAxisX !== null && axisLines.xAxisY !== null)
    ? { x: axisLines.yAxisX, y: axisLines.xAxisY } : null;

  let colorMarkers = [];
  let colorCalib = null;
  if (useCV) {
    if (axisOrigin && axisLines.scale) {
      colorMarkers = detectColorMarkersGuidedCV(data, W, H, paperBounds, axisLines);
      console.info('[Markers] Guided search found', colorMarkers.length, 'of 8 markers');
    }
    if (colorMarkers.length < 2) {
      const blind = detectColorMarkersCV(data, W, H, paperBounds);
      if (blind.length > colorMarkers.length) { colorMarkers = blind; console.info('[Markers] Blind search found', blind.length, 'markers'); }
    }
    if (colorMarkers.length >= 2) {
      colorCalib = solveSimilarityRANSAC(colorMarkers);
      if (colorCalib) {
        console.info('[Calib] origin=('+Math.round(colorCalib.origin.x)+','+Math.round(colorCalib.origin.y)+')',
          'scale='+colorCalib.scale.toFixed(2),'rms='+colorCalib.rms.toFixed(2),
          'inliers='+(colorCalib.inliers?colorCalib.inliers.length:'-')+'/'+colorMarkers.length,
          colorCalib.outliers&&colorCalib.outliers.length?'rejected='+colorCalib.outliers.join(','):'');
        if (colorCalib.inliers) colorMarkers = colorMarkers.filter(m => colorCalib.inliers.indexOf(m.key) >= 0);
        if (colorMarkers.length >= 4) {
          const homo = solveHomographyFromInliers(colorMarkers);
          if (homo) {
            colorCalib.homography    = homo.H;
            colorCalib.homographyInv = homo.Hinv;
            console.info('[Calib] Homography fitted on ' + colorMarkers.length + ' inliers');
          }
        }
      } else if (axisOrigin && axisLines.scale) {
        colorCalib = { origin: axisOrigin, scale: axisLines.scale, angle: 0, rms: 0, inliers: [], outliers: [] };
      }
    } else if (axisOrigin && axisLines.scale) {
      colorCalib = { origin: axisOrigin, scale: axisLines.scale, angle: 0, rms: 0, inliers: [], outliers: [] };
    }
  }
  if (colorCalib && axisOrigin && colorMarkers.length >= 2) {
    const disagreement = Math.hypot(colorCalib.origin.x - axisOrigin.x, colorCalib.origin.y - axisOrigin.y);
    if (disagreement > colorCalib.scale * 0.5) {
      const inlierCount = colorCalib.inliers ? colorCalib.inliers.length : 0;
      if (inlierCount >= 4) {
        console.warn('[Calib] Markers vs axis disagree '+disagreement.toFixed(0)+'px, but marker fit strong ('+inlierCount+' inliers) — keeping marker origin');
      } else {
        console.warn('[Calib] Disagreement '+disagreement.toFixed(0)+'px, marker fit weak ('+inlierCount+' inliers) — preferring axis-line origin');
        colorCalib = { origin: axisOrigin, scale: axisLines.scale || colorCalib.scale, angle: 0, rms: 0, inliers: [], outliers: [] };
      }
    }
  }
  const markerAxesOrigin = (colorMarkers && colorMarkers.length >= 4)
    ? originFromMarkerAxes(colorMarkers) : null;
  let origin = colorCalib
    ? { x: colorCalib.origin.x, y: colorCalib.origin.y }
    : (markerAxesOrigin
        ? {x:markerAxesOrigin.x, y:markerAxesOrigin.y}
        : (axisOrigin || (useCV
            ? detectCrosshairCV(data, W, H, paperBounds, calHint)
            : detectCrosshair(data, W, H, paperBounds, calHint))));
  if (colorCalib && colorCalib.inliers && colorCalib.inliers.length > 0)
    console.info('Origin source: color markers');
  else if (markerAxesOrigin) console.info('Origin source: marker-axis intersection');
  else if (axisOrigin) console.info('Origin source: axis lines');
  else console.info('Origin source: crosshair Hough');

  // Lock origin near calibration baseline to prevent grid-jumping across batch images
  if (calHint && origin) {
    const calScale = (state.lensCal && state.lensCal.scale) || 30;
    const distFromCal = Math.hypot(origin.x - calHint.x, origin.y - calHint.y);
    const maxTol = calScale * 1.5; // ~1.5 cm max movement tolerance

    if (distFromCal > maxTol) {
      console.warn(`[Calib Anchor] Detected origin jumped ${distFromCal.toFixed(1)}px from baseline. Re-anchoring...`);
      const localCross = useCV 
        ? detectCrosshairCV(data, W, H, paperBounds, calHint)
        : detectCrosshair(data, W, H, paperBounds, calHint);
      
      if (localCross && Math.hypot(localCross.x - calHint.x, localCross.y - calHint.y) <= maxTol) {
        origin = localCross;
      } else {
        origin = { x: calHint.x, y: calHint.y }; // Fallback strictly to calibration baseline
      }
      if (colorCalib) colorCalib.origin = { ...origin };
    }
  }

  if (useCV && origin && colorCalib) {
    try {
      let crossPos = null;
      const axesOrigin = originFromMarkerAxes(colorMarkers);
      if (axesOrigin) {
        crossPos = {x:axesOrigin.x, y:axesOrigin.y};
        console.info('[Origin] Snap target: marker-axis intersection ('+axesOrigin.horizCount+'h × '+axesOrigin.vertCount+'v)');
      } else if (axisOrigin && isFinite(axisOrigin.x) && isFinite(axisOrigin.y)) {
        crossPos = {x:axisOrigin.x, y:axisOrigin.y};
        console.info('[Origin] Snap target: axisOrigin (orange ∩ black)');
      } else {
        crossPos = detectCrosshairCV(data, W, H, paperBounds, origin);
        console.info('[Origin] Snap target: detectCrosshairCV fallback');
      }
      if (crossPos && isFinite(crossPos.x) && isFinite(crossPos.y)) {
        const dx = crossPos.x - origin.x, dy = crossPos.y - origin.y;
        const tol = (colorCalib.scale || 30) * 0.6;
        if (Math.hypot(dx,dy) <= tol) {
          origin = {x:crossPos.x, y:crossPos.y};
          colorCalib.origin = {x:crossPos.x, y:crossPos.y};
          if (colorCalib.homography && window.cv) {
            const H0 = colorCalib.homography;
            const Hn = [
              H0[0]+dx*H0[6], H0[1]+dx*H0[7], H0[2]+dx*H0[8],
              H0[3]+dy*H0[6], H0[4]+dy*H0[7], H0[5]+dy*H0[8],
              H0[6], H0[7], H0[8]
            ];
            let M=null,Mi=null;
            try {
              M = window.cv.matFromArray(3,3,window.cv.CV_64FC1,Hn);
              Mi = new window.cv.Mat();
              window.cv.invert(M,Mi,window.cv.DECOMP_LU);
              colorCalib.homography = Hn;
              colorCalib.homographyInv = Array.from(Mi.data64F);
            } catch(_e){} finally { try{M&&M.delete();}catch(_){} try{Mi&&Mi.delete();}catch(_){} }
          }
          console.info('[Origin] Snapped to crosshair: dx='+dx.toFixed(1)+' dy='+dy.toFixed(1)+'px');
        } else {
          console.info('[Origin] Crosshair too far ('+Math.hypot(dx,dy).toFixed(0)+'px > '+tol.toFixed(0)+'px), keeping markers');
        }
      }
    } catch(e){console.warn('[Origin] Crosshair snap failed:',e);}
  }

  const { vLines, hLines, scale: rawScale } = useCV
    ? detectGridLinesCV(data, W, H, origin, paperBounds)
    : detectGridLines(data, W, H, origin, paperBounds);
  const scale = (state.lensCal && state.lensCal.scale)
    ? state.lensCal.scale
    : (colorCalib ? colorCalib.scale : (axisLines.scale || rawScale));

  let detectedRefs = {};
  let autoPolyX = null, autoPolyY = null;
  let calApplied = false;
  let calFittedOrigin = origin;
  let calFittedTheta  = 0;

  if (state.lensCal && origin) {
    const refBlobs = colorMarkers.length >= 2
      ? colorMarkers.map(m => ({ cx: m.cx, cy: m.cy, area: m.area }))
      : detectRefMarkers(data, W, H, scale, paperBounds);
    if (refBlobs.length >= 2) {
      const pose = fitCalibrationPose(
        state.lensCal.axisPolyX, state.lensCal.axisPolyY, origin, scale, refBlobs);
      calFittedOrigin = pose.origin;
      calFittedTheta  = pose.theta;
    }
    autoPolyX = rotateAndTranslatePoly(state.lensCal.axisPolyX, calFittedOrigin, calFittedTheta);
    if (state.lensCal.axisPolyY)
      autoPolyY = rotateAndTranslatePoly(state.lensCal.axisPolyY, calFittedOrigin, calFittedTheta);
    if (colorMarkers.length > 0) {
      for (const m of colorMarkers) detectedRefs[m.key] = { cx: m.cx, cy: m.cy };
    } else {
      detectedRefs = matchRefMarkersToCalPoly(refBlobs, autoPolyX, autoPolyY, scale);
    }
    calApplied = true;
  } else if (origin && scale) {
    if (colorMarkers.length > 0) {
      for (const m of colorMarkers) detectedRefs[m.key] = { cx: m.cx, cy: m.cy };
    } else {
      const refBlobs = detectRefMarkers(data, W, H, scale, paperBounds);
      detectedRefs = matchRefMarkersToCoords(refBlobs, origin, scale);
    }
    const xPts = [{ t:0, x:origin.x, y:origin.y }];
    if (detectedRefs.refNeg3) xPts.push({ t:-3, x:detectedRefs.refNeg3.cx, y:detectedRefs.refNeg3.cy });
    if (detectedRefs.refR1)   xPts.push({ t: 3, x:detectedRefs.refR1.cx,   y:detectedRefs.refR1.cy   });
    if (detectedRefs.refR2)   xPts.push({ t: 6, x:detectedRefs.refR2.cx,   y:detectedRefs.refR2.cy   });
    if (detectedRefs.refNeg6) xPts.push({ t:-6, x:detectedRefs.refNeg6.cx, y:detectedRefs.refNeg6.cy });
    if (xPts.length >= 2) autoPolyX = fitAxisPoly(xPts);

    const yPts = [{ t:0, x:origin.x, y:origin.y }];
    if (detectedRefs.ref0_3)   yPts.push({ t: 3,  x:detectedRefs.ref0_3.cx,   y:detectedRefs.ref0_3.cy   });
    if (detectedRefs.ref0Neg3) yPts.push({ t:-3,  x:detectedRefs.ref0Neg3.cx, y:detectedRefs.ref0Neg3.cy });
    if (detectedRefs.ref0_6)   yPts.push({ t: 6,  x:detectedRefs.ref0_6.cx,   y:detectedRefs.ref0_6.cy   });
    if (detectedRefs.ref0Neg6) yPts.push({ t:-6,  x:detectedRefs.ref0Neg6.cx, y:detectedRefs.ref0Neg6.cy });
    if (yPts.length >= 2) autoPolyY = fitAxisPoly(yPts);
  }

  const spots = useCV
    ? await detectLaserSpotsCV(data, W, H, paperBounds,
        origin ? {x:origin.x, y:origin.y, r:Math.max(20, (scale||30)*0.5)} : null,
        colorMarkers)
    : detectLaserSpots(data, W, H, paperBounds);

  const result = {
    unclear: false, originPx: calFittedOrigin || origin,
    scalePxPerCm: scale, spots: spots.slice(0,2),
    vLines, hLines, _detectedRotation: detectedRotation,
    refNeg3:   detectedRefs.refNeg3   || null,
    refR1:     detectedRefs.refR1     || null,
    refR2:     detectedRefs.refR2     || null,
    refNeg6:   detectedRefs.refNeg6   || null,
    ref0_3:    detectedRefs.ref0_3    || null,
    ref0Neg3:  detectedRefs.ref0Neg3  || null,
    ref0_6:    detectedRefs.ref0_6    || null,
    ref0Neg6:  detectedRefs.ref0Neg6  || null,
    axisPolyX: autoPolyX,
    axisPolyY: autoPolyY,
    calApplied,
    calAxesTheta: calFittedTheta,
    refCount: Object.keys(detectedRefs).length,
    paperBounds,
    homography:    colorCalib ? (colorCalib.homography    || null) : null,
    homographyInv: colorCalib ? (colorCalib.homographyInv || null) : null,
  };

  if (!origin || spots.length < 2) {
    result.unclear = true; result.confidence = 'unclear';
    return result;
  }

  const sorted = spots.slice(0,2).sort((a,b) => a.cx - b.cx);
  const Hinv = colorCalib && colorCalib.homographyInv;
  const tryH = (sx, sy) => Hinv ? coordFromHomography(sx, sy, Hinv) : null;
  let p1, p2;
  if (autoPolyX) {
    p1 = tryH(sorted[0].cx, sorted[0].cy) ||
         coordFromPolys(sorted[0].cx, sorted[0].cy, autoPolyX, autoPolyY) ||
         computeCoords(sorted[0].cx, sorted[0].cy, origin, vLines, hLines, scale, W, H, k1);
    p2 = tryH(sorted[1].cx, sorted[1].cy) ||
         coordFromPolys(sorted[1].cx, sorted[1].cy, autoPolyX, autoPolyY) ||
         computeCoords(sorted[1].cx, sorted[1].cy, origin, vLines, hLines, scale, W, H, k1);
  } else {
    p1 = tryH(sorted[0].cx, sorted[0].cy) ||
         computeCoords(sorted[0].cx, sorted[0].cy, origin, vLines, hLines, scale, W, H, k1);
    p2 = tryH(sorted[1].cx, sorted[1].cy) ||
         computeCoords(sorted[1].cx, sorted[1].cy, origin, vLines, hLines, scale, W, H, k1);
  }

  const laserR = (function(){ const el=document.getElementById('g-laserR'); return el?(parseFloat(el.value)||0):0; })();
  function applyLaserRadius(p){
    if (!p || !laserR) return p;
    return { x: round125(p.x - Math.sign(p.x)*laserR),
             y: round125(p.y - Math.sign(p.y)*laserR) };
  }
  p1 = applyLaserRadius(p1);
  p2 = applyLaserRadius(p2);

  result.x1 = p1.x; result.y1 = p1.y;
  result.x2 = p2.x; result.y2 = p2.y;

  const refBonus = result.refCount >= 3 ? 1 : 0;
  result.confidence = (vLines.length >= 6 && hLines.length >= 6 && origin)
    ? (result.refCount >= 2 ? 'ok' : 'ok')
    : (result.refCount >= 2 ? 'ok' : 'low');
  if (isNaN(p1.x)||isNaN(p1.y)||isNaN(p2.x)||isNaN(p2.y)) {
    result.unclear = true; result.confidence = 'unclear';
  }
  return result;
}

function isImageInverted(data, W, H) {
  let topB = 0, botB = 0, cnt = 0;
  const cx0 = Math.floor(W*0.3), cx1 = Math.floor(W*0.7);
  const tH = Math.floor(H*0.12), bS = Math.floor(H*0.88);
  for (let y=0; y<tH; y++) for (let x=cx0; x<cx1; x++) {
    const i=(y*W+x)*4; topB+=(data[i]+data[i+1]+data[i+2])/3; cnt++;
  }
  topB /= cnt; cnt = 0;
  for (let y=bS; y<H; y++) for (let x=cx0; x<cx1; x++) {
    const i=(y*W+x)*4; botB+=(data[i]+data[i+1]+data[i+2])/3; cnt++;
  }
  botB /= cnt;
  return topB > botB + 25;
}

function detectPaperBounds(data, W, H) {
  const STEP = 3;
  const colHas = new Uint8Array(W);
  const rowHas = new Uint8Array(H);

  for (let y = 0; y < H; y += STEP) {
    for (let x = 0; x < W; x += STEP) {
      const i = (y*W+x)*4;
      const r2=data[i], g2=data[i+1], b2=data[i+2];
      const br = 0.299*r2 + 0.587*g2 + 0.114*b2;
      if (br < 138) continue; 
      const mx = Math.max(r2,g2,b2), mn = Math.min(r2,g2,b2);
      const s2 = mx < 10 ? 0 : (mx-mn)/mx;
      if (s2 > 0.22) continue;
      colHas[x] = 1; rowHas[y] = 1;
    }
  }

  const MC = 3;
  let x0 = Math.floor(W*0.08), x1 = Math.floor(W*0.92);
  let y0 = Math.floor(H*0.08), y1 = Math.floor(H*0.92);

  let c = 0;
  for (let x=0; x<W*0.55; x++) { if(colHas[x]){c++; if(c>=MC){x0=x-MC+1; break;}} else c=0; }
  c = 0;
  for (let x=W-1; x>W*0.45; x--) { if(colHas[x]){c++; if(c>=MC){x1=x+MC-1; break;}} else c=0; }
  c = 0;
  for (let y=0; y<H*0.65; y++) { if(rowHas[y]){c++; if(c>=MC){y0=y-MC+1; break;}} else c=0; }
  c = 0;
  for (let y=H-1; y>H*0.35; y--) { if(rowHas[y]){c++; if(c>=MC){y1=y+MC-1; break;}} else c=0; }

  const mxW=Math.round((x1-x0)*0.03), mxH=Math.round((y1-y0)*0.03);
  return {
    x0: Math.min(x0+mxW, Math.floor(W*0.5)-1),
    x1: Math.max(x1-mxW, Math.ceil(W*0.5)+1),
    y0: Math.min(y0+mxH, Math.floor(H*0.5)-1),
    y1: Math.max(y1-mxH, Math.ceil(H*0.5)+1),
  };
}

function detectCrosshair(data, W, H, b, hintPx) {
  let x0=b?b.x0:Math.floor(W*0.12), x1=b?b.x1:Math.floor(W*0.88);
  let y0=b?b.y0:Math.floor(H*0.12), y1=b?b.y1:Math.floor(H*0.88);
  if (hintPx) {
    const m = 220;
    x0 = Math.max(x0, Math.round(hintPx.x - m));
    x1 = Math.min(x1, Math.round(hintPx.x + m));
    y0 = Math.max(y0, Math.round(hintPx.y - m));
    y1 = Math.min(y1, Math.round(hintPx.y + m));
  }

  const colSc = new Float32Array(W);
  for (let x=x0; x<x1; x++) {
    let s=0, c=0;
    for (let y=y0; y<y1; y++) {
      const i=(y*W+x)*4, gray=lum(data,i);
      if (gray>55 && sat(data,i)<0.28) { s+=Math.max(0,200-gray); c++; }
    }
    colSc[x] = c>0?s/c:0;
  }
  const rowSc = new Float32Array(H);
  for (let y=y0; y<y1; y++) {
    let s=0, c=0;
    for (let x=x0; x<x1; x++) {
      const i=(y*W+x)*4, gray=lum(data,i);
      if (gray>55 && sat(data,i)<0.28) { s+=Math.max(0,200-gray); c++; }
    }
    rowSc[y] = c>0?s/c:0;
  }

  const cx = centroidPeak(colSc, x0, x1);
  const cy = centroidPeak(rowSc, y0, y1);
  return (cx===null||cy===null) ? null : {x:cx, y:cy};
}

function centroidPeak(arr, s, e) {
  let mx=0, mi=null;
  for (let i=s;i<e;i++) if(arr[i]>mx){mx=arr[i];mi=i;}
  if (!mi||mx<3) return null;
  const th=mx*0.65; let sw=0,sv=0;
  for (let i=s;i<e;i++) if(arr[i]>=th){sw+=arr[i];sv+=i*arr[i];}
  return sw>0?sv/sw:mi;
}

function detectGridLines(data, W, H, origin, b) {
  const oy = origin?Math.round(origin.y):Math.round(H/2);
  const ox = origin?Math.round(origin.x):Math.round(W/2);
  const yBand = b ? Math.min(60, Math.floor((b.y1-b.y0)*0.12)) : Math.min(35, Math.floor(H*0.06));
  const xBand = b ? Math.min(60, Math.floor((b.x1-b.x0)*0.10)) : Math.min(35, Math.floor(W*0.05));
  const x0=b?b.x0:Math.floor(W*0.1), x1=b?b.x1:Math.floor(W*0.9);
  const y0=b?b.y0:Math.floor(H*0.1), y1=b?b.y1:Math.floor(H*0.9);

  const colSc = new Float32Array(W);
  for (let x=x0;x<x1;x++) {
    let s=0,c=0;
    for (let dy=-yBand;dy<=yBand;dy++) {
      const y=oy+dy; if(y<0||y>=H) continue;
      const i=(y*W+x)*4, gray=lum(data,i);
      if(gray>55&&sat(data,i)<0.32){s+=Math.max(0,200-gray);c++;}
    }
    colSc[x]=c>0?s/c:0;
  }
  const rowSc = new Float32Array(H);
  for (let y=y0;y<y1;y++) {
    let s=0,c=0;
    for (let dx=-xBand;dx<=xBand;dx++) {
      const x=ox+dx; if(x<0||x>=W) continue;
      const i=(y*W+x)*4, gray=lum(data,i);
      if(gray>55&&sat(data,i)<0.32){s+=Math.max(0,200-gray);c++;}
    }
    rowSc[y]=c>0?s/c:0;
  }

  const vLines = findPeaks(colSc, x0, x1);
  const hLines = findPeaks(rowSc, y0, y1);
  const vSp = medSp(vLines), hSp = medSp(hLines);
  const sp = (vSp&&hSp)?(vSp+hSp)/2:(vSp||hSp);
  const scale = sp ? sp/GRID_CM : null;

  return { vLines, hLines, scale };
}

function findPeaks(arr, s, e) {
  const maxV = arr.reduce((m,v,i)=>i>=s&&i<e?Math.max(m,v):m, 0);
  if (maxV<4) return [];
  const th = Math.max(4, maxV*0.13);
  const minD = 3;
  const raw=[];
  for (let i=s+minD;i<e-minD;i++) {
    if(arr[i]<th) continue;
    let ok=true;
    for(let d=1;d<=minD;d++) if(arr[i-d]>=arr[i]||arr[i+d]>=arr[i]){ok=false;break;}
    if(ok) raw.push(i);
  }
  if(!raw.length) return [];
  const merged=[];
  let i=0;
  while(i<raw.length){
    let j=i;
    while(j+1<raw.length&&raw[j+1]-raw[j]<=5) j++;
    let sw=0,sv=0;
    for(let k=i;k<=j;k++){sw+=arr[raw[k]];sv+=raw[k]*arr[raw[k]];}
    merged.push(Math.round(sv/sw));
    i=j+1;
  }
  return fillGaps(merged);
}

function fillGaps(lines) {
  if(lines.length<3) return lines;
  const sp=medSp(lines);
  if(!sp) return lines;
  const out=[lines[0]];
  for(let i=1;i<lines.length;i++){
    const gap=lines[i]-out[out.length-1];
    const ratio=gap/sp;
    if(ratio>1.6&&ratio<2.6) {
      out.push(Math.round(out[out.length-1]+sp));
    }
    out.push(lines[i]);
  }
  return out;
}

function medSp(lines) {
  if(!lines||lines.length<2) return null;
  const sp=[];
  for(let i=1;i<lines.length;i++) sp.push(lines[i]-lines[i-1]);
  sp.sort((a,b)=>a-b);
  const m=sp[Math.floor(sp.length/2)];
  const valid=sp.filter(s=>s>m*0.5&&s<m*1.6);
  if(!valid.length) return m;
  return valid.reduce((a,b)=>a+b,0)/valid.length;
}

function applyHomography(H, x, y) {
  const w=H[6]*x+H[7]*y+H[8];
  if (Math.abs(w)<1e-9) return null;
  return {x:(H[0]*x+H[1]*y+H[2])/w, y:(H[3]*x+H[4]*y+H[5])/w};
}
function coordFromHomography(px, py, Hinv) {
  if (!Hinv) return null;
  const r=applyHomography(Hinv,px,py);
  if (!r) return null;
  const cmX=r.x, cmY=-r.y;  
  if (!isFinite(cmX)||!isFinite(cmY)) return null;
  if (Math.abs(cmX)>15||Math.abs(cmY)>15) return null;  
  return {x:round125(cmX), y:round125(cmY)};
}

function computeCoords(px, py, origin, vLines, hLines, scale, W, H, k1) {
  if (!origin) return {x:NaN,y:NaN};

  const {x:pxU, y:pyU} = undistortPt(px, py, W, H, k1);
  const {x:oxU, y:oyU} = undistortPt(origin.x, origin.y, W, H, k1);

  const vU = vLines.map(x => undistortPt(x, origin.y, W, H, k1).x);
  const hU = hLines.map(y => undistortPt(origin.x, y, W, H, k1).y);

  const oVI = nearestIdx(vU, oxU);
  const oHI = nearestIdx(hU, oyU);

  let xCm, yCm;
  if (vU.length >= 3) {
    xCm = interpAxis(pxU, vU, oVI) * GRID_CM;
  } else if (scale) {
    xCm = (pxU - oxU) / scale;
  } else xCm = NaN;

  if (hU.length >= 3) {
    yCm = -interpAxis(pyU, hU, oHI) * GRID_CM;  
  } else if (scale) {
    yCm = -(pyU - oyU) / scale;
  } else yCm = NaN;

  return { x: round125(xCm), y: round125(yCm) };
}

function undistortPt(px, py, W, H, k1) {
  if (!k1) return {x:px, y:py};
  const cx=W/2, cy=H/2;
  const diag=Math.sqrt(cx*cx+cy*cy);
  const nx=(px-cx)/diag, ny=(py-cy)/diag;
  const r2=nx*nx+ny*ny;
  const factor = 1 + k1 * r2;
  return { x: cx + nx*factor*diag, y: cy + ny*factor*diag };
}

function interpAxis(pos, lines, originIdx) {
  if (!lines.length) return NaN;
  let li=-1;
  for (let i=0;i<lines.length-1;i++) {
    if ((lines[i]<=pos&&pos<=lines[i+1])||(lines[i+1]<=pos&&pos<=lines[i])) {
      li=i; break;
    }
  }
  if (li>=0) {
    const frac=(pos-lines[li])/(lines[li+1]-lines[li]);
    return (li+frac)-originIdx;
  }
  const sp=medSp(lines)||30;
  if (pos<lines[0]) return (pos-lines[0])/sp + (0-originIdx);
  return (pos-lines[lines.length-1])/sp + (lines.length-1-originIdx);
}

function nearestIdx(arr, val) {
  let best=0, bd=Infinity;
  arr.forEach((v,i)=>{if(Math.abs(v-val)<bd){bd=Math.abs(v-val);best=i;}});
  return best;
}

function detectRefMarkers(data, W, H, scale, b) {
  if (!scale || scale < 5) return [];

  const eroR = Math.max(2, Math.round(scale * 0.018)); 

  const bx0=b?b.x0:eroR, bx1=b?b.x1:W-eroR;
  const by0=b?b.y0:eroR, by1=b?b.y1:H-eroR;

  const dark = new Uint8Array(W * H);
  for (let y = Math.max(eroR,by0); y < Math.min(H-eroR,by1); y++) {
    for (let x = Math.max(eroR,bx0); x < Math.min(W-eroR,bx1); x++) {
      const i = (y * W + x) * 4;
      const r2 = data[i], g2 = data[i+1], b2 = data[i+2];
      const br = 0.299*r2 + 0.587*g2 + 0.114*b2;
      const isRed = r2 > 100 && r2 > g2 * 1.35 && r2 > b2 * 1.35;
      if (br < 70 && !isRed) dark[y * W + x] = 1;
    }
  }

  const R2 = eroR * eroR;
  const eroded = new Uint8Array(W * H);
  for (let y = eroR; y < H - eroR; y++) {
    for (let x = eroR; x < W - eroR; x++) {
      if (!dark[y * W + x]) continue;
      let ok = true;
      outer: for (let dy = -eroR; dy <= eroR && ok; dy++) {
        for (let dx = -eroR; dx <= eroR && ok; dx++) {
          if (dx*dx + dy*dy <= R2 && !dark[(y+dy)*W + (x+dx)]) ok = false;
        }
      }
      eroded[y * W + x] = ok ? 1 : 0;
    }
  }

  const minArea = Math.max(6, Math.PI * (scale * 0.04) * (scale * 0.04)); 
  const maxArea = Math.PI * (scale * 0.45) * (scale * 0.45);              
  return findComps(eroded, W, H).filter(c =>
    c.area >= minArea && c.area <= maxArea &&
    (!b || (c.cx>=b.x0 && c.cx<=b.x1 && c.cy>=b.y0 && c.cy<=b.y1))
  );
}

function matchRefMarkersToCoords(blobs, origin, scale) {
  if (!blobs.length || !origin || !scale) return {};

  const KNOWN = [
    { key:'refNeg3',   cmX:-3, cmY: 0 },
    { key:'refR1',     cmX: 3, cmY: 0 },
    { key:'refR2',     cmX: 6, cmY: 0 },
    { key:'refNeg6',   cmX:-6, cmY: 0 },
    { key:'ref0_3',    cmX: 0, cmY: 3 },
    { key:'ref0Neg3',  cmX: 0, cmY:-3 },
    { key:'ref0_6',    cmX: 0, cmY: 6 },
    { key:'ref0Neg6',  cmX: 0, cmY:-6 },
  ];

  const tol2 = (scale * 2.5) ** 2;
  const result = {};
  const usedIdx = new Set();

  KNOWN.forEach(({ key, cmX, cmY }) => {
    const expX = origin.x + cmX * scale;
    const expY = origin.y - cmY * scale;
    let best = null, bestD = tol2;
    blobs.forEach((b, idx) => {
      if (usedIdx.has(idx)) return;
      const d = (b.cx - expX)**2 + (b.cy - expY)**2;
      if (d < bestD) { bestD = d; best = { b, idx }; }
    });
    if (best) {
      result[key] = { cx: best.b.cx, cy: best.b.cy };
      usedIdx.add(best.idx);
    }
  });

  return result;
}

function fitCalibrationPose(calPolyX, calPolyY, crosshair, scale, blobs) {
  if (!blobs.length || !crosshair) return { origin: crosshair, theta: 0 };

  const REFS_X = [-6, -3, 3, 6];   
  const REFS_Y = [-6, -3, 3, 6];   
  const tol2   = (scale * 2.5) ** 2;

  // FIX: Force theta to 0 to prevent the axis from jumping/auto-rotating on next images
  const bestTheta = 0; 

  const rotX = rotateAndTranslatePoly(calPolyX, crosshair, bestTheta);
  const rotY = calPolyY ? rotateAndTranslatePoly(calPolyY, crosshair, bestTheta) : null;
  const allRefs = [
    ...REFS_X.map(t => ({ t, poly: rotX })),
    ...(rotY ? REFS_Y.map(t => ({ t, poly: rotY })) : []),
  ];
  
  let dx = 0, dy = 0, n = 0;
  const usedIdx = new Set();
  
  for (const { t, poly } of allRefs) {
    const exp = evalPoly(poly, t);
    let bestD = tol2, bestIdx = -1;
    blobs.forEach((b, i) => {
      if (usedIdx.has(i)) return;
      const d = (b.cx - exp.x)**2 + (b.cy - exp.y)**2;
      if (d < bestD) { bestD = d; bestIdx = i; }
    });
    if (bestIdx >= 0) {
      dx += blobs[bestIdx].cx - exp.x;
      dy += blobs[bestIdx].cy - exp.y;
      usedIdx.add(bestIdx);
      n++;
    }
  }
  
  const refinedOrigin = n > 0
    ? { x: crosshair.x + dx / n, y: crosshair.y + dy / n }
    : crosshair;

  return { origin: refinedOrigin, theta: bestTheta };
}

function matchRefMarkersToCalPoly(blobs, rotPolyX, rotPolyY, scale) {
  if (!blobs.length || !rotPolyX) return {};
  const KNOWN = [
    { key:'refNeg6',  poly:'x', t:-6 },
    { key:'refNeg3',  poly:'x', t:-3 },
    { key:'refR1',    poly:'x', t: 3 },
    { key:'refR2',    poly:'x', t: 6 },
    { key:'ref0Neg6', poly:'y', t:-6 },
    { key:'ref0Neg3', poly:'y', t:-3 },
    { key:'ref0_3',   poly:'y', t: 3 },
    { key:'ref0_6',   poly:'y', t: 6 },
  ];
  const tol2 = (scale * 2.0) ** 2;
  const result = {}, usedIdx = new Set();
  for (const { key, poly: axis, t } of KNOWN) {
    const poly = axis === 'x' ? rotPolyX : rotPolyY;
    if (!poly) continue;
    const exp = evalPoly(poly, t);
    let bestD = tol2, bestIdx = -1;
    blobs.forEach((b, i) => {
      if (usedIdx.has(i)) return;
      const d = (b.cx - exp.x)**2 + (b.cy - exp.y)**2;
      if (d < bestD) { bestD = d; bestIdx = i; }
    });
    if (bestIdx >= 0) {
      result[key] = { cx: blobs[bestIdx].cx, cy: blobs[bestIdx].cy };
      usedIdx.add(bestIdx);
    }
  }
  return result;
}

function coordFromPolys(px, py, polyX, polyY) {
  if (!polyX) return null;
  const tx = axisNearestT(polyX, px, py);
  const xPt = evalPoly(polyX, tx);
  let vx, vy;
  if (polyY) {
    vx = polyY.bx; vy = polyY.by;
  } else {
    const bLen = Math.hypot(polyX.bx, polyX.by) || 1;
    vx = -polyX.by / bLen; vy = polyX.bx / bLen;
  }
  const vLen2 = vx*vx + vy*vy;
  if (vLen2 < 1e-12) return null;
  const dx = px - xPt.x, dy = py - xPt.y;
  const ty = (dx*vx + dy*vy) / vLen2;
  return { x: round125(tx), y: round125(ty) };
}

function isOnBrightBackground(data, W, H, cx, cy, spotR) {
  const rMin = Math.max(3, spotR * 1.8);
  const rMax = Math.max(8, spotR * 4.0);
  const step = Math.max(1, Math.round(rMin / 5));
  let bright = 0, total = 0;
  for (let dy = -rMax; dy <= rMax; dy += step) {
    for (let dx = -rMax; dx <= rMax; dx += step) {
      const r2 = dx*dx + dy*dy;
      if (r2 < rMin*rMin || r2 > rMax*rMax) continue;
      const px2 = Math.round(cx + dx), py2 = Math.round(cy + dy);
      if (px2 < 0 || px2 >= W || py2 < 0 || py2 >= H) continue;
      const i = (py2 * W + px2) * 4;
      if (lum(data, i) > 110) bright++;  
      total++;
    }
  }
  return total > 0 && bright / total >= 0.40;
}

async function detectLaserSpotsCV(data, W, H, b, originHint, colorMarkers) {
  const mats = [];
  const track = m => { mats.push(m); return m; };
  try {
    const src = track(window.cv.matFromImageData(new ImageData(data, W, H)));
    
    // 1. Coba deteksi menggunakan Machine Learning Pipeline
    const mlSpots = await runMLPipelineOnFrame(src);
    if (mlSpots && mlSpots.length >= 2) {
      console.info('🎯 ML Detection succeeded:', mlSpots);
      return mlSpots; 
    }

    console.info('⚠️ ML Detection failed or found < 2 spots. Falling back to HLS.');

    // 2. Fallback Tradisional OpenCV (HLS)
    const hls = track(new window.cv.Mat());
    window.cv.cvtColor(src, hls, window.cv.COLOR_RGBA2RGB);
    window.cv.cvtColor(hls, hls, window.cv.COLOR_RGB2HLS);

    const mask1 = track(new window.cv.Mat());
    const mask2 = track(new window.cv.Mat());
    window.cv.inRange(hls, new window.cv.Scalar(0, 137, 216), new window.cv.Scalar(15, 255, 255), mask1);
    window.cv.inRange(hls, new window.cv.Scalar(165, 137, 216), new window.cv.Scalar(179, 255, 255), mask2);
    
    const mask = track(new window.cv.Mat());
    window.cv.bitwise_or(mask1, mask2, mask);

    if (colorMarkers && colorMarkers.length) {
      for (const m of colorMarkers) {
        window.cv.circle(mask, new window.cv.Point(Math.round(m.cx), Math.round(m.cy)), Math.round(Math.sqrt(m.area/Math.PI)*1.5), new window.cv.Scalar(0), -1);
      }
    }

    const contours = track(new window.cv.MatVector());
    const hier = track(new window.cv.Mat());
    window.cv.findContours(mask, contours, hier, window.cv.RETR_EXTERNAL, window.cv.CHAIN_APPROX_SIMPLE);

    const spots = [];
    for (let i = 0; i < contours.size(); i++) {
      const cnt = contours.get(i);
      const area = window.cv.contourArea(cnt);
      if (area >= 4) {
        const M = window.cv.moments(cnt);
        if (M.m00 !== 0) spots.push({ cx: M.m10/M.m00, cy: M.m01/M.m00, area });
      }
      cnt.delete();
    }

    return spots.sort((a,b) => b.area - a.area).slice(0, 2).sort((a,b) => a.cx - b.cx);
  } catch(e) {
    console.warn('detectLaserSpotsCV failed:', e);
    return detectLaserSpots(data, W, H, b);
  } finally {
    mats.forEach(m => { try { m.delete(); } catch(_){} });
  }
}

function detectPaperBoundsCV(data, W, H) {
  const mats = [];
  const track = function(m) { mats.push(m); return m; };
  try {
    const src = track(window.cv.matFromImageData(new ImageData(data, W, H)));
    const gray = track(new window.cv.Mat());
    window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY);
    const blurred = track(new window.cv.Mat());
    window.cv.GaussianBlur(gray, blurred, new window.cv.Size(21, 21), 0);
    const thresh = track(new window.cv.Mat());
    window.cv.threshold(blurred, thresh, 180, 255, window.cv.THRESH_BINARY | window.cv.THRESH_OTSU);
    const contours = track(new window.cv.MatVector());
    const hierarchy = track(new window.cv.Mat());
    window.cv.findContours(thresh, contours, hierarchy, window.cv.RETR_EXTERNAL, window.cv.CHAIN_APPROX_SIMPLE);
    let bestRect = null, bestArea = 0;
    for (let i = 0; i < contours.size(); i++) {
      const cnt = contours.get(i);
      const rect = window.cv.boundingRect(cnt);
      cnt.delete();
      const aspect = rect.width / Math.max(rect.height, 1);
      if (aspect >= 0.5 && aspect <= 2.0) {
        const area = rect.width * rect.height;
        if (area > bestArea) { bestArea = area; bestRect = rect; }
      }
    }
    if (!bestRect || bestArea < W * H * 0.05) return detectPaperBounds(data, W, H);
    const mxW = Math.round(bestRect.width  * 0.03);
    const mxH = Math.round(bestRect.height * 0.03);
    return {
      x0: Math.min(bestRect.x + mxW,                       Math.floor(W * 0.5) - 1),
      x1: Math.max(bestRect.x + bestRect.width  - mxW,     Math.ceil(W  * 0.5) + 1),
      y0: Math.min(bestRect.y + mxH,                       Math.floor(H * 0.5) - 1),
      y1: Math.max(bestRect.y + bestRect.height - mxH,     Math.ceil(H  * 0.5) + 1),
    };
  } catch(e) {
    console.warn('detectPaperBoundsCV failed, using fallback:', e);
    return detectPaperBounds(data, W, H);
  } finally {
    mats.forEach(function(m) { try { m.delete(); } catch(_) {} });
  }
}

function detectCrosshairCV(data, W, H, b, hintPx) {
  const mats = [];
  const track = function(m) { mats.push(m); return m; };
  try {
    let rx0 = b ? b.x0 : Math.floor(W * 0.12);
    let rx1 = b ? b.x1 : Math.floor(W * 0.88);
    let ry0 = b ? b.y0 : Math.floor(H * 0.12);
    let ry1 = b ? b.y1 : Math.floor(H * 0.88);
    if (hintPx) {
      // Restrain search window to ~1.5 grid cells around calibration baseline
      const m = (state.lensCal && state.lensCal.scale) ? Math.round(state.lensCal.scale * 1.5) : 80;
      rx0 = Math.max(rx0, Math.round(hintPx.x - m));
      rx1 = Math.min(rx1, Math.round(hintPx.x + m));
      ry0 = Math.max(ry0, Math.round(hintPx.y - m));
      ry1 = Math.min(ry1, Math.round(hintPx.y + m));
    }
    const roiW = rx1 - rx0, roiH = ry1 - ry0;
    if (roiW < 40 || roiH < 40) return detectCrosshair(data, W, H, b, hintPx);
    const src     = track(window.cv.matFromImageData(new ImageData(data, W, H)));
    const roiView = src.roi(new window.cv.Rect(rx0, ry0, roiW, roiH));
    const roi     = track(roiView.clone()); roiView.delete();
    const gray    = track(new window.cv.Mat());
    window.cv.cvtColor(roi, gray, window.cv.COLOR_RGBA2GRAY);
    const darkMask = track(new window.cv.Mat());
    window.cv.threshold(gray, darkMask, 0, 255, window.cv.THRESH_BINARY_INV | window.cv.THRESH_OTSU);
    function projPeak(mask, dim, offset, len, sLo, sHi, minRatio) {
      const dst = track(new window.cv.Mat());
      window.cv.reduce(mask, dst, dim, window.cv.REDUCE_SUM, window.cv.CV_32S);
      const sm = new Float32Array(len);
      for (let i = 0; i < len; i++) {
        let s = 0, c = 0;
        for (let d = -5; d <= 5; d++) { const j = i+d; if (j>=0&&j<len){s+=dst.data32S[j];c++;} }
        sm[i] = c > 0 ? s / c : 0;
      }
      let maxV = 0, maxI = sLo;
      for (let i = sLo; i < sHi; i++) { if (sm[i] > maxV) { maxV = sm[i]; maxI = i; } }
      if (maxV === 0) return null;
      let bg = 0;
      for (let i = sLo; i < sHi; i++) bg += sm[i];
      bg /= Math.max(1, sHi - sLo);
      if (maxV < bg * minRatio) return null;
      let sumW = 0, sumWX = 0;
      for (let i = Math.max(sLo, maxI-12); i <= Math.min(sHi-1, maxI+12); i++) {
        const w = Math.max(0, sm[i] - bg); sumW += w; sumWX += w * i;
      }
      return offset + (sumW > 0 ? sumWX / sumW : maxI);
    }
    const yLo = Math.floor(roiH * 0.05), yHi = Math.ceil(roiH * 0.95);
    const xLo = Math.floor(roiW * 0.05), xHi = Math.ceil(roiW * 0.95);
    const crossY = projPeak(darkMask, 1, ry0, roiH, yLo, yHi, 2.0);
    const crossX = projPeak(darkMask, 0, rx0, roiW, xLo, xHi, 2.0);
    if (crossX === null || crossY === null) return detectCrosshair(data, W, H, b, hintPx);
    return { x: crossX, y: crossY };
  } catch(e) {
    console.warn('detectCrosshairCV failed, using fallback:', e);
    return detectCrosshair(data, W, H, b, hintPx);
  } finally {
    mats.forEach(function(m) { try { m.delete(); } catch(_) {} });
  }
}

function _clusterAndSort(positions) {
  if (!positions.length) return [];
  positions.sort(function(a, b) { return a - b; });
  const clusters = [];
  let grp = [positions[0]];
  for (let i = 1; i < positions.length; i++) {
    if (positions[i] - grp[grp.length-1] <= 6) { grp.push(positions[i]); }
    else {
      clusters.push(Math.round(grp.reduce(function(s,v){return s+v;},0) / grp.length));
      grp = [positions[i]];
    }
  }
  clusters.push(Math.round(grp.reduce(function(s,v){return s+v;},0) / grp.length));
  return clusters;
}

function detectOriginDotCV(data, W, H, b) {
  const mats = [];
  const track = function(m) { mats.push(m); return m; };
  try {
    const mx = b ? Math.round((b.x1 - b.x0) * 0.05) : Math.round(W * 0.05);
    const my = b ? Math.round((b.y1 - b.y0) * 0.05) : Math.round(H * 0.05);
    const sx0 = b ? b.x0 + mx : mx,  sx1 = b ? b.x1 - mx : W - mx;
    const sy0 = b ? b.y0 + my : my,  sy1 = b ? b.y1 - my : H - my;
    const sW = sx1 - sx0,  sH = sy1 - sy0;
    if (sW < 40 || sH < 40) return null;
    const src     = track(window.cv.matFromImageData(new ImageData(data, W, H)));
    const roiView = src.roi(new window.cv.Rect(sx0, sy0, sW, sH));
    const roi     = track(roiView.clone()); roiView.delete();
    const rgb = track(new window.cv.Mat());
    window.cv.cvtColor(roi, rgb, window.cv.COLOR_RGBA2RGB);
    const hsv = track(new window.cv.Mat());
    window.cv.cvtColor(rgb, hsv, window.cv.COLOR_RGB2HSV_FULL);
    const lo_s = 50, lo_v = 20;
    const mask1 = track(new window.cv.Mat());
    const mask2 = track(new window.cv.Mat());
    window.cv.inRange(hsv, new window.cv.Scalar(0,   lo_s, lo_v), new window.cv.Scalar(28,  255, 240), mask1);
    window.cv.inRange(hsv, new window.cv.Scalar(220, lo_s, lo_v), new window.cv.Scalar(255, 255, 240), mask2);
    const mask = track(new window.cv.Mat());
    window.cv.bitwise_or(mask1, mask2, mask);
    const blurred = track(new window.cv.Mat());
    window.cv.GaussianBlur(mask, blurred, new window.cv.Size(7, 7), 0);
    const bin = track(new window.cv.Mat());
    window.cv.threshold(blurred, bin, 20, 255, window.cv.THRESH_BINARY);
    const contours = track(new window.cv.MatVector());
    const hier     = track(new window.cv.Mat());
    window.cv.findContours(bin, contours, hier, window.cv.RETR_EXTERNAL, window.cv.CHAIN_APPROX_SIMPLE);
    let best = null, bestScore = -1;
    for (let i = 0; i < contours.size(); i++) {
      const cnt  = contours.get(i);
      const area = window.cv.contourArea(cnt);
      if (area >= 200 && area <= 12000) {
        const perim = window.cv.arcLength(cnt, true);
        const circ  = (perim > 0) ? (4 * Math.PI * area) / (perim * perim) : 0;
        if (circ > 0.65) {
          const score = area * circ;
          if (score > bestScore) {
            const M = window.cv.moments(cnt);
            if (M.m00 !== 0) {
              bestScore = score;
              best = { x: (M.m10/M.m00)+sx0, y: (M.m01/M.m00)+sy0, r: Math.sqrt(area/Math.PI) };
            }
          }
        }
      }
      cnt.delete();
    }
    return best;
  } catch(e) {
    console.warn('detectOriginDotCV failed:', e);
    return null;
  } finally {
    mats.forEach(function(m) { try { m.delete(); } catch(_) {} });
  }
}

function detectColorMarkersCV(data, W, H, b) {
  const DEFS = [
    { key:'refNeg6',  coord:[-6, 0], shape:'diamond', h:[  8, 42], s:[ 90,255], v:[ 90,255] }, 
    { key:'refNeg3',  coord:[-3, 0], shape:'diamond', h:[ 58,110], s:[ 25,220], v:[ 30,240] }, 
    { key:'refR1',    coord:[ 3, 0], shape:'diamond', h:[130,190], s:[ 45,255], v:[ 15,210] }, 
    { key:'refR2',    coord:[ 6, 0], shape:'diamond', h:[215,252], s:[ 25,255], v:[ 70,255] }, 
    { key:'ref0Neg6', coord:[ 0,-6], shape:'square',  h:[ 95,150], s:[ 30,255], v:[ 70,255] }, 
    { key:'ref0Neg3', coord:[ 0,-3], shape:'square',  h:[  5, 22], s:[ 50,225], v:[  8,140] }, 
    { key:'ref0_3',   coord:[ 0, 3], shape:'square',  h:[130,190], s:[ 45,255], v:[ 15,210] }, 
    { key:'ref0_6',   coord:[ 0, 6], shape:'square',  h:[  8, 42], s:[ 90,255], v:[ 90,255] }, 
  ];
  const mats = [];
  const track = function(m){ mats.push(m); return m; };
  try {
    const x0=b?b.x0:0, x1=b?b.x1:W, y0=b?b.y0:0, y1=b?b.y1:H;
    const rW=x1-x0, rH=y1-y0;
    if (rW<40||rH<40) return [];
    const src=track(window.cv.matFromImageData(new ImageData(data,W,H)));
    const roiView=src.roi(new window.cv.Rect(x0,y0,rW,rH));
    const roi=track(roiView.clone()); roiView.delete();
    const rgb=track(new window.cv.Mat());
    window.cv.cvtColor(roi,rgb,window.cv.COLOR_RGBA2RGB);
    const hsv=track(new window.cv.Mat());
    window.cv.cvtColor(rgb,hsv,window.cv.COLOR_RGB2HSV_FULL);
    try {
      const ch=new window.cv.MatVector();
      window.cv.split(hsv,ch);
      const v=ch.get(2),vEq=new window.cv.Mat();
      const cl=new window.cv.CLAHE(2.0,new window.cv.Size(8,8));
      cl.apply(v,vEq);
      ch.set(2,vEq);
      window.cv.merge(ch,hsv);
      v.delete();vEq.delete();cl.delete();ch.delete();
    } catch(_e){}
    const results=[];
    for (const d of DEFS) {
      const mask=track(new window.cv.Mat());
      const [hLo,hHi]=d.h,[sLo,sHi]=d.s,[vLo,vHi]=d.v;
      window.cv.inRange(hsv,new window.cv.Scalar(hLo,sLo,vLo),new window.cv.Scalar(hHi,sHi,vHi),mask);
      const blur=track(new window.cv.Mat());
      window.cv.GaussianBlur(mask,blur,new window.cv.Size(3,3),0);
      const bin=track(new window.cv.Mat());
      window.cv.threshold(blur,bin,40,255,window.cv.THRESH_BINARY);
      const k=track(window.cv.getStructuringElement(window.cv.MORPH_RECT,new window.cv.Size(3,3)));
      const opened=track(new window.cv.Mat());
      window.cv.morphologyEx(bin,opened,window.cv.MORPH_OPEN,k);
      const contours=track(new window.cv.MatVector());
      const hier=track(new window.cv.Mat());
      window.cv.findContours(opened,contours,hier,window.cv.RETR_EXTERNAL,window.cv.CHAIN_APPROX_SIMPLE);
      let best=null,bestScore=-1;
      for (let i=0;i<contours.size();i++) {
        const cnt=contours.get(i);
        const area=window.cv.contourArea(cnt);
        if (area>=20&&area<=3500) {
          const perim=window.cv.arcLength(cnt,true);
          const circ=(perim>0)?(4*Math.PI*area)/(perim*perim):0;
          const shapeOk=d.shape==='circle'?(circ>0.68):(circ>0.52&&circ<0.92);
          if (shapeOk) {
            let cxR,cyR,rA=0,rFb=false;
            try { const rr=window.cv.minAreaRect(cnt); cxR=rr.center.x; cyR=rr.center.y; rA=rr.angle; }
            catch(_e){ rFb=true; const M=window.cv.moments(cnt); if (M.m00===0){cnt.delete();continue;} cxR=M.m10/M.m00; cyR=M.m01/M.m00; }
            const a90=((rA%90)+90)%90;
            const aD=Math.min(Math.abs(a90-45),45), aS=Math.min(a90,90-a90);
            const angSc = rFb?1.0:(d.shape==='diamond'?Math.exp(-aD/20):d.shape==='square'?Math.exp(-aS/20):1.0);
            const shapeFit=d.shape==='circle'?circ:(1-Math.abs(circ-0.785)*2);
            const score=area*Math.max(shapeFit,0.1)*Math.max(angSc,0.15);
            if (score>bestScore) {
              bestScore=score;
              best={key:d.key,coord:d.coord,_score:score,cx:cxR+x0,cy:cyR+y0,area,circ,angle:a90};
            }
          }
        }
        cnt.delete();
      }
      if (best) results.push(best);
    }
    if (results.length >= 2) {
      const dedupRadius = 25;
      results.sort(function(a,b){return (b._score||0)-(a._score||0);});
      const kept = [];
      for (const r of results) {
        const conflict = kept.some(function(k){return Math.hypot(r.cx-k.cx,r.cy-k.cy)<dedupRadius;});
        if (!conflict) kept.push(r);
        else console.info('[Markers] Dedup: '+r.key+' rejected (conflicts with kept blob)');
      }
      kept.forEach(function(r){delete r._score;});
      return kept;
    }
    results.forEach(function(r){delete r._score;});
    return results;
  } catch(e) {
    console.warn('detectColorMarkersCV failed:',e);
    return [];
  } finally {
    mats.forEach(function(m){try{m.delete();}catch(_){}});
  }
}

function solveSimilarityFromMarkers(markers) {
  const n=markers.length;
  if (n<2) return null;
  const srcs=markers.map(m=>[m.coord[0],-m.coord[1]]);
  const dsts=markers.map(m=>[m.cx,m.cy]);
  let csx=0,csy=0,cdx=0,cdy=0;
  for (let i=0;i<n;i++){csx+=srcs[i][0];csy+=srcs[i][1];cdx+=dsts[i][0];cdy+=dsts[i][1];}
  csx/=n;csy/=n;cdx/=n;cdy/=n;
  let a=0,b_=0,sSq=0;
  for (let i=0;i<n;i++){
    const sx=srcs[i][0]-csx,sy=srcs[i][1]-csy;
    const dx=dsts[i][0]-cdx,dy=dsts[i][1]-cdy;
    a+=sx*dx+sy*dy; b_+=sx*dy-sy*dx; sSq+=sx*sx+sy*sy;
  }
  if (sSq<1e-6) return null;
  a/=sSq; b_/=sSq;
  const scale=Math.sqrt(a*a+b_*b_);
  const angle=Math.atan2(b_,a);
  const ox=cdx-(a*csx-b_*csy);
  const oy=cdy-(b_*csx+a*csy);
  if (!isFinite(scale)||scale<5) return null;
  let sqSum=0;
  for (let i=0;i<n;i++){
    const px=ox+(a*srcs[i][0]-b_*srcs[i][1]);
    const py=oy+(b_*srcs[i][0]+a*srcs[i][1]);
    sqSum+=(px-dsts[i][0])**2+(py-dsts[i][1])**2;
  }
  const rms=Math.sqrt(sqSum/n);
  if (rms>scale*0.25) return null;
  return {origin:{x:ox,y:oy},scale,angle,rms};
}

function originFromMarkerAxes(markers) {
  if (!markers || markers.length < 4) return null;
  const horiz = markers.filter(function(m){return m.coord && m.coord[1]===0;});
  const vert  = markers.filter(function(m){return m.coord && m.coord[0]===0;});
  if (horiz.length < 2 || vert.length < 2) return null;
  function fitYX(pts){
    const n=pts.length; let sx=0,sy=0,sxy=0,sxx=0;
    for (const p of pts){sx+=p.cx;sy+=p.cy;sxy+=p.cx*p.cy;sxx+=p.cx*p.cx;}
    const d=n*sxx-sx*sx; if (Math.abs(d)<1e-6) return null;
    const a=(n*sxy-sx*sy)/d; const b=(sy-a*sx)/n;
    return {a:a,b:b};
  }
  function fitXY(pts){
    const n=pts.length; let sx=0,sy=0,sxy=0,syy=0;
    for (const p of pts){sx+=p.cx;sy+=p.cy;sxy+=p.cx*p.cy;syy+=p.cy*p.cy;}
    const d=n*syy-sy*sy; if (Math.abs(d)<1e-6) return null;
    const c=(n*sxy-sx*sy)/d; const dd=(sx-c*sy)/n;
    return {c:c,d:dd};
  }
  const xL=fitYX(horiz), yL=fitXY(vert);
  if (!xL||!yL) return null;
  const denom = 1 - yL.c*xL.a;
  if (Math.abs(denom)<1e-6) return null;
  const ox=(yL.c*xL.b+yL.d)/denom;
  const oy=xL.a*ox+xL.b;
  if (!isFinite(ox)||!isFinite(oy)) return null;
  return {x:ox, y:oy, horizCount:horiz.length, vertCount:vert.length};
}

function solveSimilarityRANSAC(markers) {
  const n=markers.length;
  if (n<2) return null;
  if (n===2){const fit=solveSimilarityFromMarkers(markers);if(fit){fit.inliers=markers.map(m=>m.key);fit.outliers=[];}return fit;}
  function fitPair(mA,mB){
    const sxA=mA.coord[0],syA=-mA.coord[1],sxB=mB.coord[0],syB=-mB.coord[1];
    const dSrcX=sxB-sxA,dSrcY=syB-syA,dDstX=mB.cx-mA.cx,dDstY=mB.cy-mA.cy;
    const denom=dSrcX*dSrcX+dSrcY*dSrcY;
    if (denom<1e-6) return null;
    const a=(dDstX*dSrcX+dDstY*dSrcY)/denom;
    const b_=(dDstY*dSrcX-dDstX*dSrcY)/denom;
    const scale=Math.sqrt(a*a+b_*b_);
    if (!isFinite(scale)||scale<5) return null;
    const ox=mA.cx-(a*sxA-b_*syA);
    const oy=mA.cy-(b_*sxA+a*syA);
    return {origin:{x:ox,y:oy},scale,angle:Math.atan2(b_,a),a,b:b_};
  }
  let bestInliers=[],bestFit=null;
  for (let i=0;i<n;i++){
    for (let j=i+1;j<n;j++){
      const hyp=fitPair(markers[i],markers[j]);
      if (!hyp) continue;
      const tol=Math.max(15,hyp.scale*0.12);  
      const inliers=[];
      for (const m of markers){
        const sx=m.coord[0],sy=-m.coord[1];
        const px=hyp.origin.x+(hyp.a*sx-hyp.b*sy);
        const py=hyp.origin.y+(hyp.b*sx+hyp.a*sy);
        if (Math.hypot(px-m.cx,py-m.cy)<=tol) inliers.push(m);
      }
      if (inliers.length>bestInliers.length){bestInliers=inliers;bestFit=hyp;}
    }
  }
  if (bestInliers.length<2) return null;
  const refined=solveSimilarityFromMarkers(bestInliers);
  const final=refined||{origin:bestFit.origin,scale:bestFit.scale,angle:bestFit.angle,rms:0};
  final.inliers=bestInliers.map(m=>m.key);
  final.outliers=markers.filter(m=>!bestInliers.includes(m)).map(m=>m.key);
  return final;
}

function solveHomographyFromInliers(markers) {
  if (!window.cv||!window.cv.findHomography||markers.length<4) return null;
  function fitH(subset){
    const n=subset.length;
    if (n<4) return null;
    const srcArr=new Float32Array(n*2),dstArr=new Float32Array(n*2);
    for (let i=0;i<n;i++){
      srcArr[i*2]=subset[i].coord[0];
      srcArr[i*2+1]=-subset[i].coord[1];
      dstArr[i*2]=subset[i].cx;
      dstArr[i*2+1]=subset[i].cy;
    }
    let srcMat=null,dstMat=null,H=null,Hinv=null;
    try {
      srcMat=window.cv.matFromArray(n,1,window.cv.CV_32FC2,srcArr);
      dstMat=window.cv.matFromArray(n,1,window.cv.CV_32FC2,dstArr);
      H=window.cv.findHomography(srcMat,dstMat,window.cv.RANSAC,3.0);
      if (!H||H.empty()||H.rows!==3||H.cols!==3) return null;
      const Hflat=Array.from(H.data64F);
      Hinv=new window.cv.Mat();
      window.cv.invert(H,Hinv,window.cv.DECOMP_LU);
      const HinvFlat=Array.from(Hinv.data64F);
      const residuals=subset.map(function(m){
        const x=m.coord[0],y=-m.coord[1];
        const w=Hflat[6]*x+Hflat[7]*y+Hflat[8];
        if (Math.abs(w)<1e-9) return Infinity;
        const px=(Hflat[0]*x+Hflat[1]*y+Hflat[2])/w;
        const py=(Hflat[3]*x+Hflat[4]*y+Hflat[5])/w;
        return Math.hypot(px-m.cx,py-m.cy);
      });
      return {H:Hflat,Hinv:HinvFlat,residuals};
    } catch(e){console.warn('findHomography failed:',e);return null;}
    finally {[srcMat,dstMat,H,Hinv].forEach(m=>{try{m&&m.delete();}catch(_){}});}
  }
  let current=markers.slice();
  let res=fitH(current);
  if (!res) return null;
  for (let iter=0;iter<2;iter++){
    const sorted=res.residuals.slice().sort(function(a,b){return a-b;});
    const median=sorted[Math.floor(sorted.length/2)];
    const cutoff=Math.max(3,median*2);
    const kept=current.filter(function(_,i){return res.residuals[i]<=cutoff;});
    if (kept.length===current.length||kept.length<4) break;
    const refit=fitH(kept);
    if (!refit) break;
    const dropped=current.filter(function(_,i){return res.residuals[i]>cutoff;}).map(function(m){return m.key;}).join(',');
    console.info('[Homography] Refined: dropped '+dropped+' (>'+cutoff.toFixed(1)+'px)');
    current=kept;res=refit;
  }
  return {H:res.H,Hinv:res.Hinv};
}

function detectColorMarkersGuidedCV(data, W, H, b, axisLines) {
  if (!axisLines||axisLines.yAxisX===null||axisLines.xAxisY===null||!axisLines.scale||axisLines.scale<5) return [];
  const DEFS=[
    {key:'refNeg6', coord:[-6,0],shape:'diamond',h:[  8, 42],s:[ 90,255],v:[ 90,255]},
    {key:'refNeg3', coord:[-3,0],shape:'diamond',h:[ 58,110],s:[ 25,220],v:[ 30,240]},
    {key:'refR1',   coord:[ 3,0],shape:'diamond',h:[130,190],s:[ 45,255],v:[ 15,210]},
    {key:'refR2',   coord:[ 6,0],shape:'diamond',h:[215,252],s:[ 25,255],v:[ 70,255]},
    {key:'ref0Neg6',coord:[ 0,-6],shape:'square', h:[ 95,150],s:[ 30,255],v:[ 70,255]},
    {key:'ref0Neg3',coord:[ 0,-3],shape:'square', h:[  5, 22],s:[ 50,225],v:[  8,140]},
    {key:'ref0_3',  coord:[ 0, 3],shape:'square', h:[130,190],s:[ 45,255],v:[ 15,210]},
    {key:'ref0_6',  coord:[ 0, 6],shape:'square', h:[  8, 42],s:[ 90,255],v:[ 90,255]},
  ];
  const ox=axisLines.yAxisX,oy=axisLines.xAxisY,sc=axisLines.scale;
  const searchR=Math.max(35,sc*1.4);
  const mats=[];
  const track=function(m){mats.push(m);return m;};
  try {
    const src=track(window.cv.matFromImageData(new ImageData(data,W,H)));
    const fullRgb=track(new window.cv.Mat());
    window.cv.cvtColor(src,fullRgb,window.cv.COLOR_RGBA2RGB);
    const fullHsv=track(new window.cv.Mat());
    window.cv.cvtColor(fullRgb,fullHsv,window.cv.COLOR_RGB2HSV_FULL);
    try {
      const ch=new window.cv.MatVector();
      window.cv.split(fullHsv, ch);
      const v = ch.get(2), vEq = new window.cv.Mat();
      const cl = new window.cv.CLAHE(2.0, new window.cv.Size(8,8));
      cl.apply(v, vEq);
      ch.set(2, vEq);
      window.cv.merge(ch, fullHsv);
      v.delete(); vEq.delete(); cl.delete(); ch.delete();
    } catch(_e) {}

    const results = [];
    for (const d of DEFS) {
      const expX = ox + d.coord[0] * sc;
      const expY = oy - d.coord[1] * sc; // -y is up in pixel coords
      let rx0 = Math.max(0, Math.floor(expX - searchR));
      let rx1 = Math.min(W, Math.ceil(expX + searchR));
      let ry0 = Math.max(0, Math.floor(expY - searchR));
      let ry1 = Math.min(H, Math.ceil(expY + searchR));
      
      if (rx1 - rx0 < 10 || ry1 - ry0 < 10) continue;
      
      const roiView = fullHsv.roi(new window.cv.Rect(rx0, ry0, rx1-rx0, ry1-ry0));
      const hsvRoi = track(roiView.clone()); roiView.delete();
      
      const mask = track(new window.cv.Mat());
      const [hLo,hHi]=d.h, [sLo,sHi]=d.s, [vLo,vHi]=d.v;
      window.cv.inRange(hsvRoi, new window.cv.Scalar(hLo,sLo,vLo), new window.cv.Scalar(hHi,sHi,vHi), mask);
      
      const blur = track(new window.cv.Mat());
      window.cv.GaussianBlur(mask, blur, new window.cv.Size(3,3), 0);
      const bin = track(new window.cv.Mat());
      window.cv.threshold(blur, bin, 40, 255, window.cv.THRESH_BINARY);
      
      const contours = track(new window.cv.MatVector());
      const hier = track(new window.cv.Mat());
      window.cv.findContours(bin, contours, hier, window.cv.RETR_EXTERNAL, window.cv.CHAIN_APPROX_SIMPLE);
      
      let best = null, bestScore = -1;
      for (let i=0; i<contours.size(); i++) {
        const cnt = contours.get(i);
        const area = window.cv.contourArea(cnt);
        if (area >= 15 && area <= 4000) {
          const perim = window.cv.arcLength(cnt, true);
          const circ = (perim > 0) ? (4*Math.PI*area)/(perim*perim) : 0;
          let cx, cy;
          const M = window.cv.moments(cnt);
          if (M.m00 !== 0) {
            cx = M.m10/M.m00 + rx0; cy = M.m01/M.m00 + ry0;
            const dist = Math.hypot(cx - expX, cy - expY);
            const distPenalty = Math.max(0, 1 - dist/searchR);
            const score = area * circ * distPenalty;
            if (score > bestScore) {
              bestScore = score;
              best = { key: d.key, coord: d.coord, cx, cy, area, circ };
            }
          }
        }
        cnt.delete();
      }
      if (best) results.push(best);
    }
    return results;
  } catch (e) {
    console.warn('detectColorMarkersGuidedCV failed:', e);
    return [];
  } finally {
    mats.forEach(m => { try { m.delete(); } catch(e){} });
  }
}

function detectColorAxisLinesCV(data, W, H, b) {
  let xAxisY = null, yAxisX = null, scale = null;
  const mats = [];
  const track = m => { mats.push(m); return m; };
  try {
    const x0 = b ? b.x0 : 0, x1 = b ? b.x1 : W;
    const y0 = b ? b.y0 : 0, y1 = b ? b.y1 : H;
    if (x1 - x0 < 40 || y1 - y0 < 40) return { xAxisY, yAxisX, scale };

    const src = track(window.cv.matFromImageData(new ImageData(data, W, H)));
    const roiView = src.roi(new window.cv.Rect(x0, y0, x1-x0, y1-y0));
    const roi = track(roiView.clone()); roiView.delete();

    const hsv = track(new window.cv.Mat());
    window.cv.cvtColor(roi, hsv, window.cv.COLOR_RGBA2RGB);
    window.cv.cvtColor(hsv, hsv, window.cv.COLOR_RGB2HSV_FULL);

    // Orange Y-axis
    const maskOrg = track(new window.cv.Mat());
    window.cv.inRange(hsv, new window.cv.Scalar(10, 80, 80), new window.cv.Scalar(35, 255, 255), maskOrg);
    const colSumOrg = track(new window.cv.Mat());
    window.cv.reduce(maskOrg, colSumOrg, 0, window.cv.REDUCE_SUM, window.cv.CV_32S);
    let maxOrg = 0, maxOrgX = -1;
    for (let x = 0; x < colSumOrg.cols; x++) {
      if (colSumOrg.data32S[x] > maxOrg) { maxOrg = colSumOrg.data32S[x]; maxOrgX = x; }
    }
    if (maxOrg > (y1-y0)*255*0.1) yAxisX = maxOrgX + x0;

    // Black X-axis
    const maskBlk = track(new window.cv.Mat());
    window.cv.inRange(hsv, new window.cv.Scalar(0, 0, 0), new window.cv.Scalar(255, 60, 60), maskBlk);
    const rowSumBlk = track(new window.cv.Mat());
    window.cv.reduce(maskBlk, rowSumBlk, 1, window.cv.REDUCE_SUM, window.cv.CV_32S);
    let maxBlk = 0, maxBlkY = -1;
    for (let y = 0; y < rowSumBlk.rows; y++) {
      if (rowSumBlk.data32S[y] > maxBlk) { maxBlk = rowSumBlk.data32S[y]; maxBlkY = y; }
    }
    if (maxBlk > (x1-x0)*255*0.1) xAxisY = maxBlkY + y0;

    // Scale Estimation via grid frequency
    const gray = track(new window.cv.Mat());
    window.cv.cvtColor(roi, gray, window.cv.COLOR_RGBA2GRAY);
    const edges = track(new window.cv.Mat());
    window.cv.Canny(gray, edges, 50, 150);
    const colSumEdges = track(new window.cv.Mat());
    window.cv.reduce(edges, colSumEdges, 0, window.cv.REDUCE_SUM, window.cv.CV_32S);
    const profile = Array.from(colSumEdges.data32S);
    const peaks = findPeaks(profile, 0, profile.length);
    if (peaks.length >= 3) {
      const sp = medSp(peaks);
      if (sp) scale = sp / GRID_CM;
    }

  } catch(e) { console.warn('detectColorAxisLinesCV failed:', e); }
  finally { mats.forEach(m => { try { m.delete(); } catch(_){} }); }
  return { xAxisY, yAxisX, scale, x3X: null, x6X: null };
}

function detectGridLinesCV(data, W, H, origin, b) {
  return detectGridLines(data, W, H, origin, b); // Fallback to JS implementation as it handles grid extraction well
}

/* ════════════════════════════════════════════════════════════════
   CLIENT-SIDE MACHINE LEARNING DETECTION (ONNX + LinearSVC)
════════════════════════════════════════════════════════════════ */

let ortSession = null;
let ensembleWeights = null;

async function initMLModel() {
  try {
    // TAMBAHKAN BARIS INI: Paksa ONNX berjalan di Single-Thread agar tidak diblokir Live Server
    ort.env.wasm.numThreads = 1; 

    if (!ortSession) {
      ortSession = await ort.InferenceSession.create('./mobilenet_v3_small.onnx');
    }
    if (!ensembleWeights) {
      const res = await fetch('./ensemble_weights.json');
      ensembleWeights = await res.json();
    }
    return true;
  } catch (err) {
    console.error('❌ Gagal memuat model ML:', err);
    return false;
  }
}

// Pre-warm model secara asinkron di background
initMLModel().catch(e => console.warn(e));

function predictML(features1000D) {
  if (!ensembleWeights) return -1;
  let ensembleVotes = 0;

  for (const clf of ensembleWeights) {
    const scaled = new Float32Array(1000);
    for (let j = 0; j < 1000; j++) {
      scaled[j] = (features1000D[j] - clf.scaler_mean[j]) / clf.scaler_scale[j];
    }

    let adaVote = 0;
    for (const est of clf.estimators) {
      let dot = est.intercept;
      for (let j = 0; j < 1000; j++) {
        dot += est.coef[j] * scaled[j];
      }
      const pred = dot >= 0 ? 1 : -1;
      adaVote += pred * est.weight;
    }
    ensembleVotes += adaVote >= 0 ? 1 : -1;
  }
  // Voting consensus (minimal 3 dari 5 model setuju)
  return ensembleVotes >= 1 ? 1 : -1;
}

async function extractFeaturesONNX(cropCanvas) {
  const ctx = cropCanvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, 32, 32).data;
  
  const floatData = new Float32Array(1 * 3 * 32 * 32);
  for (let i = 0; i < 32 * 32; i++) {
    floatData[i] = imgData[i * 4] / 255.0;
    floatData[32 * 32 + i] = imgData[i * 4 + 1] / 255.0;
    floatData[32 * 32 * 2 + i] = imgData[i * 4 + 2] / 255.0;
  }

  const tensor = new ort.Tensor('float32', floatData, [1, 3, 32, 32]);
  const results = await ortSession.run({ input: tensor });
  return results.output.data; 
}

async function runMLPipelineOnFrame(imgMat) {
  await initMLModel();
  if (!ortSession || !ensembleWeights) return null;

  const gray = new cv.Mat();
  const thresh = new cv.Mat();
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  // Threshold untuk menemukan kandidat area terang
  cv.cvtColor(imgMat, gray, cv.COLOR_RGBA2GRAY);
  cv.threshold(gray, thresh, 180, 255, cv.THRESH_BINARY);
  cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  let rawCandidates = [];
  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = 32; cropCanvas.height = 32;
  const cropCtx = cropCanvas.getContext('2d');

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = imgMat.cols; tempCanvas.height = imgMat.rows;
  cv.imshow(tempCanvas, imgMat);

  for (let i = 0; i < contours.size(); i++) {
    const rect = cv.boundingRect(contours.get(i));
    
    // Filter ukuran geometri dasar
    if (rect.width >= 2 && rect.height >= 2 && rect.width <= 40 && rect.height <= 40) {
      const newX = Math.max(0, rect.x - rect.width);
      const newY = Math.max(0, rect.y - rect.height);
      const newW = Math.min(imgMat.cols - newX, rect.width * 3);
      const newH = Math.min(imgMat.rows - newY, rect.height * 3);

      cropCtx.clearRect(0, 0, 32, 32);
      cropCtx.drawImage(tempCanvas, newX, newY, newW, newH, 0, 0, 32, 32);

      const features = await extractFeaturesONNX(cropCanvas);
      if (predictML(features) === 1) {
        rawCandidates.push({ cx: rect.x + rect.width / 2, cy: rect.y + rect.height / 2 });
      }
    }
  }

  gray.delete(); thresh.delete(); contours.delete(); hierarchy.delete();

  // NMS: Penggabungan Titik Berdekatan (<30px)
  let merged = [];
  rawCandidates.forEach(p => {
    let isMerged = false;
    for (let i = 0; i < merged.length; i++) {
      if (Math.hypot(p.cx - merged[i].cx, p.cy - merged[i].cy) < 30) {
        merged[i].cx = (p.cx + merged[i].cx) / 2;
        merged[i].cy = (p.cy + merged[i].cy) / 2;
        isMerged = true; break;
      }
    }
    if (!isMerged) merged.push(p);
  });

  if (merged.length <= 2) return merged.sort((a,b) => a.cx - b.cx);

  // Filter Pasangan Paling Sejajar Horizontal
  let bestPair = [];
  let minYDiff = Infinity;
  for (let i = 0; i < merged.length; i++) {
    for (let j = i + 1; j < merged.length; j++) {
      let yDiff = Math.abs(merged[i].cy - merged[j].cy);
      if (yDiff < minYDiff) {
        minYDiff = yDiff;
        bestPair = [merged[i], merged[j]];
      }
    }
  }
  return bestPair.sort((a,b) => a.cx - b.cx);
}

/* ════════════════════════════════════════════════════════════════
   MAIN DETECTION FUNCTION (ML + FALLBACK TRADISIONAL)
════════════════════════════════════════════════════════════════ */
function detectLaserSpots(data, W, H, b) {
  const x0=b?b.x0:Math.floor(W*0.08), x1=b?b.x1:Math.floor(W*0.92);
  const y0=b?b.y0:Math.floor(H*0.08), y1=b?b.y1:Math.floor(H*0.92);
  const mask = new Uint8Array(W*H);

  // Pencarian Pass 1 (Sangat Ketat sesuai config.json)
  for (let y=y0;y<y1;y++) for (let x=x0;x<x1;x++) {
    const i=(y*W+x)*4;
    if (lum(data,i)<30) continue; 
    const {h, l, s} = rgb2hls(data[i], data[i+1], data[i+2]);
    if ((h <= 15 || h >= 165) && l >= 137 && s >= 216) mask[y*W+x] = 1;
  }

  let comps = findComps(mask, W, H).filter(c=>c.area>=4);

  // Pencarian Pass 2 (Kelonggaran jika laser pertama tidak ketemu 2 buah)
  if (comps.length < 2) {
    for (let i2=0;i2<mask.length;i2++) mask[i2]=0;
    for (let y=y0;y<y1;y++) for (let x=x0;x<x1;x++) {
      const i=(y*W+x)*4;
      if (lum(data,i)<20) continue;
      const {h, l, s} = rgb2hls(data[i], data[i+1], data[i+2]);
      // Sedikit dilonggarkan agar laser redup masuk
      if ((h <= 20 || h >= 160) && l >= 100 && s >= 180) mask[y*W+x] = 1;
    }
    comps = findComps(mask, W, H).filter(c=>c.area>=3);
  }

  comps = comps.filter(c => {
    const spotR = Math.sqrt(c.area / Math.PI);
    return isOnBrightBackground(data, W, H, c.cx, c.cy, spotR);
  });

  const cands = comps.sort((a,b2)=>b2.area-a.area);
  if (cands.length <= 2) return cands;
  const best = [cands[0]];
  for (const cc of cands.slice(1)) {
    if (best.every(b2 => Math.abs(cc.cx - b2.cx) > 20 || Math.abs(cc.cy - b2.cy) > 20)) {
      best.push(cc);
      if (best.length === 2) break;
    }
  }
  const out = best.length === 2 ? best : cands.slice(0, 2);
  return out.sort((a, b2) => a.cx - b2.cx);
}

/* ═══════════════════════════════
   MATH & IMAGE UTILS
═══════════════════════════════ */
function rgb2hls(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 179, l: l * 255, s: s * 255 };
}

function lum(d, i) { return 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2]; }
function sat(d, i) {
  const mx = Math.max(d[i], d[i+1], d[i+2]), mn = Math.min(d[i], d[i+1], d[i+2]);
  return mx === 0 ? 0 : (mx - mn) / mx;
}

function findComps(mask, W, H) {
  const visited = new Uint8Array(W * H);
  const comps = [];
  for (let y=0; y<H; y++) {
    for (let x=0; x<W; x++) {
      if (mask[y*W+x] && !visited[y*W+x]) {
        let area = 0, sumX = 0, sumY = 0;
        const q = [x, y];
        visited[y*W+x] = 1;
        while (q.length > 0) {
          const cy = q.pop(), cx = q.pop();
          area++; sumX += cx; sumY += cy;
          [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx, dy]) => {
            const nx = cx+dx, ny = cy+dy;
            if (nx>=0 && nx<W && ny>=0 && ny<H && mask[ny*W+nx] && !visited[ny*W+nx]) {
              visited[ny*W+nx] = 1; q.push(nx, ny);
            }
          });
        }
        comps.push({ cx: sumX/area, cy: sumY/area, area });
      }
    }
  }
  return comps;
}

function fitAxisPoly(pts) {
  if (pts.length < 3) {
    if (pts.length === 2) {
      const dt = pts[1].t - pts[0].t;
      if (dt === 0) return null;
      return { ax:0, bx:(pts[1].x-pts[0].x)/dt, cx:pts[0].x, ay:0, by:(pts[1].y-pts[0].y)/dt, cy:pts[0].y };
    }
    return null;
  }
  let st=0, st2=0, st3=0, st4=0;
  let sxt=0, sx=0, sxt2=0, syt=0, sy=0, syt2=0;
  const n = pts.length;
  pts.forEach(p => {
    const t = p.t, t2 = t*t, t3 = t2*t, t4 = t3*t;
    st+=t; st2+=t2; st3+=t3; st4+=t4;
    sx+=p.x; sxt+=p.x*t; sxt2+=p.x*t2;
    sy+=p.y; syt+=p.y*t; syt2+=p.y*t2;
  });
  const solve = (S0, S1, S2) => {
    const D = n*(st2*st4 - st3*st3) - st*(st*st4 - st2*st3) + st2*(st*st3 - st2*st2);
    if (Math.abs(D) < 1e-9) return {a:0, b:0, c:0};
    const c = (S0*(st2*st4 - st3*st3) - st*(S1*st4 - S2*st3) + st2*(S1*st3 - S2*st2)) / D;
    const b = (n*(S1*st4 - S2*st3) - S0*(st*st4 - st2*st3) + st2*(st*S2 - st2*S1)) / D;
    const a = (n*(st2*S2 - st3*S1) - st*(st*S2 - st2*S1) + S0*(st*st3 - st2*st2)) / D;
    return {a, b, c};
  };
  const xCoeff = solve(sx, sxt, sxt2);
  const yCoeff = solve(sy, syt, syt2);
  return { ax: xCoeff.a, bx: xCoeff.b, cx: xCoeff.c, ay: yCoeff.a, by: yCoeff.b, cy: yCoeff.c };
}

function evalPoly(poly, t) {
  return { x: poly.ax*t*t + poly.bx*t + poly.cx, y: poly.ay*t*t + poly.by*t + poly.cy };
}

function axisNearestT(poly, px, py) {
  let bestT = 0, bestD = Infinity;
  for (let t = -15; t <= 15; t += 0.2) {
    const pt = evalPoly(poly, t);
    const d = Math.hypot(pt.x - px, pt.y - py);
    if (d < bestD) { bestD = d; bestT = t; }
  }
  let ct = bestT;
  for (let i = 0; i < 5; i++) {
    const pt = evalPoly(poly, ct);
    const dxdt = 2*poly.ax*ct + poly.bx;
    const dydt = 2*poly.ay*ct + poly.by;
    const f = (pt.x - px)*dxdt + (pt.y - py)*dydt;
    const df = dxdt*dxdt + 2*poly.ax*(pt.x - px) + dydt*dydt + 2*poly.ay*(pt.y - py);
    if (Math.abs(df) < 1e-9) break;
    ct -= f / df;
  }
  return ct;
}

/* ═══════════════════════════════
   PAGE 2: REVIEW TABLE
═══════════════════════════════ */
function renderTable() {
  const tbody = el('coord-tbody');
  tbody.innerHTML = '';
  let confCount = 0;
  state.files.forEach((f, i) => {
    if (f._calRef) return;
    const r = state.results[i] || {};
    const tr = document.createElement('tr');
    if (r.unclear || isNaN(r.x1) || isNaN(r.x2)) tr.style.background = '#fef2f2';

    const fmt = v => isNaN(v) ? '-' : v.toFixed(3);
    const tdX1 = `<span class="coord-val ${r.unclear?'unclear':''}">${fmt(r.x1)}</span>`;
    const tdY1 = `<span class="coord-val ${r.unclear?'unclear':''}">${fmt(r.y1)}</span>`;
    const tdX2 = `<span class="coord-val ${r.unclear?'unclear':''}">${fmt(r.x2)}</span>`;
    const tdY2 = `<span class="coord-val ${r.unclear?'unclear':''}">${fmt(r.y2)}</span>`;

    const conf = r.confidence || 'unclear';
    const badgeC = conf==='ok'?'badge-ok':conf==='low'?'badge-warn':'badge-err';
    const badgeT = conf==='ok'?t('js.badge.ok'):conf==='low'?t('js.badge.low'):t('js.badge.unclear');

    const rotText = f.rotation ? `<span style="color:var(--amber);font-weight:700">180°</span>` : '0°';
    const imgHtml = f.dataUrl ? `<button class="thumb-btn" onclick="openModal(${i})"><img src="${f.dataUrl}" style="${f.rotation?'transform:rotate(180deg)':''}"></button>` : `<span style="color:var(--gray)">無檔案</span>`;

    tr.innerHTML = `
      <td class="cell-num">${i+1}</td>
      <td class="coord-cell" ondblclick="editCell(${i},'x1')">${tdX1}</td>
      <td class="coord-cell" ondblclick="editCell(${i},'y1')">${tdY1}</td>
      <td class="coord-cell" ondblclick="editCell(${i},'x2')">${tdX2}</td>
      <td class="coord-cell" ondblclick="editCell(${i},'y2')">${tdY2}</td>
      <td><span class="badge ${badgeC}">${badgeT}</span></td>
      <td>${rotText}</td>
      <td style="font-size:.7rem;max-width:150px;overflow:hidden;text-overflow:ellipsis" title="${f.name}">${f.name}</td>
      <td>${imgHtml}</td>
      <td>${r.manualSaved ? `<span style="color:var(--green);font-weight:700" title="User manually saved">✔</span>` : ''}</td>
    `;
    tbody.appendChild(tr);
    if (!r.unclear && !isNaN(r.x1)) confCount++;
  });
  el('p3-summary-text').innerHTML = `有效座標：<strong>${confCount}</strong> / ${state.files.filter(f=>!f._calRef).length}`;
}

window.editCell = function(idx, key) {
  const r = state.results[idx];
  const oldVal = r[key];
  const input = prompt(`輸入新的 ${key} (cm):`, isNaN(oldVal) ? '' : oldVal);
  if (input !== null) {
    const num = parseFloat(input);
    r[key] = isNaN(num) ? NaN : num;
    r.manualSaved = true;
    renderTable();
  }
};

/* ═══════════════════════════════
   MODAL LOGIC
═══════════════════════════════ */
function openModal(idx) {
  state.modalIdx = idx;
  const f = state.files[idx];
  const r = state.results[idx] || {};

  state.modalOrigin = r.originPx ? {...r.originPx} : null;
  state.modalScale = r.scalePxPerCm || null;
  state.modalSpots = r.spots ? r.spots.map(s=>({...s})) : [];
  state.modalVLines = r.vLines || [];
  state.modalHLines = r.hLines || [];
  state.modalRotation = f.rotation || 0;
  state.modalZoom = 1;
  state.axisPolyX = r.axisPolyX ? {...r.axisPolyX} : null;
  state.axisPolyY = r.axisPolyY ? {...r.axisPolyY} : null;
  state.fisheyeKx = 0; state.fisheyeKy = 0;
  
  state.modalRefNeg3 = r.refNeg3 ? {...r.refNeg3} : null;
  state.modalRefR1   = r.refR1   ? {...r.refR1}   : null;
  state.modalRefR2   = r.refR2   ? {...r.refR2}   : null;
  state.modalRefNeg6 = r.refNeg6 ? {...r.refNeg6} : null;
  state.modalRef0_3  = r.ref0_3  ? {...r.ref0_3}  : null;
  state.modalRef0Neg3= r.ref0Neg3? {...r.ref0Neg3}: null;
  state.modalRef0_6  = r.ref0_6  ? {...r.ref0_6}  : null;
  state.modalRef0Neg6= r.ref0Neg6? {...r.ref0Neg6}: null;
  state.modalRefSkipped = r.refSkipped ? {...r.refSkipped} : {};
  state.axisFromCal  = !!r.calApplied;
  state.calAxesTheta = r.calAxesTheta || 0;

  // Make the "Set Calibration" button available for the explicit ref image, OR for any image if the axes aren't locked to an existing calibration
  if (f._calRef || !state.axisFromCal) {
    el('btn-set-cal').style.display = 'inline-flex';
    el('ref-mode-section').style.display = 'block';
    el('cal-lock-notice').style.display = 'none';
  } else {
    el('btn-set-cal').style.display = 'none';
    el('ref-mode-section').style.display = 'none';
    el('cal-lock-notice').style.display = 'block';
  }

  _writeVal('m-x1', r.x1); _writeVal('m-y1', r.y1);
  _writeVal('m-x2', r.x2); _writeVal('m-y2', r.y2);
  _writeVal('m-scale', state.modalScale ? state.modalScale.toFixed(1) : '');
  _writeVal('m-k1', el('g-k1').value || 0);

  const titleEl = el('modal-title');
  if (titleEl) {
    titleEl.textContent = f._calRef
      ? `${t('js.modal.calmode')}${f.name}`
      : `${t('js.modal.imgof')} ${idx+1} / ${state.files.length} — ${f.name}`;
  }
  
  el('m-grid-info').textContent = (state.modalVLines.length && state.modalHLines.length)
    ? `${state.modalVLines.length} V, ${state.modalHLines.length} H` : '—';

  updateSkippedBtnUI();

  if (f.dataUrl) {
    state.modalImg = new Image();
    state.modalImg.onload = () => {
      fitZoom();
      drawModalCanvas();
      drawFisheyeCurve('x'); drawFisheyeCurve('y');
    };
    state.modalImg.src = f.dataUrl;
  }
  
  el('modal-bg').classList.add('open');
  setMode('origin');
}

function closeModal(e) {
  if (e && e.target !== el('modal-bg')) return;
  saveModalSilently(); // FIX: Auto-save annotations when closing
  el('modal-bg').classList.remove('open');
  state.modalImg = null;
  if (state.currentStep === 2) renderTable();
}

function modalNav(dir) {
  let next = state.modalIdx + dir;
  if (next < 0) next = state.files.length - 1;
  if (next >= state.files.length) next = 0;
  saveModalSilently();
  openModal(next);
}

function zoomModal(dir) {
  state.modalZoom *= (dir > 0 ? 1.25 : 0.8);
  el('zoom-level').textContent = Math.round(state.modalZoom * 100) + '%';
  drawModalCanvas();
}

function fitZoom() {
  const wrap = el('modal-canvas-wrap');
  if (!wrap || !state.modalImg) return;
  const wRat = (wrap.clientWidth - 20) / state.modalImg.naturalWidth;
  const hRat = (wrap.clientHeight - 20) / state.modalImg.naturalHeight;
  state.modalZoom = Math.min(1, wRat, hRat);
  el('zoom-level').textContent = Math.round(state.modalZoom * 100) + '%';
  drawModalCanvas();
}

function toggleModalRotation() {
  state.modalRotation = state.modalRotation === 180 ? 0 : 180;
  if (state.modalOrigin) {
    state.modalOrigin.x = state.modalImg.naturalWidth - state.modalOrigin.x;
    state.modalOrigin.y = state.modalImg.naturalHeight - state.modalOrigin.y;
  }
  state.modalSpots.forEach(s => {
    s.cx = state.modalImg.naturalWidth - s.cx;
    s.cy = state.modalImg.naturalHeight - s.cy;
  });
  if (state.axisPolyX) {
    state.axisPolyX.cx = state.modalImg.naturalWidth - state.axisPolyX.cx;
    state.axisPolyX.cy = state.modalImg.naturalHeight - state.axisPolyX.cy;
  }
  if (state.axisPolyY) {
    state.axisPolyY.cx = state.modalImg.naturalWidth - state.axisPolyY.cx;
    state.axisPolyY.cy = state.modalImg.naturalHeight - state.axisPolyY.cy;
  }
  drawModalCanvas();
  refreshModalCoords();
}

function setMode(m) {
  if (m === 'auto') {
    const f = state.files[state.modalIdx];
    const k1 = parseFloat(el('m-k1').value) || 0;
    const btn = el('mode-auto');
    const origText = btn.textContent;
    btn.textContent = '⏳ ...';
    detectImage(f.dataUrl, state.modalRotation, k1, false).then(r => {
      state.results[state.modalIdx] = r;
      btn.textContent = origText;
      openModal(state.modalIdx);
    });
    return;
  }
  state.modalMode = m;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const btn = el('mode-' + m);
  if (btn) btn.classList.add('active');
}

function skipRef(stateKey, modeKey) {
  if (!state.modalRefSkipped) state.modalRefSkipped = {};
  state.modalRefSkipped[stateKey] = !state.modalRefSkipped[stateKey];
  updateSkippedBtnUI();
  updateAxesFromRefs();
}

function updateSkippedBtnUI() {
  const pairs = [
    {s:'modalRefNeg6', m:'rn6'}, {s:'modalRefNeg3', m:'rn3'}, {s:'modalRefR1', m:'r1'}, {s:'modalRefR2', m:'r2'},
    {s:'modalRef0Neg6',m:'r0n6'},{s:'modalRef0Neg3',m:'r0n3'},{s:'modalRef0_3',m:'r03'},{s:'modalRef0_6',m:'r06'}
  ];
  pairs.forEach(p => {
    const btnSkip = el('skip-' + p.s), btnMode = el('mode-' + p.m);
    if (!btnSkip || !btnMode) return;
    if (state.modalRefSkipped && state.modalRefSkipped[p.s]) {
      btnSkip.classList.add('skipped'); btnMode.classList.add('skipped-ref');
    } else {
      btnSkip.classList.remove('skipped'); btnMode.classList.remove('skipped-ref');
    }
  });
}

function applyManual() {
  const r = state.results[state.modalIdx];
  r.x1 = parseFloat(_readVal('m-x1')); r.y1 = parseFloat(_readVal('m-y1'));
  r.x2 = parseFloat(_readVal('m-x2')); r.y2 = parseFloat(_readVal('m-y2'));
  r.manualSaved = true;
  r.unclear = false;
  r.confidence = 'ok';
}

function applyScale() {
  const v = parseFloat(_readVal('m-scale'));
  if (v > 0) { state.modalScale = v; refreshModalCoords(); drawModalCanvas(); }
}

function saveModalSilently() {
  if (state.modalIdx === null) return;
  applyManual();
  const r = state.results[state.modalIdx];
  r.originPx = state.modalOrigin;
  r.scalePxPerCm = state.modalScale;
  r.spots = state.modalSpots;
  r.refNeg3 = state.modalRefNeg3;
  r.refR1   = state.modalRefR1;
  r.refR2   = state.modalRefR2;
  r.refNeg6 = state.modalRefNeg6;
  r.ref0_3  = state.modalRef0_3;
  r.ref0Neg3= state.modalRef0Neg3;
  r.ref0_6  = state.modalRef0_6;
  r.ref0Neg6= state.modalRef0Neg6;
  r.refSkipped = {...state.modalRefSkipped};
  r.axisPolyX  = state.axisPolyX;
  r.axisPolyY  = state.axisPolyY;
  r.calAxesTheta = state.calAxesTheta;
  state.files[state.modalIdx].rotation = state.modalRotation;
}

function saveModal() {
  saveModalSilently();
  closeModal();
}

/* ═══════════════════════════════
   MODAL CANVAS & INTERACTION
═══════════════════════════════ */
function drawModalCanvas() {
  const cv = el('modal-canvas');
  if (!cv || !state.modalImg) return;
  const ctx = cv.getContext('2d');
  const W = state.modalImg.naturalWidth, H = state.modalImg.naturalHeight;
  
  cv.width = W * state.modalZoom;
  cv.height = H * state.modalZoom;
  state.modalDispScale = state.modalZoom;

  ctx.save();
  ctx.scale(state.modalZoom, state.modalZoom);
  
  if (state.modalRotation === 180) { ctx.translate(W, H); ctx.rotate(Math.PI); }
  ctx.drawImage(state.modalImg, 0, 0);
  if (state.modalRotation === 180) ctx.setTransform(state.modalZoom,0,0,state.modalZoom,0,0);

  // Draw detected grid lines
  ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(99,102,241,0.4)';
  ctx.setLineDash([5,5]);
  state.modalVLines.forEach(x => { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); });
  state.modalHLines.forEach(y => { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); });
  ctx.setLineDash([]);
    // Draw calibration curve if axisFromCal
    // Draw calibration curve if axisFromCal
  if (state.axisFromCal && state.axisPolyX && state.modalOrigin) {
    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(29,78,216,0.6)';
    ctx.beginPath();
    for (let t = -20; t <= 20; t += 0.5) {
      const p = evalPoly(state.axisPolyX, t);
      t === -20 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    if (state.axisPolyY) {
      ctx.beginPath();
      for (let t = -16; t <= 16; t += 0.5) {
        const p = evalPoly(state.axisPolyY, t);
        t === -16 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // FIX: Draw projected reference points directly on the locked curves
    const drawEstPt = (poly, t, color) => {
      if(!poly) return;
      const p = evalPoly(poly, t);
      ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, 2*Math.PI);
      ctx.fillStyle = color; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.stroke();
    };
    
    // X-axis refs
    drawEstPt(state.axisPolyX, -6, '#0e7490');
    drawEstPt(state.axisPolyX, -3, '#0891b2');
    drawEstPt(state.axisPolyX, 3,  '#b45309');
    drawEstPt(state.axisPolyX, 6,  '#7c3aed');
    // Y-axis refs
    if (state.axisPolyY) {
      drawEstPt(state.axisPolyY, -6, '#9f1239');
      drawEstPt(state.axisPolyY, -3, '#dc2626');
      drawEstPt(state.axisPolyY, 3,  '#059669');
      drawEstPt(state.axisPolyY, 6,  '#047857');
    }
  }

  // Helper to draw points with a center plus, honoring 'skipped' state
  const drawPt = (pt, color, border, isRef=false, stateKey=null) => {
    if (!pt) return;
    if (stateKey && state.modalRefSkipped && state.modalRefSkipped[stateKey]) return; // Hide if marked FOV outside

    const x = pt.x !== undefined ? pt.x : pt.cx;
    const y = pt.y !== undefined ? pt.y : pt.cy;
    const r = isRef ? 7 : 5;

    ctx.beginPath(); ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fillStyle = color; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = border; ctx.stroke();
    
    // Draw center plus (crosshair)
    ctx.beginPath();
    ctx.moveTo(x - r + 1.5, y); ctx.lineTo(x + r - 1.5, y);
    ctx.moveTo(x, y - r + 1.5); ctx.lineTo(x, y + r - 1.5);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  // Origin (Yellow)
  if (state.modalOrigin) {
    const ox = state.modalOrigin.x, oy = state.modalOrigin.y;
    const r = 12; // Size of the plus arms
    ctx.beginPath();
    ctx.moveTo(ox - r, oy); ctx.lineTo(ox + r, oy);
    ctx.moveTo(ox, oy - r); ctx.lineTo(ox, oy + r);
    ctx.strokeStyle = '#eab308'; // Yellow color
    ctx.lineWidth = 3.5;
    ctx.stroke();
  }
  
  if (state.axisFromCal && state.modalOrigin) {
    // Rotation handle
    const hPt = evalPoly(state.axisPolyX, 8);
    ctx.beginPath(); ctx.moveTo(state.modalOrigin.x, state.modalOrigin.y); ctx.lineTo(hPt.x, hPt.y);
    ctx.strokeStyle = 'rgba(34,197,94,0.6)'; ctx.lineWidth = 2; ctx.setLineDash([4,4]); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(hPt.x, hPt.y, 8, 0, 2*Math.PI);
    ctx.fillStyle = '#4ade80'; ctx.fill(); ctx.strokeStyle = '#15803d'; ctx.stroke();
  }

  drawPt(state.modalSpots[0], '#3b82f6', '#1e40af'); // P1 (Blue)
  drawPt(state.modalSpots[1], '#ef4444', '#b91c1c'); // P2 (Red)

  if (!state.axisFromCal) {
    if (state.modalOrigin && state.modalScale) {
      const s = state.modalScale;
      const ox = state.modalOrigin.x, oy = state.modalOrigin.y;
      const drawEst = (cmX, cmY) => {
        ctx.beginPath(); ctx.arc(ox + cmX*s, oy - cmY*s, 6, 0, 2*Math.PI);
        ctx.strokeStyle = 'rgba(217,119,6,0.5)'; ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
      };
      if (!state.modalRefNeg6) drawEst(-6,0);
      if (!state.modalRefNeg3) drawEst(-3,0);
      if (!state.modalRefR1) drawEst(3,0);
      if (!state.modalRefR2) drawEst(6,0);
      if (!state.modalRef0_3) drawEst(0,3);
      if (!state.modalRef0_6) drawEst(0,6);
    }
    
    drawPt(state.modalRefNeg6, '#0e7490', '#164e63', true, 'modalRefNeg6');
    drawPt(state.modalRefNeg3, '#0891b2', '#164e63', true, 'modalRefNeg3');
    drawPt(state.modalRefR1,   '#b45309', '#78350f', true, 'modalRefR1');
    drawPt(state.modalRefR2,   '#7c3aed', '#4c1d95', true, 'modalRefR2');
    drawPt(state.modalRef0_3,  '#059669', '#064e3b', true, 'modalRef0_3');
    drawPt(state.modalRef0_6,  '#047857', '#064e3b', true, 'modalRef0_6');
    drawPt(state.modalRef0Neg3,'#dc2626', '#7f1d1d', true, 'modalRef0Neg3');
    drawPt(state.modalRef0Neg6,'#9f1239', '#4c0519', true, 'modalRef0Neg6');

    // Draw custom axis lines from refs
    if (state.axisPolyX) {
      ctx.lineWidth=2; ctx.strokeStyle='rgba(29,78,216,0.6)'; ctx.beginPath();
      for (let t=-10; t<=10; t+=0.5) { const p = evalPoly(state.axisPolyX, t); t===-10 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); }
      ctx.stroke();
    }
    if (state.axisPolyY) {
      ctx.lineWidth=2; ctx.strokeStyle='rgba(29,78,216,0.6)'; ctx.beginPath();
      for (let t=-10; t<=10; t+=0.5) { const p = evalPoly(state.axisPolyY, t); t===-10 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); }
      ctx.stroke();
    }
  }

  // ---> NEW CODE: Draw live coordinate labels directly on the image <---
  ctx.font = 'bold 15px sans-serif';
  ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
  ctx.shadowBlur = 4;

  if (state.modalOrigin) {
    ctx.fillStyle = '#ca8a04'; // Dark yellow text
    ctx.fillText('(0, 0)', state.modalOrigin.x + 14, state.modalOrigin.y - 14);
  }
  
  const r_cur = state.results[state.modalIdx];
  if (r_cur) {
    if (state.modalSpots[0] && !isNaN(r_cur.x1)) {
      ctx.fillStyle = '#1d4ed8'; // Blue text
      ctx.fillText(`P1: (${r_cur.x1.toFixed(3)}, ${r_cur.y1.toFixed(3)})`, state.modalSpots[0].cx + 14, state.modalSpots[0].cy - 14);
    }
    if (state.modalSpots[1] && !isNaN(r_cur.x2)) {
      ctx.fillStyle = '#b91c1c'; // Red text
      ctx.fillText(`P2: (${r_cur.x2.toFixed(3)}, ${r_cur.y2.toFixed(3)})`, state.modalSpots[1].cx + 14, state.modalSpots[1].cy - 14);
    }
  }
  ctx.shadowBlur = 0; // reset shadow

  ctx.restore();
}

/* ── Reference-point axis calibration ────────────────────────────────── */
function computeAxisVectors() {
  if(!state.modalOrigin) return;
  
  const ox = state.modalOrigin.x, oy = state.modalOrigin.y;
  const uS = [], vS = [];

  // Helper to check if a point is marked as skipped (FOV out)
  const isSkipped = (key) => state.modalRefSkipped && state.modalRefSkipped[key];

  // X-axis samples
  if(state.modalRefNeg3 && !isSkipped('modalRefNeg3')){const c=state.modalRefNeg3; uS.push({x:(ox-c.cx)/3, y:(oy-c.cy)/3});}
  if(state.modalRefR1   && !isSkipped('modalRefR1'))  {const c=state.modalRefR1;   uS.push({x:(c.cx-ox)/3, y:(c.cy-oy)/3});}
  if(state.modalRefR2   && !isSkipped('modalRefR2'))  {const c=state.modalRefR2;   uS.push({x:(c.cx-ox)/6, y:(c.cy-oy)/6});}
  if(state.modalRefNeg6 && !isSkipped('modalRefNeg6')){const c=state.modalRefNeg6; uS.push({x:(ox-c.cx)/6, y:(oy-c.cy)/6});}

  // Y-axis samples
  if(state.modalRef0_3   && !isSkipped('modalRef0_3'))  {const c=state.modalRef0_3;   vS.push({x:(c.cx-ox)/3, y:(c.cy-oy)/3});}
  if(state.modalRef0Neg3 && !isSkipped('modalRef0Neg3')){const c=state.modalRef0Neg3; vS.push({x:(ox-c.cx)/3, y:(oy-c.cy)/3});}
  if(state.modalRef0_6   && !isSkipped('modalRef0_6'))  {const c=state.modalRef0_6;   vS.push({x:(c.cx-ox)/6, y:(c.cy-oy)/6});}
  if(state.modalRef0Neg6 && !isSkipped('modalRef0Neg6')){const c=state.modalRef0Neg6; vS.push({x:(ox-c.cx)/6, y:(oy-c.cy)/6});}

  if(uS.length){
    state.modalAxisU={x:uS.reduce((s,v)=>s+v.x,0)/uS.length, y:uS.reduce((s,v)=>s+v.y,0)/uS.length};
    state.modalScale=Math.hypot(state.modalAxisU.x, state.modalAxisU.y);
    if(el('m-scale')) el('m-scale').value=Math.round(state.modalScale);
  }
  if(vS.length){
    state.modalAxisV={x:vS.reduce((s,v)=>s+v.x,0)/vS.length, y:vS.reduce((s,v)=>s+v.y,0)/vS.length};
    // Fallback: If no X points are placed yet, calculate scale from Y points
    if (!uS.length) {
      state.modalScale = Math.hypot(state.modalAxisV.x, state.modalAxisV.y);
      if(el('m-scale')) el('m-scale').value = Math.round(state.modalScale);
    }
  }

  // Update axis-info display
  const uEl=el('axis-u-info'), vEl=el('axis-v-info');
  if (state.axisFromCal && state.lensCal) {
    const theta = (state.calAxesTheta || 0) * 180 / Math.PI;
    if(uEl){ uEl.textContent=LANG.current==='zh'?`X軸: 校正基準套用 旋轉 ${theta.toFixed(1)}°`:`X-axis: Cal applied  Rotated ${theta.toFixed(1)}°`; uEl.style.color='var(--green)'; }
    if(vEl){ vEl.textContent=LANG.current==='zh'?`比例尺 ${state.lensCal.scale.toFixed(1)} px/cm 🔒 曲率鎖定`:`Scale ${state.lensCal.scale.toFixed(1)} px/cm  🔒 Curve locked`; vEl.style.color='var(--green)'; }
  } else {
    if(uEl){
      if(uS.length){
        const ang=Math.atan2(state.modalAxisU.y, state.modalAxisU.x)*180/Math.PI;
        uEl.textContent=LANG.current==='zh'?`X軸: ${ang.toFixed(1)}° | ${state.modalScale.toFixed(1)} px/cm (${uS.length}點)`:`X-axis: ${ang.toFixed(1)}° | ${state.modalScale.toFixed(1)} px/cm (${uS.length}pts)`;
        uEl.style.color='var(--blue)';
      } else { uEl.textContent=t('js.axis.x.default'); uEl.style.color=''; }
    }
    if(vEl){
      if(vS.length){
        const v=state.modalAxisV;
        const ang=Math.atan2(v.y,v.x)*180/Math.PI;
        vEl.textContent=LANG.current==='zh'?`Y軸: ${ang.toFixed(1)}° (${vS.length}點)`:`Y-axis: ${ang.toFixed(1)}° (${vS.length}pts)`;
        vEl.style.color='var(--green)';
      } else { vEl.textContent=t('js.axis.y.default'); vEl.style.color=''; }
    }
  }
  
  // // 👉 ADD THIS LINE HERE:
  // fitAxisPolys();
}

function coordFromRefAxis(px, py) {
  if (state.axisPolyX && state.modalOrigin) {
    const r = coordFromCurvedAxes(px, py);
    if (r) return r;
  }
  if(!state.modalOrigin||!state.modalAxisU) return null;
  const cp=fisheyeUndist(px,py);                          
  const co=fisheyeUndist(state.modalOrigin.x,state.modalOrigin.y); 
  const u=state.modalAxisU;
  const v=state.modalAxisV||{x:u.y,y:-u.x};
  const dx=cp.x-co.x, dy=cp.y-co.y;
  const det=u.x*v.y-u.y*v.x;
  if(Math.abs(det)<1e-6) return null;
  return {x:round125((dx*v.y-dy*v.x)/det), y:round125((u.x*dy-u.y*dx)/det)};
}

function refGhostPx(cx, cy) {
  if(!state.modalOrigin) return null;
  if (state.axisPolyX) {
    if (cy === 0) return evalPoly(state.axisPolyX, cx);            
    if (cx === 0 && state.axisPolyY) return evalPoly(state.axisPolyY, cy); 
  }
  const co=fisheyeUndist(state.modalOrigin.x, state.modalOrigin.y);
  let ux, uy;
  if(state.modalAxisU){
    const v=state.modalAxisV||{x:state.modalAxisU.y,y:-state.modalAxisU.x};
    ux=co.x+cx*state.modalAxisU.x+cy*v.x;
    uy=co.y+cx*state.modalAxisU.y+cy*v.y;
  } else if(state.modalScale){
    ux=co.x+cx*state.modalScale;
    uy=co.y-cy*state.modalScale;
  } else return null;
  return fisheyeDistort(ux, uy);
}

function checkDist6cm() {
  const de=el('dist-check');
  if(!de) return;
  const spots=state.modalSpots||[];
  if(!spots[0]||!spots[1]||!state.modalScale) {
    de.textContent=t('js.dist.dash');
    de.className='dist-check'; return;
  }
  const dx=spots[1].cx-spots[0].cx, dy=spots[1].cy-spots[0].cy;
  const distCm=Math.sqrt(dx*dx+dy*dy)/state.modalScale;
  const ok=Math.abs(distCm-6)<0.3;
  de.textContent=`${t('js.dist.val.pre')} ${distCm.toFixed(2)} ${t('js.dist.val.suf')}`;
  de.className='dist-check '+(ok?'dist-ok':'dist-warn');
}

function updateAxesFromRefs() {
  if (state.axisFromCal) return;
  
  computeAxisVectors(); 
  
  const xPts = [], yPts = [];
  if (state.modalOrigin) { 
    xPts.push({t:0, x:state.modalOrigin.x, y:state.modalOrigin.y}); 
    yPts.push({t:0, x:state.modalOrigin.x, y:state.modalOrigin.y}); 
  }
  
  const checkAdd = (key, t, arr) => { 
    if (state[key] && !state.modalRefSkipped[key]) arr.push({t, x:state[key].cx, y:state[key].cy}); 
  };
  checkAdd('modalRefNeg6', -6, xPts); checkAdd('modalRefNeg3', -3, xPts); checkAdd('modalRefR1', 3, xPts); checkAdd('modalRefR2', 6, xPts);
  checkAdd('modalRef0_3', 3, yPts); checkAdd('modalRef0_6', 6, yPts); checkAdd('modalRef0Neg3', -3, yPts); checkAdd('modalRef0Neg6', -6, yPts);

  if (xPts.length >= 2) {
    state.axisPolyX = fitAxisPoly(xPts);
  } else if (state.modalOrigin && state.modalScale) {
    // Fallback horizontal X-axis line so calibration can be saved
    const ox = state.modalOrigin.x, oy = state.modalOrigin.y, s = state.modalScale;
    state.axisPolyX = { ax: 0, bx: s, cx: ox, ay: 0, by: 0, cy: oy };
  }

  if (yPts.length >= 2) {
    state.axisPolyY = fitAxisPoly(yPts);
  } else if (state.modalOrigin && state.modalScale) {
    // Fallback vertical Y-axis line
    const ox = state.modalOrigin.x, oy = state.modalOrigin.y, s = state.modalScale;
    state.axisPolyY = { ax: 0, bx: 0, cx: ox, ay: 0, by: -s, cy: oy };
  }

  refreshModalCoords();
  drawModalCanvas();
}

function refreshModalCoords() {
  if (!state.modalOrigin || !state.modalScale || state.modalSpots.length < 2) return;
  const W = state.modalImg ? state.modalImg.naturalWidth : 1000;
  const H = state.modalImg ? state.modalImg.naturalHeight : 1000;
  const k1 = parseFloat(el('m-k1').value) || 0;

  const tryH = (sx, sy) => {
    const Hinv = state.results[state.modalIdx] && state.results[state.modalIdx].homographyInv;
    return Hinv ? coordFromHomography(sx, sy, Hinv) : null;
  };

  const getCoord = (pt) => {
    return tryH(pt.cx, pt.cy) ||
           coordFromPolys(pt.cx, pt.cy, state.axisPolyX, state.axisPolyY) ||
           computeCoords(pt.cx, pt.cy, state.modalOrigin, state.modalVLines, state.modalHLines, state.modalScale, W, H, k1);
  };

  const p1 = getCoord(state.modalSpots[0]);
  const p2 = getCoord(state.modalSpots[1]);
  
  _writeVal('m-x1', p1.x); _writeVal('m-y1', p1.y);
  _writeVal('m-x2', p2.x); _writeVal('m-y2', p2.y);

  if (!isNaN(p1.x) && !isNaN(p2.x)) {
    const dx = p1.x - p2.x, dy = p1.y - p2.y;
    const dist = Math.hypot(dx, dy);
    const dEl = el('dist-check');
    dEl.textContent = `${t('js.dist.val.pre')} ${dist.toFixed(3)} ${t('js.dist.val.suf')}`;
    dEl.className = 'dist-check ' + (Math.abs(dist - 6.0) <= 0.125 ? 'dist-ok' : 'dist-warn');
  }
}

const mcv = el('modal-canvas');

mcv.addEventListener('mousedown', e => {
  const rect = mcv.getBoundingClientRect();
  const px = (e.clientX - rect.left) / state.modalDispScale;
  const py = (e.clientY - rect.top) / state.modalDispScale;
  const HIT = 20 / state.modalDispScale; // Dynamically scales hit radius with zoom

  let hitKey = null;

  // 1. Check if clicking rotation handle (Calibration mode)
  if (state.axisFromCal && state.axisPolyX && state.modalOrigin) {
    const hPt = evalPoly(state.axisPolyX, 8);
    if (Math.hypot(px - hPt.x, py - hPt.y) < HIT*1.5) {
      hitKey = 'calRot';
      state.dragTarget = { key: 'calRot', startPx: px, startPy: py, startTheta: state.calAxesTheta };
      return;
    }
  }

  // 2. Check if clicking Origin
  if (!hitKey && state.modalOrigin && Math.hypot(px - state.modalOrigin.x, py - state.modalOrigin.y) < HIT) {
    hitKey = 'origin';
    state.dragTarget = { key: 'origin' }; 
    return;
  }
  
  // 3. Check if clicking Laser spots
  if (!hitKey) {
    for (let i=0; i<state.modalSpots.length; i++) {
      if (state.modalSpots[i] && Math.hypot(px - state.modalSpots[i].cx, py - state.modalSpots[i].cy) < HIT) {
        hitKey = 'p'+(i+1);
        state.dragTarget = { key: hitKey }; 
        return;
      }
    }
  }

  // 4. Check if clicking Reference points
  if (!hitKey && !state.axisFromCal) {
    const refs = ['refNeg6','refNeg3','refR1','refR2','ref0_3','ref0_6','ref0Neg3','ref0Neg6'];
    for (const r of refs) {
      const StateKey = 'modal' + r.charAt(0).toUpperCase() + r.slice(1);
      const pt = state[StateKey];
      if (pt && !state.modalRefSkipped[StateKey] && Math.hypot(px - pt.cx, py - pt.cy) < HIT) {
        hitKey = r;
        state.dragTarget = { key: hitKey }; 
        return;
      }
    }
  }

  // 5. If NO existing point was clicked, PLACE a new point based on current mode
  if (!hitKey) {
    if (state.modalMode === 'origin') { 
      state.modalOrigin = {x:px, y:py}; 
      if (state.axisFromCal) applyCalRotationToOrigin(); else updateAxesFromRefs(); 
    }
    else if (state.modalMode === 'p1') { state.modalSpots[0] = {cx:px, cy:py}; refreshModalCoords(); drawModalCanvas(); }
    else if (state.modalMode === 'p2') { state.modalSpots[1] = {cx:px, cy:py}; refreshModalCoords(); drawModalCanvas(); }
    else if (state.modalMode.startsWith('r') && !state.axisFromCal) {
      const mk = state.modalMode;
      const keyMap = { 'rn6':'refNeg6', 'rn3':'refNeg3', 'r1':'refR1', 'r2':'refR2', 'r03':'ref0_3', 'r06':'ref0_6', 'r0n3':'ref0Neg3', 'r0n6':'ref0Neg6' };
      const k = keyMap[mk];
      if (k) {
        const StateKey = 'modal' + k.charAt(0).toUpperCase() + k.slice(1);
        state[StateKey] = { cx:px, cy:py };
        state.modalRefSkipped[StateKey] = false;
        updateSkippedBtnUI(); updateAxesFromRefs();
      }
    }
  }
});

mcv.addEventListener('mousemove', e => {
  const rect = mcv.getBoundingClientRect();
  const px = (e.clientX - rect.left) / state.modalDispScale;
  const py = (e.clientY - rect.top) / state.modalDispScale;
  const W = state.modalImg ? state.modalImg.naturalWidth : 1000;
  const H = state.modalImg ? state.modalImg.naturalHeight : 1000;
  
  if (state.dragTarget) {
    const k = state.dragTarget.key;
    if (k === 'calRot') {
      const dx = px - state.modalOrigin.x, dy = py - state.modalOrigin.y;
      const angle = Math.atan2(dy, dx);
      const baseAng = Math.atan2(state.lensCal.axisPolyX.by, state.lensCal.axisPolyX.bx);
      state.calAxesTheta = angle - baseAng;
      applyCalRotationToOrigin();
    }
    else if (k === 'origin') { state.modalOrigin = {x:px, y:py}; if (state.axisFromCal) applyCalRotationToOrigin(); else updateAxesFromRefs(); }
    else if (k === 'p1') { state.modalSpots[0] = {cx:px, cy:py}; refreshModalCoords(); drawModalCanvas(); }
    else if (k === 'p2') { state.modalSpots[1] = {cx:px, cy:py}; refreshModalCoords(); drawModalCanvas(); }
    else {
      const StateKey = 'modal' + k.charAt(0).toUpperCase() + k.slice(1);
      if (state[StateKey]) { state[StateKey] = {cx:px, cy:py}; updateAxesFromRefs(); }
    }
  }

  const k1 = parseFloat(el('m-k1').value) || 0;
  const tryH = (sx, sy) => {
    const Hinv = state.results[state.modalIdx] && state.results[state.modalIdx].homographyInv;
    return Hinv ? coordFromHomography(sx, sy, Hinv) : null;
  };
  const coord = tryH(px, py) ||
                coordFromPolys(px, py, state.axisPolyX, state.axisPolyY) ||
                computeCoords(px, py, state.modalOrigin, state.modalVLines, state.modalHLines, state.modalScale, W, H, k1);
  if (coord && !isNaN(coord.x)) {
    el('cursor-coord').textContent = `${t('js.cursor.pre')}${coord.x.toFixed(3)}${t('js.cursor.mid')}${coord.y.toFixed(3)}${t('js.cursor.suf')}`;
  } else {
    el('cursor-coord').textContent = `${t('js.cursor.px.pre')}${Math.round(px)}, ${Math.round(py)})`;
  }
});

mcv.addEventListener('mouseup', () => state.dragTarget = null);
mcv.addEventListener('mouseleave', () => state.dragTarget = null);

// Enable Mouse Scroll Wheel Zooming
el('modal-canvas-wrap').addEventListener('wheel', e => {
  e.preventDefault();
  if (e.deltaY < 0) {
    state.modalZoom *= 1.1; 
  } else {
    state.modalZoom *= 0.9;
  }
  state.modalZoom = Math.max(0.1, Math.min(state.modalZoom, 10)); // Clamp zoom between 10% and 1000%
  el('zoom-level').textContent = Math.round(state.modalZoom * 100) + '%';
  drawModalCanvas();
}, { passive: false });

function applyCalRotationToOrigin() {
  if (!state.lensCal || !state.modalOrigin) return;
  state.axisPolyX = rotateAndTranslatePoly(state.lensCal.axisPolyX, state.modalOrigin, state.calAxesTheta);
  if (state.lensCal.axisPolyY) state.axisPolyY = rotateAndTranslatePoly(state.lensCal.axisPolyY, state.modalOrigin, state.calAxesTheta);
  refreshModalCoords();
  drawModalCanvas();
}

/* Fisheye UI */
function resetFisheye() { state.fisheyeKx = 0; state.fisheyeKy = 0; drawFisheyeCurve('x'); drawFisheyeCurve('y'); applyFisheyeToPolys(); }
function drawFisheyeCurve(axis) {
  const cv = el(`fisheye-${axis}-cv`);
  const badge = el(`${axis}x-badge`);
  if (!cv || !badge) return;
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const k = axis === 'x' ? state.fisheyeKx : state.fisheyeKy;
  
  badge.textContent = k.toFixed(4);
  badge.classList.toggle('nonzero', Math.abs(k) > 1e-4);

  ctx.clearRect(0,0,W,H);
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, H/2); ctx.lineTo(W, H/2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke();

  ctx.strokeStyle = 'rgba(217,119,6,0.9)'; ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x <= W; x++) {
    const nx = (x - W/2) / (W/2);
    const dy = k * nx * nx * (H/2);
    const y = H/2 - dy;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  
  ctx.fillStyle = '#64748b'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
  ctx.fillText(axis === 'x' ? t('js.sag.x') : t('js.sag.y'), 4, 12);
}

['x','y'].forEach(axis => {
  const cv = el(`fisheye-${axis}-cv`);
  if (!cv) return;
  let dragging = false, startY = 0, startK = 0;
  cv.addEventListener('mousedown', e => { dragging = true; startY = e.clientY; startK = axis === 'x' ? state.fisheyeKx : state.fisheyeKy; });
  cv.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dy = e.clientY - startY;
    const newK = startK - dy * 0.0005;
    if (axis === 'x') state.fisheyeKx = newK; else state.fisheyeKy = newK;
    drawFisheyeCurve(axis); applyFisheyeToPolys();
  });
  cv.addEventListener('mouseup', () => dragging = false);
  cv.addEventListener('mouseleave', () => dragging = false);
});

function applyFisheyeToPolys() {
  if (state.axisFromCal) {
    if (!state.lensCal) return;
    const px = { ...state.lensCal.axisPolyX };
    px.ay += state.fisheyeKx; 
    state.axisPolyX = rotateAndTranslatePoly(px, state.modalOrigin, state.calAxesTheta);
    
    if (state.lensCal.axisPolyY) {
      const py = { ...state.lensCal.axisPolyY };
      py.ax += state.fisheyeKy; 
      state.axisPolyY = rotateAndTranslatePoly(py, state.modalOrigin, state.calAxesTheta);
    }
  } else {
    if (state.axisPolyX) state.axisPolyX.ay = state.fisheyeKx;
    if (state.axisPolyY) state.axisPolyY.ax = state.fisheyeKy;
  }
  refreshModalCoords();
  drawModalCanvas();
}

/* ═══════════════════════════════
   PAGE 3: OUTPUT & CHART
═══════════════════════════════ */
function renderPage3() {
  const grid = el('p3-grid');
  grid.innerHTML = '';
  
  const drawCard = (idx, file, result) => {
    const card = document.createElement('div');
    card.className = 'p3-card';
    const s = result.manualSaved ? `<span class="p3-card-saved">Manual</span>` : '';
    
    let canvasHtml = `<div style="height:140px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:.8rem">無圖檔</div>`;
    if (file.dataUrl) {
      canvasHtml = `<canvas id="p3-cv-${idx}" width="600" height="400"></canvas>`;
    }
    
    let html = `
      <div class="p3-card-header"><span class="p3-card-num">#${idx+1}</span>${s}</div>
      <div class="p3-card-name" title="${file.name}">${file.name}</div>
      ${canvasHtml}
      <div class="p3-card-coords">`;
      
    if (result.unclear || isNaN(result.x1)) {
      html += `<div class="p3-unclear">${t('js.p3.unclear')}</div>`;
    } else {
      html += `<div class="p3-p1">P1: (${result.x1.toFixed(3)}, ${result.y1.toFixed(3)})</div>
               <div class="p3-p2">P2: (${result.x2.toFixed(3)}, ${result.y2.toFixed(3)})</div>`;
    }
    html += `</div>`;
    card.innerHTML = html;
    grid.appendChild(card);

    if (file.dataUrl) {
      const img = new Image();
      img.onload = () => {
        const cv = el(`p3-cv-${idx}`);
        if (!cv) return;
        const ctx = cv.getContext('2d');
        const sc = 600 / img.naturalWidth;
        cv.height = img.naturalHeight * sc;
        
        ctx.save();
        ctx.scale(sc, sc);
        if (file.rotation === 180) { ctx.translate(img.naturalWidth, img.naturalHeight); ctx.rotate(Math.PI); }
        ctx.drawImage(img, 0, 0);
        if (file.rotation === 180) ctx.setTransform(sc,0,0,sc,0,0);
        
        if (result.originPx) {
          ctx.beginPath(); ctx.arc(result.originPx.x, result.originPx.y, 12, 0, 2*Math.PI);
          ctx.fillStyle = '#22c55e'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#15803d'; ctx.stroke();
        }
        if (result.spots && result.spots[0]) {
          ctx.beginPath(); ctx.arc(result.spots[0].cx, result.spots[0].cy, 10, 0, 2*Math.PI);
          ctx.fillStyle = '#3b82f6'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#1e40af'; ctx.stroke();
        }
        if (result.spots && result.spots[1]) {
          ctx.beginPath(); ctx.arc(result.spots[1].cx, result.spots[1].cy, 10, 0, 2*Math.PI);
          ctx.fillStyle = '#ef4444'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#b91c1c'; ctx.stroke();
        }
        ctx.restore();
      };
      img.src = file.dataUrl;
    }
  };

  state.files.forEach((f, i) => {
    if (!f._calRef) drawCard(i, f, state.results[i] || {});
  });
}

function drawChart() {
  const cv = el('chart-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  ctx.clearRect(0,0,W,H);
  
  // White background
  ctx.fillStyle = '#ffffff'; 
  ctx.fillRect(0,0,W,H);

  const testId = el('test-id').value.trim() || t('js.chart.pending');
  const mode = el('plot-mode').value;
  const refX = parseFloat(el('ref-x').value) || 0;
  const refY = parseFloat(el('ref-y').value) || 0;
  const accThresh = parseFloat(el('acc-thresh').value) || 5;
  const custRpStr = el('custom-rp').value.trim();
  
  const pts = [];
  state.files.forEach((f, i) => {
    if (f._calRef) return;
    const r = state.results[i];
    if (!r || r.unclear || isNaN(r.x1) || isNaN(r.x2)) return;
    if (mode === 'x2y2') pts.push({ x: r.x2, y: r.y2, id: i+1 });
    else if (mode === 'x1y1') pts.push({ x: r.x1, y: r.y1, id: i+1 });
    else pts.push({ x: (r.x1+r.x2)/2, y: (r.y1+r.y2)/2, id: i+1 });
  });

  if (pts.length === 0) {
    ctx.fillStyle = '#94a3b8'; ctx.font = '20px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(t('js.chart.nodata'), W/2, H/2);
    ['sv-n','sv-ap','sv-rp','sv-pass','sv-ao','sv-ro'].forEach(id => el(id).textContent = '—');
    return;
  }

  let sumX = 0, sumY = 0;
  pts.forEach(p => { sumX += p.x; sumY += p.y; });
  const meanX = sumX / pts.length, meanY = sumY / pts.length;
  
  let maxD2 = 0;
  const dists = pts.map(p => {
    const d = Math.hypot(p.x - meanX, p.y - meanY);
    if (d > maxD2) maxD2 = d;
    return d;
  });
  
  const sumSq = dists.reduce((s,d) => s + d*d, 0);
  const stdDev = Math.sqrt(sumSq / pts.length);
  const rpThresh = custRpStr ? parseFloat(custRpStr) : (stdDev * 3);
  
  const ap = Math.hypot(meanX - refX, meanY - refY);
  const pass = ap <= accThresh;
  const ao = Math.atan2(meanY - refY, meanX - refX) * 180 / Math.PI;
  const ro = pts.map(p => Math.atan2(p.y - meanY, p.x - meanX) * 180 / Math.PI);
  const maxRo = Math.max(...ro) - Math.min(...ro);

  // Update HTML text
  el('sv-n').textContent = pts.length;
  el('sv-ap').textContent = ap.toFixed(3);
  el('sv-rp').textContent = rpThresh.toFixed(3);
  el('sv-pass').textContent = pass ? 'PASS' : 'FAIL';
  el('stat-pass').className = 'stat-box ' + (pass ? 'pass' : 'fail');
  el('sv-ao').textContent = ao.toFixed(1);
  el('sv-ro').textContent = (maxRo/2).toFixed(1);

  el('stat-detail').innerHTML = `
    中心點：(${meanX.toFixed(3)}, ${meanY.toFixed(3)})<br>
    分佈標準差 σ：${stdDev.toFixed(4)} cm<br>
    Rp 計算方式：${custRpStr ? '自訂數值' : 'Mean + 3σ'}
  `;

  // --- NEW MATPLOTLIB-STYLE DRAWING ---
  const padTop = 80, padBot = 60, padLeft = 80, padRight = 60;
  const plotW = W - padLeft - padRight;
  const plotH = H - padTop - padBot;
  
  // Coordinate system mapping (e.g., -11 to +11)
  const range = 11;
  const sX = plotW / (range * 2);
  const sY = plotH / (range * 2);
  
  const toX = val => padLeft + (val + range) * sX;
  const toY = val => padTop + plotH - (val + range) * sY; // inverted Y

  // Draw Grid
  ctx.lineWidth = 1;
  for (let i = -range; i <= range; i += 0.5) {
    if (i === 0) continue; // skip axes for now
    const isMajor = Number.isInteger(i);
    ctx.strokeStyle = isMajor ? '#cbd5e1' : '#f1f5f9';
    ctx.beginPath();
    ctx.moveTo(toX(-range), toY(i)); ctx.lineTo(toX(range), toY(i));
    ctx.moveTo(toX(i), toY(-range)); ctx.lineTo(toX(i), toY(range));
    ctx.stroke();
  }

  // Draw Axes
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 1.5;
  ctx.beginPath(); 
  ctx.moveTo(toX(-range), toY(0)); ctx.lineTo(toX(range), toY(0)); // X axis
  ctx.moveTo(toX(0), toY(-range)); ctx.lineTo(toX(0), toY(range)); // Y axis
  ctx.stroke();

  // Axis Ticks & Labels
  ctx.fillStyle = '#475569'; ctx.font = '12px sans-serif'; 
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let i = -10; i <= 10; i++) {
    if (i !== 0) {
      ctx.fillText(i.toString(), toX(i), toY(-10.5)); // X ticks
      ctx.fillText(i.toString(), toX(-10.5), toY(i)); // Y ticks
    }
  }
  ctx.textAlign = 'left'; ctx.fillText('X (cm)', toX(range) + 5, toY(0));
  ctx.textAlign = 'center'; ctx.fillText('Y (cm)', toX(0), toY(range) - 10);

  // Draw Titles
  ctx.textAlign = 'center';
  ctx.fillStyle = '#94a3b8'; ctx.font = 'italic 14px sans-serif';
  ctx.fillText(testId, W/2, 25);
  ctx.fillStyle = '#0f172a'; ctx.font = 'bold 18px sans-serif';
  ctx.fillText('Accuracy and Repeatability of (X, Y) points', W/2, 50);

  // Border around plot
  ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
  ctx.strokeRect(padLeft, padTop, plotW, plotH);

  // Threshold Circles
  ctx.lineWidth = 1.5;
  // Red dashed (1.5x threshold)
  ctx.setLineDash([8, 6]); ctx.strokeStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(toX(refX), toY(refY), accThresh * 1.5 * sX, 0, 2*Math.PI); ctx.stroke();
  
  // Green dashed (Accuracy threshold)
  ctx.strokeStyle = '#22c55e';
  ctx.beginPath(); ctx.arc(toX(refX), toY(refY), accThresh * sX, 0, 2*Math.PI); ctx.stroke();
  
  // Rp Circle (Orange dashed + fill)
  ctx.strokeStyle = '#f59e0b'; ctx.fillStyle = 'rgba(252, 211, 77, 0.3)';
  ctx.beginPath(); ctx.arc(toX(meanX), toY(meanY), rpThresh * sX, 0, 2*Math.PI); 
  ctx.fill(); ctx.stroke();
  ctx.setLineDash([]);

  // Ap Line (Purple dashed)
  ctx.setLineDash([5, 5]); ctx.strokeStyle = '#9333ea'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(toX(refX), toY(refY)); ctx.lineTo(toX(meanX), toY(meanY)); ctx.stroke();
  ctx.setLineDash([]);

  // Points
  pts.forEach(p => {
    ctx.beginPath(); ctx.arc(toX(p.x), toY(p.y), 5, 0, 2*Math.PI);
    ctx.fillStyle = '#0000ff'; ctx.fill();
  });

  // Mean Point (Orange dot)
  ctx.beginPath(); ctx.arc(toX(meanX), toY(meanY), 7, 0, 2*Math.PI);
  ctx.fillStyle = '#f59e0b'; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = '#000000'; ctx.stroke();

  // Reference Point (Black X)
  const rx = toX(refX), ry = toY(refY);
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 2.5;
  ctx.beginPath(); 
  ctx.moveTo(rx - 8, ry - 8); ctx.lineTo(rx + 8, ry + 8);
  ctx.moveTo(rx - 8, ry + 8); ctx.lineTo(rx + 8, ry - 8);
  ctx.stroke();

  // Stat Box (Top Left inside plot)
  const passCount = pts.filter(p => Math.hypot(p.x - refX, p.y - refY) <= accThresh).length;
  const rpPassCount = pts.filter(p => Math.hypot(p.x - meanX, p.y - meanY) <= rpThresh).length;

  ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1;
  ctx.fillRect(padLeft + 10, padTop + 10, 240, 60);
  ctx.strokeRect(padLeft + 10, padTop + 10, 240, 60);
  ctx.fillStyle = '#1e293b'; ctx.font = '13px sans-serif'; ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Accuracy (≤${accThresh}cm): (${passCount} / ${pts.length})`, padLeft + 20, padTop + 25);
  ctx.fillText(`Repeatability: (${rpPassCount} / ${pts.length}) - ${rpPassCount === pts.length ? 'Excellent' : 'Good'}`, padLeft + 20, padTop + 50);

  // Legend Box (Bottom Left inside plot)
  ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#cbd5e1';
  ctx.fillRect(padLeft + 10, toY(-10) - 150, 210, 160);
  ctx.strokeRect(padLeft + 10, toY(-10) - 150, 210, 160);
  
  const legX = padLeft + 25;
  let legY = toY(-10) - 130;
  
  // Legend: Measured Points
  ctx.beginPath(); ctx.arc(legX, legY, 5, 0, 2*Math.PI); ctx.fillStyle = '#0000ff'; ctx.fill();
  ctx.fillStyle = '#1e293b'; ctx.fillText('Measured Points', legX + 15, legY); legY += 22;
  
  // Legend: Ref Point
  ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.beginPath(); 
  ctx.moveTo(legX-5, legY-5); ctx.lineTo(legX+5, legY+5); ctx.moveTo(legX-5, legY+5); ctx.lineTo(legX+5, legY-5); ctx.stroke();
  ctx.fillText(`Reference Point (${refX},${refY})`, legX + 15, legY); legY += 22;
  
  // Legend: Avg Center
  ctx.beginPath(); ctx.arc(legX, legY, 5, 0, 2*Math.PI); ctx.fillStyle = '#f59e0b'; ctx.fill(); ctx.stroke();
  ctx.fillText(`Avg Center (${meanX.toFixed(2)}, ${meanY.toFixed(2)})`, legX + 15, legY); legY += 22;
  
  // Legend: Rp
  ctx.strokeStyle = '#f59e0b'; ctx.setLineDash([4,4]); ctx.strokeRect(legX-6, legY-4, 12, 8); ctx.setLineDash([]);
  ctx.fillText(`Rp = ${rpThresh.toFixed(2)} cm`, legX + 15, legY); legY += 22;

  // Legend: Ap
  ctx.strokeStyle = '#9333ea'; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(legX-6, legY); ctx.lineTo(legX+6, legY); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillText(`Ap = ${ap.toFixed(2)} cm`, legX + 15, legY); legY += 22;
  
  // Legend: Ao
  ctx.fillStyle = '#000080'; ctx.fillText('↑', legX-5, legY+1);
  ctx.fillStyle = '#1e293b'; ctx.fillText(`Ao = ${ao.toFixed(2)}°`, legX + 15, legY); legY += 22;

  // Legend: Ro
  ctx.strokeStyle = '#00ffff'; ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(legX-6, legY); ctx.lineTo(legX+6, legY); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillText(`Ro = ±${(maxRo/2).toFixed(2)}°`, legX + 15, legY);
}

function downloadChart() {
  const cv = el('chart-canvas');
  if (!cv) return;
  const url = cv.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `chart_${el('test-id').value || 'export'}.png`;
  a.click();
}

function exportExcel() {
  const rows = [['Filename', 'x1', 'y1', 'x2', 'y2', 'Status']];
  state.files.forEach((f, i) => {
    if (f._calRef) return;
    const r = state.results[i];
    if (r && !r.unclear && !isNaN(r.x1)) {
      rows.push([f.name, r.x1, r.y1, r.x2, r.y2, r.manualSaved ? 'Manual' : 'Auto']);
    } else {
      rows.push([f.name, '', '', '', '', 'Unclear']);
    }
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Coordinates');
  XLSX.writeFile(wb, `coordinates_${el('test-id').value || 'export'}.xlsx`);
}

/* ═══════════════════════════════
   SOP & FEEDBACK MODALS
═══════════════════════════════ */
function openSop() { el('sop-bg').classList.add('open'); }
function closeSop(e) { if (!e || e.target === el('sop-bg') || e.target.classList.contains('sop-close')) el('sop-bg').classList.remove('open'); }

function openFeedback() { el('fb-bg').classList.add('open'); _fbSyncSubject(); }
function closeFeedback(e) { if (!e || e.target === el('fb-bg') || e.target.classList.contains('fb-close') || e.target.textContent.includes('Cancel')) el('fb-bg').classList.remove('open'); }

function _fbSyncSubject() {
  const subjEl = el('fb-subject');
  if (subjEl && subjEl.dataset.userEdited !== '1') {
    const cat = el('fb-category').value;
    subjEl.value = `[${cat}] Laser Coord Tool v2 Feedback`;
  }
}

function submitFeedback() {
  const name = _readVal('fb-name'), email = _readVal('fb-email'), cat = _readVal('fb-category'), sev = _readVal('fb-severity'), subj = _readVal('fb-subject'), desc = _readVal('fb-desc'), repro = _readVal('fb-repro');
  if (!name.trim() || !desc.trim()) { alert('請填寫姓名與詳細說明 / Please provide Name and Description.'); return; }

  const N = state.files.filter(f => !f._calRef).length;
  const okN = state.results.filter(r => r && !r.unclear).length;
  
  const body = `Name: ${name}\nEmail: ${email}\nCategory: ${cat}\nSeverity: ${sev}\n\n[Description]\n${desc}\n\n[Steps to Reproduce]\n${repro||'N/A'}\n\n--- System Info ---\nUser Agent: ${navigator.userAgent}\nCurrent Step: ${state.currentStep}\nFiles Loaded: ${N} (Detected: ${okN})\nLens Calibration: ${state.lensCal?'Yes':'No'}`;
  
  const mailto = `mailto:eric.weng@aeolusbot.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  closeFeedback();
}

document.addEventListener('keydown', e => { 
  if (e.key === 'Escape') { 
    ['sop-bg','fb-bg'].forEach(id => {
      const m=el(id); 
      if(m && m.classList.contains('open')) m.classList.remove('open');
    }); 
  } 
});

// Initial UI updates
updateUploadUI();
setLang('zh');