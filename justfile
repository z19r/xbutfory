default:
    @echo "Available commands:"
    @just --list

# Start Rails server
dev:
    @bin/rails server

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

# Run Rails server on a specific port
dev-port port="3000":
    @bin/rails server -p {{port}}
