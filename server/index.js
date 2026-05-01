const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const PORT = Number(process.env.PORT || 3000);
const ROOT = path.resolve(__dirname, "..");
const rooms = new Map();
let dbPool = null;
let dbReady = false;

function loadGameData() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "game-data.js"), "utf8"), context);
  return context.window.NEOMANMOLLA_DATA;
}

const gameData = loadGameData();

function databaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
}

async function initDatabase() {
  if (!databaseUrl()) return;
  try {
    const { Pool } = require("pg");
    dbPool = new Pool({
      connectionString: databaseUrl(),
      ssl: process.env.PGSSLMODE === "disable" ? false : { rejectUnauthorized: false },
    });
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS rooms (
        code TEXT PRIMARY KEY,
        state JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    dbReady = true;
    console.log("Postgres room store connected");
  } catch (error) {
    dbPool = null;
    dbReady = false;
    console.warn(`Postgres unavailable, using memory room store: ${error.message}`);
  }
}

async function saveRoom(room) {
  rooms.set(room.code, room);
  if (!dbReady) return;
  await dbPool.query(
    `INSERT INTO rooms (code, state, created_at, updated_at)
     VALUES ($1, $2::jsonb, COALESCE($3::timestamptz, NOW()), NOW())
     ON CONFLICT (code)
     DO UPDATE SET state = EXCLUDED.state, updated_at = NOW()`,
    [room.code, JSON.stringify(room), room.createdAt],
  );
}

async function getRoom(code) {
  if (rooms.has(code)) return rooms.get(code);
  if (!dbReady) return null;
  const result = await dbPool.query("SELECT state FROM rooms WHERE code = $1", [code]);
  if (!result.rows.length) return null;
  const room = result.rows[0].state;
  rooms.set(code, room);
  return room;
}

async function roomExists(code) {
  if (rooms.has(code)) return true;
  if (!dbReady) return false;
  const result = await dbPool.query("SELECT 1 FROM rooms WHERE code = $1", [code]);
  return result.rows.length > 0;
}

async function roomCount() {
  if (!dbReady) return rooms.size;
  const result = await dbPool.query("SELECT COUNT(*)::int AS count FROM rooms");
  return result.rows[0].count;
}

function send(res, status, body, headers = {}) {
  const payload = typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body);
  res.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": typeof body === "string" || Buffer.isBuffer(body) ? "text/plain; charset=utf-8" : "application/json; charset=utf-8",
    ...headers,
  });
  res.end(payload);
}

function notFound(res) {
  send(res, 404, { error: "not_found" });
}

function badRequest(res, message) {
  send(res, 400, { error: "bad_request", message });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 100_000) {
        req.destroy();
        reject(new Error("payload_too_large"));
      }
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function cleanText(value, fallback = "") {
  return String(value || fallback).replace(/[<>"'&]/g, "").trim().slice(0, 40);
}

async function roomCode() {
  for (let i = 0; i < 20; i += 1) {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    if (!(await roomExists(code))) return code;
  }
  return String(Date.now()).slice(-6);
}

function packById(id) {
  return gameData.packs.find((pack) => pack.id === id || pack.name === id) || gameData.packs[0];
}

function themeById(id) {
  return gameData.themes.find((theme) => theme.id === id) || gameData.themes[0];
}

function questionThemeById(id) {
  if (!id || id === "all") return { id: "all", name: "전체 그룹" };
  return gameData.idolGroups.find((group) => group.id === id) || { id: "all", name: "전체 그룹" };
}

function localizedPackFor(lang, packId) {
  const pack = packById(packId);
  const translated = gameData.locales?.[lang]?.packs?.[pack.id];
  return translated ? { ...pack, ...translated } : pack;
}

function publicRoom(room, viewerId = null) {
  const viewerAnswer = room.answers.find((answer) => answer.playerId === viewerId);
  return {
    code: room.code,
    status: room.status,
    playerCount: room.playerCount,
    pack: room.pack,
    theme: room.theme,
    questionTheme: room.questionTheme,
    roundIndex: room.roundIndex,
    fakeIndex: room.fakeIndex,
    players: room.players,
    answers: room.answers.map((answer) => ({
      playerId: answer.playerId,
      playerName: answer.playerName,
      text: answer.text,
      submitted: Boolean(answer.text),
      question: room.status === "result" || answer.playerId === viewerId ? answer.question : undefined,
      role: room.status === "result" || answer.playerId === viewerId ? answer.role : undefined,
    })),
    myAnswer: viewerAnswer ? {
      playerId: viewerAnswer.playerId,
      playerName: viewerAnswer.playerName,
      text: viewerAnswer.text,
      submitted: Boolean(viewerAnswer.text),
      question: viewerAnswer.question,
      role: viewerAnswer.role,
    } : null,
    votes: room.status === "result" ? room.votes : room.votes.map((vote) => ({ playerId: vote.playerId, targetId: vote.targetId ? "submitted" : null })),
    result: room.status === "result" ? room.result : null,
    updatedAt: room.updatedAt,
  };
}

function roundForRoom(room) {
  const pack = packById(room.pack.id);
  return pack.rounds[room.roundIndex % pack.rounds.length];
}

function roundForPlayer(room, player) {
  const pack = localizedPackFor(player.lang, room.pack.id);
  return pack.rounds[room.roundIndex % pack.rounds.length];
}

async function createRoom(body) {
  const pack = packById(body.packId);
  const theme = themeById(body.themeId);
  const code = await roomCode();
  const playerCount = Math.max(4, Math.min(6, Number(body.playerCount) || 4));
  const playerLangs = Array.isArray(body.playerLangs) ? body.playerLangs : gameData.settings.defaultPlayerLangs;
  const names = Array.isArray(body.players) ? body.players : [];
  const hostConnected = body.hostConnected !== false;
  const room = {
    code,
    public: Boolean(body.public),
    status: "lobby",
    playerCount,
    pack: { id: pack.id, name: pack.name },
    theme: { id: theme.id, label: theme.label },
    questionTheme: questionThemeById(body.questionThemeId || pack.defaultQuestionTheme),
    roundIndex: Math.floor(Math.random() * pack.rounds.length),
    fakeIndex: Math.floor(Math.random() * playerCount),
    players: Array.from({ length: playerCount }).map((_, index) => ({
      id: `p${index + 1}`,
      name: cleanText(names[index]?.name || names[index], gameData.playerNames[index] || `${index + 1}P`),
      lang: gameData.settings.languages.some((lang) => lang.id === playerLangs[index]) ? playerLangs[index] : "ko",
      avatarIndex: Number(names[index]?.avatarIndex || index) % 5,
      connected: hostConnected && index === 0,
    })),
    answers: [],
    votes: [],
    result: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await saveRoom(room);
  return room;
}

async function findOpenPublicRoom() {
  const memoryRoom = [...rooms.values()].find((room) => (
    room.public
    && room.status === "lobby"
    && room.players.some((player) => !player.connected)
  ));
  if (memoryRoom) return memoryRoom;
  if (!dbReady) return null;
  const result = await dbPool.query(`
    SELECT state
    FROM rooms
    WHERE (state->>'public')::boolean = true
      AND state->>'status' = 'lobby'
      AND EXISTS (
        SELECT 1
        FROM jsonb_array_elements(state->'players') AS player
        WHERE COALESCE((player->>'connected')::boolean, false) = false
      )
    ORDER BY updated_at DESC
    LIMIT 1
  `);
  if (!result.rows.length) return null;
  const room = result.rows[0].state;
  rooms.set(room.code, room);
  return room;
}

function startRoom(room) {
  room.status = "answering";
  room.answers = room.players.map((player, index) => {
    const round = roundForPlayer(room, player);
    const fake = index === room.fakeIndex;
    return {
      playerId: player.id,
      playerName: player.name,
      text: "",
      question: fake ? round.fake : round.innocent,
      role: fake ? "fakeQuestion" : "commonQuestion",
    };
  });
  room.votes = [];
  room.result = null;
  room.updatedAt = new Date().toISOString();
}

function maybeRevealResult(room) {
  const answered = room.answers.length === room.playerCount && room.answers.every((answer) => answer.text);
  const voted = room.votes.length >= room.playerCount;
  if (!answered) room.status = "answering";
  else if (!voted) room.status = "voting";
  else {
    const fakePlayer = room.players[room.fakeIndex];
    const tally = room.players.map((player) => ({
      playerId: player.id,
      playerName: player.name,
      count: room.votes.filter((vote) => vote.targetId === player.id).length,
    }));
    room.status = "result";
    room.result = {
      fakePlayerId: fakePlayer.id,
      fakePlayerName: fakePlayer.name,
      tally,
      citizenWin: room.votes.some((vote) => vote.targetId === fakePlayer.id),
    };
  }
  room.updatedAt = new Date().toISOString();
}

function submitAnswer(room, body) {
  const answer = room.answers.find((item) => item.playerId === body.playerId);
  if (!answer) return false;
  answer.text = cleanText(body.text);
  maybeRevealResult(room);
  return true;
}

function submitVote(room, body) {
  const player = room.players.find((item) => item.id === body.playerId);
  const target = room.players.find((item) => item.id === body.targetId);
  if (!player || !target) return false;
  room.votes = room.votes.filter((vote) => vote.playerId !== player.id);
  room.votes.push({ playerId: player.id, targetId: target.id });
  maybeRevealResult(room);
  return true;
}

function serveStatic(req, res, url) {
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.resolve(ROOT, `.${pathname}`);
  if (!filePath.startsWith(ROOT) || filePath.includes(`${path.sep}.git${path.sep}`)) {
    notFound(res);
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      notFound(res);
      return;
    }
    const ext = path.extname(filePath);
    const type = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".webp": "image/webp",
    }[ext] || "application/octet-stream";
    send(res, 200, data, { "Content-Type": type });
  });
}

async function route(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "OPTIONS") {
    send(res, 204, "");
    return;
  }
  if (req.method === "GET" && url.pathname === "/health") {
    send(res, 200, {
      ok: true,
      service: "neomanmolla-api",
      store: dbReady ? "postgres" : "memory",
      rooms: await roomCount(),
    });
    return;
  }
  if (req.method === "GET" && url.pathname === "/api/content") {
    send(res, 200, {
      packs: gameData.packs.map((pack) => ({ id: pack.id, name: pack.name, status: pack.status, rounds: pack.rounds.length })),
      themes: gameData.themes,
      idolGroups: gameData.idolGroups,
      notices: gameData.notices,
    });
    return;
  }
  if (req.method === "POST" && url.pathname === "/api/rooms") {
    const room = await createRoom(await readBody(req));
    send(res, 201, publicRoom(room));
    return;
  }
  if (req.method === "POST" && url.pathname === "/api/match/quick") {
    const body = await readBody(req);
    let room = await findOpenPublicRoom();
    if (!room) {
      room = await createRoom({
        public: true,
        playerCount: 5,
        packId: body.packId || "kpop",
        questionThemeId: body.questionThemeId || "v01d",
        themeId: body.themeId || "idol-backstage",
        playerLangs: gameData.settings.defaultPlayerLangs,
        players: [],
        hostConnected: false,
      });
    }
    const slot = room.players.find((player) => !player.connected) || room.players[0];
    slot.name = cleanText(body.name, slot.name);
    slot.lang = gameData.settings.languages.some((lang) => lang.id === body.lang) ? body.lang : slot.lang;
    slot.connected = true;
    room.updatedAt = new Date().toISOString();
    await saveRoom(room);
    send(res, 200, { player: slot, room: publicRoom(room, slot.id) });
    return;
  }
  const roomMatch = url.pathname.match(/^\/api\/rooms\/([0-9]{4,6})(?:\/([^/]+))?$/);
  if (roomMatch) {
    const room = await getRoom(roomMatch[1]);
    if (!room) {
      notFound(res);
      return;
    }
    const action = roomMatch[2];
    if (req.method === "GET" && !action) {
      send(res, 200, publicRoom(room, url.searchParams.get("playerId")));
      return;
    }
    if (req.method !== "POST") {
      notFound(res);
      return;
    }
    const body = await readBody(req);
    if (action === "join") {
      const slot = room.players.find((player) => !player.connected) || room.players[0];
      slot.name = cleanText(body.name, slot.name);
      slot.lang = gameData.settings.languages.some((lang) => lang.id === body.lang) ? body.lang : slot.lang;
      slot.connected = true;
      const answer = room.answers.find((item) => item.playerId === slot.id);
      if (answer) {
        answer.playerName = slot.name;
      }
      room.updatedAt = new Date().toISOString();
      await saveRoom(room);
      send(res, 200, { player: slot, room: publicRoom(room, slot.id) });
      return;
    }
    if (action === "start") {
      startRoom(room);
      await saveRoom(room);
      send(res, 200, publicRoom(room, body.playerId));
      return;
    }
    if (action === "answers") {
      if (!submitAnswer(room, body)) badRequest(res, "invalid playerId");
      else {
        await saveRoom(room);
        send(res, 200, publicRoom(room, body.playerId));
      }
      return;
    }
    if (action === "votes") {
      if (!submitVote(room, body)) badRequest(res, "invalid playerId or targetId");
      else {
        await saveRoom(room);
        send(res, 200, publicRoom(room, body.playerId));
      }
      return;
    }
  }
  if (req.method === "GET" && !url.pathname.startsWith("/api/")) {
    serveStatic(req, res, url);
    return;
  }
  notFound(res);
}

const server = http.createServer((req, res) => {
  route(req, res).catch((error) => {
    send(res, 500, { error: "server_error", message: error.message });
  });
});

initDatabase().finally(() => {
  server.listen(PORT, () => {
    console.log(`neomanmolla-api listening on ${PORT}`);
  });
});
