# AGENTS.md
> Source of truth for agent behavior in this repository.

## 1. Priority (Order of Truth)
1) AGENTS.md (this file)
2) SYNC.md (current project state)
3) PROJECT_CONTEXT.txt (current code & runtime facts / SSOT)
4) README.md
5) Existing code

## 2. Session Start Rule
- At the start of each new session, review:
  - SYNC.md (current goals, status, constraints)
  - PROJECT_CONTEXT.txt (runtime rules, repo structure, environment facts)
  - README.md (high-level overview)
- If instructions conflict, follow the Priority order above.

## 3. Guardrails (Non-negotiable)
- Single Server Principle: do NOT split frontend/backend into separate servers/services.
- No major refactors unless explicitly requested.
- No new features during “Hardening/Polish” phase unless SYNC.md says otherwise.
- Never add secrets/credentials (keys, tokens, passwords).
- Do not write ENV values in docs or code.

## 4. Workflow
- Start with a short plan (3–7 bullets).
- Make small, reviewable changes.
- Provide either:
  - a diff, OR
  - a clear file-by-file list of edits.
- Verification steps are required (how to run/check).
- Approval is required ONLY for:
  - architecture changes
  - large refactors
  - changes affecting runtime/deploy behavior

## 5. Documentation Update Rule
- If you change any of the following, update documentation accordingly:
  - directory structure
  - runtime behavior (routing, SPA fallback, static serving)
  - deployment-related logic
  - env var keys
- PROJECT_CONTEXT.txt must stay current for facts.

## 6. Execution Rules
- Do not run shell commands unless explicitly allowed.
- If execution is not allowed, explain what would be run and why.

## 7. Response Format
Each response should include:
- Plan
- Files to change
- Diff / description
- How to verify
- Risks / assumptions
