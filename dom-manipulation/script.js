// script.js
/******************************
 * Dynamic Quote Generator
 * Full sync + conflict handling + import/export + filtering
 ******************************/

// ===== Config =====
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // mock API (GET/POST)
const SYNC_INTERVAL_MS = 30000; // 30s poll

// ===== Default local quotes (used if nothing in localStorage) =====
const DEFAULT_QUOTES = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { text: "The purpose of our lives is to be happy.", category: "Life" },
  { text: "Don’t let yesterday take up too much of today.", category: "Motivation" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", category: "Life" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Motivation" },
  { text: "Do what you can with all you have, wherever you are.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Act as if what you do makes a difference. It does.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
  { text: "Never bend your head. Always hold it high. Look the world straight in the eye.", category: "Motivation" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", category: "Motivation" },
  { text: "Believe you can and you’re halfway there.", category: "Motivation" },
  { text: "When you have a dream, you’ve got to grab it and never let go.", category: "Motivation" },
  { text: "I can’t change the direction of the wind, but I can adjust my sails to always reach my destination.", category: "Inspiration" },
  { text: "No matter what you’re going through, there’s a light at the end of the tunnel.", category: "Inspiration" },
  { text: "Limit your ‘always’ and your ‘nevers’.", category: "Motivation" },
  { text: "Nothing is impossible. The word itself says ‘I’m possible!’", category: "Inspiration" },
  { text: "You are never too old to set another goal or to dream a new dream.", category: "Inspiration" },
  { text: "Try to be a rainbow in someone’s cloud.", category: "Life" },
  { text: "Be yourself; everyone else is already taken.", category: "Life" },
  { text: "Happiness is not something ready made. It comes from your own actions.", category: "Life" },
  { text: "Life is short, and it’s up to you to make it sweet.", category: "Life" },
  { text: "Everything you’ve ever wanted is on the other side of fear.", category: "Motivation" },
  { text: "Opportunities don’t happen, you create them.", category: "Motivation" },
  { text: "It always seems impossible until it’s done.", category: "Motivation" },
  { text: "Start where you are. Use what you have. Do what you can.", category: "Motivation" },
  { text: "Dream big and dare to fail.", category: "Inspiration" },
  { text: "Be so good they can’t ignore you.", category: "Motivation" },
  { text: "Turn your wounds into wisdom.", category: "Life" },
  { text: "We must let go of the life we have planned, so as to accept the one that is waiting for us.", category: "Life" },
  { text: "Do one thing every day that scares you.", category: "Motivation" },
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "The mind is everything. What you think you become.", category: "Life" },
  { text: "An unexamined life is not worth living.", category: "Life" },
  { text: "Change your thoughts and you change your world.", category: "Inspiration" },
  { text: "Everything has beauty, but not everyone sees it.", category: "Life" },
  { text: "Life isn’t about getting and having, it’s about giving and being.", category: "Life" },
  { text: "Don’t watch the clock; do what it does. Keep going.", category: "Motivation" },
  { text: "You miss 100% of the shots you don’t take.", category: "Motivation" },
  { text: "Whether you think you can or you think you can’t, you’re right.", category: "Motivation" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Inspiration" },
  { text: "You only live once, but if you do it right, once is enough.", category: "Life" },
  { text: "Live in the sunshine, swim in the sea, drink the wild air.", category: "Life" },
  { text: "The best revenge is massive success.", category: "Motivation" },
  { text: "Don’t settle for what life gives you; make life better and build something.", category: "Motivation" },
  { text: "Life is trying things to see if they work.", category: "Life" },
  { text: "May you live all the days of your life.", category: "Life" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", category: "Inspiration" },
  { text: "Be the change that you wish to see in the world.", category: "Inspiration" },
  { text: "Love the life you live. Live the life you love.", category: "Life" },
  { text: "Courage is grace under pressure.", category: "Motivation" },
  { text: "Go confidently in the direction of your dreams! Live the life you’ve imagined.", category: "Motivation" },
  { text: "Do not be afraid to give up the good to go for the great.", category: "Motivation" },
  { text: "The secret of success is to do the common thing uncommonly well.", category: "Motivation" },
  { text: "I never dreamed about success, I worked for it.", category: "Motivation" },
  { text: "Don’t count the days, make the days count.", category: "Motivation" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", category: "Motivation" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", category: "Life" },
  { text: "A journey of a thousand miles begins with a single step.", category: "Motivation" },
  { text: "Do what you feel in your heart to be right – for you’ll be criticized anyway.", category: "Life" },
  { text: "Do not pray for an easy life, pray for the strength to endure a difficult one.", category: "Motivation" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", category: "Inspiration" },
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "We become what we think about.", category: "Motivation" },
  { text: "Focus on being productive instead of busy.", category: "Motivation" },
  { text: "Great things never come from comfort zones.", category: "Motivation" }
];

// ===== DOM elements (expect these IDs in your HTML) =====
const categorySelect = document.getElementById('categorySelect');
const categoryFilter = document.getElementById('categoryFilter');
const showQuoteBtn = document.getElementById('showQuoteBtn');
const quoteDisplay = document.getElementById('quoteDisplay');
const addQuoteForm = document.getElementById('addQuoteForm');
const quoteTextInput = document.getElementById('quoteText');
const quoteCategoryInput = document.getElementById('quoteCategory');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');

// UI placeholders auto-created if not in HTML
let syncStatus = document.getElementById('syncStatus');
let conflictsPanel = document.getElementById('conflictsPanel');

// ===== Utilities =====
const genId = () => `q_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
const nowISO = () => new Date().toISOString();
const keyOf = s => String(s || '').trim().toLowerCase().replace(/\s+/g,' ');

// Normalize / annotate stored quotes
function normalizeQuotes(arr) {
  return arr.map(q => ({
    id: q.id || genId(),
    text: String(q.text || '').trim(),
    category: q.category ? String(q.category).trim() : 'General',
    updatedAt: q.updatedAt || nowISO(),
    source: q.source || 'local',
    serverId: q.serverId || null
  })).filter(q => q.text.length > 0);
}

// ===== Storage helpers =====
function loadLocalQuotes() {
  try {
    const raw = localStorage.getItem('quotes');
    if (!raw) return normalizeQuotes(DEFAULT_QUOTES);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return normalizeQuotes(DEFAULT_QUOTES);
    return normalizeQuotes(parsed);
  } catch {
    return normalizeQuotes(DEFAULT_QUOTES);
  }
}
let quotes = loadLocalQuotes();

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// ===== Ensure small UI area for sync/conflicts =====
function ensureSyncUI() {
  // syncStatus
  if (!syncStatus) {
    syncStatus = document.createElement('div');
    syncStatus.id = 'syncStatus';
    syncStatus.style.cssText = 'margin:12px 0;padding:10px;border-radius:6px;background:#f6f8ff;border:1px solid #dbe2ff;font-size:14px;';
    // append to manage-quotes-section or main container
    const manage = document.querySelector('.manage-quotes-section') || document.querySelector('main .container') || document.body;
    manage.appendChild(syncStatus);
  }
  // conflictsPanel
  if (!conflictsPanel) {
    conflictsPanel = document.createElement('div');
    conflictsPanel.id = 'conflictsPanel';
    conflictsPanel.style.cssText = 'margin-top:10px;padding:0;';
    syncStatus.after(conflictsPanel);
  }
}
ensureSyncUI();

function showStatus(msg, type='info') {
  ensureSyncUI();
  const colors = {
    info: { bg:'#f6f8ff', border:'#dbe2ff' },
    success: { bg:'#f2fff6', border:'#c7f3d3' },
    warn: { bg:'#fffaf2', border:'#ffe1b3' },
    error: { bg:'#fff5f5', border:'#ffd4d4' }
  };
  const c = colors[type] || colors.info;
  syncStatus.style.background = c.bg;
  syncStatus.style.borderColor = c.border;
  syncStatus.textContent = msg;
}

// ===== Categories population =====
function populateCategories() {
  const cats = [...new Set(quotes.map(q => q.category))].sort();
  if (categorySelect) {
    categorySelect.innerHTML = '';
    cats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat; opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }
  if (categoryFilter) {
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    cats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat; opt.textContent = cat;
      categoryFilter.appendChild(opt);
    });
    const saved = localStorage.getItem('lastCategoryFilter');
    if (saved && [...categoryFilter.options].some(o => o.value === saved)) {
      categoryFilter.value = saved;
    }
  }
}

// ===== Display functions =====
function showRandomQuote() {
  if (!categorySelect) return;
  const sel = categorySelect.value;
  const pool = quotes.filter(q => q.category === sel);
  if (pool.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }
  const chosen = pool[Math.floor(Math.random()*pool.length)];
  quoteDisplay.textContent = `"${chosen.text}"`;
  sessionStorage.setItem('lastQuote', JSON.stringify(chosen));
}

function filterQuotes() {
  if (!categoryFilter) return;
  const sel = categoryFilter.value;
  localStorage.setItem('lastCategoryFilter', sel);
  const list = sel === 'all' ? quotes : quotes.filter(q => q.category === sel);
  if (list.length === 0) quoteDisplay.textContent = 'No quotes found for this category.';
  else quoteDisplay.textContent = `"${list[0].text}"`;
}

// ===== Import / Export =====
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `quotes-export-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(String(e.target.result));
      if (!Array.isArray(imported)) throw new Error('Expected array');
      const norm = normalizeQuotes(imported);
      // merge (avoid exact text+category duplicates)
      const existingKeys = new Set(quotes.map(q => `${keyOf(q.text)}|${keyOf(q.category)}`));
      let added = 0;
      norm.forEach(nq => {
        const k = `${keyOf(nq.text)}|${keyOf(nq.category)}`;
        if (!existingKeys.has(k)) {
          quotes.push(nq);
          existingKeys.add(k);
          added++;
        }
      });
      saveQuotes();
      populateCategories();
      filterQuotes();
      showStatus(`Imported ${added} new quote(s).`, 'success');
    } catch (err) {
      console.error(err);
      alert('Failed to import file: invalid JSON format.');
    } finally {
      importFile.value = '';
    }
  };
  reader.readAsText(file);
}

// ===== Add new quote (posts to server) =====
async function createAddQuoteForm(e) {
  e.preventDefault();
  const text = (quoteTextInput && quoteTextInput.value || '').trim();
  const category = (quoteCategoryInput && quoteCategoryInput.value || '').trim();
  if (!text || !category) {
    alert('Please enter both quote and category.');
    return;
  }
  const newQuote = {
    id: genId(),
    text, category,
    updatedAt: nowISO(),
    source: 'local',
    serverId: null
  };
  // push locally
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();
  showStatus('Quote saved locally. Attempting to post to server…', 'info');

  // attempt post (fire-and-forget)
  try {
    const posted = await postQuoteToServer({ title: newQuote.text, body: newQuote.category });
    if (posted && posted.id) {
      // annotate serverId if returned
      newQuote.serverId = posted.id;
      newQuote.source = 'server';
      newQuote.updatedAt = nowISO();
      saveQuotes();
      showStatus('Quote synced to server.', 'success');
    } else {
      showStatus('Quote saved locally; server did not return an id.', 'warn');
    }
  } catch (err) {
    console.warn('Post failed, will keep local copy.', err);
    showStatus('Could not post to server. Local only.', 'warn');
  }

  if (quoteTextInput) quoteTextInput.value = '';
  if (quoteCategoryInput) quoteCategoryInput.value = '';
}

// ===== Server interactions =====
async function fetchServerQuotes(limit = 25) {
  // GET posts from placeholder and map them to quote structure for simulation
  const res = await fetch(`${SERVER_URL}?_limit=${limit}`);
  if (!res.ok) throw new Error('Server fetch failed');
  const data = await res.json();
  // Map to quote-like objects; these come from server, source=server
  return data.map(post => ({
    id: `srv_${post.id}`,
    serverId: post.id,
    text: String(post.title || post.body || '').trim(),
    category: 'Server',
    updatedAt: nowISO(),
    source: 'server'
  })).filter(q => q.text.length > 0);
}

async function postQuoteToServer(payload) {
  // payload: { title, body } or arbitrary object
  const res = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Server post failed');
  return await res.json();
}

// ===== Conflict handling =====
let conflictLog = []; // { id, key, localQuote, serverQuote, resolved }

// Render conflict panel
function renderConflicts() {
  ensureSyncUI();
  if (!conflictLog.length) {
    conflictsPanel.innerHTML = '';
    return;
  }
  const html = conflictLog.map(c => {
    const id = c.id;
    return `
      <details style="margin-top:8px;border:1px solid #eee;border-radius:6px;padding:8px;background:#fafafa;">
        <summary><strong>Conflict</strong>: "${escapeHtml(c.serverQuote.text).slice(0,60)}${c.serverQuote.text.length>60?'…':''}"</summary>
        <div style="margin-top:8px;">
          <div><strong>Server</strong> — <code>${escapeHtml(c.serverQuote.category)}</code></div>
          <div style="margin:6px 0;"><em>${escapeHtml(c.serverQuote.text)}</em></div>
          <div style="margin-top:10px;"><strong>Local</strong> — <code>${escapeHtml(c.localQuote.category)}</code></div>
          <div style="margin:6px 0;"><em>${escapeHtml(c.localQuote.text)}</em></div>
          <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
            <button data-action="keep-server" data-cid="${id}" style="padding:6px 10px;border-radius:4px;background:#e7f7ec;border:1px solid #cfe9d6;">Keep Server</button>
            <button data-action="use-local" data-cid="${id}" style="padding:6px 10px;border-radius:4px;background:#fff2f2;border:1px solid #f2c6c6;">Use Local</button>
          </div>
          <div style="margin-top:6px;font-size:12px;color:#666;">Resolved: <strong>${escapeHtml(String(c.resolved || 'server'))}</strong></div>
        </div>
      </details>
    `;
  }).join('');
  conflictsPanel.innerHTML = `<div style="margin-top:8px;"><strong>${conflictLog.length}</strong> conflict(s). Default: server wins.</div>${html}`;
}

// helper to safely show small text
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

// handle clicks inside conflicts panel (keep-server / use-local)
conflictsPanel.addEventListener && conflictsPanel.addEventListener('click', e => {
  const btn = e.target.closest && e.target.closest('button[data-action]');
  if (!btn) return;
  const cid = btn.getAttribute('data-cid');
  const action = btn.getAttribute('data-action');
  const idx = conflictLog.findIndex(c => c.id === cid);
  if (idx === -1) return;
  const entry = conflictLog[idx];
  if (action === 'use-local') {
    // find local by key and restore
    const key = entry.key;
    const li = quotes.findIndex(q => keyOf(q.text) === key);
    if (li !== -1) {
      quotes[li] = { ...quotes[li], ...entry.localQuote, updatedAt: nowISO(), source: 'local' };
    } else {
      quotes.push({ ...entry.localQuote, updatedAt: nowISO(), source: 'local' });
    }
    entry.resolved = 'local';
    saveQuotes();
    populateCategories();
    filterQuotes();
    showStatus('Conflict overridden: local version restored.', 'warn');
  } else { // keep-server
    entry.resolved = 'server';
    showStatus('Server version kept for this conflict.', 'info');
  }
  renderConflicts();
});

// Merge server quotes into local quotes; server-wins by default, but we record conflicts for user review
function mergeServerQuotes(serverQuotes) {
  let added = 0, conflicts = 0;
  const localMap = new Map(); // key -> index
  quotes.forEach((q, i) => localMap.set(keyOf(q.text), i));

  serverQuotes.forEach(sq => {
    const k = keyOf(sq.text);
    const localIdx = localMap.get(k);
    if (localIdx === undefined) {
      // new from server
      quotes.push({ ...sq, id: sq.id || genId(), updatedAt: nowISO(), source:'server' });
      added++;
    } else {
      const local = quotes[localIdx];
      // detect difference (category or text differing)
      const differs = local.text !== sq.text || local.category !== sq.category;
      if (differs) {
        // record conflict and apply server (server-wins)
        conflicts++;
        const conflictEntry = {
          id: `c_${sq.serverId || sq.id || genId()}`,
          key: k,
          localQuote: { ...local },
          serverQuote: { ...sq },
          resolved: 'server'
        };
        conflictLog.push(conflictEntry);
        // apply server-overrides-local
        quotes[localIdx] = { ...local, text: sq.text, category: sq.category, updatedAt: nowISO(), source:'server', serverId: sq.serverId || sq.id || null };
      } else {
        // no change but mark source
        local.source = 'server';
        if (sq.serverId) local.serverId = sq.serverId;
      }
    }
  });
  return { added, conflicts };
}

// ===== Sync function =====
async function syncQuotes() {
  try {
    showStatus('Syncing with server…', 'info');
    const serverQuotes = await fetchServerQuotes(25);
    const { added, conflicts } = mergeServerQuotes(serverQuotes);
    saveQuotes();
    populateCategories();
    renderConflicts();
    filterQuotes();
    showStatus(`Synced: ${added} new, ${conflicts} conflict(s).`, 'success');
    localStorage.setItem('lastSyncAt', nowISO());
  } catch (err) {
    console.error(err);
    showStatus('Sync failed. Will retry automatically.', 'error');
  }
}

// fetchServerQuotes implemented using SERVER_URL
async function fetchServerQuotes(limit=20) {
  const res = await fetch(`${SERVER_URL}?_limit=${limit}`);
  if (!res.ok) throw new Error('Server fetch failed');
  const data = await res.json();
  return data.map(post => ({
    id: `srv_${post.id}`,
    serverId: post.id,
    text: String(post.title || post.body || '').trim(),
    category: 'Server',
    updatedAt: nowISO(),
    source: 'server'
  })).filter(q => q.text.length > 0);
}

// ===== Event Listeners, init =====
if (showQuoteBtn) showQuoteBtn.addEventListener('click', showRandomQuote);
if (categorySelect) categorySelect.addEventListener('change', showRandomQuote);
if (addQuoteForm) addQuoteForm.addEventListener('submit', createAddQuoteForm);
if (exportBtn) exportBtn.addEventListener('click', exportQuotes);
if (importFile) importFile.addEventListener('change', importFromJsonFile);
if (categoryFilter) categoryFilter.addEventListener('change', filterQuotes);

// Boot sequence
(function init() {
  // ensure normalized and saved
  quotes = normalizeQuotes(quotes);
  saveQuotes();

  populateCategories();

  // restore last viewed quote
  const last = sessionStorage.getItem('lastQuote');
  if (last) {
    try {
      const parsed = JSON.parse(last);
      quoteDisplay.textContent = `"${parsed.text}"`;
    } catch {}
  }

  // apply filter (if any)
  filterQuotes();

  // initial sync and periodic
  syncQuotes();
  setInterval(syncQuotes, SYNC_INTERVAL_MS);

  // focus-based resync (if long time passed)
  window.addEventListener('focus', () => {
    const lastSync = localStorage.getItem('lastSyncAt');
    if (!lastSync || (Date.now() - new Date(lastSync).getTime()) > 60000) {
      syncQuotes();
    }
  });
})();

// ===== Small notification helper for quick toasts (used sparingly) =====
function toast(msg, timeout=3000) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:18px;left:18px;background:rgba(0,0,0,0.85);color:#fff;padding:10px 12px;border-radius:6px;z-index:9999;font-size:13px;';
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), timeout);
}
