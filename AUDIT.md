# 너만 몰라 Beta Audit

## 2026-05-01 Beta Rebuild

Purpose: 실제 테스트 유저에게 링크를 보내 검증할 수 있는 모바일 소셜 추리 게임 베타.

## Current Scope

- Static mobile web app.
- Core loop: answer reveal -> suspicion -> vote -> result -> next round.
- Solo beta: user + 3 bot players.
- Party demo: 4-6 player flow simulated on one device.
- Data-driven content: questions, packs, avatars, frames, themes, and metrics live in `game-data.js`.
- Product surfaces: room creation, profile setup, question packs, result card, beta feedback screen.

## Monetization Hypothesis

Primary:

- Question packs.
- Host/Pro room features.
- Result card and streamer/audience features.

Secondary:

- Profile frames, avatars, and room themes.

## Beta Test Questions

1. Do testers understand the rule within 10 seconds?
2. Does the result screen explain why the fake player was fake?
3. Do testers want to play 3 rounds or more?
4. Would testers send the link to friends?
5. Which question pack feels worth paying for?

## Technical Status

- Runs as plain static files.
- No backend yet.
- No real multiplayer synchronization yet.
- No persistent analytics yet.
- No payment, account, or database integration.

## Deployment Notes

- Suitable for GitHub Pages static hosting.
- Before public beta, set repository Pages to deploy from `main` branch root.
- Current local GitHub CLI auth is invalid, so repo creation/push requires re-authentication.

## Next Engineering Steps

1. Push to a clean GitHub repository.
2. Enable GitHub Pages.
3. Add a hosted feedback form link or lightweight backend.
4. Add real room links and realtime sync with Supabase or Firebase.
5. Add analytics events for first-play completion, replay, and invite clicks.
