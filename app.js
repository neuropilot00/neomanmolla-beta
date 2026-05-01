const gameData = window.NEOMANMOLLA_DATA;
const { avatars, frames, metrics, packs, playerNames, themes } = gameData;
const STORAGE_KEY = "neomanmolla-beta-state";
const EVENTS_KEY = "neomanmolla-beta-events";

const state = {
  mode: "party",
  playerCount: 5,
  phase: "lobby",
  roomCode: "7294",
  roundIndex: 0,
  fakeIndex: 0,
  hostIndex: 0,
  revealed: [],
  answers: [],
  votes: [],
  selectedVote: null,
  log: [],
  score: 0,
  streak: 0,
  lives: 3,
  questionNo: 1,
  hintUsed: false,
  lastSuccess: false,
  selectedAvatar: 0,
  selectedFrame: frames[0].id,
  selectedTheme: themes[0],
  selectedPack: packs[0].name,
  customNames: [...playerNames],
  currentAnswer: "",
  launchChecklist: {
    rule: false,
    result: false,
    replay: false,
    invite: false,
  },
  toast: "",
};

const app = document.querySelector("#app");

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function cleanText(value, fallback = "") {
  return String(value || fallback).replace(/[<>"'&]/g, "").trim();
}

function generateRoomCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function saveSettings() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      selectedAvatar: state.selectedAvatar,
      selectedFrame: state.selectedFrame,
      selectedPack: state.selectedPack,
      selectedTheme: state.selectedTheme,
      customNames: state.customNames,
    }),
  );
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (Number.isInteger(saved.selectedAvatar)) state.selectedAvatar = saved.selectedAvatar;
    if (frames.some((frame) => frame.id === saved.selectedFrame)) state.selectedFrame = saved.selectedFrame;
    if (packs.some((pack) => pack.name === saved.selectedPack)) state.selectedPack = saved.selectedPack;
    if (themes.includes(saved.selectedTheme)) state.selectedTheme = saved.selectedTheme;
    if (Array.isArray(saved.customNames)) state.customNames = playerNames.map((name, index) => cleanText(saved.customNames[index], name));
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function applyUrlRoom() {
  const params = new URLSearchParams(window.location.search);
  const room = params.get("room");
  if (!room) return;

  state.roomCode = room;
  state.selectedPack = params.get("pack") || state.selectedPack;
  state.selectedTheme = params.get("theme") || state.selectedTheme;
  state.playerCount = Number(params.get("players")) || 4;
  state.phase = "joinRoom";
}

function track(eventName) {
  const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || "{}");
  events[eventName] = (events[eventName] || 0) + 1;
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

function betaStats() {
  return JSON.parse(localStorage.getItem(EVENTS_KEY) || "{}");
}

function roomInviteUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("room", state.roomCode);
  url.searchParams.set("pack", state.selectedPack);
  url.searchParams.set("theme", state.selectedTheme);
  url.searchParams.set("players", String(state.playerCount));
  return url.toString();
}

function resultText() {
  const fake = state.answers[state.fakeIndex];
  const verdict = state.lastSuccess ? "맞혔다" : "속았다";
  const round = currentRound();
  return [
    `너만 몰라 결과: ${verdict}`,
    `가짜는 ${fake.player}`,
    `공통 질문: ${round.innocent}`,
    `가짜 질문: ${round.fake}`,
    `${selectedPack().name} 팩`,
    roomInviteUrl(),
  ].join("\n");
}

function feedbackText() {
  const stats = betaStats();
  return [
    "너만 몰라 베타 피드백",
    `질문팩: ${state.selectedPack}`,
    `방 테마: ${state.selectedTheme}`,
    `혼자 플레이 시작: ${stats.soloStart || 0}`,
    `결과 확인: ${stats.resultView || 0}`,
    `초대 복사: ${stats.inviteCopy || 0}`,
    "1. 룰 이해:",
    "2. 왜 가짜인지 납득:",
    "3. 3판 이상 재플레이 의향:",
    "4. 친구에게 보낼 의향:",
    "5. 돈 내도 살 질문팩:",
  ].join("\n");
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    state.toast = message;
  } catch {
    state.toast = "복사가 막혔어요. HTTPS 배포 링크에서는 정상 동작합니다";
  }
  render();
}

function players() {
  return state.customNames.slice(0, state.playerCount).map((name, index) => ({
    name: cleanText(name, playerNames[index]),
    avatar: avatars[index],
    index,
    fake: index === state.fakeIndex,
  }));
}

function avatarMarkup(index, extraClass = "") {
  const avatar = avatars[index] || { label: "?" };
  const className = ["avatar", avatar.src ? "image-avatar" : "", extraClass].filter(Boolean).join(" ");
  if (!avatar.src) return `<span class="${className}">${avatar.label}</span>`;
  return `<span class="${className}"><img src="${avatar.src}" alt="" /></span>`;
}

function profileAvatarMarkup(extraClass = "") {
  return avatarMarkup(state.selectedAvatar, extraClass);
}

function selectedPack() {
  return packs.find((pack) => pack.name === state.selectedPack) || packs[0];
}

function activeRounds() {
  return selectedPack().rounds;
}

function currentRound() {
  const rounds = activeRounds();
  return rounds[state.roundIndex % rounds.length];
}

function startGame() {
  track("partyStart");
  state.mode = "party";
  state.phase = "roles";
  state.roundIndex = Math.floor(Math.random() * activeRounds().length);
  state.fakeIndex = Math.floor(Math.random() * state.playerCount);
  state.hostIndex = 0;
  state.revealed = [];
  state.answers = players().map((player) => ({
    player: player.name,
    text: "",
    question: player.fake ? currentRound().fake : currentRound().innocent,
    role: player.fake ? "가짜 질문" : "공통 질문",
    suspicious: player.fake,
  }));
  state.votes = Array(state.playerCount).fill(null);
  state.selectedVote = null;
  state.currentAnswer = "";
  state.log = ["방 생성 완료", "한 명만 다른 질문을 받았습니다"];
  render();
}

function startSolo() {
  track("soloStart");
  state.mode = "solo";
  state.playerCount = 4;
  state.score = 0;
  state.streak = 0;
  state.lives = 3;
  state.questionNo = 1;
  newSoloRound();
}

function newSoloRound() {
  state.phase = "solo";
  state.roundIndex = Math.floor(Math.random() * activeRounds().length);
  state.fakeIndex = Math.floor(Math.random() * state.playerCount);
  state.hintUsed = false;
  state.selectedVote = null;
  state.answers = players().map((player, index) => ({
    player: index === 0 ? "나" : player.name,
    text: makeBotAnswer(index),
    question: index === state.fakeIndex ? currentRound().fake : currentRound().innocent,
    role: index === state.fakeIndex ? "가짜 질문" : "공통 질문",
    suspicious: index === state.fakeIndex,
  }));
  render();
}

function makeBotAnswer(index) {
  const round = currentRound();
  const safePool = round.botAnswers || round.answers.slice(0, 4);
  const weirdPool = round.fakeAnswers || round.answers.slice(3);
  const personalityAnswers = {
    0: ["무난하게 " + sample(safePool), sample(safePool)],
    1: [sample(safePool), sample(safePool)],
    2: [sample(["요즘은 " + sample(safePool), sample(safePool)])],
    3: [sample(safePool), sample(safePool)],
    4: [sample(["솔직히 " + sample(safePool), sample(safePool)])],
  };

  if (index === state.fakeIndex) return sample(weirdPool);
  return sample(personalityAnswers[index] || safePool);
}

function nextRole() {
  state.revealed[state.hostIndex] = true;
  if (state.hostIndex < state.playerCount - 1) {
    state.hostIndex += 1;
  } else {
    state.hostIndex = 0;
    state.currentAnswer = "";
    state.phase = "answerInput";
    state.log.unshift("답변 입력 시작");
  }
  render();
}

function submitAnswer() {
  const answer = cleanText(state.currentAnswer);
  if (!answer) {
    state.toast = "짧게라도 답변을 적어야 다음으로 넘어가요";
    render();
    return;
  }

  state.answers[state.hostIndex].text = answer;
  state.currentAnswer = "";
  if (state.hostIndex < state.playerCount - 1) {
    state.hostIndex += 1;
    render();
    return;
  }

  state.phase = "answer";
  state.log.unshift("모든 답변 입력 완료");
  render();
}

function quickAnswer() {
  const round = currentRound();
  const pool = state.hostIndex === state.fakeIndex ? round.fakeAnswers || round.answers : round.botAnswers || round.answers;
  state.currentAnswer = sample(pool);
  submitAnswer();
}

function revealAnswers() {
  state.phase = "talk";
  state.log.unshift("답변 공개");
  render();
}

function beginVote() {
  state.phase = "vote";
  state.selectedVote = null;
  state.log.unshift("투표 시작");
  render();
}

function castVote(index) {
  state.selectedVote = index;
  if (state.mode === "solo") {
    finishSoloVote(index);
    return;
  }
  state.votes = state.votes.map((_, voteIndex) => {
    if (voteIndex === state.fakeIndex) return Math.random() > 0.55 ? index : (index + 1) % state.playerCount;
    return Math.random() > 0.32 ? state.fakeIndex : Math.floor(Math.random() * state.playerCount);
  });
  state.votes[0] = index;
  state.phase = "result";
  state.log.unshift(`${players()[0].name}님이 ${players()[index].name}님에게 투표`);
  state.lastSuccess = index === state.fakeIndex;
  track("resultView");
  render();
}

function finishSoloVote(index) {
  const success = index === state.fakeIndex;
  const base = state.hintUsed ? 60 : 100;
  state.lastSuccess = success;
  state.streak = success ? state.streak + 1 : 0;
  state.score += success ? base + Math.min(state.streak * 15, 90) : 0;
  state.lives -= success ? 0 : 1;
  state.phase = state.lives <= 0 ? "soloGameOver" : "soloResult";
  track("resultView");
  render();
}

function useHint() {
  state.hintUsed = true;
  render();
}

function nextSoloRound() {
  state.questionNo += 1;
  newSoloRound();
}

function resetRound() {
  state.roundIndex += 1;
  startGame();
}

function setPlayerCount(count) {
  state.playerCount = count;
  render();
}

function shell(content) {
  const soloClass = state.phase.startsWith("solo") ? " solo-mode" : "";
  app.innerHTML = `
    <section class="phone${soloClass}">
      <header class="topbar">
        <div>
          <p class="eyebrow">4-6인 실시간 파티 추리</p>
          <h1>너만 몰라</h1>
        </div>
        <div class="room-code">ROOM ${state.roomCode}</div>
      </header>
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
      ${content}
    </section>
  `;
  state.toast = "";
}

function lobbyView() {
  shell(`
    <section class="hero-card">
      <img class="hero-art" src="./assets/ui/hero-accuse-pixel-900.png" alt="서로를 의심하며 삿대질하는 네 명의 픽셀 아트 캐릭터" />
      <div class="hero-copy">
        <div class="tag">2분 소셜 추리</div>
        <h2>답변 하나로 친구를 의심하세요.</h2>
        <p>한 명만 다른 질문을 받습니다. 자연스러운 척하는 답변을 찾아내세요.</p>
        <button class="primary full" data-action="solo-start">혼자 플레이</button>
        <div class="hero-actions">
          <button class="secondary" data-action="room-create">방 만들기</button>
          <button class="secondary" data-action="profile">내 프로필</button>
        </div>
      </div>
    </section>
    ${mvpOverview()}
    ${packPreview()}
    ${monetizePanel()}
  `);
}

function profileView() {
  shell(`
    <section class="panel profile-panel">
      <div class="section-head">
        <span>My Profile</span>
        <strong>보여야 팔립니다</strong>
      </div>
      <div class="profile-preview ${state.selectedFrame}">
        ${profileAvatarMarkup("profile-avatar")}
        <div>
          <strong>나</strong>
          <p>${frameLabel(state.selectedFrame)} 프레임 적용 중</p>
        </div>
      </div>
      <div class="avatar-picker">
        ${avatars.map((avatar, index) => `
          <button class="${state.selectedAvatar === index ? "selected" : ""}" data-avatar="${index}">
            ${avatarMarkup(index)}
          </button>
        `).join("")}
      </div>
      <div class="frame-picker">
        ${frames.map((frame) => `
          <button class="${state.selectedFrame === frame.id ? "selected" : ""}" data-frame="${frame.id}">
            <span class="frame-dot ${frame.id}"></span>${frame.label}
          </button>
        `).join("")}
      </div>
      <button class="primary full" data-action="back-lobby">저장</button>
    </section>
  `);
}

function roomCreateView() {
  shell(`
    <section class="panel room-panel">
      <div class="section-head">
        <span>Create Room</span>
        <strong>테스트 링크 만들기</strong>
      </div>
      <div class="room-preview">
        <span>ROOM ${state.roomCode}</span>
        <strong>${state.selectedTheme}</strong>
        <p>${state.selectedPack} 질문팩 · ${state.playerCount}명 · 링크 초대</p>
      </div>
      <div class="count-row">
        ${[4, 5, 6].map((count) => `
          <button class="${state.playerCount === count ? "active" : ""}" data-count="${count}">${count}명</button>
        `).join("")}
      </div>
      <div class="option-group">
        <span>방 테마</span>
        ${themes.map((theme) => `
          <button class="${state.selectedTheme === theme ? "selected" : ""}" data-theme="${theme}">${theme}</button>
        `).join("")}
      </div>
      <div class="option-group">
        <span>질문팩</span>
        ${packs.map((pack) => `
          <button class="${state.selectedPack === pack.name ? "selected" : ""}" data-pack="${pack.name}">
            ${pack.name}<small>${pack.status}</small>
          </button>
        `).join("")}
      </div>
      <div class="invite-box">
        <span>초대 링크</span>
        <p>${roomInviteUrl()}</p>
      </div>
      <button class="primary full" data-action="copy-invite">초대 링크 복사</button>
      <button class="secondary full" data-action="party-ready">로컬 데모 시작</button>
      <button class="text-button" data-action="back-lobby">처음으로</button>
    </section>
  `);
}

function joinRoomView() {
  shell(`
    <section class="panel room-panel">
      <div class="section-head">
        <span>Join Room</span>
        <strong>친구가 보낸 테스트 방</strong>
      </div>
      <div class="room-preview">
        <span>ROOM ${state.roomCode}</span>
        <strong>${state.selectedTheme}</strong>
        <p>${state.selectedPack} 질문팩 · ${state.playerCount}명</p>
      </div>
      <p>지금 베타는 한 기기에서 흐름을 검증하는 로컬 데모입니다. 실시간 동기화는 다음 개발 단계입니다.</p>
      <button class="primary full" data-action="party-ready">방 참가하기</button>
      <button class="secondary full" data-action="solo-start">혼자 먼저 해보기</button>
    </section>
  `);
}

function frameLabel(frame) {
  return frames.find((item) => item.id === frame)?.label || "기본";
}

function mvpOverview() {
  return `
    <section class="panel rule-panel">
      <div class="section-head">
        <span>How To Play</span>
        <strong>10초 룰</strong>
      </div>
      <div class="rule-steps">
        <article><span>1</span><p>한 명만 비슷하지만 다른 질문을 받습니다.</p></article>
        <article><span>2</span><p>각자 답변을 보고 어색한 사람을 찾습니다.</p></article>
        <article><span>3</span><p>투표 후 질문이 공개되면 바로 납득되어야 합니다.</p></article>
      </div>
    </section>
    <section class="mvp-grid">
      <article>
        <span>Core Loop</span>
        <strong>답변 공개 -> 의심 -> 투표</strong>
      </article>
      <article>
        <span>Target</span>
        <strong>친구방, 방송, MT</strong>
      </article>
    </section>
    <section class="metric-row">
      ${metrics.map((metric) => `
        <article>
          <span>${metric.label}</span>
          <strong>${metric.value}</strong>
        </article>
      `).join("")}
    </section>
  `;
}

function packPreview() {
  return `
    <section class="panel pack-panel">
      <div class="section-head">
        <span>Question Packs</span>
        <strong>콘텐츠가 수익화 포인트</strong>
      </div>
      ${packs.map((pack) => `
        <article class="pack-card">
          <div>
            <strong>${pack.name}</strong>
            <p>${pack.tone}</p>
          </div>
          <span>${pack.status}</span>
        </article>
      `).join("")}
    </section>
  `;
}

function monetizePanel() {
  return `
    <section class="cast-panel pro-panel">
      <div>
        <strong>팔 수 있는 것</strong>
        <p>프로필 프레임, 캐릭터, 방 테마, 질문팩, 관전/시청자 투표.</p>
      </div>
      <div class="live-pill">MVP</div>
    </section>
    ${launchPanel()}
  `;
}

function launchPanel() {
  const items = [
    ["rule", "첫판 룰 이해"],
    ["result", "결과 납득"],
    ["replay", "3판 재시도"],
    ["invite", "친구 초대"],
  ];
  return `
    <section class="panel launch-panel">
      <div class="section-head">
        <span>Pre Open</span>
        <strong>런칭 전 검증</strong>
      </div>
      <div class="launch-grid">
        ${items.map(([key, label]) => `
          <button class="${state.launchChecklist[key] ? "checked" : ""}" data-check="${key}">
            <span>${state.launchChecklist[key] ? "OK" : "?"}</span>${label}
          </button>
        `).join("")}
      </div>
      <p>네 칸이 다 OK가 되면 광고보다 친구 초대부터 열어볼 만합니다.</p>
    </section>
  `;
}

function partyReadyView() {
  shell(`
    <section class="panel intro">
      <div class="tag">Party Demo</div>
      <h2>한 명만 다른 질문을 받습니다.</h2>
      <p>휴대폰을 넘기며 질문 확인, 답변 입력, 투표까지 한 기기에서 테스트합니다.</p>
      <div class="count-row">
        ${[4, 5, 6].map((count) => `
          <button class="${state.playerCount === count ? "active" : ""}" data-count="${count}">${count}명</button>
        `).join("")}
      </div>
      <div class="name-list">
        ${players().map((player) => `
          <label>
            <span>${player.index + 1}P</span>
            <input data-name-index="${player.index}" value="${player.name}" maxlength="8" />
          </label>
        `).join("")}
      </div>
      <button class="primary full" data-action="start">게임 시작</button>
      <button class="text-button" data-action="back-lobby">처음으로</button>
    </section>
    ${playerList(false)}
  `);
}

function soloView() {
  const round = currentRound();
  shell(`
    ${quitBar()}
    ${soloHud()}
    <section class="panel solo-question">
      <div class="tag">${round.title}</div>
      <h2>누가 다른 질문을 받았을까요?</h2>
      <p>공통 질문의 분위기에서 벗어난 답변을 고르세요.</p>
      ${state.hintUsed ? `<div class="hint">힌트: 가짜 질문은 상황의 대상이 살짝 다릅니다. “여럿이”와 “혼자”, “좋은”과 “안 좋은” 같은 차이를 의심하세요.</div>` : ""}
      <button class="secondary full" data-action="hint" ${state.hintUsed ? "disabled" : ""}>힌트 보기 -40점</button>
    </section>
    <section class="answers solo-answers">
      ${state.answers.map((answer, index) => `
        <button class="answer-card pick-card" data-vote="${index}">
          ${avatarMarkup(index)}
          <div>
            <strong>${answer.player}</strong>
            <p>${answer.text}</p>
          </div>
        </button>
      `).join("")}
    </section>
  `);
}

function soloResultView() {
  const fake = state.answers[state.fakeIndex];
  const round = currentRound();
  shell(`
    ${quitBar()}
    ${soloHud()}
    <section class="panel result ${state.lastSuccess ? "win" : "lose"}">
      <div class="tag">${state.lastSuccess ? "정답" : "오답"}</div>
      <h2>가짜는 ${fake.player}</h2>
      <p>${state.lastSuccess ? "질문 차이를 잘 잡았습니다." : "답변만 보면 헷갈릴 만했습니다."}</p>
    </section>
    ${resultShareCard(fake)}
    <section class="question-reveal">
      <article>
        <span>공통 질문</span>
        <strong>${round.innocent}</strong>
      </article>
      <article class="fake-question">
        <span>가짜 질문</span>
        <strong>${round.fake}</strong>
      </article>
    </section>
    ${soloRevealList()}
    <button class="primary full floating" data-action="solo-next">다음 문제</button>
    <button class="secondary full floating" data-action="feedback">베타 피드백 보기</button>
  `);
}

function soloGameOverView() {
  const round = currentRound();
  shell(`
    ${quitBar()}
    <section class="panel result lose game-over">
      <div class="tag">Game Over</div>
      <h2>${state.score}점</h2>
      <p>${state.questionNo}문제까지 버텼습니다. 이 정도면 눈치 예열은 됐어요.</p>
      <button class="primary full" data-action="solo-start">다시 하기</button>
      <button class="text-button" data-action="back-lobby">처음으로</button>
    </section>
    ${resultShareCard(state.answers[state.fakeIndex])}
    <section class="question-reveal">
      <article>
        <span>공통 질문</span>
        <strong>${round.innocent}</strong>
      </article>
      <article class="fake-question">
        <span>가짜 질문</span>
        <strong>${round.fake}</strong>
      </article>
    </section>
    ${soloRevealList()}
  `);
}

function roleView() {
  const round = currentRound();
  const player = players()[state.hostIndex];
  const question = player.fake ? round.fake : round.innocent;
  shell(`
    ${quitBar()}
    <section class="panel role-card ${player.fake ? "fake" : ""}">
      <div class="turn-line">${player.name}님 차례</div>
      ${avatarMarkup(player.index, "big")}
      <h2>${player.fake ? "너만 다른 질문" : "공통 질문"}</h2>
      <p class="question">${question}</p>
      <button class="primary full" data-action="next-role">
        ${state.hostIndex === state.playerCount - 1 ? "답변하러 가기" : "다음 사람에게 넘기기"}
      </button>
    </section>
    ${playerList(true)}
  `);
}

function answerView() {
  shell(`
    ${quitBar()}
    <section class="panel">
      <div class="tag">${currentRound().title}</div>
      <h2>모두 답변을 적었습니다.</h2>
      <p>이제 답변을 공개하고 누가 다른 질문을 받았는지 토론하세요.</p>
      <button class="primary full" data-action="reveal">답변 공개</button>
    </section>
    ${playerList(true)}
  `);
}

function answerInputView() {
  const answer = state.answers[state.hostIndex];
  shell(`
    ${quitBar()}
    <section class="panel answer-input-panel">
      <div class="turn-line">${answer.player}님 답변</div>
      ${avatarMarkup(state.hostIndex, "big")}
      <h2>${answer.role}</h2>
      <p class="question">${answer.question}</p>
      <label class="answer-field">
        <span>짧게 답변</span>
        <input data-answer-input="true" value="${state.currentAnswer}" maxlength="18" placeholder="예: 치킨" autofocus />
      </label>
      <button class="primary full" data-action="submit-answer">${state.hostIndex === state.playerCount - 1 ? "답변 완료" : "다음 사람"}</button>
      <button class="secondary full" data-action="quick-answer">테스트 답변 자동 입력</button>
    </section>
    ${playerList(true)}
  `);
}

function talkView() {
  shell(`
    ${quitBar()}
    <section class="answers">
      ${state.answers.map((answer, index) => `
        <article class="answer-card">
          ${avatarMarkup(index)}
          <div>
            <strong>${answer.player}</strong>
            <p>${answer.text}</p>
          </div>
        </article>
      `).join("")}
    </section>
    <section class="panel timer">
      <span>토론</span>
      <strong>00:45</strong>
      <button class="primary" data-action="vote">투표하기</button>
    </section>
  `);
}

function voteView() {
  shell(`
    ${quitBar()}
    <section class="panel">
      <div class="tag">투표</div>
      <h2>누가 다른 질문을 받았을까요?</h2>
      <div class="vote-grid">
        ${players().map((player) => `
          <button data-vote="${player.index}">
            ${avatarMarkup(player.index)}
            <strong>${player.name}</strong>
          </button>
        `).join("")}
      </div>
    </section>
  `);
}

function resultView() {
  const fake = players()[state.fakeIndex];
  const picked = state.selectedVote;
  const success = picked === state.fakeIndex;
  const tally = players().map((player, index) => state.votes.filter((vote) => vote === index).length);
  shell(`
    ${quitBar()}
    <section class="panel result ${success ? "win" : "lose"}">
      <div class="tag">${success ? "시민 승리" : "가짜 승리"}</div>
      <h2>가짜는 ${fake.name}님</h2>
      <p>${success ? "이번엔 눈치가 빨랐습니다." : "가짜가 너무 자연스럽게 묻어갔습니다."}</p>
    </section>
    ${partyResultCard(fake)}
    <section class="answers">
      ${players().map((player, index) => `
        <article class="answer-card ${player.fake ? "highlight" : ""}">
          ${avatarMarkup(index)}
          <div>
            <strong>${player.name}</strong>
            <p>${state.answers[index].text}</p>
            <small>${state.answers[index].role}: ${state.answers[index].question}</small>
          </div>
          <span class="votes">${tally[index]}</span>
        </article>
      `).join("")}
    </section>
    <button class="primary full floating" data-action="again">다음 라운드</button>
    <button class="secondary full floating" data-action="feedback">베타 피드백 보기</button>
  `);
}

function resultShareCard(fake) {
  const grade = state.lastSuccess ? (state.hintUsed ? "눈치 B" : "눈치 S") : "속았다";
  return `
    <section class="share-card">
      <span>결과 카드</span>
      <strong>${grade} · 가짜는 ${fake.player}</strong>
      <p>${selectedPack().name} 팩에서 ${state.questionNo}번째 문제. 친구에게 보여주기 좋은 문구입니다.</p>
      <button class="copy-button" data-action="copy-result">결과 복사</button>
    </section>
  `;
}

function partyResultCard(fake) {
  const round = currentRound();
  return `
    <section class="share-card">
      <span>방 결과</span>
      <strong>오늘의 가짜: ${fake.name}</strong>
      <p>${state.selectedTheme} · ${state.selectedPack} 팩 · 다음 베타에서는 이 카드가 이미지로 저장됩니다.</p>
      <button class="copy-button" data-action="copy-result">결과 복사</button>
    </section>
    <section class="question-reveal">
      <article>
        <span>공통 질문</span>
        <strong>${round.innocent}</strong>
      </article>
      <article class="fake-question">
        <span>가짜 질문</span>
        <strong>${round.fake}</strong>
      </article>
    </section>
  `;
}

function feedbackView() {
  shell(`
    <section class="panel feedback-panel">
      <div class="section-head">
        <span>Beta Feedback</span>
        <strong>테스터에게 물어볼 것</strong>
      </div>
      <article><strong>1. 첫판 룰을 바로 이해했나요?</strong><p>10초 안에 이해 못 하면 온보딩을 고쳐야 합니다.</p></article>
      <article><strong>2. 왜 가짜인지 납득됐나요?</strong><p>질문 공개와 답변 비교가 핵심 검증 포인트입니다.</p></article>
      <article><strong>3. 친구에게 링크를 보낼 만큼 웃겼나요?</strong><p>이 대답이 아니면 질문팩을 더 세게 만들어야 합니다.</p></article>
      <button class="secondary full" data-action="copy-feedback">피드백 양식 복사</button>
      <button class="primary full" data-action="back-lobby">메인으로</button>
    </section>
  `);
}

function quitBar() {
  return `
    <section class="quit-bar">
      <button data-action="quit">그만두기</button>
    </section>
  `;
}

function soloHud() {
  return `
    <section class="solo-hud">
      <article><span>점수</span><strong>${state.score}</strong></article>
      <article><span>콤보</span><strong>${state.streak}</strong></article>
      <article><span>라이프</span><strong>${"●".repeat(state.lives)}${"○".repeat(3 - state.lives)}</strong></article>
      <article><span>문제</span><strong>${state.questionNo}</strong></article>
    </section>
  `;
}

function soloRevealList() {
  return `
    <section class="answers">
      ${state.answers.map((answer, index) => `
        <article class="answer-card ${index === state.fakeIndex ? "highlight" : ""} ${index === state.selectedVote ? "picked" : ""}">
          ${avatarMarkup(index)}
          <div>
            <strong>${answer.player}</strong>
            <p>${answer.text}</p>
            <small>${answer.role}: ${answer.question}</small>
          </div>
          ${index === state.fakeIndex ? `<span class="votes">!</span>` : ""}
        </article>
      `).join("")}
    </section>
  `;
}

function playerList(showStatus) {
  return `
    <section class="players">
      ${players().map((player, index) => `
        <article>
          ${avatarMarkup(index)}
          <span>${player.name}</span>
          ${showStatus ? `<small>${state.revealed[index] ? "확인 완료" : index === state.hostIndex ? "확인 중" : "대기"}</small>` : "<small>입장</small>"}
        </article>
      `).join("")}
    </section>
  `;
}

function streamerPanel() {
  return `
    <section class="cast-panel">
      <div>
        <strong>방송용 포인트</strong>
        <p>시청자는 답변 공개 후 채팅으로 가짜를 같이 찍는 구조.</p>
      </div>
      <div class="live-pill">LIVE</div>
    </section>
  `;
}

function render() {
  if (state.phase === "lobby") lobbyView();
  if (state.phase === "joinRoom") joinRoomView();
  if (state.phase === "profile") profileView();
  if (state.phase === "roomCreate") roomCreateView();
  if (state.phase === "feedback") feedbackView();
  if (state.phase === "partyReady") partyReadyView();
  if (state.phase === "solo") soloView();
  if (state.phase === "soloResult") soloResultView();
  if (state.phase === "soloGameOver") soloGameOverView();
  if (state.phase === "roles") roleView();
  if (state.phase === "answerInput") answerInputView();
  if (state.phase === "answer") answerView();
  if (state.phase === "talk") talkView();
  if (state.phase === "vote") voteView();
  if (state.phase === "result") resultView();
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.count) setPlayerCount(Number(button.dataset.count));
  if (button.dataset.check) {
    state.launchChecklist[button.dataset.check] = !state.launchChecklist[button.dataset.check];
    render();
  }
  if (button.dataset.action === "solo-start") startSolo();
  if (button.dataset.action === "copy-invite") {
    copyText(roomInviteUrl(), "초대 링크를 복사했습니다");
    track("inviteCopy");
  }
  if (button.dataset.action === "copy-result") {
    copyText(resultText(), "결과를 복사했습니다");
    track("resultCopy");
  }
  if (button.dataset.action === "copy-feedback") {
    copyText(feedbackText(), "피드백 양식을 복사했습니다");
    track("feedbackCopy");
  }
  if (button.dataset.action === "profile") {
    state.phase = "profile";
    render();
  }
  if (button.dataset.action === "room-create") {
    state.roomCode = generateRoomCode();
    state.phase = "roomCreate";
    render();
  }
  if (button.dataset.action === "feedback") {
    state.phase = "feedback";
    render();
  }
  if (button.dataset.action === "party-ready") {
    state.phase = "partyReady";
    render();
  }
  if (button.dataset.action === "back-lobby") {
    state.phase = "lobby";
    window.history.replaceState({}, "", window.location.pathname);
    render();
  }
  if (button.dataset.action === "quit") {
    state.phase = "lobby";
    state.mode = "party";
    render();
  }
  if (button.dataset.action === "start") startGame();
  if (button.dataset.action === "next-role") nextRole();
  if (button.dataset.action === "submit-answer") submitAnswer();
  if (button.dataset.action === "quick-answer") quickAnswer();
  if (button.dataset.action === "reveal") revealAnswers();
  if (button.dataset.action === "vote") beginVote();
  if (button.dataset.action === "again") resetRound();
  if (button.dataset.action === "hint") useHint();
  if (button.dataset.action === "solo-next") nextSoloRound();
  if (button.dataset.avatar !== undefined) {
    state.selectedAvatar = Number(button.dataset.avatar);
    saveSettings();
    render();
  }
  if (button.dataset.frame !== undefined) {
    state.selectedFrame = button.dataset.frame;
    saveSettings();
    render();
  }
  if (button.dataset.theme !== undefined) {
    state.selectedTheme = button.dataset.theme;
    saveSettings();
    render();
  }
  if (button.dataset.pack !== undefined) {
    state.selectedPack = button.dataset.pack;
    saveSettings();
    render();
  }
  if (button.dataset.vote !== undefined) castVote(Number(button.dataset.vote));
});

app.addEventListener("input", (event) => {
  const input = event.target;
  if (input.dataset.nameIndex !== undefined) {
    const index = Number(input.dataset.nameIndex);
    state.customNames[index] = cleanText(input.value, playerNames[index]);
    saveSettings();
  }
  if (input.dataset.answerInput) {
    state.currentAnswer = input.value;
  }
});

loadSettings();
applyUrlRoom();
render();
