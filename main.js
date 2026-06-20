// ========== FALLBACK MATCH DATA ==========
const FALLBACK_MATCHES = [
    { date: "2026-06-11", team1: "Mexico", team2: "South Africa", score1: 2, score2: 0, status: "Final", location: "Blue Wave Stadium" },
    { date: "2026-06-11", team1: "South Korea", team2: "Czechia", score1: 2, score2: 1, status: "Final", location: "Ocean Arena" },
    { date: "2026-06-12", team1: "Canada", team2: "Bosnia", score1: 1, score2: 1, status: "Final", location: "Caribbean Park" },
    { date: "2026-06-12", team1: "USA", team2: "Paraguay", score1: 4, score2: 1, status: "Final", location: "Blue Wave Stadium" },
    { date: "2026-06-15", team1: "Germany", team2: "Curaçao", score1: null, score2: null, status: "Scheduled", location: "Blue Wave Stadium" },
    { date: "2026-06-15", team1: "Netherlands", team2: "Japan", score1: null, score2: null, status: "Scheduled", location: "Blue Wave Stadium" },
    { date: "2026-06-16", team1: "Brazil", team2: "Argentina", score1: null, score2: null, status: "Scheduled", location: "Ocean Arena" }
];

let liveMatches = [...FALLBACK_MATCHES];

// ========== ESPN API INTEGRATION ==========
async function fetchLiveScores() {
    try {
        const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.worldcup/scoreboard');
        if (!response.ok) throw new Error('ESPN API unavailable');
        const data = await response.json();
        
        if (data && data.events && data.events.length > 0) {
            const newMatches = [];
            for (const event of data.events) {
                const competition = event.competitions?.[0];
                if (!competition) continue;
                
                const competitors = competition.competitors || [];
                const team1 = competitors[0]?.team?.displayName || "Unknown";
                const team2 = competitors[1]?.team?.displayName || "Unknown";
                const score1 = competitors[0]?.score ? parseInt(competitors[0].score) : null;
                const score2 = competitors[1]?.score ? parseInt(competitors[1].score) : null;
                
                let status = "Scheduled";
                const statusType = competition.status?.type?.name || "";
                if (statusType === "STATUS_FINAL") status = "Final";
                else if (statusType === "STATUS_IN_PROGRESS") status = "Live";
                
                newMatches.push({
                    date: new Date(event.date).toISOString().split('T')[0],
                    team1: team1,
                    team2: team2,
                    score1: score1,
                    score2: score2,
                    status: status,
                    location: competition.venue?.fullName || "TBD"
                });
            }
            if (newMatches.length > 0) liveMatches = newMatches;
        }
    } catch (error) {
        console.warn("ESPN API error, using fallback data");
    }
}

// ========== RENDER FUNCTIONS ==========
function renderResults() {
    const container = document.getElementById("resultsContent");
    if (!container) return;
    const finished = liveMatches.filter(m => m.status === "Final" || (m.score1 !== null && m.score2 !== null));
    if (finished.length === 0) {
        container.innerHTML = "<div class='loading'>No finished matches yet</div>";
        return;
    }
    container.innerHTML = finished.map(m => `
        <div class="match-item">
            <div class="match-date">📅 ${m.date}</div>
            <div class="match-teams">
                <span>${m.team1}</span>
                <span class="match-score">${m.score1 ?? '?'} - ${m.score2 ?? '?'}</span>
                <span>${m.team2}</span>
            </div>
            <div>📍 ${m.location || "Stadium"}</div>
        </div>
    `).join('');
}

function renderLastMatches() {
    const container = document.getElementById("lastMatchesContent");
    if (!container) return;
    const finished = liveMatches.filter(m => m.status === "Final" || (m.score1 !== null && m.score2 !== null)).slice(-5).reverse();
    container.innerHTML = finished.map(m => `
        <div class="match-item">
            <div class="match-date">📅 ${m.date}</div>
            <div class="match-teams">
                <span>${m.team1}</span>
                <span class="match-score">${m.score1 ?? '?'} - ${m.score2 ?? '?'}</span>
                <span>${m.team2}</span>
            </div>
        </div>
    `).join('') || "<div class='loading'>No recent matches</div>";
}

function renderNextMatches() {
    const container = document.getElementById("nextMatchesContent");
    if (!container) return;
    const upcoming = liveMatches.filter(m => m.status === "Scheduled" || (m.score1 === null && m.score2 === null));
    container.innerHTML = upcoming.map(m => `
        <div class="match-item">
            <div class="match-date">📅 ${m.date}</div>
            <div class="match-teams">
                <span>${m.team1}</span>
                <span>🆚</span>
                <span>${m.team2}</span>
            </div>
            <div>📍 ${m.location || "TBD"}</div>
        </div>
    `).join('');
}

// ========== SHARE FUNCTION ==========
function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'Blue Wave 2026',
            text: '🌊 Curaçao World Cup Tracker - Live scores, match schedules & fan zone!',
            url: window.location.href
        }).catch(() => {
            navigator.clipboard.writeText(window.location.href);
            alert('🔗 Link copied! Share: ' + window.location.href);
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('🔗 Link copied! Share: ' + window.location.href);
    }
}

// ========== ENTER APP ==========
function enterApp() {
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("appWrapper").style.display = "block";
    fetchLiveScores().then(() => {
        renderResults();
        renderLastMatches();
        renderNextMatches();
    });
    showSection('results');
}

// ========== TAB NAVIGATION ==========
function showSection(sectionId) {
    const sections = ["results", "last", "next"];
    sections.forEach(s => {
        const el = document.getElementById(`section-${s}`);
        if (el) el.style.display = "none";
    });
    const activeSection = document.getElementById(`section-${sectionId}`);
    if (activeSection) activeSection.style.display = "block";
    
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
        if (tab.getAttribute("data-tab") === sectionId) tab.classList.add("active");
    });
}

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", () => {
    renderPremium("premiumContainer");
    renderGold("goldContainer");
    renderSilver("silverScroller");
    
    const enterBtn = document.getElementById("enterAppBtn");
    if (enterBtn) enterBtn.addEventListener("click", enterApp);
    
    const shareBtn = document.getElementById("shareAppBtn");
    if (shareBtn) shareBtn.addEventListener("click", shareApp);
    
    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            const tabId = tab.getAttribute("data-tab");
            if (tabId) showSection(tabId);
        });
    });
});
