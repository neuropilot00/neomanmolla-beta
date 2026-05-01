const gameData = window.NEOMANMOLLA_DATA;
const { avatars, biasStyles, dressUp, frames, idolGroups, metrics, packs, playerNames, themes } = gameData;
const STORAGE_KEY = "neomanmolla-beta-state";
const EVENTS_KEY = "neomanmolla-beta-events";
const COPY = {
  ko: {
    eyebrow: "4-6인 실시간 파티 추리",
    title: "너만 몰라",
    heroTag: "2분 소셜 추리",
    heroTitle: "답변 하나로 친구를 의심하세요.",
    heroBody: "한 명만 다른 질문을 받습니다. 자연스러운 척하는 답변을 찾아내세요.",
    soloPlay: "혼자 플레이",
    createRoom: "방 만들기",
    profile: "내 프로필",
    language: "언어",
    appLanguage: "표시 언어",
    playerLanguage: "플레이어 언어",
    save: "저장",
    profileTitle: "보여야 팔립니다",
    me: "나",
    frameApplied: "프레임 적용 중",
    hair: "헤어",
    outfit: "의상",
    item: "소품",
    aura: "오라",
    createRoomTitle: "테스트 링크 만들기",
    roomTheme: "방 테마",
    questionPack: "질문팩",
    playersSuffix: "명",
    packSuffix: "질문팩",
    inviteLink: "초대 링크",
    copyInvite: "초대 링크 복사",
    localDemo: "로컬 데모 시작",
    backHome: "처음으로",
    joinTitle: "친구가 보낸 테스트 방",
    joinBody: "지금 베타는 한 기기에서 흐름을 검증하는 로컬 데모입니다. 실시간 동기화는 다음 개발 단계입니다.",
    joinRoom: "방 참가하기",
    trySolo: "혼자 먼저 해보기",
    howToPlay: "10초 룰",
    rule1: "한 명만 비슷하지만 다른 질문을 받습니다.",
    rule2: "각자 답변을 보고 어색한 사람을 찾습니다.",
    rule3: "투표 후 질문이 공개되면 바로 납득되어야 합니다.",
    coreLoop: "답변 공개 -> 의심 -> 투표",
    target: "친구방, 방송, MT",
    packsTitle: "콘텐츠가 수익화 포인트",
    monetization: "팔 수 있는 것",
    monetizationBody: "프로필 프레임, 캐릭터, 방 테마, 질문팩, 관전/시청자 투표.",
    launchTitle: "런칭 전 검증",
    launchBody: "네 칸이 다 OK가 되면 광고보다 친구 초대부터 열어볼 만합니다.",
    checkRule: "첫판 룰 이해",
    checkResult: "결과 납득",
    checkReplay: "3판 재시도",
    checkInvite: "친구 초대",
    partyDemo: "Party Demo",
    partyTitle: "한 명만 다른 질문을 받습니다.",
    partyBody: "휴대폰을 넘기며 질문 확인, 답변 입력, 투표까지 한 기기에서 테스트합니다.",
    startGame: "게임 시작",
    findFake: "누가 다른 질문을 받았을까요?",
    soloBody: "공통 질문의 분위기에서 벗어난 답변을 고르세요.",
    hint: "힌트: 가짜 질문은 상황의 대상이 살짝 다릅니다. 여럿이와 혼자, 좋은과 안 좋은 같은 차이를 의심하세요.",
    hintButton: "힌트 보기 -40점",
    correct: "정답",
    wrong: "오답",
    fakeIs: "가짜는",
    goodCatch: "질문 차이를 잘 잡았습니다.",
    confusing: "답변만 보면 헷갈릴 만했습니다.",
    commonQuestion: "공통 질문",
    fakeQuestion: "가짜 질문",
    nextQuestion: "다음 문제",
    betaFeedback: "베타 피드백 보기",
    gameOverBody: "문제까지 버텼습니다. 이 정도면 눈치 예열은 됐어요.",
    retry: "다시 하기",
    yourDifferentQuestion: "너만 다른 질문",
    answerGo: "답변하러 가기",
    passPhone: "다음 사람에게 넘기기",
    allAnswered: "모두 답변을 적었습니다.",
    revealBody: "이제 답변을 공개하고 누가 다른 질문을 받았는지 토론하세요.",
    revealAnswers: "답변 공개",
    answerShort: "짧게 답변",
    answerPlaceholder: "예: 치킨",
    submitDone: "답변 완료",
    nextPerson: "다음 사람",
    quickAnswer: "테스트 답변 자동 입력",
    talk: "토론",
    vote: "투표하기",
    voteTitle: "누가 다른 질문을 받았을까요?",
    citizenWin: "시민 승리",
    fakeWin: "가짜 승리",
    citizenWinBody: "이번엔 눈치가 빨랐습니다.",
    fakeWinBody: "가짜가 너무 자연스럽게 묻어갔습니다.",
    nextRound: "다음 라운드",
    resultCard: "결과 카드",
    roomResult: "방 결과",
    todayFake: "오늘의 가짜",
    resultCardBody: "친구에게 보여주기 좋은 문구입니다.",
    partyCardBody: "다음 베타에서는 이 카드가 이미지로 저장됩니다.",
    copyResult: "결과 복사",
    feedbackTitle: "테스터에게 물어볼 것",
    feedbackRule: "1. 첫판 룰을 바로 이해했나요?",
    feedbackRuleBody: "10초 안에 이해 못 하면 온보딩을 고쳐야 합니다.",
    feedbackResult: "2. 왜 가짜인지 납득됐나요?",
    feedbackResultBody: "질문 공개와 답변 비교가 핵심 검증 포인트입니다.",
    feedbackInvite: "3. 친구에게 링크를 보낼 만큼 웃겼나요?",
    feedbackInviteBody: "이 대답이 아니면 질문팩을 더 세게 만들어야 합니다.",
    feedbackReplay: "3. 3판 이상 재플레이 의향:",
    feedbackPaid: "5. 돈 내도 살 질문팩:",
    copyFeedback: "피드백 양식 복사",
    main: "메인으로",
    quit: "그만두기",
    score: "점수",
    combo: "콤보",
    lives: "라이프",
    problem: "문제",
    statusDone: "확인 완료",
    statusChecking: "확인 중",
    statusWait: "대기",
    statusJoined: "입장",
    hostTurn: "님 차례",
    answerTurn: "님 답변",
    copiedInvite: "초대 링크를 복사했습니다",
    copiedResult: "결과를 복사했습니다",
    copiedFeedback: "피드백 양식을 복사했습니다",
    copyBlocked: "복사가 막혔어요. HTTPS 배포 링크에서는 정상 동작합니다",
    answerRequired: "짧게라도 답변을 적어야 다음으로 넘어가요",
    resultHit: "맞혔다",
    resultMiss: "속았다",
  },
  ja: {
    eyebrow: "4-6人リアルタイム推理",
    title: "君だけ知らない",
    heroTag: "2分ソーシャル推理",
    heroTitle: "答えひとつで友だちを疑おう。",
    heroBody: "一人だけ違う質問を受けます。自然なふりをする答えを見抜いてください。",
    soloPlay: "一人で遊ぶ",
    createRoom: "ルーム作成",
    profile: "プロフィール",
    language: "言語",
    appLanguage: "表示言語",
    playerLanguage: "プレイヤー言語",
    save: "保存",
    profileTitle: "見せたくなる見た目に",
    me: "自分",
    frameApplied: "フレーム適用中",
    hair: "ヘア",
    outfit: "衣装",
    item: "小物",
    aura: "オーラ",
    createRoomTitle: "テストリンクを作成",
    roomTheme: "ルームテーマ",
    questionPack: "質問パック",
    playersSuffix: "人",
    packSuffix: "質問パック",
    inviteLink: "招待リンク",
    copyInvite: "招待リンクをコピー",
    localDemo: "ローカルデモ開始",
    backHome: "最初へ",
    joinTitle: "友だちから届いたテストルーム",
    joinBody: "このベータは1台の端末で流れを確認するローカルデモです。リアルタイム同期は次の開発段階です。",
    joinRoom: "ルームに参加",
    trySolo: "先に一人で試す",
    howToPlay: "10秒ルール",
    rule1: "一人だけ似ているけど違う質問を受けます。",
    rule2: "みんなの答えを見て、違和感のある人を探します。",
    rule3: "投票後に質問が公開され、理由がすぐ分かるのが大事です。",
    coreLoop: "答え公開 -> 疑う -> 投票",
    target: "友だち部屋、配信、合宿",
    packsTitle: "コンテンツが収益ポイント",
    monetization: "販売できるもの",
    monetizationBody: "プロフィールフレーム、キャラ、ルームテーマ、質問パック、観戦/視聴者投票。",
    launchTitle: "公開前チェック",
    launchBody: "4つ全部OKなら、広告より先に友だち招待を開ける価値があります。",
    checkRule: "初回ルール理解",
    checkResult: "結果に納得",
    checkReplay: "3回リプレイ",
    checkInvite: "友だち招待",
    partyDemo: "Party Demo",
    partyTitle: "一人だけ違う質問を受けます。",
    partyBody: "スマホを回しながら質問確認、答え入力、投票まで1台でテストします。",
    startGame: "ゲーム開始",
    findFake: "違う質問を受けたのは誰？",
    soloBody: "共通質問の雰囲気から外れた答えを選んでください。",
    hint: "ヒント: 偽の質問は対象や状況が少し違います。みんなと一人、良いと悪いの差を疑ってください。",
    hintButton: "ヒントを見る -40点",
    correct: "正解",
    wrong: "不正解",
    fakeIs: "偽物は",
    goodCatch: "質問の違いをよく見抜きました。",
    confusing: "答えだけ見ると迷う問題でした。",
    commonQuestion: "共通質問",
    fakeQuestion: "偽質問",
    nextQuestion: "次の問題",
    betaFeedback: "ベータフィードバック",
    gameOverBody: "問まで耐えました。かなり目が慣れてきています。",
    retry: "もう一度",
    yourDifferentQuestion: "君だけ違う質問",
    answerGo: "答え入力へ",
    passPhone: "次の人へ渡す",
    allAnswered: "全員が答えました。",
    revealBody: "答えを公開して、誰が違う質問だったか話し合いましょう。",
    revealAnswers: "答えを公開",
    answerShort: "短く答える",
    answerPlaceholder: "例: チキン",
    submitDone: "回答完了",
    nextPerson: "次の人",
    quickAnswer: "テスト回答を自動入力",
    talk: "トーク",
    vote: "投票する",
    voteTitle: "違う質問を受けたのは誰？",
    citizenWin: "市民の勝ち",
    fakeWin: "偽物の勝ち",
    citizenWinBody: "今回は見抜くのが早かったです。",
    fakeWinBody: "偽物が自然に紛れ込みました。",
    nextRound: "次のラウンド",
    resultCard: "結果カード",
    roomResult: "ルーム結果",
    todayFake: "今日の偽物",
    resultCardBody: "友だちに見せやすい文面です。",
    partyCardBody: "次のベータではこのカードを画像保存できます。",
    copyResult: "結果をコピー",
    feedbackTitle: "テスターに聞くこと",
    feedbackRule: "1. 初回でルールを理解できましたか？",
    feedbackRuleBody: "10秒以内に分からないならオンボーディングを直す必要があります。",
    feedbackResult: "2. なぜ偽物か納得できましたか？",
    feedbackResultBody: "質問公開と答え比較が検証の中心です。",
    feedbackInvite: "3. 友だちにリンクを送りたいほど笑えましたか？",
    feedbackInviteBody: "ここが弱ければ質問パックをもっと強くします。",
    feedbackReplay: "3. 3回以上また遊びたい:",
    feedbackPaid: "5. 有料でも欲しい質問パック:",
    copyFeedback: "フィードバック用紙をコピー",
    main: "メインへ",
    quit: "やめる",
    score: "点数",
    combo: "コンボ",
    lives: "ライフ",
    problem: "問題",
    statusDone: "確認済み",
    statusChecking: "確認中",
    statusWait: "待機",
    statusJoined: "入室",
    hostTurn: "さんの番",
    answerTurn: "さんの答え",
    copiedInvite: "招待リンクをコピーしました",
    copiedResult: "結果をコピーしました",
    copiedFeedback: "フィードバック用紙をコピーしました",
    copyBlocked: "コピーがブロックされました。HTTPSの公開リンクでは動作します",
    answerRequired: "短くても答えを入力すると次へ進めます",
    resultHit: "当てた",
    resultMiss: "騙された",
  },
};

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
  selectedBiasStyle: biasStyles[0].id,
  selectedHair: dressUp.hair[0].id,
  selectedOutfit: dressUp.outfit[0].id,
  selectedItem: dressUp.item[0].id,
  selectedAura: dressUp.aura[0].id,
  selectedIdolGroup: idolGroups[0].id,
  selectedTheme: themes[0],
  selectedPack: packs[0].name,
  lang: "ko",
  customNames: [...playerNames],
  playerLangs: ["ko", "ja", "ko", "ja", "ko", "ja"],
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
const languageOptions = [
  { id: "ko", label: "한국어" },
  { id: "ja", label: "日本語" },
];

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function cleanText(value, fallback = "") {
  return String(value || fallback).replace(/[<>"'&]/g, "").trim();
}

function t(key) {
  return COPY[state.lang]?.[key] || COPY.ko[key] || key;
}

function supportedLang(lang) {
  return languageOptions.some((option) => option.id === lang);
}

function tt(lang, key) {
  return COPY[lang]?.[key] || COPY.ko[key] || key;
}

function localeData() {
  return gameData.locales?.[state.lang] || null;
}

function localeDataFor(lang) {
  return gameData.locales?.[lang] || null;
}

function playerNameList() {
  return localeData()?.playerNames || playerNames;
}

function localizedMetrics() {
  return localeData()?.metrics || metrics;
}

function packId(pack) {
  return pack.id || pack.name;
}

function localizedPack(pack) {
  const translated = localeData()?.packs?.[packId(pack)];
  return translated ? { ...pack, ...translated, id: packId(pack), baseName: pack.name } : { ...pack, baseName: pack.name };
}

function localizedPackFor(lang, pack) {
  const translated = localeDataFor(lang)?.packs?.[packId(pack)];
  return translated ? { ...pack, ...translated, id: packId(pack), baseName: pack.name } : { ...pack, baseName: pack.name };
}

function localizedPacks() {
  return packs.map(localizedPack);
}

function selectedBasePack() {
  return packs.find((item) => item.name === state.selectedPack || packId(item) === state.selectedPack) || packs[0];
}

function themeLabel(theme) {
  return localeData()?.themes?.[theme] || theme;
}

function frameLabel(frame) {
  return localeData()?.frames?.[frame] || frames.find((item) => item.id === frame)?.label || "기본";
}

function biasStyleLabel(id) {
  const style = biasStyles.find((item) => item.id === id) || biasStyles[0];
  return localeData()?.biasStyles?.[id]?.label || style.label;
}

function biasStyleDetail(id) {
  const style = biasStyles.find((item) => item.id === id) || biasStyles[0];
  return localeData()?.biasStyles?.[id]?.detail || style.detail;
}

function idolGroup(id) {
  return idolGroups.find((group) => group.id === id) || idolGroups[0];
}

function idolTags(group) {
  return localeData()?.idolGroups?.[group.id]?.tags || group.tags;
}

function dressOptions(type) {
  return dressUp[type] || [];
}

function dressOption(type, id) {
  const options = dressOptions(type);
  return options.find((item) => item.id === id) || options[0] || {};
}

function dressLabel(type, id) {
  const option = dressOption(type, id);
  return localeData()?.dressUp?.[type]?.[id] || option.label || id;
}

function languageSelectMarkup(selected, datasetName, label = t("language")) {
  const options = languageOptions.map((option) => `
    <option value="${option.id}" ${selected === option.id ? "selected" : ""}>${option.label}</option>
  `).join("");
  return `
    <div class="language-select">
      <span>${label}</span>
      <select ${datasetName}>
        ${options}
      </select>
    </div>
  `;
}

function roundForLang(lang) {
  const pack = localizedPackFor(lang, selectedBasePack());
  return pack.rounds[state.roundIndex % pack.rounds.length];
}

function playerLang(index) {
  return supportedLang(state.playerLangs[index]) ? state.playerLangs[index] : state.lang;
}

function questionForPlayer(index, fake = index === state.fakeIndex) {
  const round = roundForLang(playerLang(index));
  return fake ? round.fake : round.innocent;
}

function roleForPlayer(index, fake = index === state.fakeIndex) {
  return fake ? tt(playerLang(index), "fakeQuestion") : tt(playerLang(index), "commonQuestion");
}

function generateRoomCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function saveSettings() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      selectedAvatar: state.selectedAvatar,
      selectedBiasStyle: state.selectedBiasStyle,
      selectedHair: state.selectedHair,
      selectedOutfit: state.selectedOutfit,
      selectedItem: state.selectedItem,
      selectedAura: state.selectedAura,
      selectedFrame: state.selectedFrame,
      selectedIdolGroup: state.selectedIdolGroup,
      selectedPack: state.selectedPack,
      selectedTheme: state.selectedTheme,
      customNames: state.customNames,
      playerLangs: state.playerLangs,
      lang: state.lang,
    }),
  );
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (Number.isInteger(saved.selectedAvatar)) state.selectedAvatar = saved.selectedAvatar;
    if (biasStyles.some((style) => style.id === saved.selectedBiasStyle)) state.selectedBiasStyle = saved.selectedBiasStyle;
    if (dressOptions("hair").some((item) => item.id === saved.selectedHair)) state.selectedHair = saved.selectedHair;
    if (dressOptions("outfit").some((item) => item.id === saved.selectedOutfit)) state.selectedOutfit = saved.selectedOutfit;
    if (dressOptions("item").some((item) => item.id === saved.selectedItem)) state.selectedItem = saved.selectedItem;
    if (dressOptions("aura").some((item) => item.id === saved.selectedAura)) state.selectedAura = saved.selectedAura;
    if (frames.some((frame) => frame.id === saved.selectedFrame)) state.selectedFrame = saved.selectedFrame;
    if (idolGroups.some((group) => group.id === saved.selectedIdolGroup)) state.selectedIdolGroup = saved.selectedIdolGroup;
    if (packs.some((pack) => pack.name === saved.selectedPack || packId(pack) === saved.selectedPack)) state.selectedPack = saved.selectedPack;
    if (themes.includes(saved.selectedTheme)) state.selectedTheme = saved.selectedTheme;
    if (supportedLang(saved.lang)) state.lang = saved.lang;
    if (Array.isArray(saved.customNames)) state.customNames = playerNameList().map((name, index) => cleanText(saved.customNames[index], name));
    else state.customNames = [...playerNameList()];
    if (Array.isArray(saved.playerLangs)) state.playerLangs = playerNames.map((_, index) => supportedLang(saved.playerLangs[index]) ? saved.playerLangs[index] : state.playerLangs[index]);
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
  const urlLang = params.get("lang");
  if (supportedLang(urlLang) && state.lang !== urlLang) {
    const previousNames = playerNameList();
    state.lang = urlLang;
    const nextNames = playerNameList();
    state.customNames = state.customNames.map((name, index) => {
      if (!name || name === previousNames[index]) return nextNames[index] || name;
      return name;
    });
  }
  const urlPlayerLangs = params.get("pl");
  if (urlPlayerLangs) {
    state.playerLangs = playerNames.map((_, index) => {
      const code = urlPlayerLangs.slice(index * 2, index * 2 + 2);
      return supportedLang(code) ? code : state.playerLangs[index];
    });
  }
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
  url.searchParams.set("pack", packId(selectedBasePack()));
  url.searchParams.set("theme", state.selectedTheme);
  url.searchParams.set("players", String(state.playerCount));
  url.searchParams.set("lang", state.lang);
  url.searchParams.set("pl", state.playerLangs.slice(0, state.playerCount).join(""));
  return url.toString();
}

function resultText() {
  const fake = state.answers[state.fakeIndex];
  const verdict = state.lastSuccess ? t("resultHit") : t("resultMiss");
  return [
    `${t("title")} ${t("roomResult")}: ${verdict}`,
    `${t("fakeIs")} ${fake.player}`,
    `${t("commonQuestion")}: ${questionForPlayer(0, false)} / ${questionForPlayer(1, false)}`,
    `${t("fakeQuestion")}: ${questionForPlayer(0, true)} / ${questionForPlayer(1, true)}`,
    `${selectedPack().name} ${t("packSuffix")}`,
    roomInviteUrl(),
  ].join("\n");
}

function feedbackText() {
  const stats = betaStats();
  return [
    `${t("title")} ${t("betaFeedback")}`,
    `${t("packSuffix")}: ${selectedPack().name}`,
    `${t("createRoom")}: ${themeLabel(state.selectedTheme)}`,
    `${t("soloPlay")}: ${stats.soloStart || 0}`,
    `${t("roomResult")}: ${stats.resultView || 0}`,
    `${t("copyInvite")}: ${stats.inviteCopy || 0}`,
    t("feedbackRule"),
    t("feedbackResult"),
    t("feedbackReplay"),
    t("feedbackInvite"),
    t("feedbackPaid"),
  ].join("\n");
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    state.toast = message;
  } catch {
    state.toast = t("copyBlocked");
  }
  render();
}

function players() {
  return state.customNames.slice(0, state.playerCount).map((name, index) => ({
    name: cleanText(name, playerNameList()[index]),
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

function fullBodyAvatarMarkup() {
  const hair = dressOption("hair", state.selectedHair);
  const outfit = dressOption("outfit", state.selectedOutfit);
  const item = dressOption("item", state.selectedItem);
  const aura = dressOption("aura", state.selectedAura);
  const style = [
    `--hair:${hair.color || "#6aa7ff"}`,
    `--outfit:${outfit.color || "#20232b"}`,
    `--aura:${aura.color || "#ffd166"}`,
  ].join(";");

  return `
    <div class="stage-avatar ${state.selectedFrame} ${state.selectedBiasStyle}" style="${style}">
      <span class="stage-aura"></span>
      <div class="character">
        <span class="char-hair"></span>
        ${profileAvatarMarkup("char-face")}
        <span class="char-body"></span>
        <span class="char-legs"></span>
        <span class="char-item">${item.symbol || ""}</span>
      </div>
    </div>
  `;
}

function selectedPack() {
  return localizedPack(selectedBasePack());
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
    question: questionForPlayer(player.index, player.fake),
    role: roleForPlayer(player.index, player.fake),
    suspicious: player.fake,
  }));
  state.votes = Array(state.playerCount).fill(null);
  state.selectedVote = null;
  state.currentAnswer = "";
  state.log = [t("createRoom"), t("partyTitle")];
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
    player: index === 0 ? t("me") : player.name,
    text: makeBotAnswer(index),
    question: index === state.fakeIndex ? currentRound().fake : currentRound().innocent,
    role: index === state.fakeIndex ? t("fakeQuestion") : t("commonQuestion"),
    suspicious: index === state.fakeIndex,
  }));
  render();
}

function makeBotAnswer(index) {
  const round = currentRound();
  const safePool = round.botAnswers || round.answers.slice(0, 4);
  const weirdPool = round.fakeAnswers || round.answers.slice(3);
  const personalityAnswers = {
    0: [state.lang === "ja" ? sample(safePool) : "무난하게 " + sample(safePool), sample(safePool)],
    1: [sample(safePool), sample(safePool)],
    2: [sample([state.lang === "ja" ? sample(safePool) : "요즘은 " + sample(safePool), sample(safePool)])],
    3: [sample(safePool), sample(safePool)],
    4: [sample([state.lang === "ja" ? sample(safePool) : "솔직히 " + sample(safePool), sample(safePool)])],
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
    state.log.unshift(t("answerShort"));
  }
  render();
}

function submitAnswer() {
  const answer = cleanText(state.currentAnswer);
  if (!answer) {
    state.toast = t("answerRequired");
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
  state.log.unshift(t("allAnswered"));
  render();
}

function quickAnswer() {
  const round = roundForLang(playerLang(state.hostIndex));
  const pool = state.hostIndex === state.fakeIndex ? round.fakeAnswers || round.answers : round.botAnswers || round.answers;
  state.currentAnswer = sample(pool);
  submitAnswer();
}

function revealAnswers() {
  state.phase = "talk";
  state.log.unshift(t("revealAnswers"));
  render();
}

function beginVote() {
  state.phase = "vote";
  state.selectedVote = null;
  state.log.unshift(t("vote"));
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
  state.log.unshift(`${players()[0].name} -> ${players()[index].name}`);
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

function setLanguage(lang) {
  if (!supportedLang(lang) || state.lang === lang) return;
  const previousNames = playerNameList();
  state.lang = lang;
  const nextNames = playerNameList();
  state.customNames = state.customNames.map((name, index) => {
    if (!name || name === previousNames[index]) return nextNames[index] || name;
    return name;
  });
  saveSettings();
  render();
}

function shell(content) {
  const soloClass = state.phase.startsWith("solo") ? " solo-mode" : "";
  app.innerHTML = `
    <section class="phone${soloClass}">
      <header class="topbar">
        <div>
          <p class="eyebrow">${t("eyebrow")}</p>
          <h1>${t("title")}</h1>
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
      <img class="hero-art" src="./assets/ui/hero-accuse-pixel-900.png" alt="" />
      <div class="hero-copy">
        ${languageSelectMarkup(state.lang, "data-app-lang", t("appLanguage"))}
        <div class="tag">${t("heroTag")}</div>
        <h2>${t("heroTitle")}</h2>
        <p>${t("heroBody")}</p>
        <button class="primary full" data-action="solo-start">${t("soloPlay")}</button>
        <div class="hero-actions">
          <button class="secondary" data-action="room-create">${t("createRoom")}</button>
          <button class="secondary" data-action="profile">${t("profile")}</button>
        </div>
      </div>
    </section>
    ${mvpOverview()}
    ${packPreview()}
    ${monetizePanel()}
  `);
}

function profileView() {
  const group = idolGroup(state.selectedIdolGroup);
  shell(`
    <section class="panel profile-panel">
      <div class="section-head">
        <span>My Profile</span>
        <strong>${t("profileTitle")}</strong>
      </div>
      <div class="profile-preview ${state.selectedFrame}">
        ${fullBodyAvatarMarkup()}
        <div>
          <strong>${t("me")}</strong>
          <p>${group.name} · ${biasStyleLabel(state.selectedBiasStyle)}</p>
          <small>${dressLabel("hair", state.selectedHair)} / ${dressLabel("outfit", state.selectedOutfit)} / ${dressLabel("item", state.selectedItem)} / ${frameLabel(state.selectedFrame)} ${t("frameApplied")}</small>
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
            <span class="frame-dot ${frame.id}"></span>${frameLabel(frame.id)}
          </button>
        `).join("")}
      </div>
      ${["hair", "outfit", "item", "aura"].map((type) => `
        <div class="option-group dress-group">
          <span>${t(type)}</span>
          ${dressOptions(type).map((item) => `
            <button class="${state[`selected${type[0].toUpperCase()}${type.slice(1)}`] === item.id ? "selected" : ""}" data-dress-type="${type}" data-dress-id="${item.id}">
              ${dressLabel(type, item.id)}<small>${item.symbol || ""}</small>
            </button>
          `).join("")}
        </div>
      `).join("")}
      <div class="option-group">
        <span>최애 그룹 / 推しグループ</span>
        ${idolGroups.map((item) => `
          <button class="${state.selectedIdolGroup === item.id ? "selected" : ""}" data-idol-group="${item.id}">
            ${item.name}<small>${item.type === "boy" ? "BOY" : "GIRL"} · ${idolTags(item).join(" · ")}</small>
          </button>
        `).join("")}
      </div>
      <div class="option-group">
        <span>최애 포지션 / 推しポジション</span>
        ${biasStyles.map((style) => `
          <button class="${state.selectedBiasStyle === style.id ? "selected" : ""}" data-bias-style="${style.id}">
            ${biasStyleLabel(style.id)}<small>${biasStyleDetail(style.id)}</small>
          </button>
        `).join("")}
      </div>
      <button class="primary full" data-action="back-lobby">${t("save")}</button>
    </section>
  `);
}

function roomCreateView() {
  shell(`
    <section class="panel room-panel">
      <div class="section-head">
        <span>Create Room</span>
        <strong>${t("createRoomTitle")}</strong>
      </div>
      <div class="room-preview">
        <span>ROOM ${state.roomCode}</span>
        <strong>${themeLabel(state.selectedTheme)}</strong>
        <p>${selectedPack().name} ${t("packSuffix")} · ${state.playerCount}${t("playersSuffix")} · ${t("inviteLink")}</p>
      </div>
      <div class="count-row">
        ${[4, 5, 6].map((count) => `
          <button class="${state.playerCount === count ? "active" : ""}" data-count="${count}">${count}${t("playersSuffix")}</button>
        `).join("")}
      </div>
      <div class="option-group">
        <span>${t("roomTheme")}</span>
        ${themes.map((theme) => `
          <button class="${state.selectedTheme === theme ? "selected" : ""}" data-theme="${theme}">${themeLabel(theme)}</button>
        `).join("")}
      </div>
      <div class="option-group">
        <span>${t("questionPack")}</span>
        ${localizedPacks().map((pack) => `
          <button class="${state.selectedPack === pack.name || state.selectedPack === pack.baseName || state.selectedPack === pack.id ? "selected" : ""}" data-pack="${pack.id}">
            ${pack.name}<small>${pack.status}</small>
          </button>
        `).join("")}
      </div>
      <div class="invite-box">
        <span>${t("inviteLink")}</span>
        <p>${roomInviteUrl()}</p>
      </div>
      <button class="primary full" data-action="copy-invite">${t("copyInvite")}</button>
      <button class="secondary full" data-action="party-ready">${t("localDemo")}</button>
      <button class="text-button" data-action="back-lobby">${t("backHome")}</button>
    </section>
  `);
}

function joinRoomView() {
  shell(`
    <section class="panel room-panel">
      <div class="section-head">
        <span>Join Room</span>
        <strong>${t("joinTitle")}</strong>
      </div>
      <div class="room-preview">
        <span>ROOM ${state.roomCode}</span>
        <strong>${themeLabel(state.selectedTheme)}</strong>
        <p>${selectedPack().name} ${t("packSuffix")} · ${state.playerCount}${t("playersSuffix")}</p>
      </div>
      <p>${t("joinBody")}</p>
      <button class="primary full" data-action="party-ready">${t("joinRoom")}</button>
      <button class="secondary full" data-action="solo-start">${t("trySolo")}</button>
    </section>
  `);
}

function mvpOverview() {
  return `
    <section class="panel rule-panel">
      <div class="section-head">
        <span>How To Play</span>
        <strong>${t("howToPlay")}</strong>
      </div>
      <div class="rule-steps">
        <article><span>1</span><p>${t("rule1")}</p></article>
        <article><span>2</span><p>${t("rule2")}</p></article>
        <article><span>3</span><p>${t("rule3")}</p></article>
      </div>
    </section>
    <section class="mvp-grid">
      <article>
        <span>Core Loop</span>
        <strong>${t("coreLoop")}</strong>
      </article>
      <article>
        <span>Target</span>
        <strong>${t("target")}</strong>
      </article>
    </section>
    <section class="metric-row">
      ${localizedMetrics().map((metric) => `
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
        <strong>${t("packsTitle")}</strong>
      </div>
      ${localizedPacks().map((pack) => `
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
        <strong>${t("monetization")}</strong>
        <p>${t("monetizationBody")}</p>
      </div>
      <div class="live-pill">MVP</div>
    </section>
    ${launchPanel()}
  `;
}

function launchPanel() {
  const items = [
    ["rule", t("checkRule")],
    ["result", t("checkResult")],
    ["replay", t("checkReplay")],
    ["invite", t("checkInvite")],
  ];
  return `
    <section class="panel launch-panel">
      <div class="section-head">
        <span>Pre Open</span>
        <strong>${t("launchTitle")}</strong>
      </div>
      <div class="launch-grid">
        ${items.map(([key, label]) => `
          <button class="${state.launchChecklist[key] ? "checked" : ""}" data-check="${key}">
            <span>${state.launchChecklist[key] ? "OK" : "?"}</span>${label}
          </button>
        `).join("")}
      </div>
      <p>${t("launchBody")}</p>
    </section>
  `;
}

function partyReadyView() {
  shell(`
    <section class="panel intro">
      <div class="tag">Party Demo</div>
      <h2>${t("partyTitle")}</h2>
      <p>${t("partyBody")}</p>
      <div class="count-row">
        ${[4, 5, 6].map((count) => `
          <button class="${state.playerCount === count ? "active" : ""}" data-count="${count}">${count}${t("playersSuffix")}</button>
        `).join("")}
      </div>
      <div class="name-list">
        ${players().map((player) => `
          <label>
            <span>${player.index + 1}P</span>
            <input data-name-index="${player.index}" value="${player.name}" maxlength="8" />
            ${languageSelectMarkup(playerLang(player.index), `data-player-lang-index="${player.index}"`, t("playerLanguage"))}
          </label>
        `).join("")}
      </div>
      <button class="primary full" data-action="start">${t("startGame")}</button>
      <button class="text-button" data-action="back-lobby">${t("backHome")}</button>
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
      <h2>${t("findFake")}</h2>
      <p>${t("soloBody")}</p>
      ${state.hintUsed ? `<div class="hint">${t("hint")}</div>` : ""}
      <button class="secondary full" data-action="hint" ${state.hintUsed ? "disabled" : ""}>${t("hintButton")}</button>
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
      <div class="tag">${state.lastSuccess ? t("correct") : t("wrong")}</div>
      <h2>${t("fakeIs")} ${fake.player}</h2>
      <p>${state.lastSuccess ? t("goodCatch") : t("confusing")}</p>
    </section>
    ${resultShareCard(fake)}
    <section class="question-reveal">
      <article>
        <span>${t("commonQuestion")}</span>
        <strong>${round.innocent}</strong>
      </article>
      <article class="fake-question">
        <span>${t("fakeQuestion")}</span>
        <strong>${round.fake}</strong>
      </article>
    </section>
    ${soloRevealList()}
    <button class="primary full floating" data-action="solo-next">${t("nextQuestion")}</button>
    <button class="secondary full floating" data-action="feedback">${t("betaFeedback")}</button>
  `);
}

function soloGameOverView() {
  const round = currentRound();
  shell(`
    ${quitBar()}
    <section class="panel result lose game-over">
      <div class="tag">Game Over</div>
      <h2>${state.score}</h2>
      <p>${state.questionNo}${t("gameOverBody")}</p>
      <button class="primary full" data-action="solo-start">${t("retry")}</button>
      <button class="text-button" data-action="back-lobby">${t("backHome")}</button>
    </section>
    ${resultShareCard(state.answers[state.fakeIndex])}
    <section class="question-reveal">
      <article>
        <span>${t("commonQuestion")}</span>
        <strong>${round.innocent}</strong>
      </article>
      <article class="fake-question">
        <span>${t("fakeQuestion")}</span>
        <strong>${round.fake}</strong>
      </article>
    </section>
    ${soloRevealList()}
  `);
}

function roleView() {
  const player = players()[state.hostIndex];
  const lang = playerLang(state.hostIndex);
  const answer = state.answers[state.hostIndex];
  shell(`
    ${quitBar()}
    <section class="panel role-card ${player.fake ? "fake" : ""}">
      <div class="turn-line">${player.name}${tt(lang, "hostTurn")} · ${lang.toUpperCase()}</div>
      ${avatarMarkup(player.index, "big")}
      <h2>${player.fake ? tt(lang, "yourDifferentQuestion") : tt(lang, "commonQuestion")}</h2>
      <p class="question">${answer.question}</p>
      <button class="primary full" data-action="next-role">
        ${state.hostIndex === state.playerCount - 1 ? tt(lang, "answerGo") : tt(lang, "passPhone")}
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
      <h2>${t("allAnswered")}</h2>
      <p>${t("revealBody")}</p>
      <button class="primary full" data-action="reveal">${t("revealAnswers")}</button>
    </section>
    ${playerList(true)}
  `);
}

function answerInputView() {
  const answer = state.answers[state.hostIndex];
  const lang = playerLang(state.hostIndex);
  shell(`
    ${quitBar()}
    <section class="panel answer-input-panel">
      <div class="turn-line">${answer.player}${tt(lang, "answerTurn")} · ${lang.toUpperCase()}</div>
      ${avatarMarkup(state.hostIndex, "big")}
      <h2>${answer.role}</h2>
      <p class="question">${answer.question}</p>
      <label class="answer-field">
        <span>${tt(lang, "answerShort")}</span>
        <input data-answer-input="true" value="${state.currentAnswer}" maxlength="18" placeholder="${tt(lang, "answerPlaceholder")}" autofocus />
      </label>
      <button class="primary full" data-action="submit-answer">${state.hostIndex === state.playerCount - 1 ? tt(lang, "submitDone") : tt(lang, "nextPerson")}</button>
      <button class="secondary full" data-action="quick-answer">${tt(lang, "quickAnswer")}</button>
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
      <span>${t("talk")}</span>
      <strong>00:45</strong>
      <button class="primary" data-action="vote">${t("vote")}</button>
    </section>
  `);
}

function voteView() {
  shell(`
    ${quitBar()}
    <section class="panel">
      <div class="tag">${t("vote")}</div>
      <h2>${t("voteTitle")}</h2>
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
      <div class="tag">${success ? t("citizenWin") : t("fakeWin")}</div>
      <h2>${t("fakeIs")} ${fake.name}</h2>
      <p>${success ? t("citizenWinBody") : t("fakeWinBody")}</p>
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
    <button class="primary full floating" data-action="again">${t("nextRound")}</button>
    <button class="secondary full floating" data-action="feedback">${t("betaFeedback")}</button>
  `);
}

function resultShareCard(fake) {
  const grade = state.lastSuccess ? (state.hintUsed ? "B" : "S") : t("resultMiss");
  return `
    <section class="share-card">
      <span>${t("resultCard")}</span>
      <strong>${grade} · ${t("fakeIs")} ${fake.player}</strong>
      <p>${selectedPack().name} ${t("packSuffix")} · ${state.questionNo}${t("problem")} · ${t("resultCardBody")}</p>
      <button class="copy-button" data-action="copy-result">${t("copyResult")}</button>
    </section>
  `;
}

function partyResultCard(fake) {
  return `
    <section class="share-card">
      <span>${t("roomResult")}</span>
      <strong>${t("todayFake")}: ${fake.name}</strong>
      <p>${themeLabel(state.selectedTheme)} · ${selectedPack().name} ${t("packSuffix")} · ${t("partyCardBody")}</p>
      <button class="copy-button" data-action="copy-result">${t("copyResult")}</button>
    </section>
    <section class="question-reveal">
      <article>
        <span>${COPY.ko.commonQuestion} / ${COPY.ja.commonQuestion}</span>
        <strong>${questionForPlayer(0, false)}</strong>
        <small>${questionForPlayer(1, false)}</small>
      </article>
      <article class="fake-question">
        <span>${COPY.ko.fakeQuestion} / ${COPY.ja.fakeQuestion}</span>
        <strong>${questionForPlayer(0, true)}</strong>
        <small>${questionForPlayer(1, true)}</small>
      </article>
    </section>
  `;
}

function feedbackView() {
  shell(`
    <section class="panel feedback-panel">
      <div class="section-head">
        <span>Beta Feedback</span>
        <strong>${t("feedbackTitle")}</strong>
      </div>
      <article><strong>${t("feedbackRule")}</strong><p>${t("feedbackRuleBody")}</p></article>
      <article><strong>${t("feedbackResult")}</strong><p>${t("feedbackResultBody")}</p></article>
      <article><strong>${t("feedbackInvite")}</strong><p>${t("feedbackInviteBody")}</p></article>
      <button class="secondary full" data-action="copy-feedback">${t("copyFeedback")}</button>
      <button class="primary full" data-action="back-lobby">${t("main")}</button>
    </section>
  `);
}

function quitBar() {
  return `
    <section class="quit-bar">
      <button data-action="quit">${t("quit")}</button>
    </section>
  `;
}

function soloHud() {
  return `
    <section class="solo-hud">
      <article><span>${t("score")}</span><strong>${state.score}</strong></article>
      <article><span>${t("combo")}</span><strong>${state.streak}</strong></article>
      <article><span>${t("lives")}</span><strong>${"●".repeat(state.lives)}${"○".repeat(3 - state.lives)}</strong></article>
      <article><span>${t("problem")}</span><strong>${state.questionNo}</strong></article>
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
          ${showStatus ? `<small>${state.revealed[index] ? t("statusDone") : index === state.hostIndex ? t("statusChecking") : t("statusWait")}</small>` : `<small>${t("statusJoined")}</small>`}
        </article>
      `).join("")}
    </section>
  `;
}

function streamerPanel() {
  return `
    <section class="cast-panel">
      <div>
        <strong>LIVE</strong>
        <p>${t("target")}</p>
      </div>
      <div class="live-pill">LIVE</div>
    </section>
  `;
}

function render() {
  document.title = t("title");
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
  if (button.dataset.lang) setLanguage(button.dataset.lang);
  if (button.dataset.playerLang) {
    const [index, lang] = button.dataset.playerLang.split(":");
    if (supportedLang(lang)) {
      state.playerLangs[Number(index)] = lang;
      saveSettings();
      render();
    }
  }
  if (button.dataset.check) {
    state.launchChecklist[button.dataset.check] = !state.launchChecklist[button.dataset.check];
    render();
  }
  if (button.dataset.action === "solo-start") startSolo();
  if (button.dataset.action === "copy-invite") {
    copyText(roomInviteUrl(), t("copiedInvite"));
    track("inviteCopy");
  }
  if (button.dataset.action === "copy-result") {
    copyText(resultText(), t("copiedResult"));
    track("resultCopy");
  }
  if (button.dataset.action === "copy-feedback") {
    copyText(feedbackText(), t("copiedFeedback"));
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
  if (button.dataset.biasStyle !== undefined) {
    state.selectedBiasStyle = button.dataset.biasStyle;
    saveSettings();
    render();
  }
  if (button.dataset.idolGroup !== undefined) {
    state.selectedIdolGroup = button.dataset.idolGroup;
    saveSettings();
    render();
  }
  if (button.dataset.dressType !== undefined && button.dataset.dressId !== undefined) {
    const stateKey = `selected${button.dataset.dressType[0].toUpperCase()}${button.dataset.dressType.slice(1)}`;
    if (dressOptions(button.dataset.dressType).some((item) => item.id === button.dataset.dressId)) {
      state[stateKey] = button.dataset.dressId;
      saveSettings();
      render();
    }
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

app.addEventListener("change", (event) => {
  const input = event.target;
  if (input.dataset.appLang !== undefined && supportedLang(input.value)) {
    setLanguage(input.value);
  }
  if (input.dataset.playerLangIndex !== undefined && supportedLang(input.value)) {
    state.playerLangs[Number(input.dataset.playerLangIndex)] = input.value;
    saveSettings();
    render();
  }
});

loadSettings();
applyUrlRoom();
render();
