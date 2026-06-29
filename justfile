# XbutforY justfile — house standard: run the dev stack via OVERMIND + Procfile.dev,
# and use bin/rails binstubs. Never `rails server` / `bin/dev` directly.
default:
    @just --list

# Start the dev stack (overmind via Procfile.dev) — the blessed way to run locally.
dev:
    @overmind start -f Procfile.dev

# Run the dev stack on a specific port
dev-port port="3000":
    @PORT={{port}} overmind start -f Procfile.dev

# Run all tests (fast, no coverage report)
test *paths:
    @bin/rails test {{paths}}

# Run a single test file
test-one path:
    @bin/rails test {{path}}

# Run tests with SimpleCov; enforces the coverage thresholds
test-cov:
    @COVERAGE=1 bin/rails test

# Full CI pipeline (RuboCop + coverage + security audits)
ci:
    @bin/ci

# Run RuboCop
rubocop:
    @bundle exec rubocop

# Format with Prettier (Ruby, JS, CSS, etc.)
fmt:
    @npx prettier --write .

# Check Prettier formatting
fmt-check:
    @npx prettier --check .

# Database operations
migrate:
    @bin/rails db:migrate

seed:
    @bin/rails db:seed

db-prepare:
    @bin/rails db:prepare

db-reset:
    @bin/rails db:reset

# Rails console / db console / routes
console:
    @bin/rails console

dbconsole:
    @bin/rails dbconsole

routes:
    @bin/rails routes

# Install dependencies + git hooks
install:
    @bundle install
    @npm install
    @just hooks-install

# Point git at tracked hooks in .githooks/ (.githooks/pre-commit → RuboCop)
hooks-install:
    @git config core.hooksPath .githooks
    @chmod +x .githooks/pre-commit
    @echo "Git hooks installed (.githooks/pre-commit → RuboCop)"
