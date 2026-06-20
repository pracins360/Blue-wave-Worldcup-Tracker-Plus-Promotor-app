// ========== SPONSOR ROTATION (Shared across all apps) ==========
function getRotationIndex(total) {
    let idx = parseInt(localStorage.getItem("bwRot") || "0", 10);
    idx = (idx + 1) % total;
    localStorage.setItem("bwRot", idx);
    return idx;
}

function openLink(url) {
    if (url && url !== "#") window.open(url, "_blank");
}

// Premium sponsors - JUST LOGO, no text name overlay
const PREMIUM_GROUPS = [
    [
        { name: "Jaguar Pizza", logo: "https://placehold.co/400x150/white/003366?text=JAGUAR", link: "https://wa.me/59995120536" },
        { name: "AQUALECTRA", logo: "https://placehold.co/400x150/white/0057b8?text=AQUALECTRA", link: "https://wa.me/59995120536" },
        { name: "CAVALIER", logo: "https://placehold.co/400x150/white/ffcd3c?text=CAVALIER", link: "https://wa.me/59995120536" },
        { name: "MANGROVE BEACH", logo: "https://placehold.co/400x150/white/1f5e3a?text=MANGROVE", link: "https://wa.me/59995120536" }
    ],
    // ... rest of groups
];

// ========== GOLD SPONSORS (4 groups of 8) ==========
const GOLD_GROUPS = Array(4).fill().map((_, idx) => 
    Array(8).fill().map((__, i) => ({ 
        name: `Gold Sponsor ${idx * 8 + i + 1}`, 
        logo: `https://placehold.co/200x80/2c5e8c/white?text=Gold+${idx * 8 + i + 1}`, 
        link: "https://wa.me/59995120536" 
    }))
);

// ========== SILVER SHOUTOUTS (15 base messages + 4 groups of 10) ==========
const BASE_SHOUTS = [
    "💙 One love, Curaçao! 🇨🇼",
    "⚽ First World Cup in Curaçao!",
    "🌊 Blue Wave forever!",
    "🇨🇼 Proud to be Curaçaoan!",
    "🎉 Make history!",
    "💪 Support the Wave!",
    "🏆 2026 – Our year!",
    "⭐ Rise of the Blue Wave!",
    "🔥 Curaçao on fire!",
    "🤝 Together we win!",
    "🌈 Unity is strength!",
    "⚡ Feel the energy!",
    "🎯 Go for glory!",
    "💙 Blue Wave nation!",
    "🌊 Ride the Wave!"
];

const SILVER_GROUPS = [
    Array(10).fill().map(() => ({ name: "Café Tropical", message: "Best coffee on the island!" })),
    Array(10).fill().map(() => ({ name: "Aqua Rentals", message: "Explore Curaçao!" })),
    Array(10).fill().map(() => ({ name: "Sunrise Tours", message: "Discover paradise!" })),
    Array(10).fill().map(() => ({ name: "Fresh Market", message: "Local freshness daily!" }))
];

// ========== RENDER FUNCTIONS (shared) ==========
function renderPremium(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const groupIdx = getRotationIndex(3);
    const group = PREMIUM_GROUPS[groupIdx];
    container.innerHTML = group.map(ad => `
        <div class="premium-ad" onclick="openLink('${ad.link}')">
            <img src="${ad.logo}" alt="${ad.name}">
            <div class="ad-name">${ad.name}</div>
        </div>
    `).join('');
}

function renderGold(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const groupIdx = getRotationIndex(4);
    const group = GOLD_GROUPS[groupIdx];
    container.innerHTML = group.map(g => `
        <div class="gold-item" onclick="openLink('${g.link}')">
            <img src="${g.logo}" alt="${g.name}">
            <div>${g.name}</div>
        </div>
    `).join('');
}

function renderSilver(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const groupIdx = getRotationIndex(4);
    const extra = SILVER_GROUPS[groupIdx].map(s => `${s.name}: ${s.message}`);
    const allMessages = [...BASE_SHOUTS, ...extra];
    const doubled = [...allMessages, ...allMessages];
    container.innerHTML = doubled.map(msg => `<div class="silver-item">⚽ ${msg}</div>`).join('');
}
