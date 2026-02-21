#!/bin/bash

# ==============================================================================
# HGoat V3 - Git Submodule & Parent Sync Script
# ==============================================================================
# Usage: ./commit-all.sh "your commit message"
# ==============================================================================

set -e # Exit on error

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# --- Variables ---
MSG=${1:-"update"}
PROJECT_ROOT=$(pwd)
SUBMODULE_PATH="docs"

# --- Functions ---
print_separator() {
    echo -e "${BLUE}--------------------------------------------------------------------------------${NC}"
    echo -e "${YELLOW}$1${NC}"
    echo -e "${BLUE}--------------------------------------------------------------------------------${NC}"
}

fail() {
    echo -e "${RED}ERROR: $1${NC}"
    exit 1
}

# --- STEP 1: VALIDATE ENVIRONMENT ---

if [ ! -d ".git" ]; then
    fail "Not in the project root or .git directory missing."
fi

if [ ! -d "$SUBMODULE_PATH" ]; then
    fail "Directory '$SUBMODULE_PATH' not found."
fi

if [ ! -f "$SUBMODULE_PATH/.git" ] && [ ! -d "$SUBMODULE_PATH/.git" ]; then
    echo -e "${YELLOW}WARNING: '$SUBMODULE_PATH' does not appear to be a git submodule yet.${NC}"
    echo -e "Skipping submodule commit..."
else
    IS_SUBMODULE=true
fi

# --- STEP 2: COMMIT SUBMODULE FIRST ---

if [ "$IS_SUBMODULE" = true ]; then
    print_separator "Committing $SUBMODULE_PATH submodule..."
    
    cd "$SUBMODULE_PATH"
    
    # Detect default branch (fallback to main)
    CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "main")
    
    # Try to ensure we are on a branch
    git checkout "$CURRENT_BRANCH" 2>/dev/null || true
    
    # Stage all changes
    git add .
    
    # Check if there are changes to commit
    if git diff-index --quiet HEAD --; then
        echo "No changes in submodule. Skipping."
    else
        git commit -m "$MSG (docs)"
        echo -e "${GREEN}Submodule committed successfully.${NC}"
        
        # Try to push
        echo "Pushing submodule..."
        if git push origin "$CURRENT_BRANCH"; then
            echo -e "${GREEN}Submodule pushed.${NC}"
        else
            echo -e "${RED}Warning: Submodule push failed. Continuing with main repo...${NC}"
        fi
    fi
    
    cd "$PROJECT_ROOT"
fi

# --- STEP 3: UPDATE MAIN REPO ---

print_separator "Updating main repo..."

# Stage submodule pointer and other files
git add .

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
    echo "No changes in main repo. Skipping."
else
    git commit -m "$MSG"
    echo -e "${GREEN}Main repo committed successfully.${NC}"
    
    # Detect main branch
    MAIN_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "main")
    
    # Try to push
    echo "Pushing main repo..."
    if git push origin "$MAIN_BRANCH"; then
        echo -e "${GREEN}Main repo pushed.${NC}"
    else
        echo -e "${RED}Warning: Main repo push failed.${NC}"
    fi
fi

print_separator "DONE — repos synced"
echo -e "${GREEN}Workflow completed successfully!${NC}"
