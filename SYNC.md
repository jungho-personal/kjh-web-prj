# SYNC.md
> This file captures the current working phase and constraints.
> Agents must read this before making any change.

---

## Current Phase
Structural Refactoring (No Behavior Change)

## Primary Goal
Improve code readability, responsibility clarity, and long-term maintainability
without changing runtime behavior, features, or architecture.

## Refactoring Scope (Allowed)
### Frontend
- Clarify responsibilities between:
  - pages / components / common / ui
- Normalize file and component naming.
- Remove dead code and unused components.
- Simplify component structure (no logic changes).
- Improve comments where intent is unclear.

### Backend
- Clean up router/service structure (organization only).
- Remove unused imports and dead code.
- Improve naming consistency.
- Reorder functions for readability.
- Add clarifying comments where behavior is non-obvious.

### Shared / General
- Remove unclear TODO/FIXME or annotate them with intent.
- Reduce duplication if behavior remains identical.
- Improve code layout and formatting consistency.

## Explicitly Forbidden
- Any change to API behavior or response shape.
- Any change to runtime logic or data flow.
- Introducing new features or endpoints.
- Authentication or security changes.
- Architecture changes (single-server rule must remain).
- Adding new dependencies unless strictly necessary for refactor.

## Verification Rules
- Application behavior must remain identical.
- No visual or functional changes in UI.
- Existing manual flows must work exactly as before.

## Documentation Rules
- If directory structure changes:
  - Update PROJECT_CONTEXT.txt immediately.
- If no structural fact changes:
  - Do NOT update PROJECT_CONTEXT.txt.
- Refactor work must be recorded in Dev Log.

## Working Notes
- Keep refactors small and reviewable.
- Prefer multiple small commits over one large commit.
- When in doubt, do less.

---

## Last Updated
- Date: 2026-02-09
- Phase Owner: human
