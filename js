/* ============================================
   CONFIG
============================================ */
const API_URL = "https://script.google.com/macros/s/AKfycbyWVP3ZJZ_Hxhx5U2dWrzfvWRlcfemc7oOj6-mCniVkW5Sci2cusBJFy6ydnkNO4-pg/exec";

/* ============================================
   FLAG MAPPER (Emoji)
============================================ */
function flagFor(country) {
  if (!country) return "🏳️";
  const map = {
    "curacao": "🇨🇼",
    "brazil": "🇧🇷",
    "germany": "🇩🇪",
    "argentina": "🇦🇷",
    "france": "🇫🇷",
    "spain": "🇪🇸",
    "usa": "🇺🇸",
    "netherlands": "🇳🇱",
    "italy": "🇮🇹",
    "england": "🏴",
    "portugal": "🇵🇹",
    "colombia": "🇨🇴",
    "mexico": "🇲🇽",
    "japan": "🇯🇵",
    "south korea": "🇰🇷"
  };
  const key = country.toLowerCase().trim();
  return map[key] || "🏳️";
}

/* ============================================
   NAVIGATION
============================================ */
function goHome() {
  document.getElementById("countryCard").classList.add("hidden");
  document.getElementById("loyaltyCard").classList.add("hidden");
  hideAllSections();
}

function hideLoyalty() {
  document.getElementById("loyaltyCard").classList.add("hidden");
}

/* ============================================
   SECTION TABS
============================================ */
function hideAllSections() {
  document.getElementById("section-results").classList.add("hidden");
  document.getElementById("section-calendar").classList.add("hidden");
  document.getElementById("section-bracket").classList.add("hidden");
  document.getElementById("section-facts").classList.add("hidden");

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
}

function showSection(section) {
  hideAllSections();
  document.getElementById(`section-${section}`).classList.remove("hidden");

  document.querySelectorAll(".tab").forEach(t => {
    if (t.textContent.toLowerCase().includes(section)) {
      t.classList.add("active");
    }
  });
}

/* ============================================
   SPONSOR DATA (DEFINED ONCE)
============================================ */
const premiumSponsors = [
  { name: "BlueWave Bank", logo: "https://placehold.co/400x100/0057b8/white?text=BlueWave+Bank", link: "https://wa.me/59995550001" },
  { name: "Curaçao Energy", logo: "https://placehold.co/400x100/ffd23f/003f87?text=Curaçao+Energy", link: "https://wa.me/59995550002" },
  { name: "Island Telecom", logo: "https://placehold.co/400x100/003f87/white?text=Island+Telecom", link: "https://wa.me/59995550003" },
  { name: "Caribbean Motors", logo: "https://placehold.co/400x100/0057b8/white?text=Caribbean+Motors", link: "https://wa.me/59995550004" },
  { name: "Sunset Resorts", logo: "https://placehold.co/400x100/ffd23f/003f87?text=Sunset+Resorts", link: "https://wa.me/59995550005" },
  { name: "Ocean Fresh Foods", logo: "https://placehold.co/400x100/003f87/white?text=Ocean+Fresh", link: "https://wa.me/59995550006" },
  { name: "Harbor Logistics", logo: "https://placehold.co/400x100/0057b8/white?text=Harbor+Logistics", link: "https://wa.me/59995550007" },
  { name: "Royal Insurance", logo: "https://placehold.co/400x100/ffd23f/003f87?text=Royal+Insurance", link: "https://wa.me/59995550008" },
  { name: "BlueWave Bank 2", logo: "https://placehold.co/400x100/003f87/white?text=BlueWave+Bank+2", link: "https://wa.me/59995550009" },
  { name: "Curaçao Energy 2", logo: "https://placehold.co/400x100/0057b8/white?text=Energy+2", link: "https://wa.me/59995550010" },
  { name: "Island Telecom 2", logo: "https://placehold.co/400x100/ffd23f/003f87?text=Telecom+2", link: "https://wa.me/59995550011" },
  { name: "Caribbean Motors 2", logo: "https://placehold.co/400x100/003f87/white?text=Motors+2", link: "https://wa.me/59995550012" },
  { name: "Sunset Resorts 2", logo: "https://placehold.co/400x100/0057b8/white?text=Resorts+2", link: "https://wa.me/59995550013" },
  { name: "Ocean Fresh Foods 2", logo: "https://placehold.co/400x100/ffd23f/003f87?text=Ocean+Fresh+2", link: "https://wa.me/59995550014" },
  { name: "Harbor Logistics 2", logo: "https://placehold.co/400x100/003f87/white?text=Logistics+2", link: "https://wa.me/59995550015" },
  { name: "Royal Insurance 2", logo: "https://placehold.co/400x100/0057b8/white?text=Insurance+2", link: "https://wa.me/59995550016" }
];

const goldSponsors = [
  { name: "Island Fitness", logo: "https://placehold.co/200x100/0057b8/white?text=Fitness", link: "https://wa.me/59995551001" },
  { name: "Tropical Café", logo: "https://placehold.co/200x100/ffd23f/003f87?text=Café", link: "https://wa.me/59995551002" },
  { name: "Aqua Rentals", logo: "https://placehold.co/200x100/003f87/white?text=Aqua", link: "https://wa.me/59995551003" },
  { name: "Caribbean Print", logo: "https://placehold.co/200x100/0057b8/white?text=Print", link: "https://wa.me/59995551004" },
  { name: "Island Tech", logo: "https://placehold.co/200x100/ffd23f/003f87?text=Tech", link: "https://wa.me/59995551005" },
  { name: "Blue Taxi", logo: "https://placehold.co/200x100/003f87/white?text=Blue+Taxi", link: "https://wa.me/59995551006" },
  { name: "Fresh Market", logo: "https://placehold.co/200x100/0057b8/white?text=Fresh+Market", link: "https://wa.me/59995551007" },
  { name: "Harbor Café", logo: "https://placehold.co/200x100/ffd23f/003f87?text=Harbor+Café", link: "https://wa.me/59995551008" },
  { name: "Sunrise Tours", logo: "https://placehold.co/200x100/003f87/white?text=Sunrise", link: "https://wa.me/59995551009" },
  { name: "Island Auto", logo: "https://placehold.co/200x100/0057b8/white?text=Island+Auto", link: "https://wa.me/59995551010" },
  { name: "Island Fitness 2", logo: "https://placehold.co/200x100/ffd23f/003f87?text=Fitness+2", link: "https://wa.me/59995551011" },
  { name: "Tropical Café 2", logo: "https://placehold.co/200x100/003f87/white?text=Café+2", link: "https://wa.me/59995551012" },
  { name: "Aqua Rentals 2", logo: "https://placehold.co/200x100/0057b8/white?text=Aqua+2", link: "https://wa.me/59995551013" },
  { name: "Caribbean Print 2", logo: "https://placehold.co/200x100/ffd23f/003f87?text=Print+2", link: "https://wa.me/59995551014" },
  { name: "Island Tech 2", logo: "https://placehold.co/200x100/003f87/white?text=Tech+2", link: "https://wa.me/59995551015" },
  { name: "Blue Taxi 2", logo: "https://placehold.co/200x100/0057b8/white?text=Taxi+2", link: "https://wa.me/59995551016" },
  { name: "Fresh Market 2", logo: "https://placehold.co/200x100/ffd23f/003f87?text=Market+2", link: "https://wa.me/59995551017" },
  { name: "Harbor Café 2", logo: "https://placehold.co/200x100/003f87/white?text=Café+2", link: "https://wa.me/59995551018" },
  { name: "Sunrise Tours 2", logo: "https://placehold.co/200x100/0057b8/white?text=Tours+2", link: "https://wa.me/59995551019" },
  { name: "Island Auto 2", logo: "https://placehold.co/200x100/ffd23f/003f87?text=Auto+2", link: "https://wa.me/59995551020" }
];

const silverSponsors = [
  { name: "BlueWave Bank", message: "Supporting Curaçao’s youth" },
  { name: "Island Fitness", message: "Stay strong, stay active" },
  { name: "Tropical Café", message: "Fuel your day" },
  { name: "Aqua Rentals", message: "Explore the island" },
  { name: "Caribbean Print", message: "Print with pride" },
  { name: "Island Tech", message: "Innovation for all" },
  { name: "Blue Taxi", message: "Ride with comfort" },
  { name: "Fresh Market", message: "Local freshness daily" },
  { name: "Harbor Café", message: "Taste the island" },
  { name: "Sunrise Tours", message: "Discover Curaçao" },
  { name: "BlueWave Bank 2", message: "Proud to support the community" },
  { name: "Island Fitness 2", message: "Your health matters" },
  { name: "Tropical Café 2", message: "Good vibes only" },
  { name: "Aqua Rentals 2", message: "Adventure awaits" },
  { name: "Caribbean Print 2", message: "Quality you trust" },
  { name: "Island Tech 2", message: "Tech made simple" },
  { name: "Blue Taxi 2", message: "We take you there" },
  { name: "Fresh Market 2", message: "Eat well, live well" },
  { name: "Harbor Café 2", message: "Island flavor" },
  { name: "Sunrise Tours 2", message: "See the beauty" },
  { name: "Ocean Fresh Foods", message: "Taste the ocean" },
  { name: "Harbor Logistics", message: "Moving Curaçao forward" },
  { name: "Royal Insurance", message: "Protecting what matters" },
  { name: "Sunset Resorts", message: "Relax in paradise" },
  { name: "Island Auto", message: "Drive with confidence" },
  { name: "Curaçao Energy", message: "Powering the island" },
  { name: "Island Telecom", message: "Stay connected" },
  { name: "Caribbean Motors", message: "Your journey starts here" },
  { name: "Ocean Fresh Foods 2", message: "Fresh every day" },
  { name: "Royal Insurance 2", message: "We’ve got you covered" }
];

const PREMIUM_GROUP_SIZE = 8;
const GOLD_GROUP_SIZE = 10;
const SILVER_GROUP_SIZE = 10;

/* ============================================
   ROTATION COUNTER (PER APP OPEN)
============================================ */
function getRotationIndex() {
  let rotation = parseInt(localStorage.getItem("bwRotation") || "0", 10);
  rotation = rotation + 1;
  localStorage.setItem("bwRotation", rotation);
  return rotation;
}

/* ============================================
   GROUP SELECTION HELPERS
============================================ */
function getGroup(items, groupSize, groupCount, rotationIndex) {
  const groupIndex = (rotationIndex - 1) % groupCount;
  const start = groupIndex * groupSize;
  return items.slice(start, start + groupSize);
}

/* ============================================
   RENDER FUNCTIONS
============================================ */
function renderPremium(group) {
  const container = document.getElementById("premiumContainer");
  if (!container) return;
  container.innerHTML = "";
  group.forEach(s => {
    container.innerHTML += `
      <div class="premium-banner" onclick="openLink('${s.link}')">
        <img src="${s.logo}" alt="${s.name}">
      </div>
    `;
  });
}

function renderGold(group) {
  const container = document.getElementById("goldContainer");
  if (!container) return;
  container.innerHTML = "";
  group.forEach(s => {
    container.innerHTML += `
      <div class="gold-item" onclick="openLink('${s.link}')">
        <img src="${s.logo}" alt="${s.name}">
      </div>
    `;
  });
}

function renderSilver(group) {
  const container = document.getElementById("silverScroller");
  if (!container) return;
  // Double the items for seamless looping
  const doubled = [...group, ...group];
  container.innerHTML = "";
  doubled.forEach(s => {
    container.innerHTML += `
      <div class="silver-item">
        <span class="silver-name">${s.name}</span>
        <span class="silver-message"> – ${s.message}</span>
      </div>
    `;
  });
}

/* ============================================
   LINK HELPER
============================================ */
function openLink(url) {
  if (url && url !== "") window.open(url, "_blank");
}

/* ============================================
   INITIALIZE LANDING PAGE ROTATION
============================================ */
function initLandingPageSponsors() {
  console.log("Initializing landing page sponsors...");
  
  const rotationIndex = getRotationIndex();
  console.log("Rotation index:", rotationIndex);

  const premiumGroupCount = Math.ceil(premiumSponsors.length / PREMIUM_GROUP_SIZE) || 1;
  const premiumGroup = getGroup(premiumSponsors, PREMIUM_GROUP_SIZE, premiumGroupCount, rotationIndex);
  renderPremium(premiumGroup);

  const goldGroupCount = Math.ceil(goldSponsors.length / GOLD_GROUP_SIZE) || 1;
  const goldGroup = getGroup(goldSponsors, GOLD_GROUP_SIZE, goldGroupCount, rotationIndex);
  renderGold(goldGroup);

  const silverGroupCount = Math.ceil(silverSponsors.length / SILVER_GROUP_SIZE) || 1;
  const silverGroup = getGroup(silverSponsors, SILVER_GROUP_SIZE, silverGroupCount, rotationIndex);
  renderSilver(silverGroup);
  
  console.log("Sponsors rendered successfully!");
}

/* ============================================
   ENTER APP (HIDE LANDING, SHOW UI)
============================================ */
// ========== ENTER APP ==========
function enterApp() {
    console.log("🚀 Enter App clicked!");
    
    // Hide landing page
    const landing = document.getElementById('landingPage');
    const app = document.getElementById('appWrapper');
    
    if (landing) landing.style.display = 'none';
    if (app) app.style.display = 'block';
    
    // Load data and show results
    fetchAllData().then(() => {
        renderSilver();
        renderResults();
        renderToday();
        renderStandings();
        renderUpcoming();
        renderFacts();
        renderCalendar();
        renderPromoList();
        renderShoutouts();
        showSection('results');
        console.log("✅ App ready!");
    }).catch(err => {
        console.error("❌ Error loading data:", err);
        // Still show the app even if data fails
        showSection('results');
    });
}
  
  if (app) {
    app.style.display = "block";
    console.log("App wrapper shown");
  } else {
    console.error("Element 'appWrapper' not found!");
  }
}

/* ============================================
   LOAD COUNTRY
============================================ */
async function loadCountry(name) {
  const res = await fetch(`${API_URL}?action=country&country=${encodeURIComponent(name)}`);
  const data = await res.json();
  if (!data) return;

  document.getElementById("countryCard").classList.remove("hidden");

  document.getElementById("countryName").textContent = data.Country;
  document.getElementById("countryFlag").textContent = flagFor(data.Country);
  document.getElementById("countryGroup").textContent = data.Group;
  document.getElementById("countryPos").textContent = data.Pos;
  document.getElementById("countryPts").textContent = data.Pts;
  document.getElementById("countryGF").textContent = data.GF;
  document.getElementById("countryGA").textContent = data.GA;
  document.getElementById("countryLast").textContent = data.LastMatch;

  const wave = parseInt(data["WAVE%"] || data["WAVE %"] || 0);
  document.getElementById("waveValue").textContent = wave + "%";
  document.getElementById("waveFill").style.width = wave + "%";

  document.getElementById("countryAnalysis").textContent = data.Analysis;
}

/* ============================================
   LOAD LOYALTY MATCH
============================================ */
function loadLoyalty(loyalty) {
  if (!loyalty || loyalty.length === 0) return;

  const match = loyalty.find(m =>
    m.Active === true ||
    String(m.Active).toUpperCase() === "TRUE"
  );

  if (!match) return;

  document.getElementById("loyaltyCard").classList.remove("hidden");

  document.getElementById("loyaltyTeamA").textContent = match.TeamA;
  document.getElementById("loyaltyTeamB").textContent = match.TeamB;
  document.getElementById("loyaltyResult").textContent = match.Result;
  document.getElementById("loyaltyVoucher").textContent = match.VoucherCode;
}

/* ============================================
   LOAD SPONSORS
============================================ */
function loadSponsors(sponsors) {
  const list = document.getElementById("sponsorList");
  if (!list) return;
  list.innerHTML = "";

  sponsors.forEach(s => {
    const div = document.createElement("div");
    div.className = "sponsor-item";

    div.innerHTML = `
      <div class="sponsor-main">
        <div class="sponsor-name">${s.SponsorName}</div>
        <div class="sponsor-tier">Tier: ${s.Tier}</div>
      </div>
      <div class="sponsor-actions">
        <div class="link-pill" onclick="openLink('${s.AdURL}')">Ad</div>
        <div class="link-pill" onclick="openLink('${s.WhatsAppLink}')">WhatsApp</div>
      </div>
    `;

    list.appendChild(div);
  });

  loadChallenge(sponsors);
}

/* ============================================
   LOAD ACTIVE CHALLENGE
============================================ */
function loadChallenge(sponsors) {
  const active = sponsors.find(s =>
    s.ActiveChallenge === true ||
    String(s.ActiveChallenge).toUpperCase() === "TRUE"
  );

  if (!active) return;

  document.getElementById("challengeCard").classList.remove("hidden");
  document.getElementById("challengeTitle").textContent = active.ChallengeTitle;
  document.getElementById("challengeTeaser").textContent = active.ChallengeTeaser;
  document.getElementById("challengeLink").setAttribute("data-url", active.ChallengeLink);
}

function openChallenge() {
  const url = document.getElementById("challengeLink").getAttribute("data-url");
  if (url) window.open(url, "_blank");
}

/* ============================================
   LOAD RESULTS / CALENDAR / BRACKET / FACTS
============================================ */
function loadResults(matches) {
  const el = document.getElementById("resultsContent");
  if (el) el.textContent = JSON.stringify(matches, null, 2);
}

function loadCalendar(matches) {
  const el = document.getElementById("calendarContent");
  if (el) el.textContent = JSON.stringify(matches, null, 2);
}

function loadBracket(bracket) {
  const el = document.getElementById("bracketContent");
  if (el) el.textContent = JSON.stringify(bracket, null, 2);
}

function loadFacts(facts) {
  const el = document.getElementById("factsContent");
  if (el) el.textContent = JSON.stringify(facts, null, 2);
}

/* ============================================
   INIT
============================================ */
async function loadAll() {
  try {
    const res = await fetch(`${API_URL}?action=all`);
    const data = await res.json();
    if (!data) return;

    if (data.sponsors) loadSponsors(data.sponsors);
    if (data.loyalty) loadLoyalty(data.loyalty);
    if (data.matches) {
      loadResults(data.matches);
      loadCalendar(data.matches);
    }
    if (data.bracket) loadBracket(data.bracket);
    if (data.facts) loadFacts(data.facts);

    showSection('results');
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

/* ============================================
   PAGE LOAD INITIALIZATION
============================================ */
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded - initializing...");
  initLandingPageSponsors();
  loadAll();
});
