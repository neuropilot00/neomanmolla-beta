const gameData = window.NEOMANMOLLA_DATA;
const { avatars, biasStyles, characterSets, dressUp, frames, heroSlides, idolGroups, notices, packs, playerNames, settings, themes } = gameData;
const STORAGE_KEY = "neomanmolla-beta-state";
const EVENTS_KEY = "neomanmolla-beta-events";
const DEFAULT_API_BASE_URL = "https://neomanmolla-beta-production.up.railway.app";
const COPY = {
  ko: {
    eyebrow: "4-6인 실시간 파티 추리",
    title: "너만 몰라",
    heroTag: "2분 소셜 추리",
    heroTitle: "답변 하나로 친구를 의심하세요.",
    heroBody: "한 명만 다른 질문을 받습니다. 자연스러운 척하는 답변을 찾아내세요.",
    soloPlay: "혼자 플레이",
    quickMatch: "빠른 참가",
    quickMatchBody: "대기 중인 공개방에 바로 들어갑니다.",
    createRoom: "방 만들기",
    createRoomBody: "친구에게 보낼 초대방을 만듭니다.",
    profile: "내 프로필",
    customizeBody: "캐릭터와 최애 설정을 정리합니다.",
    guide: "게임 방법",
    packs: "질문팩",
    news: "공지",
    homeLive: "운영 베타",
    homeLiveBody: "Railway + Postgres 연결됨",
    featuredPacks: "추천 질문팩",
    featuredPacksBody: "지금 테스트하기 좋은 테마",
    homeUtilities: "내 공간",
    soloShort: "혼자 연습",
    closetCategory: "에셋 카테고리",
    artistRegistry: "아티스트 등록 현황",
    registered: "등록됨",
    ownedArtist: "공식 아티스트",
    settings: "설정",
    language: "언어",
    appLanguage: "표시 언어",
    playerLanguage: "플레이어 언어",
    save: "저장",
    saved: "저장됨",
    profileTitle: "내 캐릭터 꾸미기",
    me: "나",
    frameApplied: "프레임 적용 중",
    preset: "프리셋",
    body: "베이스",
    hair: "헤어",
    eyes: "눈",
    lips: "입술",
    beauty: "얼굴 포인트",
    accessory: "악세",
    top: "상의",
    pants: "하의",
    shoes: "신발",
    outfit: "세트 의상",
    hat: "헤드",
    face: "얼굴",
    item: "소품",
    back: "배경",
    aura: "오라",
    pose: "포즈",
    parts: "꾸미기",
    artist: "최애",
    frame: "프레임",
    back: "뒤로",
    createRoomTitle: "초대 링크 만들기",
    roomTheme: "방 테마",
    themeVibe: "테마 분위기",
    questionPack: "질문팩",
    questionTheme: "질문 테마",
    allGroups: "전체 그룹",
    playersSuffix: "명",
    packSuffix: "질문팩",
    inviteLink: "초대 링크",
    copyInvite: "초대 링크 복사",
    spectatorLink: "관전 링크",
    copySpectator: "관전 링크 복사",
    audienceMode: "관전 모드",
    audienceVote: "시청자 투표",
    audiencePick: "시청자는 누구를 의심하나요?",
    audienceLocked: "시청자 예측 완료",
    audienceResult: "시청자 예측",
    localDemo: "방 열기",
    backHome: "처음으로",
    openSettings: "설정",
    joinTitle: "친구가 보낸 방",
    joinBody: "친구들과 질문을 확인하고 어색한 답변을 찾아보세요.",
    joinRoom: "방 참가하기",
    trySolo: "혼자 먼저 해보기",
    howToPlay: "10초 룰",
    rule1: "한 명만 비슷하지만 다른 질문을 받습니다.",
    rule2: "각자 답변을 보고 어색한 사람을 찾습니다.",
    rule3: "투표 후 질문이 공개되면 바로 납득되어야 합니다.",
    coreLoop: "답변 공개 -> 의심 -> 투표",
    target: "친구방, 방송, MT",
    packsTitle: "오늘의 질문팩",
    pickPack: "질문팩 선택",
    groupRegistered: "최애 그룹 등록 여부",
    partyTitle: "한 명만 다른 질문을 받습니다.",
    partyBody: "휴대폰을 넘기며 질문 확인, 답변 입력, 투표까지 진행합니다.",
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
    quickAnswer: "자동 답변 입력",
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
    partyCardBody: "오늘 방에서 나온 결과입니다.",
    copyResult: "결과 복사",
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
    copiedSpectator: "관전 링크를 복사했습니다",
    copiedResult: "결과를 복사했습니다",
    copyBlocked: "복사가 막혔어요. HTTPS 배포 링크에서는 정상 동작합니다",
    answerRequired: "짧게라도 답변을 적어야 다음으로 넘어가요",
    resultHit: "맞혔다",
    resultMiss: "속았다",
    serverConnected: "서버 연결 성공",
    serverFailed: "서버 연결 실패",
    onlineRoomCreated: "방을 만들었습니다",
    waitingRoom: "대기실",
    onlineStart: "온라인 시작",
    refresh: "새로고침",
    joinAs: "닉네임",
    waitingPlayers: "참가자를 기다리는 중",
    submitted: "제출 완료",
    waitOthers: "다른 참가자를 기다리는 중",
    onlineVoteReady: "모든 답변이 모였습니다",
  },
  ja: {
    eyebrow: "4-6人リアルタイム推理",
    title: "君だけ知らない",
    heroTag: "2分ソーシャル推理",
    heroTitle: "答えひとつで友だちを疑おう。",
    heroBody: "一人だけ違う質問を受けます。自然なふりをする答えを見抜いてください。",
    soloPlay: "一人で遊ぶ",
    quickMatch: "クイック参加",
    quickMatchBody: "待機中の公開ルームにすぐ入ります。",
    createRoom: "ルーム作成",
    createRoomBody: "友だちに送る招待ルームを作ります。",
    profile: "プロフィール",
    customizeBody: "キャラと推し設定を整えます。",
    guide: "遊び方",
    packs: "質問パック",
    news: "お知らせ",
    homeLive: "運営ベータ",
    homeLiveBody: "Railway + Postgres 接続済み",
    featuredPacks: "おすすめ質問パック",
    featuredPacksBody: "今テストしやすいテーマ",
    homeUtilities: "マイスペース",
    soloShort: "一人で練習",
    closetCategory: "アセットカテゴリ",
    artistRegistry: "アーティスト登録状況",
    registered: "登録済み",
    ownedArtist: "公式アーティスト",
    settings: "設定",
    language: "言語",
    appLanguage: "表示言語",
    playerLanguage: "プレイヤー言語",
    save: "保存",
    saved: "保存しました",
    profileTitle: "キャラを着せ替え",
    me: "自分",
    frameApplied: "フレーム適用中",
    preset: "プリセット",
    body: "ベース",
    hair: "ヘア",
    eyes: "目",
    lips: "リップ",
    beauty: "顔ポイント",
    accessory: "アクセ",
    top: "トップス",
    pants: "ボトムス",
    shoes: "シューズ",
    outfit: "セット衣装",
    hat: "ヘッド",
    face: "顔",
    item: "小物",
    back: "背景",
    aura: "オーラ",
    pose: "ポーズ",
    parts: "着せ替え",
    artist: "推し",
    frame: "フレーム",
    back: "戻る",
    createRoomTitle: "招待リンクを作成",
    roomTheme: "ルームテーマ",
    themeVibe: "テーマの雰囲気",
    questionPack: "質問パック",
    questionTheme: "質問テーマ",
    allGroups: "全グループ",
    playersSuffix: "人",
    packSuffix: "質問パック",
    inviteLink: "招待リンク",
    copyInvite: "招待リンクをコピー",
    spectatorLink: "観戦リンク",
    copySpectator: "観戦リンクをコピー",
    audienceMode: "観戦モード",
    audienceVote: "視聴者投票",
    audiencePick: "視聴者は誰を疑う？",
    audienceLocked: "視聴者予想完了",
    audienceResult: "視聴者予想",
    localDemo: "ルームを開く",
    backHome: "最初へ",
    openSettings: "設定",
    joinTitle: "友だちから届いたルーム",
    joinBody: "友だちと質問を確認して、怪しい答えを見つけましょう。",
    joinRoom: "ルームに参加",
    trySolo: "先に一人で試す",
    howToPlay: "10秒ルール",
    rule1: "一人だけ似ているけど違う質問を受けます。",
    rule2: "みんなの答えを見て、違和感のある人を探します。",
    rule3: "投票後に質問が公開され、理由がすぐ分かるのが大事です。",
    coreLoop: "答え公開 -> 疑う -> 投票",
    target: "友だち部屋、配信、合宿",
    packsTitle: "今日の質問パック",
    pickPack: "質問パック選択",
    groupRegistered: "推しグループ登録状況",
    partyTitle: "一人だけ違う質問を受けます。",
    partyBody: "スマホを回しながら質問確認、答え入力、投票まで進めます。",
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
    quickAnswer: "回答を自動入力",
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
    partyCardBody: "今日のルーム結果です。",
    copyResult: "結果をコピー",
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
    copiedSpectator: "観戦リンクをコピーしました",
    copiedResult: "結果をコピーしました",
    copyBlocked: "コピーがブロックされました。HTTPSの公開リンクでは動作します",
    answerRequired: "短くても答えを入力すると次へ進めます",
    resultHit: "当てた",
    resultMiss: "騙された",
    serverConnected: "サーバー接続成功",
    serverFailed: "サーバー接続失敗",
    onlineRoomCreated: "ルームを作成しました",
    waitingRoom: "待機室",
    onlineStart: "オンライン開始",
    refresh: "更新",
    joinAs: "ニックネーム",
    waitingPlayers: "参加者を待っています",
    submitted: "提出済み",
    waitOthers: "他の参加者を待っています",
    onlineVoteReady: "全員の回答が集まりました",
  },
};

const state = {
  mode: "party",
  playerCount: 5,
  phase: "lobby",
  roomCode: String(Math.floor(1000 + Math.random() * 9000)),
  roundIndex: 0,
  fakeIndex: 0,
  hostIndex: 0,
  revealed: [],
  answers: [],
  votes: [],
  audienceVotes: [],
  audiencePick: null,
  selectedVote: null,
  log: [],
  score: 0,
  streak: 0,
  lives: 3,
  questionNo: 1,
  hintUsed: false,
  lastSuccess: false,
  selectedAvatar: 0,
  selectedPose: settings.characterPoses[0].id,
  selectedFrame: frames[0].id,
  selectedBiasStyle: biasStyles[0].id,
  selectedPreset: dressUp.preset[0].id,
  selectedBody: dressUp.body[0].id,
  selectedHair: dressUp.hair[3].id,
  selectedEyes: dressUp.eyes[0].id,
  selectedLips: dressUp.lips[0].id,
  selectedBeauty: dressUp.beauty[0].id,
  selectedAccessory: dressUp.accessory[0].id,
  selectedTop: dressUp.top[2].id,
  selectedPants: dressUp.pants[1].id,
  selectedShoes: dressUp.shoes[1].id,
  selectedOutfit: dressUp.outfit[0].id,
  selectedHat: dressUp.hat[0].id,
  selectedFace: dressUp.face[0].id,
  selectedItem: dressUp.item[0].id,
  selectedBack: dressUp.back[0].id,
  selectedAura: dressUp.aura[0].id,
  selectedIdolGroup: idolGroups[0].id,
  selectedTheme: themes[0].id,
  selectedPack: packs[0].name,
  selectedQuestionTheme: packs[0].defaultQuestionTheme || "all",
  selectedAudiencePreset: settings.audiencePresets[0].id,
  profileTab: settings.profileTabs[0],
  activeDressCategory: "preset",
  lang: "ko",
  customNames: [...playerNames],
  playerLangs: [...settings.defaultPlayerLangs],
  apiBaseUrl: DEFAULT_API_BASE_URL,
  onlineRoom: null,
  onlinePlayerId: "",
  onlineName: "",
  currentAnswer: "",
  toast: "",
  heroTouchedAt: 0,
};

const app = document.querySelector("#app");
const languageOptions = settings.languages;
let heroTimer = null;
let onlinePollTimer = null;

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

function packId(pack) {
  return pack.id || pack.name;
}

function localizedPack(pack) {
  const translated = localeData()?.packs?.[packId(pack)];
  if (!translated) return { ...pack, baseName: pack.name };
  const rounds = translated.rounds
    ? pack.rounds.map((round, index) => ({ ...round, ...(translated.rounds[index] || {}) }))
    : pack.rounds;
  return { ...pack, ...translated, rounds, id: packId(pack), baseName: pack.name };
}

function localizedPackFor(lang, pack) {
  const translated = localeDataFor(lang)?.packs?.[packId(pack)];
  if (!translated) return { ...pack, baseName: pack.name };
  const rounds = translated.rounds
    ? pack.rounds.map((round, index) => ({ ...round, ...(translated.rounds[index] || {}) }))
    : pack.rounds;
  return { ...pack, ...translated, rounds, id: packId(pack), baseName: pack.name };
}

function localizedPacks() {
  return packs.map(localizedPack);
}

function themeId(theme) {
  return typeof theme === "string" ? theme : theme.id;
}

function themeById(id) {
  return themes.find((theme) => themeId(theme) === id) || themes[0];
}

function selectedBasePack() {
  return packs.find((item) => item.name === state.selectedPack || packId(item) === state.selectedPack) || packs[0];
}

function questionThemesForPack(pack = selectedBasePack()) {
  if (Array.isArray(pack.questionThemes) && pack.questionThemes.length) {
    return [
      { id: "all", name: t("allGroups"), tags: [pack.name] },
      ...pack.questionThemes,
    ];
  }
  if (pack.themeSource !== "idolGroups") return [];
  return [
    { id: "all", name: t("allGroups"), tags: [pack.name] },
    ...idolGroups,
  ];
}

function validQuestionTheme(id, pack = selectedBasePack()) {
  return questionThemesForPack(pack).some((item) => item.id === id);
}

function selectedQuestionTheme() {
  const pack = selectedBasePack();
  const themesForPack = questionThemesForPack(pack);
  if (!themesForPack.length) return null;
  return themesForPack.find((item) => item.id === state.selectedQuestionTheme)
    || themesForPack.find((item) => item.id === pack.defaultQuestionTheme)
    || themesForPack[0];
}

function selectedQuestionThemeLabel() {
  return selectedQuestionTheme()?.name || "";
}

function resetQuestionThemeForPack(pack = selectedBasePack()) {
  const themesForPack = questionThemesForPack(pack);
  if (!themesForPack.length) {
    state.selectedQuestionTheme = "all";
    return;
  }
  if (!themesForPack.some((item) => item.id === state.selectedQuestionTheme)) {
    state.selectedQuestionTheme = pack.defaultQuestionTheme || themesForPack[0].id;
  }
}

function themeLabel(theme) {
  const item = themeById(theme);
  return localeData()?.themes?.[themeId(item)]?.label || item.label || themeId(item);
}

function themeVibe(theme) {
  const item = themeById(theme);
  return localeData()?.themes?.[themeId(item)]?.vibe || item.vibe || "";
}

function themeAccent(theme) {
  return themeById(theme).accent || "#b8f35f";
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

function idolStatus(group) {
  return localeData()?.idolGroups?.[group.id]?.status || (group.status === "registered" ? t("registered") : "");
}

function idolMemberLine(member) {
  if (typeof member === "string") return member;
  return [
    member.name,
    member.birth,
    member.nationality,
    Array.isArray(member.roles) ? member.roles.join("/") : "",
  ].filter(Boolean).join(" · ");
}

function localizedNotice(notice) {
  const translated = localeData()?.notices?.[notice.id] || {};
  return { ...notice, ...translated };
}

function localizedHeroSlide(slide) {
  const translated = localeData()?.heroSlides?.[slide.id] || {};
  return { ...slide, ...translated };
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

function selectedDressKey(type) {
  return `selected${type[0].toUpperCase()}${type.slice(1)}`;
}

function profileTabLabel(tab) {
  return t(tab);
}

function poseLabel(pose) {
  return localeData()?.characterPoses?.[pose.id] || pose.label || pose.id;
}

function selectedPoseIndex() {
  return Math.max(0, settings.characterPoses.findIndex((pose) => pose.id === state.selectedPose));
}

function characterSetForProfile() {
  return characterSets.find((set) => set.groupId === state.selectedIdolGroup) || characterSets[0];
}

function spriteCellMarkup(column, row, extraClass = "") {
  const set = characterSetForProfile();
  const safeColumn = Math.max(0, Math.min(column, set.columns - 1));
  const safeRow = Math.max(0, Math.min(row, set.rows - 1));
  return `
    <span class="sprite-avatar ${extraClass}" style="--sprite-columns:${set.columns}; --sprite-rows:${set.rows}; --sprite-col:${safeColumn}; --sprite-row:${safeRow}; --sprite-aspect:${set.aspect || "1 / 1"};">
      <img src="${set.sheet}" alt="" />
    </span>
  `;
}

function menuItems() {
  const actions = {
    "quick-match": { label: t("quickMatch"), className: "primary", action: "quick-match" },
    "solo-start": { label: t("soloPlay"), className: "primary", action: "solo-start" },
    "room-create": { label: t("createRoom"), className: "secondary", action: "room-create" },
    profile: { label: t("profile"), className: "secondary", action: "profile" },
    guide: { label: t("guide"), className: "secondary", action: "guide" },
    packs: { label: t("packs"), className: "secondary", action: "packs" },
    news: { label: t("news"), className: "secondary", action: "news" },
  };
  return settings.mainMenu.map((id) => actions[id]).filter(Boolean);
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
  const dress = Object.fromEntries(settings.profileCategories.map((type) => [type, state[selectedDressKey(type)]]));
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      selectedAvatar: state.selectedAvatar,
      selectedPose: state.selectedPose,
      selectedBiasStyle: state.selectedBiasStyle,
      dress,
      selectedHair: state.selectedHair,
      selectedOutfit: state.selectedOutfit,
      selectedItem: state.selectedItem,
      selectedAura: state.selectedAura,
      selectedFrame: state.selectedFrame,
      selectedIdolGroup: state.selectedIdolGroup,
      selectedPack: state.selectedPack,
      selectedQuestionTheme: state.selectedQuestionTheme,
      selectedTheme: state.selectedTheme,
      customNames: state.customNames,
      playerLangs: state.playerLangs,
      lang: state.lang,
      activeDressCategory: state.activeDressCategory,
    }),
  );
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (Number.isInteger(saved.selectedAvatar)) state.selectedAvatar = saved.selectedAvatar;
    if (settings.characterPoses.some((pose) => pose.id === saved.selectedPose)) state.selectedPose = saved.selectedPose;
    if (biasStyles.some((style) => style.id === saved.selectedBiasStyle)) state.selectedBiasStyle = saved.selectedBiasStyle;
    settings.profileCategories.forEach((type) => {
      const stateKey = selectedDressKey(type);
      const savedId = saved.dress?.[type] || saved[stateKey];
      if (dressOptions(type).some((item) => item.id === savedId)) state[stateKey] = savedId;
    });
    if (frames.some((frame) => frame.id === saved.selectedFrame)) state.selectedFrame = saved.selectedFrame;
    if (idolGroups.some((group) => group.id === saved.selectedIdolGroup)) state.selectedIdolGroup = saved.selectedIdolGroup;
    if (packs.some((pack) => pack.name === saved.selectedPack || packId(pack) === saved.selectedPack)) state.selectedPack = saved.selectedPack;
    resetQuestionThemeForPack();
    if (validQuestionTheme(saved.selectedQuestionTheme)) state.selectedQuestionTheme = saved.selectedQuestionTheme;
    if (themes.some((theme) => themeId(theme) === saved.selectedTheme)) state.selectedTheme = saved.selectedTheme;
    if (supportedLang(saved.lang)) state.lang = saved.lang;
    if (settings.profileCategories.includes(saved.activeDressCategory)) state.activeDressCategory = saved.activeDressCategory;
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
  const api = params.get("api");
  if (api && location.hostname === "localhost") state.apiBaseUrl = api;
  if (!room) return;

  state.roomCode = room;
  state.selectedPack = params.get("pack") || state.selectedPack;
  resetQuestionThemeForPack();
  const urlQuestionTheme = params.get("qt");
  if (validQuestionTheme(urlQuestionTheme)) state.selectedQuestionTheme = urlQuestionTheme;
  const urlTheme = params.get("theme");
  if (themes.some((theme) => themeId(theme) === urlTheme)) state.selectedTheme = urlTheme;
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
  fetchOnlineRoom(false);
}

function track(eventName) {
  const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || "{}");
  events[eventName] = (events[eventName] || 0) + 1;
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

function betaStats() {
  return JSON.parse(localStorage.getItem(EVENTS_KEY) || "{}");
}

function normalizedApiBase() {
  return DEFAULT_API_BASE_URL;
}

function apiEnabled() {
  return true;
}

async function apiRequest(path, options = {}) {
  if (!apiEnabled()) throw new Error("missing_api_base");
  const response = await fetch(`${normalizedApiBase()}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || data.error || "api_error");
  return data;
}

async function createOnlineRoom() {
  try {
    const room = await apiRequest("/api/rooms", {
      method: "POST",
      body: JSON.stringify({
        playerCount: state.playerCount,
        packId: packId(selectedBasePack()),
        questionThemeId: selectedQuestionTheme()?.id || "all",
        themeId: state.selectedTheme,
        playerLangs: state.playerLangs.slice(0, state.playerCount),
        players: players().map((player) => ({
          name: player.name,
          avatarIndex: player.index,
        })),
      }),
    });
    state.roomCode = room.code;
    applyOnlineRoom(room, "p1");
    state.phase = "onlineRoom";
    state.toast = t("onlineRoomCreated");
    track("onlineRoomCreate");
  } catch {
    state.toast = t("serverFailed");
  }
  saveSettings();
  render();
}

async function quickMatch() {
  try {
    const result = await apiRequest("/api/match/quick", {
      method: "POST",
      body: JSON.stringify({
        name: cleanText(state.onlineName || state.customNames[0], t("me")),
        lang: state.lang,
        packId: "kpop",
        questionThemeId: "v01d",
        themeId: "idol-backstage",
      }),
    });
    applyOnlineRoom(result.room, result.player.id);
    state.phase = "onlineRoom";
    state.toast = "";
    track("quickMatch");
  } catch {
    state.toast = t("serverFailed");
  }
  render();
}

function roomInviteUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("room", state.roomCode);
  url.searchParams.set("pack", packId(selectedBasePack()));
  if (selectedQuestionTheme()) url.searchParams.set("qt", selectedQuestionTheme().id);
  url.searchParams.set("theme", state.selectedTheme);
  url.searchParams.set("players", String(state.playerCount));
  url.searchParams.set("lang", state.lang);
  url.searchParams.set("pl", state.playerLangs.slice(0, state.playerCount).join(""));
  if (location.hostname === "localhost" && state.apiBaseUrl !== DEFAULT_API_BASE_URL) url.searchParams.set("api", state.apiBaseUrl);
  return url.toString();
}

function applyOnlineRoom(room, playerId = state.onlinePlayerId) {
  state.onlineRoom = room;
  state.onlinePlayerId = playerId || state.onlinePlayerId;
  state.roomCode = room.code;
  state.playerCount = room.playerCount;
  if (room.pack?.id) state.selectedPack = room.pack.id;
  if (room.theme?.id) state.selectedTheme = room.theme.id;
  if (room.questionTheme?.id) state.selectedQuestionTheme = room.questionTheme.id;
  state.answers = room.answers.map((answer) => ({
    player: answer.playerName,
    text: answer.text || "",
    question: answer.question || "",
    role: answer.role || "",
    suspicious: room.result?.fakePlayerId === answer.playerId,
  }));
}

async function fetchOnlineRoom(renderAfter = true) {
  if (!state.roomCode) return null;
  try {
    const suffix = state.onlinePlayerId ? `?playerId=${encodeURIComponent(state.onlinePlayerId)}` : "";
    const room = await apiRequest(`/api/rooms/${state.roomCode}${suffix}`);
    applyOnlineRoom(room);
    if (renderAfter) render();
    return room;
  } catch {
    if (renderAfter) {
      state.toast = t("serverFailed");
      render();
    }
    return null;
  }
}

async function joinOnlineRoom() {
  try {
    const result = await apiRequest(`/api/rooms/${state.roomCode}/join`, {
      method: "POST",
      body: JSON.stringify({
        name: cleanText(state.onlineName, t("me")),
        lang: state.lang,
      }),
    });
    applyOnlineRoom(result.room, result.player.id);
    state.phase = "onlineRoom";
    state.toast = "";
  } catch {
    state.toast = t("serverFailed");
  }
  render();
}

async function startOnlineRoom() {
  try {
    const room = await apiRequest(`/api/rooms/${state.roomCode}/start`, {
      method: "POST",
      body: JSON.stringify({ playerId: state.onlinePlayerId }),
    });
    applyOnlineRoom(room);
    state.phase = "onlineRoom";
  } catch {
    state.toast = t("serverFailed");
  }
  render();
}

async function submitOnlineAnswer() {
  const answer = cleanText(state.currentAnswer);
  if (!answer) {
    state.toast = t("answerRequired");
    render();
    return;
  }
  try {
    const room = await apiRequest(`/api/rooms/${state.roomCode}/answers`, {
      method: "POST",
      body: JSON.stringify({ playerId: state.onlinePlayerId, text: answer }),
    });
    state.currentAnswer = "";
    applyOnlineRoom(room);
  } catch {
    state.toast = t("serverFailed");
  }
  render();
}

async function castOnlineVote(playerId) {
  try {
    const room = await apiRequest(`/api/rooms/${state.roomCode}/votes`, {
      method: "POST",
      body: JSON.stringify({ playerId: state.onlinePlayerId, targetId: playerId }),
    });
    applyOnlineRoom(room);
  } catch {
    state.toast = t("serverFailed");
  }
  render();
}

function isOnlineHost() {
  return state.onlinePlayerId === "p1";
}

function resultText() {
  const fake = state.answers[state.fakeIndex];
  const verdict = state.lastSuccess ? t("resultHit") : t("resultMiss");
  return [
    `${t("title")} ${t("roomResult")}: ${verdict}`,
    `${t("fakeIs")} ${fake.player}`,
    `${t("commonQuestion")}: ${questionForPlayer(0, false)} / ${questionForPlayer(1, false)}`,
    `${t("fakeQuestion")}: ${questionForPlayer(0, true)} / ${questionForPlayer(1, true)}`,
    `${selectedPack().name} ${t("packSuffix")}${selectedQuestionThemeLabel() ? ` · ${selectedQuestionThemeLabel()}` : ""}`,
    roomInviteUrl(),
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

function miniMeAvatarMarkup(extraClass = "") {
  const body = dressOption("body", state.selectedBody);
  const hair = dressOption("hair", state.selectedHair);
  const eyes = dressOption("eyes", state.selectedEyes);
  const lips = dressOption("lips", state.selectedLips);
  const accessory = dressOption("accessory", state.selectedAccessory);
  const beauty = dressOption("beauty", state.selectedBeauty);
  const className = ["avatar", "custom-face-avatar", extraClass].filter(Boolean).join(" ");
  return `
    <span class="${className}" style="--skin:${body.skin || "#f3b27d"};--hair:${hair.color || "#16181d"};--hair-accent:${hair.accent || hair.color || "#16181d"};--eyes:${eyes.color || "#17191f"};--lips:${lips.color || "#d86a70"};">
      <i class="face-head"></i>
      <i class="face-hair"></i>
      <i class="face-eye left"></i>
      <i class="face-eye right"></i>
      <i class="face-lip"></i>
      ${beauty.id !== "none" ? `<i class="face-beauty">${beauty.symbol || "."}</i>` : ""}
      ${accessory.id !== "none" ? `<i class="face-accessory">${accessory.symbol || ""}</i>` : ""}
    </span>
  `;
}

function playerAvatarMarkup(index, extraClass = "", playerId = "") {
  if (index === 0 || (playerId && playerId === state.onlinePlayerId)) return miniMeAvatarMarkup(extraClass);
  return avatarMarkup(index, extraClass);
}

function profileAvatarMarkup(extraClass = "") {
  return avatarMarkup(state.selectedAvatar, extraClass);
}

function fullBodyAvatarMarkup() {
  const aura = dressOption("aura", state.selectedAura).color || "#ffd166";
  const back = dressOption("back", state.selectedBack);
  const preset = dressOption("preset", state.selectedPreset);
  if (preset?.asset) {
    return `
      <div class="stage-avatar ${state.selectedFrame} ${state.selectedBiasStyle}" style="--aura:${aura};">
        ${back.id !== "none" ? `<span class="closet-back">${back.symbol || ""}</span>` : ""}
        <span class="stage-aura"></span>
        <span class="asset-character preset-character">
          <i class="asset-shadow"></i>
          <img class="asset-layer asset-preset" src="${preset.asset}" alt="" />
        </span>
      </div>
    `;
  }
  const layers = ["body", "pants", "shoes", "top", "hair", "lips", "beauty", "accessory", "item"]
    .map((type) => ({ type, item: dressOption(type, state[selectedDressKey(type)]) }))
    .filter(({ item }) => item?.asset);
  return `
    <div class="stage-avatar ${state.selectedFrame} ${state.selectedBiasStyle}" style="--aura:${aura};">
      ${back.id !== "none" ? `<span class="closet-back">${back.symbol || ""}</span>` : ""}
      <span class="stage-aura"></span>
      <span class="asset-character">
        <i class="asset-shadow"></i>
        ${layers.map(({ type, item }) => `<img class="asset-layer asset-${type}" src="${item.asset}" alt="" />`).join("")}
      </span>
    </div>
  `;
}

function rarityClass(item) {
  return `rarity-${String(item.rarity || "N").toLowerCase()}`;
}

function selectedPack() {
  return localizedPack(selectedBasePack());
}

function activeRounds() {
  const pack = selectedPack();
  if (!state.selectedQuestionTheme || state.selectedQuestionTheme === "all") return pack.rounds;
  const themed = pack.rounds.filter((round) => Array.isArray(round.themes) && round.themes.includes(state.selectedQuestionTheme));
  return themed.length ? themed : pack.rounds;
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
  const showRoomCode = !["lobby", "guide", "packs", "news", "settings", "profile"].includes(state.phase);
  const showBack = state.phase !== "lobby";
  app.innerHTML = `
    <section class="phone${soloClass}">
      <header class="topbar">
        <div class="title-stack">
          ${showBack ? `<button class="back-button" data-action="back">${t("back")}</button>` : ""}
          <div>
            <p class="eyebrow">${t("eyebrow")}</p>
            <h1>${t("title")}</h1>
          </div>
        </div>
        <div class="top-actions">
          <button class="settings-button" data-action="settings">${t("openSettings")}</button>
          ${showRoomCode ? `<div class="room-code">ROOM ${state.roomCode}</div>` : ""}
        </div>
      </header>
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
      ${content}
    </section>
  `;
  state.toast = "";
  setupHeroSlider();
  if (state.phase === "lobby") requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
}

function goBack() {
  if (state.phase === "partyReady") {
    state.phase = "roomCreate";
  } else {
    state.phase = "lobby";
    state.mode = "party";
    window.history.replaceState({}, "", window.location.pathname);
  }
  render();
}

function setupHeroSlider() {
  clearInterval(heroTimer);
  const slider = app.querySelector("[data-hero-slider]");
  if (!slider || slider.children.length < 2) return;
  slider.style.transform = "none";
  slider.scrollLeft = 0;
  state.heroTouchedAt = Date.now();
  slider.addEventListener("pointerdown", () => {
    state.heroTouchedAt = Date.now();
  });
  slider.addEventListener("scroll", () => {
    state.heroTouchedAt = Date.now();
  }, { passive: true });
  heroTimer = setInterval(() => {
    if (Date.now() - state.heroTouchedAt < 6000) return;
    const nextIndex = Math.round(slider.scrollLeft / slider.clientWidth + 1) % slider.children.length;
    slider.scrollTo({ left: nextIndex * slider.clientWidth, behavior: "smooth" });
  }, 4500);
}

function lobbyView() {
  const featured = localizedPacks().filter((pack) => ["kpop", "creator", "game", "campus"].includes(pack.id || pack.name)).slice(0, 4);
  shell(`
    <section class="home-screen">
      <section class="hero-card home-hero">
        <div class="hero-slider" data-hero-slider style="--slide-count:${heroSlides.length}">
          ${heroSlides.map(localizedHeroSlide).map((slide) => `
            <article class="hero-slide">
              <img class="hero-art" src="${slide.image}" alt="" />
              <div class="hero-slide-copy">
                <span>${slide.tag}</span>
                <strong>${slide.title}</strong>
                <p>${slide.body}</p>
              </div>
            </article>
          `).join("")}
        </div>
        <div class="home-hero-meta">
          <span>${t("homeLive")}</span>
          <strong>${t("title")}</strong>
          <small>${t("homeLiveBody")}</small>
        </div>
      </section>
      <section class="home-primary-actions">
        <button class="home-action home-action-main" data-action="quick-match">
          <span>${t("quickMatch")}</span>
          <strong>${t("quickMatchBody")}</strong>
        </button>
        <button class="home-action" data-action="room-create">
          <span>${t("createRoom")}</span>
          <strong>${t("createRoomBody")}</strong>
        </button>
        <button class="home-action" data-action="solo-start">
          <span>${t("soloShort")}</span>
          <strong>${t("soloBody")}</strong>
        </button>
      </section>
      <section class="home-tools">
        <div class="section-head">
          <span>${t("homeUtilities")}</span>
          <strong>${t("homeLive")}</strong>
        </div>
        <div class="home-tool-row">
          <button data-action="profile">${t("profile")}</button>
          <button data-action="packs">${t("packs")}</button>
          <button data-action="guide">${t("guide")}</button>
          <button data-action="news">${t("news")}</button>
        </div>
      </section>
      <section class="home-featured">
        <div class="section-head">
          <span>${t("featuredPacks")}</span>
          <strong>${t("featuredPacksBody")}</strong>
        </div>
        <div class="home-pack-row">
          ${featured.map((pack) => `
            <button data-pack="${pack.id}" data-action="room-create">
              <span>${pack.status}</span>
              <strong>${pack.name}</strong>
              <small>${pack.tone}</small>
            </button>
          `).join("")}
        </div>
      </section>
    </section>
  `);
}

function profileView() {
  const group = idolGroup(state.selectedIdolGroup);
  const tab = settings.profileTabs.includes(state.profileTab) ? state.profileTab : settings.profileTabs[0];
  const activeCategory = settings.profileCategories.includes(state.activeDressCategory) ? state.activeDressCategory : settings.profileCategories[0];
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
          <small>${dressLabel("preset", state.selectedPreset)} / ${frameLabel(state.selectedFrame)} ${t("frameApplied")}</small>
        </div>
      </div>
      <div class="tab-row">
        ${settings.profileTabs.map((item) => `
          <button class="${tab === item ? "selected" : ""}" data-profile-tab="${item}">${profileTabLabel(item)}</button>
        `).join("")}
      </div>
      ${tab === "parts" ? `
        <div class="option-group dress-group">
          <span>${t("pose")}</span>
          ${settings.characterPoses.map((pose) => `
            <button class="${state.selectedPose === pose.id ? "selected" : ""}" data-pose="${pose.id}">
              ${poseLabel(pose)}<small>${pose.id}</small>
            </button>
          `).join("")}
        </div>
        <div class="closet-tabs">
          <span>${t("closetCategory")}</span>
          <div>
            ${settings.profileCategories.map((type) => `
              <button class="${activeCategory === type ? "selected" : ""}" data-dress-category="${type}">${t(type)}</button>
            `).join("")}
          </div>
        </div>
        <div class="closet-group">
          <span>${t(activeCategory)}</span>
          <div class="closet-grid">
          ${dressOptions(activeCategory).map((item) => `
            <button class="${state[selectedDressKey(activeCategory)] === item.id ? "selected" : ""} ${rarityClass(item)}" data-dress-type="${activeCategory}" data-dress-id="${item.id}">
              <b>${item.asset ? `<img src="${item.thumb || item.asset}" alt="" />` : item.symbol || item.label.slice(0, 1)}</b>
              <em>${dressLabel(activeCategory, item.id)}</em>
              <small>${item.rarity || "N"}</small>
            </button>
          `).join("")}
          </div>
        </div>
      ` : ""}
      ${tab === "artist" ? `
        <div class="option-group">
          <span>${t("groupRegistered")}</span>
          ${idolGroups.map((item) => `
            <button class="${state.selectedIdolGroup === item.id ? "selected" : ""}" data-idol-group="${item.id}">
              ${item.name}<small>${idolStatus(item) ? `${idolStatus(item)} · ` : ""}${item.type.toUpperCase()} · ${idolTags(item).join(" · ")}</small>
            </button>
          `).join("")}
        </div>
        ${group.members ? `
          <div class="member-strip">
            ${group.members.map((member, index) => `
              <span>${index + 1}. ${idolMemberLine(member)}</span>
            `).join("")}
          </div>
        ` : ""}
        <div class="option-group">
          <span>최애 포지션 / 推しポジション</span>
          ${biasStyles.map((style) => `
            <button class="${state.selectedBiasStyle === style.id ? "selected" : ""}" data-bias-style="${style.id}">
              ${biasStyleLabel(style.id)}<small>${biasStyleDetail(style.id)}</small>
            </button>
          `).join("")}
        </div>
      ` : ""}
      ${tab === "frame" ? `
        <div class="frame-picker">
          ${frames.map((frame) => `
            <button class="${state.selectedFrame === frame.id ? "selected" : ""}" data-frame="${frame.id}">
              <span class="frame-dot ${frame.id}"></span>${frameLabel(frame.id)}
            </button>
          `).join("")}
        </div>
      ` : ""}
      <button class="primary full" data-action="save-profile">${t("save")}</button>
    </section>
  `);
}

function roomCreateView() {
  const questionThemes = questionThemesForPack();
  shell(`
    <section class="panel room-panel">
      <div class="section-head">
        <span>Create Room</span>
        <strong>${t("createRoomTitle")}</strong>
      </div>
      <div class="room-preview">
        <span>ONLINE ROOM</span>
        <strong>${themeLabel(state.selectedTheme)}</strong>
        <p>${selectedPack().name}${selectedQuestionThemeLabel() ? ` · ${selectedQuestionThemeLabel()}` : ""} · ${themeVibe(state.selectedTheme)}</p>
      </div>
      <div class="count-row">
        ${settings.playerCounts.map((count) => `
          <button class="${state.playerCount === count ? "active" : ""}" data-count="${count}">${count}${t("playersSuffix")}</button>
        `).join("")}
      </div>
      <div class="option-group">
        <span>${t("roomTheme")}</span>
        ${themes.map((theme) => `
          <button class="${state.selectedTheme === themeId(theme) ? "selected" : ""}" data-theme="${themeId(theme)}">
            ${themeLabel(themeId(theme))}<small>${themeVibe(themeId(theme))}</small>
          </button>
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
      ${questionThemes.length ? `
        <div class="option-group">
          <span>${t("questionTheme")}</span>
          ${questionThemes.map((theme) => `
            <button class="${state.selectedQuestionTheme === theme.id ? "selected" : ""}" data-question-theme="${theme.id}">
              ${theme.name}<small>${(theme.tags || []).join(" · ")}</small>
            </button>
          `).join("")}
        </div>
      ` : ""}
      <button class="primary full" data-action="party-ready">${t("localDemo")}</button>
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
      <label class="answer-field">
        <span>${t("joinAs")}</span>
        <input data-online-name="true" value="${state.onlineName || state.customNames[0]}" maxlength="10" />
      </label>
      <button class="primary full" data-action="party-ready">${t("joinRoom")}</button>
      <button class="secondary full" data-action="solo-start">${t("trySolo")}</button>
    </section>
  `);
}

function onlineRoomView() {
  const room = state.onlineRoom;
  if (!room) {
    joinRoomView();
    return;
  }
  const me = room.players.find((player) => player.id === state.onlinePlayerId);
  shell(`
    ${quitBar()}
    <section class="panel room-panel">
      <div class="section-head">
        <span>ROOM ${room.code}</span>
        <strong>${room.status === "lobby" ? t("waitingRoom") : room.status.toUpperCase()}</strong>
      </div>
      <div class="room-preview">
        <span>${room.pack.name} · ${room.questionTheme.name}</span>
        <strong>${room.theme.label}</strong>
        <p>${me ? `${me.name} · ${me.lang.toUpperCase()}` : t("waitingPlayers")}</p>
      </div>
      ${room.status === "lobby" ? `
        <div class="invite-box">
          <span>${t("inviteLink")}</span>
          <p>${roomInviteUrl()}</p>
        </div>
        <button class="secondary full" data-action="copy-invite">${t("copyInvite")}</button>
        <div class="players">
          ${room.players.map((player) => `
            <article>
              ${playerAvatarMarkup(player.avatarIndex || 0, "", player.id)}
              <span>${player.name}</span>
              <small>${player.connected ? t("statusJoined") : t("statusWait")}</small>
            </article>
          `).join("")}
        </div>
        ${isOnlineHost() ? `<button class="primary full" data-action="online-start">${t("onlineStart")}</button>` : `<button class="secondary full" data-action="online-refresh">${t("refresh")}</button>`}
      ` : ""}
      ${room.status === "answering" ? onlineAnswerMarkup(room) : ""}
      ${room.status === "voting" ? onlineVoteMarkup(room) : ""}
      ${room.status === "result" ? onlineResultMarkup(room) : ""}
      <button class="secondary full" data-action="online-refresh">${t("refresh")}</button>
    </section>
  `);
}

function onlineAnswerMarkup(room) {
  const answer = room.myAnswer;
  if (!answer) return `<p>${t("waitOthers")}</p>`;
  if (answer.submitted) return `<p>${t("submitted")} · ${t("waitOthers")}</p>`;
  return `
    <label class="answer-field">
      <span>${answer.role === "fakeQuestion" ? t("fakeQuestion") : t("commonQuestion")}</span>
      <strong class="question">${answer.question}</strong>
      <input data-answer-input="true" value="${state.currentAnswer}" maxlength="18" placeholder="${t("answerPlaceholder")}" />
    </label>
    <button class="primary full" data-action="online-answer">${t("submitDone")}</button>
  `;
}

function onlineVoteMarkup(room) {
  return `
    <p>${t("onlineVoteReady")}</p>
    <section class="answers">
      ${room.answers.map((answer, index) => `
        <article class="answer-card">
          ${playerAvatarMarkup(index, "", player.id)}
          <div>
            <strong>${answer.playerName}</strong>
            <p>${answer.text}</p>
          </div>
        </article>
      `).join("")}
    </section>
    <div class="vote-grid">
      ${room.players.map((player) => `
        <button data-online-vote="${player.id}">
          ${playerAvatarMarkup(player.avatarIndex || 0, "", player.id)}
          <strong>${player.name}</strong>
        </button>
      `).join("")}
    </div>
  `;
}

function onlineResultMarkup(room) {
  const result = room.result;
  return `
    <section class="result ${result.citizenWin ? "win" : "lose"}">
      <div class="tag">${result.citizenWin ? t("citizenWin") : t("fakeWin")}</div>
      <h2>${t("fakeIs")} ${result.fakePlayerName}</h2>
    </section>
    <section class="answers">
      ${room.answers.map((answer, index) => `
        <article class="answer-card ${answer.playerId === result.fakePlayerId ? "highlight" : ""}">
          ${playerAvatarMarkup(index, "", player.id)}
          <div>
            <strong>${answer.playerName}</strong>
            <p>${answer.text}</p>
            <small>${answer.role === "fakeQuestion" ? t("fakeQuestion") : t("commonQuestion")}: ${answer.question}</small>
          </div>
          <span class="votes">${result.tally.find((item) => item.playerId === answer.playerId)?.count || 0}</span>
        </article>
      `).join("")}
    </section>
  `;
}

function guideView() {
  shell(`
    <section class="panel rule-panel compact-page">
      <div class="section-head">
        <span>How To Play</span>
        <strong>${t("howToPlay")}</strong>
      </div>
      <div class="rule-steps">
        <article><span>1</span><p>${t("rule1")}</p></article>
        <article><span>2</span><p>${t("rule2")}</p></article>
        <article><span>3</span><p>${t("rule3")}</p></article>
      </div>
      <button class="primary full" data-action="room-create">${t("createRoom")}</button>
      <button class="text-button" data-action="back-lobby">${t("backHome")}</button>
    </section>
  `);
}

function packsView() {
  const questionThemes = questionThemesForPack();
  shell(`
    <section class="panel pack-panel compact-page">
      <div class="section-head">
        <span>Question Packs</span>
        <strong>${t("pickPack")}</strong>
      </div>
      ${localizedPacks().map((pack) => `
        <button class="pack-card ${state.selectedPack === pack.name || state.selectedPack === pack.baseName || state.selectedPack === pack.id ? "selected" : ""}" data-pack="${pack.id}">
          <div>
            <strong>${pack.name}</strong>
            <p>${pack.rounds.length}${t("problem")} · ${pack.tone}</p>
          </div>
          <span>${pack.status}</span>
        </button>
      `).join("")}
      ${questionThemes.length ? `
        <div class="option-group">
          <span>${t("questionTheme")}</span>
          ${questionThemes.map((theme) => `
            <button class="${state.selectedQuestionTheme === theme.id ? "selected" : ""}" data-question-theme="${theme.id}">
              ${theme.name}<small>${(theme.tags || []).join(" · ")}</small>
            </button>
          `).join("")}
        </div>
      ` : ""}
      <button class="primary full" data-action="room-create">${t("createRoom")}</button>
      <button class="text-button" data-action="back-lobby">${t("backHome")}</button>
    </section>
  `);
}

function newsView() {
  shell(`
    <section class="panel compact-page">
      <div class="section-head">
        <span>News</span>
        <strong>${t("news")}</strong>
      </div>
      <div class="notice-list">
        ${notices.map(localizedNotice).map((notice) => `
          <article>
            <span>${notice.date}</span>
            <strong>${notice.title}</strong>
            <p>${notice.body}</p>
          </article>
        `).join("")}
      </div>
      <div class="section-head">
        <span>Artists</span>
        <strong>${t("artistRegistry")}</strong>
      </div>
      <div class="registry-list">
        ${idolGroups.map((group) => `
          <article class="${group.owned ? "owned" : ""}">
            <strong>${group.name}</strong>
            <span>${idolStatus(group) || t("statusJoined")}</span>
            <p>${idolTags(group).join(" · ")}</p>
          </article>
        `).join("")}
      </div>
      <button class="text-button" data-action="back-lobby">${t("backHome")}</button>
    </section>
  `);
}

function settingsView() {
  shell(`
    <section class="panel compact-page">
      <div class="section-head">
        <span>Settings</span>
        <strong>${t("settings")}</strong>
      </div>
      ${languageSelectMarkup(state.lang, "data-app-lang", t("appLanguage"))}
      <div class="option-group">
        <span>${t("roomTheme")}</span>
        ${themes.map((theme) => `
          <button class="${state.selectedTheme === themeId(theme) ? "selected" : ""}" data-theme="${themeId(theme)}">
            ${themeLabel(themeId(theme))}<small>${themeVibe(themeId(theme))}</small>
          </button>
        `).join("")}
      </div>
      <button class="primary full" data-action="back-lobby">${t("save")}</button>
    </section>
  `);
}

function partyReadyView() {
  shell(`
    <section class="panel intro">
      <div class="tag">Party</div>
      <h2>${t("partyTitle")}</h2>
      <p>${t("partyBody")}</p>
      <div class="count-row">
        ${settings.playerCounts.map((count) => `
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
          ${playerAvatarMarkup(index)}
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
      ${playerAvatarMarkup(player.index, "big")}
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
      ${playerAvatarMarkup(state.hostIndex, "big")}
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
          ${playerAvatarMarkup(index)}
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
            ${playerAvatarMarkup(player.index)}
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
          ${playerAvatarMarkup(index)}
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
          ${playerAvatarMarkup(index)}
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
          ${playerAvatarMarkup(index)}
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
  clearInterval(onlinePollTimer);
  document.title = t("title");
  if (state.phase === "lobby") lobbyView();
  if (state.phase === "joinRoom") joinRoomView();
  if (state.phase === "profile") profileView();
  if (state.phase === "roomCreate") roomCreateView();
  if (state.phase === "guide") guideView();
  if (state.phase === "packs") packsView();
  if (state.phase === "news") newsView();
  if (state.phase === "settings") settingsView();
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
  if (state.phase === "onlineRoom") {
    onlinePollTimer = setInterval(() => fetchOnlineRoom(true), 3000);
  }
  if (state.phase === "onlineRoom") onlineRoomView();
}

app.addEventListener("click", async (event) => {
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
  if (button.dataset.action === "solo-start") startSolo();
  if (button.dataset.action === "quick-match") {
    await quickMatch();
  }
  if (button.dataset.action === "copy-invite") {
    copyText(roomInviteUrl(), t("copiedInvite"));
    track("inviteCopy");
  }
  if (button.dataset.action === "copy-result") {
    copyText(resultText(), t("copiedResult"));
    track("resultCopy");
  }
  if (button.dataset.action === "profile") {
    state.phase = "profile";
    render();
  }
  if (button.dataset.action === "guide") {
    state.phase = "guide";
    render();
  }
  if (button.dataset.action === "packs") {
    state.phase = "packs";
    render();
  }
  if (button.dataset.action === "news") {
    state.phase = "news";
    render();
  }
  if (button.dataset.action === "settings") {
    state.phase = "settings";
    render();
  }
  if (button.dataset.action === "back") {
    goBack();
  }
  if (button.dataset.action === "room-create") {
    state.roomCode = generateRoomCode();
    state.phase = "roomCreate";
    render();
  }
  if (button.dataset.action === "party-ready") {
    if (state.phase === "joinRoom") await joinOnlineRoom();
    else await createOnlineRoom();
  }
  if (button.dataset.action === "online-start") await startOnlineRoom();
  if (button.dataset.action === "online-refresh") await fetchOnlineRoom();
  if (button.dataset.action === "online-answer") await submitOnlineAnswer();
  if (button.dataset.action === "back-lobby") {
    state.phase = "lobby";
    window.history.replaceState({}, "", window.location.pathname);
    render();
  }
  if (button.dataset.action === "save-profile") {
    saveSettings();
    state.toast = t("saved");
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
  if (button.dataset.pose !== undefined && settings.characterPoses.some((pose) => pose.id === button.dataset.pose)) {
    state.selectedPose = button.dataset.pose;
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
  if (button.dataset.profileTab !== undefined && settings.profileTabs.includes(button.dataset.profileTab)) {
    state.profileTab = button.dataset.profileTab;
    render();
  }
  if (button.dataset.dressCategory !== undefined && settings.profileCategories.includes(button.dataset.dressCategory)) {
    state.activeDressCategory = button.dataset.dressCategory;
    saveSettings();
    render();
  }
  if (button.dataset.dressType !== undefined && button.dataset.dressId !== undefined) {
    const stateKey = selectedDressKey(button.dataset.dressType);
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
    resetQuestionThemeForPack();
    saveSettings();
    render();
  }
  if (button.dataset.questionTheme !== undefined && validQuestionTheme(button.dataset.questionTheme)) {
    state.selectedQuestionTheme = button.dataset.questionTheme;
    saveSettings();
    render();
  }
  if (button.dataset.onlineVote !== undefined) await castOnlineVote(button.dataset.onlineVote);
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
  if (input.dataset.onlineName) {
    state.onlineName = cleanText(input.value, state.customNames[0]);
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
