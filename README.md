🌌 Project Lattice Zero

## Downloads, Releases, And Discovery

| Need | Link |
| --- | --- |
| GitHub repository | https://github.com/ResearchForumOnline/lattice-ZERO |
| Source ZIP | https://github.com/ResearchForumOnline/lattice-ZERO/archive/refs/heads/main.zip |
| GitHub releases | https://github.com/ResearchForumOnline/lattice-ZERO/releases |
| TalkToAI ecosystem | https://talktoai.org/ |
| Docs hub | https://docs.talktoai.org/ |

Browser-based AI companion app for goal clarification, structured analysis, trade-off review, and practical action planning.

Use the live app link from the README or clone the repo for local development.

~~~bash
git clone https://github.com/ResearchForumOnline/lattice-ZERO.git
cd lattice-ZERO
npm install
npm run dev
~~~

Search-friendly topics: AI planning app, Gemini API app, browser AI companion, goal analysis tool, local AI planning workflow.

## Featured TalkToAI Ecosystem Video

[![TalkToAI: Sovereignty Through ZeroThink and OpenZero Infrastructure](https://i.ytimg.com/vi/R52hsRdCmSM/hqdefault.jpg)](https://www.youtube.com/watch?v=R52hsRdCmSM)

A public overview of ZeroThink, OpenZero, FreeWebPanel, ZSEC, and the wider TalkToAI infrastructure. Watch it here: https://www.youtube.com/watch?v=R52hsRdCmSM

“Games within games. Logic within light.”

Live APP link https://latticezero.vercel.app/

Project Lattice Zero is a clean, fast, browser-based AI companion that helps you clarify goals, analyze trade-offs, and generate practical next steps — powered by your own Gemini API key. No complicated setup. No backend servers. Just open-web tech you control.

✨ What it does (for everyday users)

Clarify a goal → describe what you’re trying to achieve.

Get a structured analysis → risks, options, leverage points.

See an actionable plan → step-by-step, simple language.

Run locally → your key, your machine, your control.

Zero jargon. Zero gatekeeping. You type → it thinks → you act.

🚀 Quick Start

Prerequisites: Node.js 18+ (LTS recommended)

# 1) Get the code
git clone https://github.com/yourusername/project-lattice-zero.git
cd project-lattice-zero

# 2) Install dependencies
npm install

# 3) Configure your API key
# Create .env.local at project root and add:
# GEMINI_API_KEY=your_key_here

# 4) Run locally
npm run dev
# Open the printed local URL in your browser


Where to get a key: Create a Gemini API key in your Google AI account, then paste it into .env.local as GEMINI_API_KEY.

🗂️ Project Structure (accurate to this repo)
project-lattice-zero/
├─ App.tsx
├─ index.html
├─ index.tsx
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ types.ts
├─ metadata.json
├─ .env.local                # your local API key (not committed)
├─ .gitignore
├─ README.md
├─ services/
│  └─ geminiService.ts       # thin client for Gemini API calls
└─ components/
   ├─ AnalysisDisplay.tsx
   ├─ ApiKeyModal.tsx
   ├─ GoalInput.tsx
   ├─ Header.tsx
   ├─ IconComponents.tsx
   ├─ LoadingSpinner.tsx
   └─ StrategyDisplay.tsx


App.tsx — App shell + routing of user flow (goal → analysis → strategy).

components/* — UI units (inputs, panels, results, icons, spinner).

services/geminiService.ts — isolated API client for model calls.

types.ts — shared TypeScript types for consistent props/data.

index.tsx / index.html — Vite entry + base HTML.

metadata.json — human-readable app summary (name/description).

.env.local — your Gemini key (kept local; ignored by Git).

🧠 How it thinks (plain English)

You describe your aim (e.g., “launch a small online course”).

The app calls the Gemini model with a structured prompt template.

The response is split into: Insights (what matters) + Strategy (what to do).

The UI presents a clean, readable plan you can apply immediately.

No fluff. Just distilled reasoning, formatted for action.

🖥️ Build & Deploy

Production build

npm run build
npm run preview    # optional local preview of the production build


Hosting options (front-end only)

Vercel / Netlify / Cloudflare Pages: drag-and-drop or connect repo.

Your own server (Apache/Nginx): serve the dist/ folder as static files.

With Apache, enable mod_rewrite and point your virtual host root to dist/.

Tip: Never deploy .env.local. On serverless hosts, set GEMINI_API_KEY in the platform’s environment settings and use a minimal proxy if you need to keep keys server-side. For purely local use, .env.local is fine.

🔒 Privacy & Safety

Your API key stays in your environment.

No tracking pixels, no hidden analytics, no telemetry.

You are in control of inputs and outputs.

Reminder: output quality depends on your prompt clarity and the model’s capabilities. Always sanity-check important decisions.

🧩 FAQ

Do I need to code?
No. Install Node, add your key, run the app. That’s it.

Does this require a backend?
No backend is required for local use. If you want to hide your API key in production, add a tiny server-side proxy (optional).

Can I use another model/provider?
Yes. Swap the client in services/geminiService.ts and adapt the prompt schema if needed.

Can I theme or rebrand it?
Absolutely. The components are cleanly separated; swap logos, colors, and copy.

🗺️ Roadmap (public highlights)

Guided multi-step “Goal Wizard”

Save/load sessions to local file

Export strategies to Markdown/PDF

Optional probabilistic “what-if” sliders

Offline templates for common goals

🤝 Contributing (lightweight)

Open an issue for bugs/ideas.

PRs welcome (keep components small, typed, and documented).

Please don’t commit API keys or secrets.

📜 License (Apache 2.0)
Copyright © 2025 Shaf Brady

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

🧾 Attribution

Created by Shaf Brady — AI Research • DevOps • Web Architecture • Probability Math.

