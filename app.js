
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    collection,
    doc,
    getDoc,
    getFirestore,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    where,
    writeBatch,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Cole aqui as credenciais do seu projeto Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyA-ZghBgwt_-2h_vnxiSL5aI-ijsM6dXP8",
    authDomain: "bolao26-3f240.firebaseapp.com",
    projectId: "bolao26-3f240",
    storageBucket: "bolao26-3f240.firebasestorage.app",
    messagingSenderId: "433584903321",
    appId: "1:433584903321:web:cc8d925ca167856242d408"
};

const ADMIN_PASSWORD = "COPA2026";
const DEFAULT_GROUP_ID = "geral";
const DEFAULT_GROUP_NAME = "Geral";

const matches = [
  { "id": 537397, "utcDate": "2026-06-17T01:00:00Z", "status": "FINISHED", "homeTeam": "Argentina", "awayTeam": "Algeria" },
  { "id": 537398, "utcDate": "2026-06-17T04:00:00Z", "status": "FINISHED", "homeTeam": "Austria", "awayTeam": "Jordan" },
  { "id": 537403, "utcDate": "2026-06-17T17:00:00Z", "status": "FINISHED", "homeTeam": "Portugal", "awayTeam": "Congo DR" },
  { "id": 537409, "utcDate": "2026-06-17T20:00:00Z", "status": "FINISHED", "homeTeam": "England", "awayTeam": "Croatia" },
  { "id": 537410, "utcDate": "2026-06-17T23:00:00Z", "status": "FINISHED", "homeTeam": "Ghana", "awayTeam": "Panama" },
  { "id": 537404, "utcDate": "2026-06-18T02:00:00Z", "status": "FINISHED", "homeTeam": "Uzbekistan", "awayTeam": "Colombia" },
  { "id": 537329, "utcDate": "2026-06-18T16:00:00Z", "status": "TIMED", "homeTeam": "Czechia", "awayTeam": "South Africa" },
  { "id": 537335, "utcDate": "2026-06-18T19:00:00Z", "status": "TIMED", "homeTeam": "Switzerland", "awayTeam": "Bosnia-Herzegovina" },
  { "id": 537336, "utcDate": "2026-06-18T22:00:00Z", "status": "TIMED", "homeTeam": "Canada", "awayTeam": "Qatar" },
  { "id": 537330, "utcDate": "2026-06-19T01:00:00Z", "status": "TIMED", "homeTeam": "Mexico", "awayTeam": "South Korea" },
  { "id": 537348, "utcDate": "2026-06-19T19:00:00Z", "status": "TIMED", "homeTeam": "United States", "awayTeam": "Australia" },
  { "id": 537342, "utcDate": "2026-06-19T22:00:00Z", "status": "TIMED", "homeTeam": "Scotland", "awayTeam": "Morocco" },
  { "id": 537341, "utcDate": "2026-06-20T00:30:00Z", "status": "TIMED", "homeTeam": "Brazil", "awayTeam": "Haiti" },
  { "id": 537347, "utcDate": "2026-06-20T03:00:00Z", "status": "TIMED", "homeTeam": "Turkey", "awayTeam": "Paraguay" },
  { "id": 537359, "utcDate": "2026-06-20T17:00:00Z", "status": "TIMED", "homeTeam": "Netherlands", "awayTeam": "Sweden" },
  { "id": 537353, "utcDate": "2026-06-20T20:00:00Z", "status": "TIMED", "homeTeam": "Germany", "awayTeam": "Ivory Coast" },
  { "id": 537354, "utcDate": "2026-06-21T00:00:00Z", "status": "TIMED", "homeTeam": "Ecuador", "awayTeam": "Curaçao" },
  { "id": 537360, "utcDate": "2026-06-21T04:00:00Z", "status": "TIMED", "homeTeam": "Tunisia", "awayTeam": "Japan" },
  { "id": 537371, "utcDate": "2026-06-21T16:00:00Z", "status": "TIMED", "homeTeam": "Spain", "awayTeam": "Saudi Arabia" },
  { "id": 537365, "utcDate": "2026-06-21T19:00:00Z", "status": "TIMED", "homeTeam": "Belgium", "awayTeam": "Iran" },
  { "id": 537372, "utcDate": "2026-06-21T22:00:00Z", "status": "TIMED", "homeTeam": "Uruguay", "awayTeam": "Cape Verde Islands" },
  { "id": 537366, "utcDate": "2026-06-22T01:00:00Z", "status": "TIMED", "homeTeam": "New Zealand", "awayTeam": "Egypt" },
  { "id": 537399, "utcDate": "2026-06-22T17:00:00Z", "status": "TIMED", "homeTeam": "Argentina", "awayTeam": "Austria" },
  { "id": 537393, "utcDate": "2026-06-22T21:00:00Z", "status": "TIMED", "homeTeam": "France", "awayTeam": "Iraq" },
  { "id": 537394, "utcDate": "2026-06-23T00:00:00Z", "status": "TIMED", "homeTeam": "Norway", "awayTeam": "Senegal" },
  { "id": 537400, "utcDate": "2026-06-23T03:00:00Z", "status": "TIMED", "homeTeam": "Jordan", "awayTeam": "Algeria" },
  { "id": 537405, "utcDate": "2026-06-23T17:00:00Z", "status": "TIMED", "homeTeam": "Portugal", "awayTeam": "Uzbekistan" },
  { "id": 537411, "utcDate": "2026-06-23T20:00:00Z", "status": "TIMED", "homeTeam": "England", "awayTeam": "Ghana" },
  { "id": 537412, "utcDate": "2026-06-23T23:00:00Z", "status": "TIMED", "homeTeam": "Panama", "awayTeam": "Croatia" },
  { "id": 537406, "utcDate": "2026-06-24T02:00:00Z", "status": "TIMED", "homeTeam": "Colombia", "awayTeam": "Congo DR" },
  { "id": 537337, "utcDate": "2026-06-24T19:00:00Z", "status": "TIMED", "homeTeam": "Switzerland", "awayTeam": "Canada" },
  { "id": 537338, "utcDate": "2026-06-24T19:00:00Z", "status": "TIMED", "homeTeam": "Bosnia-Herzegovina", "awayTeam": "Qatar" },
  { "id": 537343, "utcDate": "2026-06-24T22:00:00Z", "status": "TIMED", "homeTeam": "Scotland", "awayTeam": "Brazil" },
  { "id": 537344, "utcDate": "2026-06-24T22:00:00Z", "status": "TIMED", "homeTeam": "Morocco", "awayTeam": "Haiti" },
  { "id": 537331, "utcDate": "2026-06-25T01:00:00Z", "status": "TIMED", "homeTeam": "Czechia", "awayTeam": "Mexico" },
  { "id": 537332, "utcDate": "2026-06-25T01:00:00Z", "status": "TIMED", "homeTeam": "South Africa", "awayTeam": "South Korea" },
  { "id": 537355, "utcDate": "2026-06-25T20:00:00Z", "status": "TIMED", "homeTeam": "Ecuador", "awayTeam": "Germany" },
  { "id": 537356, "utcDate": "2026-06-25T20:00:00Z", "status": "TIMED", "homeTeam": "Curaçao", "awayTeam": "Ivory Coast" },
  { "id": 537361, "utcDate": "2026-06-25T23:00:00Z", "status": "TIMED", "homeTeam": "Tunisia", "awayTeam": "Netherlands" },
  { "id": 537362, "utcDate": "2026-06-25T23:00:00Z", "status": "TIMED", "homeTeam": "Japan", "awayTeam": "Sweden" },
  { "id": 537349, "utcDate": "2026-06-26T02:00:00Z", "status": "TIMED", "homeTeam": "Turkey", "awayTeam": "United States" },
  { "id": 537350, "utcDate": "2026-06-26T02:00:00Z", "status": "TIMED", "homeTeam": "Paraguay", "awayTeam": "Australia" },
  { "id": 537395, "utcDate": "2026-06-26T19:00:00Z", "status": "TIMED", "homeTeam": "Norway", "awayTeam": "France" },
  { "id": 537396, "utcDate": "2026-06-26T19:00:00Z", "status": "TIMED", "homeTeam": "Senegal", "awayTeam": "Iraq" },
  { "id": 537373, "utcDate": "2026-06-27T00:00:00Z", "status": "TIMED", "homeTeam": "Uruguay", "awayTeam": "Spain" },
  { "id": 537374, "utcDate": "2026-06-27T00:00:00Z", "status": "TIMED", "homeTeam": "Cape Verde Islands", "awayTeam": "Saudi Arabia" }
];

const state = {
    db: null,
    groupId: DEFAULT_GROUP_ID,
    groupName: DEFAULT_GROUP_NAME,
    participantId: "",
    participantName: "",
    isGroupAuthenticated: false,
    unsubscribePredictions: null,
    unsubscribeAllPredictions: null,
    unsubscribeRanking: null,
    unsubscribeParticipants: null,
    unsubscribeResults: null,
    participants: [],
    predictions: [],
    results: new Map()
};

// Admin state will be attached here later

const flags = {
    "Algeria": "🇩🇿", "Argentina": "🇦🇷", "Australia": "🇦🇺", "Austria": "🇦🇹", "Belgium": "🇧🇪",
    "Bosnia-Herzegovina": "🇧🇦", "Brazil": "🇧🇷", "Canada": "🇨🇦", "Cape Verde Islands": "🇨🇻",
    "Colombia": "🇨🇴", "Congo DR": "🇨🇩", "Croatia": "🇭🇷", "Curaçao": "🇨🇼", "Czechia": "🇨🇿",
    "Ecuador": "🇪🇨", "Egypt": "🇪🇬", "England": "🏴", "France": "🇫🇷", "Germany": "🇩🇪",
    "Ghana": "🇬🇭", "Haiti": "🇭🇹", "Iran": "🇮🇷", "Iraq": "🇮🇶", "Ivory Coast": "🇨🇮",
    "Japan": "🇯🇵", "Jordan": "🇯🇴", "Mexico": "🇲🇽", "Morocco": "🇲🇦", "Netherlands": "🇳🇱",
    "New Zealand": "🇳🇿", "Norway": "🇳🇴", "Panama": "🇵🇦", "Paraguay": "🇵🇾", "Portugal": "🇵🇹",
    "Qatar": "🇶🇦", "Saudi Arabia": "🇸🇦", "Scotland": "🏴", "Senegal": "🇸🇳", "South Africa": "🇿🇦",
    "South Korea": "🇰🇷", "Spain": "🇪🇸", "Sweden": "🇸🇪", "Switzerland": "🇨🇭", "Tunisia": "🇹🇳",
    "Turkey": "🇹🇷", "United States": "🇺🇸", "Uruguay": "🇺🇾", "Uzbekistan": "🇺🇿"
};

const flagCodes = {
    "Algeria": "dz", "Argentina": "ar", "Australia": "au", "Austria": "at", "Belgium": "be",
    "Bosnia-Herzegovina": "ba", "Brazil": "br", "Canada": "ca", "Cape Verde Islands": "cv",
    "Colombia": "co", "Congo DR": "cd", "Croatia": "hr", "Curaçao": "cw", "Czechia": "cz",
    "Ecuador": "ec", "Egypt": "eg", "England": "gb-eng", "France": "fr", "Germany": "de",
    "Ghana": "gh", "Haiti": "ht", "Iran": "ir", "Iraq": "iq", "Ivory Coast": "ci",
    "Japan": "jp", "Jordan": "jo", "Mexico": "mx", "Morocco": "ma", "Netherlands": "nl",
    "New Zealand": "nz", "Norway": "no", "Panama": "pa", "Paraguay": "py", "Portugal": "pt",
    "Qatar": "qa", "Saudi Arabia": "sa", "Scotland": "gb-sct", "Senegal": "sn", "South Africa": "za",
    "South Korea": "kr", "Spain": "es", "Sweden": "se", "Switzerland": "ch", "Tunisia": "tn",
    "Turkey": "tr", "United States": "us", "Uruguay": "uy", "Uzbekistan": "uz"
};

const els = {
    adminDialog: document.getElementById("adminDialog"),
    adminLogin: document.getElementById("adminLogin"),
    adminMessage: document.getElementById("adminMessage"),
    adminOpen: document.getElementById("adminOpen"),
    adminPanel: document.getElementById("adminPanel"),
    adminPassword: document.getElementById("adminPassword"),
    adminResults: document.getElementById("adminResults"),
    adminUnlock: document.getElementById("adminUnlock"),
    activeGroupName: document.getElementById("activeGroupName"),
    bolaoForm: document.getElementById("bolaoForm"),
    connectionStatus: document.getElementById("connectionStatus"),
    gamesContainer: document.getElementById("games-container"),
    groupName: document.getElementById("groupName"),
    loadingOverlay: document.getElementById("loadingOverlay"),
    participantName: document.getElementById("participantName"),
    rankingBody: document.getElementById("rankingBody"),
    recalculateRanking: document.getElementById("recalculateRanking"),
    resultsBoard: document.getElementById("resultsBoard"),
    resultsCount: document.getElementById("resultsCount"),
    savedPredictions: document.getElementById("savedPredictions"),
    totalGames: document.getElementById("totalGames"),
    totalParticipants: document.getElementById("totalParticipants"),
    totalResults: document.getElementById("totalResults"),
    groupPassword: document.getElementById("groupPassword"), // <--- NOVO
    btnEnterGroup: document.getElementById("btnEnterGroup"), // <--- NOVO
    saveFab: document.getElementById("saveFab"),
};

// Admin-specific DOM refs (not guaranteed to exist until HTML loaded)
const adminEls = {
    overviewBody: document.getElementById('adminOverviewBody'),
    groupsBody: document.getElementById('adminGroupsBody'),
    participantsGroupFilter: document.getElementById('adminParticipantsGroupFilter'),
    participantsBody: document.getElementById('adminParticipantsBody'),
    predictionsGroupFilter: document.getElementById('adminPredictionsGroupFilter'),
    predictionsBody: document.getElementById('adminPredictionsBody'),
    resultsBody: document.getElementById('adminResultsBody'),
    publishResultsBtn: document.getElementById('adminPublishResults'),
    selectAllResultsBtn: document.getElementById('adminSelectAllResults'),
    undoPublishBtn: document.getElementById('adminUndoPublish'),
    exportCSVBtn: document.getElementById('adminExportCSV'),
    refreshGroupsBtn: document.getElementById('adminRefreshGroups'),
    refreshParticipantsBtn: document.getElementById('adminRefreshParticipants'),
    refreshPredictionsBtn: document.getElementById('adminRefreshPredictions'),
    toast: document.getElementById('adminToast')
};

// Initialize admin state container
state.admin = {
    selectedGroupId: null,
    drafts: new Map(), // matchId -> { homeGoals, awayGoals, before, selected }
    predictionsCache: [],
    lastPublishForUndo: null,
    undoTimer: null
};

start();

function start() {
    els.totalGames.textContent = String(matches.length);

    // Lê o grupo da URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlGroup = urlParams.get('grupo');
    
    if (urlGroup) {
        els.groupName.value = urlGroup;
        setConnection("Digite a senha do grupo");
    }

    renderGames();
    renderAdminResults();
    bindEvents();
    setupAdminBindings();

    if (!isFirebaseConfigured(firebaseConfig)) {
        setConnection("Configure o Firebase");
        hideLoading();
        return;
    }

    try {
        const app = initializeApp(firebaseConfig);
        state.db = getFirestore(app);
        
        // Carrega APENAS os resultados oficiais, pois são globais
        listenToResults(); 

        // After DB is available, populate admin data
        loadAdminOverview().catch(handleFirebaseError);
        loadGroups().catch(handleFirebaseError);
        loadParticipants().catch(handleFirebaseError);
        loadPredictions().catch(handleFirebaseError);
        loadResultsForAdmin().catch(handleFirebaseError);
    } catch (error) {
        console.error(error);
        setConnection("Erro no Firebase");
    } finally {
        hideLoading();
    }
}

function bindEvents() {
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.addEventListener("click", () => activateTab(button.dataset.tab));
    });

    // Novos eventos para a senha
    els.btnEnterGroup.addEventListener("click", authenticateGroup);
    els.groupPassword.addEventListener("keypress", (e) => {
        if (e.key === "Enter") authenticateGroup();
    });

    els.participantName.addEventListener("change", () => handleParticipantName().catch(handleFirebaseError));
    els.participantName.addEventListener("blur", () => handleParticipantName().catch(handleFirebaseError));
    els.bolaoForm.addEventListener("submit", savePredictions);
    els.adminOpen.addEventListener("click", () => els.adminDialog.showModal());
    els.adminUnlock.addEventListener("click", unlockAdmin);
    els.recalculateRanking.addEventListener("click", () => recalculateRanking().catch(handleFirebaseError));

    // FAB behavior: submit the form (use requestSubmit when available to preserve form validation)
    if (els.saveFab) {
        els.saveFab.addEventListener("click", () => {
            const form = els.bolaoForm || document.getElementById('bolaoForm');
            if (!form) return;
            if (typeof form.requestSubmit === 'function') {
                form.requestSubmit();
            } else {
                form.submit();
            }
        });
    }
}

// --- Admin binding setup ---
function setupAdminBindings() {
    // Tab switching inside admin panel
    document.querySelectorAll('.admin-tab-button').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab-button').forEach(b => b.classList.toggle('active', b === btn));
            const tab = btn.dataset.tab;
            document.querySelectorAll('.admin-section').forEach(sec => sec.classList.toggle('active', sec.id === `admin${capitalize(tab)}` || sec.id === tab || sec.id === `${tab}`));
        });
    });

    if (adminEls.refreshGroupsBtn) adminEls.refreshGroupsBtn.addEventListener('click', () => loadGroups().catch(handleFirebaseError));
    if (adminEls.refreshParticipantsBtn) adminEls.refreshParticipantsBtn.addEventListener('click', () => loadParticipants().catch(handleFirebaseError));
    if (adminEls.refreshPredictionsBtn) adminEls.refreshPredictionsBtn.addEventListener('click', () => loadPredictions().catch(handleFirebaseError));

    if (adminEls.exportCSVBtn) adminEls.exportCSVBtn.addEventListener('click', () => exportPredictionsCSV());
    if (adminEls.selectAllResultsBtn) adminEls.selectAllResultsBtn.addEventListener('click', () => toggleSelectAllResults());
    if (adminEls.publishResultsBtn) adminEls.publishResultsBtn.addEventListener('click', () => publishSelectedResults().catch(handleFirebaseError));
    if (adminEls.undoPublishBtn) adminEls.undoPublishBtn.addEventListener('click', () => undoLastPublish().catch(handleFirebaseError));

    if (adminEls.predictionsGroupFilter) adminEls.predictionsGroupFilter.addEventListener('change', () => loadPredictions().catch(handleFirebaseError));
    if (adminEls.participantsGroupFilter) adminEls.participantsGroupFilter.addEventListener('change', () => loadParticipants().catch(handleFirebaseError));
}

// --- Admin data loaders and actions ---
async function loadAdminOverview() {
    if (!state.db || !adminEls.overviewBody) return;
    adminEls.overviewBody.textContent = 'Carregando...';

    const [groupsSnap, participantsSnap, predictionsSnap, resultsSnap] = await Promise.all([
        getDocs(collection(state.db, 'grupos')),
        getDocs(collection(state.db, 'participantes')),
        getDocs(collection(state.db, 'palpites')),
        getDocs(collection(state.db, 'resultados'))
    ]);

    adminEls.overviewBody.innerHTML = `
        <div class="admin-grid">
            <div><strong>${groupsSnap.size}</strong><div>grupos</div></div>
            <div><strong>${participantsSnap.size}</strong><div>participantes</div></div>
            <div><strong>${predictionsSnap.size}</strong><div>palpites</div></div>
            <div><strong>${resultsSnap.size}</strong><div>resultados</div></div>
        </div>
    `;
}

async function loadGroups() {
    if (!state.db || !adminEls.groupsBody) return;
    adminEls.groupsBody.textContent = 'Carregando grupos...';

    const snap = await getDocs(collection(state.db, 'grupos'));
    const rows = snap.docs.map(docItem => ({ id: docItem.id, ...docItem.data() }));

    adminEls.groupsBody.innerHTML = rows.map(g => `
        <div class="admin-row" data-group-id="${escapeHtml(g.id)}">
            <div><strong>${escapeHtml(g.nome || g.id)}</strong></div>
            <div>${g.criadoEm ? new Date(g.criadoEm.seconds * 1000).toLocaleString() : ''}</div>
            <div>
                <button class="save-button compact admin-archive-group" data-id="${escapeHtml(g.id)}">Arquivar</button>
            </div>
        </div>
    `).join('') || '<div class="empty-state">Nenhum grupo encontrado.</div>';

    adminEls.groupsBody.querySelectorAll('.admin-archive-group').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            if (!confirm('Arquivar este grupo? Isso não deletará dados, apenas marcará archived=true.')) return;
            await setDoc(doc(state.db, 'grupos', id), { archived: true }, { merge: true });
            showAdminToast('Grupo arquivado');
            await loadGroups();
        });
    });

    // populate filter selects with groups
    populateGroupFilters(rows);
}

function populateGroupFilters(groups) {
    const opts = [{ id: '', nome: 'Todos' }, ...groups];
    if (adminEls.participantsGroupFilter) {
        adminEls.participantsGroupFilter.innerHTML = opts.map(g => `<option value="${escapeHtml(g.id)}">${escapeHtml(g.nome || g.id)}</option>`).join('');
    }
    if (adminEls.predictionsGroupFilter) {
        adminEls.predictionsGroupFilter.innerHTML = opts.map(g => `<option value="${escapeHtml(g.id)}">${escapeHtml(g.nome || g.id)}</option>`).join('');
    }
}

async function loadParticipants() {
    if (!state.db || !adminEls.participantsBody) return;
    adminEls.participantsBody.textContent = 'Carregando participantes...';

    const groupId = adminEls.participantsGroupFilter?.value || '';
    const q = groupId ? query(collection(state.db, 'participantes'), where('groupId', '==', groupId)) : collection(state.db, 'participantes');
    const snap = groupId ? await getDocs(q) : await getDocs(collection(state.db, 'participantes'));

    const rows = (snap.docs || []).map(d => ({ id: d.id, ...d.data() }));

    adminEls.participantsBody.innerHTML = rows.map(p => `
        <div class="admin-row" data-participant-id="${escapeHtml(p.id)}">
            <div><strong>${escapeHtml(p.nome)}</strong></div>
            <div>${escapeHtml(p.groupId || '')}</div>
            <div>
                <button class="save-button compact admin-rename-participant" data-id="${escapeHtml(p.id)}">Renomear</button>
                <button class="save-button compact admin-archive-participant" data-id="${escapeHtml(p.id)}">Arquivar</button>
            </div>
        </div>
    `).join('') || '<div class="empty-state">Nenhum participante encontrado.</div>';

    adminEls.participantsBody.querySelectorAll('.admin-rename-participant').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const current = rows.find(r => r.id === id);
            const newName = prompt('Novo nome do participante', current?.nome || '');
            if (!newName) return;
            await setDoc(doc(state.db, 'participantes', id), { nome: newName }, { merge: true });
            showAdminToast('Participante renomeado');
            await loadParticipants();
        });
    });

    adminEls.participantsBody.querySelectorAll('.admin-archive-participant').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            if (!confirm('Arquivar este participante?')) return;
            await setDoc(doc(state.db, 'participantes', id), { archived: true }, { merge: true });
            showAdminToast('Participante arquivado');
            await loadParticipants();
        });
    });
}

async function loadPredictions() {
    if (!state.db || !adminEls.predictionsBody) return;
    adminEls.predictionsBody.textContent = 'Carregando palpites...';

    const groupId = adminEls.predictionsGroupFilter?.value || '';
    let snap;
    if (groupId) {
        snap = await getDocs(query(collection(state.db, 'palpites'), where('groupId', '==', groupId)));
    } else {
        snap = await getDocs(collection(state.db, 'palpites'));
    }

    const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    state.admin.predictionsCache = rows;

    adminEls.predictionsBody.innerHTML = rows.map(p => `
        <div class="admin-row" data-id="${escapeHtml(p.id)}">
            <div><strong>${escapeHtml(p.nome || p.participanteId || p.id)}</strong></div>
            <div>${escapeHtml(p.matchId)}</div>
            <div>${p.homeGoals} - ${p.awayGoals}</div>
            <div>
                <button class="save-button compact admin-edit-prediction" data-id="${escapeHtml(p.id)}">Editar</button>
                <button class="save-button compact admin-delete-prediction" data-id="${escapeHtml(p.id)}">Excluir</button>
            </div>
        </div>
    `).join('') || '<div class="empty-state">Nenhum palpite encontrado.</div>';

    adminEls.predictionsBody.querySelectorAll('.admin-edit-prediction').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const row = state.admin.predictionsCache.find(r => r.id === id);
            if (!row) return;
            const newHome = prompt('Gols do time da casa', String(row.homeGoals ?? ''));
            const newAway = prompt('Gols do time visitante', String(row.awayGoals ?? ''));
            if (newHome === null || newAway === null) return;
            const home = toScore(newHome);
            const away = toScore(newAway);
            if (home === null || away === null) { alert('Valores inválidos'); return; }
            await setDoc(doc(state.db, 'palpites', id), { homeGoals: home, awayGoals: away, savedAt: serverTimestamp() }, { merge: true });
            showAdminToast('Palpite atualizado');
            await loadPredictions();
        });
    });

    adminEls.predictionsBody.querySelectorAll('.admin-delete-prediction').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            if (!confirm('Excluir este palpite?')) return;
            await deleteDoc(doc(state.db, 'palpites', id));
            showAdminToast('Palpite excluído');
            await loadPredictions();
        });
    });
}

function exportPredictionsCSV() {
    const rows = state.admin.predictionsCache || [];
    if (!rows.length) { showAdminToast('Nenhum palpite para exportar'); return; }

    const headers = ['docId','matchId','participanteId','nome','homeGoals','awayGoals','groupId','savedAt'];
    const csv = [headers.join(',')].concat(rows.map(r => [
        r.id,
        r.matchId,
        r.participanteId,
        `