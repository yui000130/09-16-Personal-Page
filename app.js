/**
 * Personal Portal & Live Clock Logic
 * DIC-1 Compliant Personal Page with In-Browser Profile Editor
 */

// Default configuration
const DEFAULT_CONFIG = {
  name: "游雅筑",
  title: "資訊工程與軟體開發 • 數位創新與智慧系統探索者",
  avatar: "筑",
  bio: "你好！我是游雅筑，熱愛科技與程式開發。目前專注於網頁前端技術、Python 資料應用與系統開發。我相信好的程式不僅要具備嚴謹的邏輯結構，更需要兼顧直覺且優雅的使用者體驗。平時喜歡透過實作專案累積經驗，積極擁抱 AI 輔助開發工具，不斷拓展自己在軟體工程領域的技術邊界。",
  skills: "Python (資料處理與自動化), Web Development (HTML5/CSS3/JS), AI & Machine Learning 應用探索, C / C++ 程式設計, Git & GitHub 版本控制, UI/UX 響應式設計, GitHub Pages 部署, Data Analysis 數據分析",
  projName: "09-16-Personal-Page (即時時鐘個人首頁)",
  projDesc: "本學期個人代表網站。使用 Antigravity 與 AI 工具協作開發，整合了毫秒級跳動的 JavaScript 即時系統時鐘、雙態懸浮導覽列、個人檔案動態客製化以及 GitHub Pages 自動發布管線。",
  projLink: "https://github.com/yui000130/09-16-Personal-Page",
  is24Hour: false
};

// Application State
let state = {
  name: localStorage.getItem("personal_portal_name") || DEFAULT_CONFIG.name,
  title: localStorage.getItem("personal_portal_title") || DEFAULT_CONFIG.title,
  avatar: localStorage.getItem("personal_portal_avatar") || DEFAULT_CONFIG.avatar,
  bio: localStorage.getItem("personal_portal_bio") || DEFAULT_CONFIG.bio,
  skills: localStorage.getItem("personal_portal_skills") || DEFAULT_CONFIG.skills,
  projName: localStorage.getItem("personal_portal_proj_name") || DEFAULT_CONFIG.projName,
  projDesc: localStorage.getItem("personal_portal_proj_desc") || DEFAULT_CONFIG.projDesc,
  projLink: localStorage.getItem("personal_portal_proj_link") || DEFAULT_CONFIG.projLink,
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
const heroTitleDisplayEl = document.getElementById("heroTitleDisplay");

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
const metaDeptTextEl = document.getElementById("metaDeptText");
const aboutClockTextEl = document.getElementById("aboutClockText");
const footerAuthorNameEl = document.getElementById("footerAuthorName");
const resetNameBtnEl = document.getElementById("resetNameBtn");

const skillsTagCloudEl = document.getElementById("skillsTagCloud");
const proj1TitleEl = document.getElementById("proj1Title");
const proj1DescEl = document.getElementById("proj1Desc");
const proj1LinkEl = document.getElementById("proj1Link");

// Modal Elements
const profileEditModalEl = document.getElementById("profileEditModal");
const openEditModalBtnEl = document.getElementById("openEditModalBtn");
const openEditModalBtn2El = document.getElementById("openEditModalBtn2");
const quickEditBtnHeroEl = document.getElementById("quickEditBtnHero");
const closeModalBtnEl = document.getElementById("closeModalBtn");
const cancelModalBtnEl = document.getElementById("cancelModalBtn");
const saveModalBtnEl = document.getElementById("saveModalBtn");

const inputUserNameEl = document.getElementById("inputUserName");
const inputUserTitleEl = document.getElementById("inputUserTitle");
const inputUserAvatarEl = document.getElementById("inputUserAvatar");
const inputUserBioEl = document.getElementById("inputUserBio");
const inputUserSkillsEl = document.getElementById("inputUserSkills");
const inputProjNameEl = document.getElementById("inputProjName");
const inputProjDescEl = document.getElementById("inputProjDesc");
const inputProjLinkEl = document.getElementById("inputProjLink");

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
// Profile & Dynamic Content Rendering
// ==========================================================================

function getInitials(name) {
  if (!name || !name.trim()) return "筑";
  const chineseChars = name.replace(/[()（）a-zA-Z0-9_\s]/g, "").trim();
  if (chineseChars.length > 0) {
    return chineseChars.slice(-1);
  }
  const clean = name.replace(/[()（）]/g, " ").trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function renderProfile() {
  // Profile Name
  heroNameDisplayEl.textContent = state.name;
  navBrandNameEl.textContent = `${state.name} (Yui)`;
  aboutProfileNameEl.textContent = state.name;
  footerAuthorNameEl.textContent = `${state.name} (Yui)`;

  // Title / Department
  heroTitleDisplayEl.textContent = state.title;
  aboutProfileRoleEl.textContent = state.title;
  if (metaDeptTextEl) metaDeptTextEl.textContent = state.title;

  // Bio
  aboutBioTextEl.textContent = state.bio;

  // Avatar Initials
  aboutInitialsEl.textContent = state.avatar || getInitials(state.name);

  // Projects
  if (proj1TitleEl) proj1TitleEl.textContent = state.projName;
  if (proj1DescEl) proj1DescEl.innerHTML = `<strong>專案說明：</strong>${state.projDesc}`;
  if (proj1LinkEl) proj1LinkEl.href = state.projLink;

  // Render Skills Tags Cloud
  if (skillsTagCloudEl && state.skills) {
    const list = state.skills.split(",").map(s => s.trim()).filter(Boolean);
    skillsTagCloudEl.innerHTML = "";
    list.forEach((skill, idx) => {
      const span = document.createElement("span");
      span.className = `tag-chip ${idx < 3 ? "accent" : ""}`;
      span.textContent = skill;
      skillsTagCloudEl.appendChild(span);
    });
  }
}

// ==========================================================================
// Profile Editor Modal (修改檔案 / 編輯個人資料視窗)
// ==========================================================================

function openEditModal() {
  inputUserNameEl.value = state.name;
  inputUserTitleEl.value = state.title;
  inputUserAvatarEl.value = state.avatar || getInitials(state.name);
  inputUserBioEl.value = state.bio;
  inputUserSkillsEl.value = state.skills;
  inputProjNameEl.value = state.projName;
  inputProjDescEl.value = state.projDesc;
  inputProjLinkEl.value = state.projLink;

  profileEditModalEl.classList.remove("hidden");
}

function closeEditModal() {
  profileEditModalEl.classList.add("hidden");
}

function saveEditModal() {
  const newName = inputUserNameEl.value.trim();
  const newTitle = inputUserTitleEl.value.trim();
  const newAvatar = inputUserAvatarEl.value.trim();
  const newBio = inputUserBioEl.value.trim();
  const newSkills = inputUserSkillsEl.value.trim();
  const newProjName = inputProjNameEl.value.trim();
  const newProjDesc = inputProjDescEl.value.trim();
  const newProjLink = inputProjLinkEl.value.trim();

  if (newName) state.name = newName;
  if (newTitle) state.title = newTitle;
  if (newAvatar) state.avatar = newAvatar;
  if (newBio) state.bio = newBio;
  if (newSkills) state.skills = newSkills;
  if (newProjName) state.projName = newProjName;
  if (newProjDesc) state.projDesc = newProjDesc;
  if (newProjLink) state.projLink = newProjLink;

  localStorage.setItem("personal_portal_name", state.name);
  localStorage.setItem("personal_portal_title", state.title);
  localStorage.setItem("personal_portal_avatar", state.avatar);
  localStorage.setItem("personal_portal_bio", state.bio);
  localStorage.setItem("personal_portal_skills", state.skills);
  localStorage.setItem("personal_portal_proj_name", state.projName);
  localStorage.setItem("personal_portal_proj_desc", state.projDesc);
  localStorage.setItem("personal_portal_proj_link", state.projLink);

  renderProfile();
  closeEditModal();
}

function setupModalListeners() {
  if (openEditModalBtnEl) openEditModalBtnEl.addEventListener("click", openEditModal);
  if (openEditModalBtn2El) openEditModalBtn2El.addEventListener("click", openEditModal);
  if (quickEditBtnHeroEl) quickEditBtnHeroEl.addEventListener("click", openEditModal);
  if (heroNameDisplayEl) heroNameDisplayEl.addEventListener("click", openEditModal);

  if (closeModalBtnEl) closeModalBtnEl.addEventListener("click", closeEditModal);
  if (cancelModalBtnEl) cancelModalBtnEl.addEventListener("click", closeEditModal);
  if (saveModalBtnEl) saveModalBtnEl.addEventListener("click", saveEditModal);

  // Close on click outside
  profileEditModalEl.addEventListener("click", (e) => {
    if (e.target === profileEditModalEl) closeEditModal();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !profileEditModalEl.classList.contains("hidden")) {
      closeEditModal();
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
    const scrollPos = window.scrollY + 140;

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
    if (confirm("是否將所有個人資料與設定恢復為預設值？")) {
      localStorage.clear();

      state.name = DEFAULT_CONFIG.name;
      state.title = DEFAULT_CONFIG.title;
      state.avatar = DEFAULT_CONFIG.avatar;
      state.bio = DEFAULT_CONFIG.bio;
      state.skills = DEFAULT_CONFIG.skills;
      state.projName = DEFAULT_CONFIG.projName;
      state.projDesc = DEFAULT_CONFIG.projDesc;
      state.projLink = DEFAULT_CONFIG.projLink;
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
  setupModalListeners();
  setupFormatToggle();
  setupHeaderScroll();
  setupMobileMenu();
  setupReset();

  // Real-time Clock loop
  updateClock();
  setInterval(updateClock, 1000);
});
