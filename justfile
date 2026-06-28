# Rails project justfile
default:
    @echo "Available Rails commands:"
    @just --list

# Start Rails server
server:
    @echo "Starting Rails server..."
    @bundle exec rails server

# Run tests (fast, no coverage report)
test:
    @echo "Running Rails tests..."
    @bundle exec rails test

# Run tests with SimpleCov; enforces 90% business / 65% component coverage
test-cov:
    @echo "Running tests with coverage thresholds..."
    @COVERAGE=1 bundle exec rails test

# Full CI pipeline (RuboCop + coverage + security audits)
ci:
    @echo "Running CI..."
    @bin/ci

# Run RuboCop
rubocop:
    @echo "Running RuboCop..."
    @bundle exec rubocop

# Database operations
db-migrate:
    @echo "Running database migrations..."
    @bundle exec rails db:migrate

db-seed:
    @echo "Seeding database..."
    @bundle exec rails db:seed

# Install dependencies
install:
    @echo "Installing Ruby dependencies..."
    @bundle install
    @echo "Installing Node dependencies..."
    @npm install
    @just hooks-install

# Point git at tracked hooks in .githooks/
hooks-install:
    @git config core.hooksPath .githooks
    @chmod +x .githooks/pre-commit
    @echo "Git hooks installed (.githooks/pre-commit → RuboCop)"

# Format with Prettier (Ruby, JS, CSS, etc.)
fmt:
    @npx prettier --write .

# Check Prettier formatting
fmt-check:
    @npx prettier --check .
