# 너만 몰라 Beta Audit

## 2026-05-01 Beta Rebuild

Purpose: 실제 테스트 유저에게 링크를 보내 검증할 수 있는 모바일 소셜 추리 게임 베타.

## Current Scope

- Static mobile web app.
- Core loop: answer reveal -> suspicion -> vote -> result -> next round.
- Solo beta: user + 3 bot players.
- Party demo: 4-6 player flow simulated on one device.
- Party input: each local player can enter a real answer after viewing their private question.
- Data-driven content: questions, packs, avatars, frames, and themes live in `game-data.js`.
- Localization: Korean and Japanese UI copy, question packs, pack metadata, themes, and player defaults.
- Mixed-language rooms: each player can select KO or JA and receives the same round in their own language.
- K-pop internal data: 5 boy groups and 5 girl groups are included for private testing only.
- Full-body character dressing supports hair, outfit, item, aura, idol group, bias style, and frame.
- Language UI is select-based so English can be added without redesigning the lobby or ready room.
- Product surfaces: room creation, profile setup, question packs, and result card.
- Room links: static URL query parameters carry room code, pack, theme, and player count for tester onboarding.
- Language links: `lang=ko` and `lang=ja` are preserved in invite links.
- Local persistence: profile/pack/theme settings and lightweight beta event counters are stored in `localStorage`.

## Beta Test Questions

1. Do testers understand the rule within 10 seconds?
2. Does the result screen explain why the fake player was fake?
3. Do testers want to play 3 rounds or more?
4. Would testers send the link to friends?

## Technical Status

- Runs as plain static files.
- No backend yet.
- No real multiplayer synchronization yet.
- No server-side analytics yet. Current counters are local-only.
- No account or database integration yet.
- User-entered text is stripped of angle brackets before rendering to reduce static-demo injection risk.
- K-pop group names are internal-test placeholders until rights, naming, and update policy are approved.

## Deployment Notes

- Suitable for GitHub Pages static hosting.
- Before public beta, set repository Pages to deploy from `main` branch root.
- Current production beta URL: https://neuropilot00.github.io/neomanmolla-beta/

## Next Engineering Steps

1. Add realtime sync with Supabase or Firebase.
2. Add lightweight backend.
3. Add server-side analytics for first-play completion, replay, and invite clicks.
4. Add moderation and report handling before public traffic.
5. Add account/payment only after retention signal is visible.
