---
name: add-or-modify-database-table-or-column
description: Workflow command scaffold for add-or-modify-database-table-or-column in xbutfory.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-modify-database-table-or-column

Use this workflow when working on **add-or-modify-database-table-or-column** in `xbutfory`.

## Goal

Adds a new table or column to the database, updates schema, seeds, and related model logic.

## Common Files

- `db/migrate/*.rb`
- `db/schema.rb`
- `db/seeds.rb`
- `app/models/*.rb`
- `test/fixtures/*.yml`
- `test/models/*.rb`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create migration file in db/migrate/
- Update db/schema.rb
- Update relevant model(s) in app/models/
- Update or reseed db/seeds.rb
- Update or add fixtures in test/fixtures/

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.