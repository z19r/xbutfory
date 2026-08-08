#!/usr/bin/env bash
# Render build for the native Ruby runtime (web + worker share it).
# Migrations are NOT run here — the Blueprint's preDeployCommand runs
# `bin/rails db:prepare` (primary + cache + cable) before going live.
set -o errexit

bundle install

# SECRET_KEY_BASE_DUMMY lets asset tasks boot the app without decrypting
# credentials (same trick the Rails 8 Dockerfile uses) — the real
# RAILS_MASTER_KEY is still required at runtime.
mkdir -p public/assets
SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:clean
SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile

bundle exec rails tmp:clear
bundle exec rails log:clear
