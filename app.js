/**
 * Personal Portal & Live Clock Logic
 * Clean, customizable, and responsive personal website.
 */

// Default configuration
const DEFAULT_CONFIG = {
  name: "Yui (yui000130)",
  title: "Developer • Creator • Lifelong Learner",
  bio: "歡迎來到我的個人網站！這裡記錄我的個人作品、技術積累與日常靈感。我熱衷於將複雜的想法轉化為優雅直觀的產品，並保持對前沿技術的好奇心。",
  is24Hour: false
};

// Application State
let state = {
  name: localStorage.getItem("personal_portal_name") || DEFAULT_CONFIG.name,
  title: localStorage.getItem("personal_portal_title") || DEFAULT_CONFIG.title,
  bio: localStorage.getItem("personal_portal_bio") || DEFAULT_CONFIG.bio,
  is24Hour: localStorage.getItem("personal_portal_24h") !== null 
    ? localStorage.getItem("personal_portal_24h") === "true" 
    : DEFAULT_CONFIG.is24Hour
};

// DOM Elements
const headerEl = document.getElementById("header");
const navBrandNameEl = document.getElementById("navBrandName");
const navTimeDisplayEl = document.getElementById("navTimeDisplay");
const navTzBadgeEl = document.getElementById("navTzBadge");
const navClockPillEl = document.getElementById("navClockPill");
const mobileMenuBtnEl = document.getElementById("mobileMenuBtn");
const navLinksEl = document.querySelector(".nav-links");

const heroNameDisplayEl = document.getElementById("heroNameDisplay");
const heroNameInputEl = document.getElementById("heroNameInput");
const editHeroNameBtnEl = document.getElementById("editHeroNameBtn");
const heroTitleDisplayEl = document.getElementById("heroTitleDisplay");
const heroTitleInputEl = document.getElementById("heroTitleInput");

const heroHoursEl = document.getElementById("heroHours");
const heroMinutesEl = document.getElementById("heroMinutes");
const heroSecondsEl = document.getElementById("heroSeconds");
const heroAmPmEl = document.getElementById("heroAmPm");
const heroDateDisplayEl = document.getElementById("heroDateDisplay");
const secProgressBarEl = document.getElementById("secProgressBar");
const secPercentLabelEl = document.getElementById("secPercentLabel");
const toggleFormatBtnEl = document.getElementById("toggleFormatBtn");
const formatTextEl = document.getElementById("formatText");
const heroTzDisplayEl = document.getElementById("heroTzDisplay");
const dayPercentDisplayEl = document.getElementById("dayPercentDisplay");

const aboutInitialsEl = document.getElementById("aboutInitials");
const aboutProfileNameEl = document.getElementById("aboutProfileName");
const aboutProfileRoleEl = document.getElementById("aboutProfileRole");
const aboutBioTextEl = document.getElementById("aboutBioText");
const aboutClockTextEl = document.getElementById("aboutClockText");
const footerAuthorNameEl = document.getElementById("footerAuthorName");
const resetNameBtnEl = document.getElementById("resetNameBtn");

// ==========================================================================
// Real-Time Clock & System Metrics
// ==========================================================================

const WEEKDAY_NAMES = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

function updateClock() {
  const now = new Date();
  const rawHours = now.getHours();
  const rawMinutes = now.getMinutes();
  const rawSeconds = now.getSeconds();
  const ms = now.getMilliseconds();

  // 12 vs 24 Hour Calculation
  let displayHours = rawHours;
  let ampm = "";

  if (!state.is24Hour) {
    ampm = rawHours >= 12 ? "PM" : "AM";
    displayHours = rawHours % 12;
    if (displayHours === 0) displayHours = 12;
    heroAmPmEl.style.display = "inline-block";
    heroAmPmEl.textContent = ampm;
  } else {
    heroAmPmEl.style.display = "none";
  }

  const strHours = String(displayHours).padStart(2, "0");
  const strMinutes = String(rawMinutes).padStart(2, "0");
  const strSeconds = String(rawSeconds).padStart(2, "0");

  // Update Hero Clock
  heroHoursEl.textContent = strHours;
  heroMinutesEl.textContent = strMinutes;
  heroSecondsEl.textContent = strSeconds;

  // Update Navbar Clock
  navTimeDisplayEl.textContent = `${strHours}:${strMinutes}:${strSeconds} ${ampm}`.trim();

  // Seconds Progress (0 - 60s)
  const secFraction = (rawSeconds + ms / 1000) / 60;
  const secPct = (secFraction * 100).toFixed(0);
  secProgressBarEl.style.width = `${secPct}%`;
  secPercentLabelEl.textContent = `${secPct}%`;

  // Day Progress (0 - 24h)
  const totalSecondsToday = (rawHours * 3600) + (rawMinutes * 60) + rawSeconds;
  const dayPct = ((totalSecondsToday / 86400) * 100).toFixed(1);
  dayPercentDisplayEl.textContent = `${dayPct}%`;

  // Formatted Date
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekday = WEEKDAY_NAMES[now.getDay()];
  heroDateDisplayEl.textContent = `${year} 年 ${month} 月 ${day} 日 ${weekday}`;

  // Timezone Detection
  try {
    const tzString = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Taipei";
    const offsetMin = -now.getTimezoneOffset();
    const sign = offsetMin >= 0 ? "+" : "-";
    const offsetHours = Math.floor(Math.abs(offsetMin) / 60);
    const tzOffsetStr = `UTC${sign}${offsetHours}`;

    heroTzDisplayEl.textContent = `${tzString} (${tzOffsetStr})`;
    navTzBadgeEl.textContent = tzOffsetStr;
    aboutClockTextEl.textContent = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${strHours}:${strMinutes}:${strSeconds} ${ampm} (${tzOffsetStr})`;
  } catch (e) {
    heroTzDisplayEl.textContent = "Local Time (UTC+8)";
  }
}

// 12/24 Hour Switch
function setupFormatToggle() {
  function updateBtnUI() {
    formatTextEl.textContent = state.is24Hour ? "切換為 12H 制" : "切換為 24H 制";
    updateClock();
  }

  toggleFormatBtnEl.addEventListener("click", () => {
    state.is24Hour = !state.is24Hour;
    localStorage.setItem("personal_portal_24h", state.is24Hour);
    updateBtnUI();
  });

  navClockPillEl.addEventListener("click", () => {
    state.is24Hour = !state.is24Hour;
    localStorage.setItem("personal_portal_24h", state.is24Hour);
    updateBtnUI();
  });

  updateBtnUI();
}

// ==========================================================================
// Profile Name & Title Customization
// ==========================================================================

function getInitials(name) {
  if (!name || !name.trim()) return "U";
  // Clean punctuation/brackets
  const clean = name.replace(/[()（）]/g, " ").trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function renderProfile() {
  heroNameDisplayEl.textContent = state.name;
  navBrandNameEl.textContent = state.name;
  aboutProfileNameEl.textContent = state.name;
  footerAuthorNameEl.textContent = state.name;

  heroTitleDisplayEl.textContent = state.title;
  aboutProfileRoleEl.textContent = state.title;
  aboutBioTextEl.textContent = state.bio;

  aboutInitialsEl.textContent = getInitials(state.name);
}

function setupProfileEditing() {
  // Name Editing
  function startEditingName() {
    heroNameInputEl.value = state.name;
    heroNameDisplayEl.classList.add("hidden");
    editHeroNameBtnEl.classList.add("hidden");
    heroNameInputEl.classList.remove("hidden");
    heroNameInputEl.focus();
    heroNameInputEl.select();
  }

  function finishEditingName() {
    const val = heroNameInputEl.value.trim();
    if (val) {
      state.name = val;
      localStorage.setItem("personal_portal_name", val);
    }
    renderProfile();
    heroNameInputEl.classList.add("hidden");
    heroNameDisplayEl.classList.remove("hidden");
    editHeroNameBtnEl.classList.remove("hidden");
  }

  heroNameDisplayEl.addEventListener("click", startEditingName);
  editHeroNameBtnEl.addEventListener("click", startEditingName);
  heroNameInputEl.addEventListener("blur", finishEditingName);
  heroNameInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finishEditingName();
    else if (e.key === "Escape") {
      heroNameInputEl.value = state.name;
      finishEditingName();
    }
  });

  // Title Editing
  function startEditingTitle() {
    heroTitleInputEl.value = state.title;
    heroTitleDisplayEl.classList.add("hidden");
    heroTitleInputEl.classList.remove("hidden");
    heroTitleInputEl.focus();
    heroTitleInputEl.select();
  }

  function finishEditingTitle() {
    const val = heroTitleInputEl.value.trim();
    if (val) {
      state.title = val;
      localStorage.setItem("personal_portal_title", val);
    }
    renderProfile();
    heroTitleInputEl.classList.add("hidden");
    heroTitleDisplayEl.classList.remove("hidden");
  }

  heroTitleDisplayEl.addEventListener("click", startEditingTitle);
  heroTitleInputEl.addEventListener("blur", finishEditingTitle);
  heroTitleInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finishEditingTitle();
    else if (e.key === "Escape") {
      heroTitleInputEl.value = state.title;
      finishEditingTitle();
    }
  });

  // Bio Editing
  aboutBioTextEl.addEventListener("click", () => {
    const newBio = prompt("修改您的個人簡介 Biography:", state.bio);
    if (newBio !== null && newBio.trim() !== "") {
      state.bio = newBio.trim();
      localStorage.setItem("personal_portal_bio", state.bio);
      aboutBioTextEl.textContent = state.bio;
    }
  });
}

// ==========================================================================
// Dual-Mode Header Scroll & Active Section Highlighting
// ==========================================================================

function setupHeaderScroll() {
  function onScroll() {
    if (window.scrollY > 40) {
      headerEl.classList.remove("alt");
    } else {
      headerEl.classList.add("alt");
    }

    // Active Section Link Highlight
    const sections = document.querySelectorAll("section[id], article[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll(".nav-links a").forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// Mobile Menu Toggle
function setupMobileMenu() {
  mobileMenuBtnEl.addEventListener("click", () => {
    navLinksEl.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinksEl.classList.remove("open");
    });
  });
}

// Reset Configuration
function setupReset() {
  resetNameBtnEl.addEventListener("click", () => {
    if (confirm("是否將所有姓名與設定恢復為預設值？")) {
      localStorage.removeItem("personal_portal_name");
      localStorage.removeItem("personal_portal_title");
      localStorage.removeItem("personal_portal_bio");
      localStorage.removeItem("personal_portal_24h");

      state.name = DEFAULT_CONFIG.name;
      state.title = DEFAULT_CONFIG.title;
      state.bio = DEFAULT_CONFIG.bio;
      state.is24Hour = DEFAULT_CONFIG.is24Hour;

      renderProfile();
      updateClock();
    }
  });
}

// ==========================================================================
// Initialization
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  setupProfileEditing();
  setupFormatToggle();
  setupHeaderScroll();
  setupMobileMenu();
  setupReset();

  // Real-time Clock loop
  updateClock();
  setInterval(updateClock, 1000);
});
