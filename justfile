default:
    @echo "Available commands:"
    @just --list

# Start the dev stack (overmind via Procfile.dev)
dev:
    @bin/dev

# Run all tests
test *paths:
    @bin/rails test {{paths}}

# Run one test file
test-one path:
    @bin/rails test {{path}}

# Run database migrations
migrate:
    @bin/rails db:migrate

# Seed the database
seed:
    @bin/rails db:seed

# Prepare database (create, migrate, seed)
db-prepare:
    @bin/rails db:prepare

# Reset database (drop, create, migrate, seed)
db-reset:
    @bin/rails db:reset

# Open Rails console
console:
    @bin/rails console

# Open database console
dbconsole:
    @bin/rails dbconsole

# Show routes
routes:
    @bin/rails routes

# Install dependencies
install:
    @bundle install
    @just migrate

# Run the dev stack on a specific port
dev-port port="3000":
    @PORT={{port}} bin/dev
