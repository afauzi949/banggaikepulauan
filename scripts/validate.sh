#!/usr/bin/env bash
# ============================================================
# validate.sh — Post-generate validation script
# Jalankan setelah generate/edit komponen UI.
# Usage: bash scripts/validate.sh
# ============================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

header() { echo -e "\n${YELLOW}▶ $1${NC}"; }
pass()   { echo -e "  ${GREEN}✔ $1${NC}"; }
fail()   { echo -e "  ${RED}✘ $1${NC}"; ERRORS=$((ERRORS + 1)); }

# ------- 1. ESLint -------
header "Running ESLint..."
if npx next lint --quiet 2>/dev/null; then
  pass "ESLint passed"
else
  fail "ESLint found errors — run 'npm run lint' for details"
fi

# ------- 2. Prettier -------
header "Checking Prettier formatting..."
if npx prettier --check "src/**/*.{ts,tsx,css}" --log-level warn 2>/dev/null; then
  pass "Prettier check passed"
else
  fail "Prettier formatting issues — run 'npm run format' to fix"
fi

# ------- 3. TypeScript -------
header "Checking TypeScript..."
if npx tsc --noEmit 2>/dev/null; then
  pass "TypeScript compilation OK"
else
  fail "TypeScript errors found — run 'npx tsc --noEmit' for details"
fi

# ------- 4. Protected files check -------
header "Checking protected files (env/deployment)..."
PROTECTED_FILES=(".env" ".env.local" ".env.production" ".env.production.local" "next.config.mjs" "vercel.json" "netlify.toml")
STAGED=$(git diff --cached --name-only 2>/dev/null || true)

if [ -n "$STAGED" ]; then
  FOUND_PROTECTED=false
  for pf in "${PROTECTED_FILES[@]}"; do
    if echo "$STAGED" | grep -q "^${pf}$"; then
      fail "Protected file staged: ${pf}"
      FOUND_PROTECTED=true
    fi
  done
  if [ "$FOUND_PROTECTED" = false ]; then
    pass "No protected files staged"
  fi
else
  pass "No staged changes to check (skip)"
fi

# ------- 5. Build test -------
header "Testing production build..."
if npm run build > /dev/null 2>&1; then
  pass "Production build succeeded"
else
  fail "Production build failed — run 'npm run build' for details"
fi

# ------- Summary -------
echo ""
if [ "$ERRORS" -gt 0 ]; then
  echo -e "${RED}══════════════════════════════════════${NC}"
  echo -e "${RED}  VALIDATION FAILED — ${ERRORS} error(s)${NC}"
  echo -e "${RED}══════════════════════════════════════${NC}"
  exit 1
else
  echo -e "${GREEN}══════════════════════════════════════${NC}"
  echo -e "${GREEN}  ALL CHECKS PASSED ✔${NC}"
  echo -e "${GREEN}══════════════════════════════════════${NC}"
  exit 0
fi
