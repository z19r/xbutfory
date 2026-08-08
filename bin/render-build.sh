#!/usr/bin/env bash
# Render build for the native Ruby runtime (web + worker share it).
# Migrations are NOT run here — the Blueprint's preDeployCommand runs
# `bin/rails db:prepare` (primary + cache + cable) before going live.
set -o errexit

bundle install

mkdir -p public/assets
bundle exec rails assets:clean
bundle exec rails assets:precompile

bundle exec rails tmp:clear
bundle exec rails log:clear
