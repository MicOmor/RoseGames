# RoseGames

A warm, responsive digital game parlor. This repository contains the first playable frontend release, not the complete online multiplayer platform.

## Run locally

Requires Node.js 20.11+ (tested on Node.js 24). No package installation or API keys are needed.

```sh
node server.mjs
```

Open http://127.0.0.1:4173. Do not open `index.html` directly from the filesystem: browser JavaScript modules require an HTTP server.

```sh
node --test tests/*.test.mjs
```

## Implemented

- Responsive parlor lobby with 16 illustrated game entries, category filters, search, a playable-only filter and persistent favorites.
- Eight playable games: Chess, American Checkers, Reversi, Connect Four, Memory Match, Tic-Tac-Toe (3×3 and 5×5), Snakes & Ladders, and Trivia.
- Computer opponents and two-player shared-device play for the seven board games; solo Trivia.
- Chess legal moves, check/checkmate, castling, en passant, selectable promotion, draw detection, move history and completed-game PGN export, using the bundled BSD-2-Clause chess.js 1.4.0 library.
- Five computer settings. Chess uses a bounded minimax search, Tic-Tac-Toe uses exhaustive search at the strongest setting, other strategy games use heuristics. These are local difficulty labels, not professional or certified grandmaster strength. Snakes & Ladders remains chance-based at every setting.
- Four opponent identities/styles. Style has its greatest effect on chess and Reversi; it is not a general human-behavior simulation.
- Three board palettes, sound toggle, reduced-motion controls, keyboard navigation, labeled board squares, rules, rematches and promotion selection.
- Browser-local profile, match results, cosmetic milestone badges, JSON export and local-data deletion.
- PWA manifest with app icons and a service worker that caches the application for offline practice after a successful first visit. Offline behavior is implemented; full install/offline lifecycle testing is still pending.
- No external fonts, analytics, advertising, paid features, invented player counts or fake online opponents.

## Not implemented in this release

The lobby clearly marks Ludo, Backgammon, Battleship, Dominoes, Rummy, Chinese Checkers, Word Chain and Drawing Guess as forthcoming. Their cards open descriptions/rules rather than fake playable boards.

Online matchmaking, private invite-link rooms, authenticated accounts, persistent cross-device profiles, friend presence, chat, spectators, rankings, reporting/moderation, server-side anti-cheat and a production multiplayer service are not implemented. Friend mode currently means taking turns on the same device. No online players or rankings are fabricated.

Chess clocks, a dedicated analysis board, opening books, advanced chess engines, post-game strategic explanations, notification preferences and richer cosmetic progression remain future work. Local results are not trusted competitive records.

## Deployment

The app can be deployed as a static site to Vercel. Choose the **Other** framework preset, no build command and the project root as output directory. `vercel.json` supplies security headers. `.vercelignore` excludes development-only source from the deployed static output.

Use the owner's confirmed Vercel workspace. Do not deploy through a stale account connection. Workspace authorization and the GitHub connection must be confirmed before publishing or pushing.

The complete intended product requires a separate authoritative real-time backend and persistent data store. Client-only rules and localStorage must never be reused as the authority for ranked results. Implement authenticated action validation, reconnect snapshots, clock ownership, hidden-information filtering, rate limits and reporting before enabling online play.

## Structure

- `index.html`, `style.css`, `app.js`: interface and interaction flows.
- `games.js`: shared local game rules and AI decisions.
- `art.js`: original vector board illustrations and interface icons.
- `vendor/`: pinned chess.js source and its license.
- `assets/`: RoseGames branding and install icons.
- `sw.js`, `manifest.webmanifest`: offline caching and install metadata.
- `tests/games.test.mjs`: 13 rule and AI tests.
- `server.mjs`: development-only static HTTP server.

## Verification

All 13 automated rule tests pass. They cover illegal moves, win/draw states, Connect Four gravity and tactical blocking, chess special moves, checkers mandatory multi-captures and crowning, Reversi passes/termination, memory turn handling, and exact Snakes & Ladders finishes. The strongest 3×3 Tic-Tac-Toe AI was exhaustively tested against all human continuations.

Browser checks cover the desktop/mobile lobby, a full shared-device match with result persistence, chess move selection and a computer reply, favorites, theme selection and no browser console errors in those paths. These checks do not certify every accessibility requirement or an online multiplayer service.

## Appearance

The entire site supports Light, Dark, and System appearance. Dark mode uses warm walnut surfaces, cream text, and rose accents. Use the sun/moon control in the header for a quick switch, or select a preference in Settings. It is saved separately from board themes and applies before the first paint. Device changes are followed in System mode, and preference changes synchronize across tabs. Switching appearance preserves the active game.

## Current release

Production: https://rosegames.vercel.app

Source: https://github.com/MicOmor/RoseGames

The initial release was deployed directly to the confirmed Vercel workspace. Automatic Git deployment is not yet configured.

