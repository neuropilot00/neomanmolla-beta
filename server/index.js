const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const PORT = Number(process.env.PORT || 3000);
const ROOT = path.resolve(__dirname, "..");
const rooms = new Map();

function loadGameData() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "game-data.js"), "utf8"), context);
  return context.window.NEOMANMOLLA_DATA;
}

const gameData = loadGameData();

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

function roomCode() {
  for (let i = 0; i < 20; i += 1) {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    if (!rooms.has(code)) return code;
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

function publicRoom(room) {
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
      question: room.status === "result" ? answer.question : undefined,
      role: room.status === "result" ? answer.role : undefined,
    })),
    votes: room.status === "result" ? room.votes : room.votes.map((vote) => ({ playerId: vote.playerId, targetId: vote.targetId ? "submitted" : null })),
    result: room.status === "result" ? room.result : null,
    updatedAt: room.updatedAt,
  };
}

function roundForRoom(room) {
  const pack = packById(room.pack.id);
  return pack.rounds[room.roundIndex % pack.rounds.length];
}

function createRoom(body) {
  const pack = packById(body.packId);
  const theme = themeById(body.themeId);
  const code = roomCode();
  const playerCount = Math.max(4, Math.min(6, Number(body.playerCount) || 4));
  const playerLangs = Array.isArray(body.playerLangs) ? body.playerLangs : gameData.settings.defaultPlayerLangs;
  const names = Array.isArray(body.players) ? body.players : [];
  const room = {
    code,
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
      connected: index === 0,
    })),
    answers: [],
    votes: [],
    result: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  rooms.set(code, room);
  return room;
}

function startRoom(room) {
  const round = roundForRoom(room);
  room.status = "answering";
  room.answers = room.players.map((player, index) => {
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
    send(res, 200, { ok: true, service: "neomanmolla-api", rooms: rooms.size });
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
    const room = createRoom(await readBody(req));
    send(res, 201, publicRoom(room));
    return;
  }
  const roomMatch = url.pathname.match(/^\/api\/rooms\/([0-9]{4,6})(?:\/([^/]+))?$/);
  if (roomMatch) {
    const room = rooms.get(roomMatch[1]);
    if (!room) {
      notFound(res);
      return;
    }
    const action = roomMatch[2];
    if (req.method === "GET" && !action) {
      send(res, 200, publicRoom(room));
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
      room.updatedAt = new Date().toISOString();
      send(res, 200, { player: slot, room: publicRoom(room) });
      return;
    }
    if (action === "start") {
      startRoom(room);
      send(res, 200, publicRoom(room));
      return;
    }
    if (action === "answers") {
      if (!submitAnswer(room, body)) badRequest(res, "invalid playerId");
      else send(res, 200, publicRoom(room));
      return;
    }
    if (action === "votes") {
      if (!submitVote(room, body)) badRequest(res, "invalid playerId or targetId");
      else send(res, 200, publicRoom(room));
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

server.listen(PORT, () => {
  console.log(`neomanmolla-api listening on ${PORT}`);
});
