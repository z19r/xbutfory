```markdown
# xbutfory Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches you how to contribute to the `xbutfory` Ruby codebase by following its established coding conventions and workflows. You'll learn how to add features, update the database schema, build or refactor components, write and organize tests, and maintain documentation. The repository favors clear, conventional commit messages, modular code organization, and a component-driven approach to UI development.

## Coding Conventions

- **Language:** Ruby (no framework detected)
- **File Naming:** Use `snake_case` for all file and directory names.
  - Example: `user_profile.rb`, `user_controller.rb`
- **Import Style:** Use relative imports.
  - Example:
    ```ruby
    require_relative '../models/user'
    ```
- **Export Style:** Use default exports (standard Ruby class/module definitions).
  - Example:
    ```ruby
    class UserProfile
      # ...
    end
    ```
- **Commit Messages:** Follow [Conventional Commits](https://www.conventionalcommits.org/) with prefixes such as `feat`, `fix`, `docs`, `chore`, `refactor`.
  - Example: `feat: add password reset to user accounts`
- **Component Structure:** UI components live in `app/components/` with matching Ruby, ERB, CSS, and JS files as needed.
- **Test Files:** Test files are named with `_test.rb` suffix and placed in the relevant `test/` subdirectory.

## Workflows

### Add or Modify Database Table or Column
**Trigger:** When you need to add a new table or column to the database (e.g., for a new feature or taxonomy change).
**Command:** `/new-table`

1. Create a migration file in `db/migrate/`.
    ```bash
    rails generate migration AddFieldToTable field:type
    ```
2. Update `db/schema.rb` by running migrations.
    ```bash
    rails db:migrate
    ```
3. Update the relevant model(s) in `app/models/`.
4. Update or reseed `db/seeds.rb` if necessary.
5. Update or add fixtures in `test/fixtures/`.
6. Update or add relevant tests in `test/models/` or `test/controllers/`.

### Add or Rebuild Feature Screen
**Trigger:** When adding or redesigning a major page or feature (e.g., detail screen, submit screen, categories).
**Command:** `/new-screen`

1. Add or update ERB templates in `app/views/`.
2. Add or update the controller in `app/controllers/`.
3. Add or update CSS in `app/assets/stylesheets/components/`.
4. Add or update JS controller in `app/javascript/controllers/` if needed.
5. Update or add model logic in `app/models/` if required.
6. Update seeds or fixtures if needed.
7. Add or update tests in `test/controllers/` and/or `test/components/`.

### Add or Update Component with Test
**Trigger:** When introducing or modifying a reusable UI component.
**Command:** `/new-component`

1. Add or update the component Ruby file in `app/components/`.
    ```ruby
    # app/components/alert_component.rb
    class AlertComponent < ViewComponent::Base
      # ...
    end
    ```
2. Add or update the component template in `app/components/`.
    ```erb
    <!-- app/components/alert_component.html.erb -->
    <div class="alert"><%= content %></div>
    ```
3. Add or update CSS in `app/assets/stylesheets/components/`.
4. Add or update JS controller in `app/javascript/controllers/` if interactive.
5. Add or update the test in `test/components/`.

### Implement or Update Easter Egg or Interactive UI
**Trigger:** When adding a playful or interactive feature (e.g., Konami code, theme switcher).
**Command:** `/new-easter-egg`

1. Add or update JS controller in `app/javascript/controllers/`.
2. Add or update CSS in `app/assets/stylesheets/components/`.
3. Update or add markup in `app/views/` or `app/components/`.
4. Add or update tests in `test/components/` or `test/controllers/`.

### Update TODO or Design Docs
**Trigger:** When tracking progress, adding tasks, or ticking off completed work.
**Command:** `/tick-todo`

1. Edit `TODO.md` and/or `ZTODO.md`.
2. Optionally reference the change in a commit message.

### Refactor or Move Backend Object
**Trigger:** When reorganizing backend code for better structure or Rails autoload compatibility.
**Command:** `/move-backend-object`

1. Move Ruby file between `app/queries`, `app/models`, `app/services`.
2. Update references if needed.
3. Update or add tests in `test/queries/` or `test/models/`.

### Add or Update Authentication Feature
**Trigger:** When adding or modifying login, registration, or account management features.
**Command:** `/new-auth-feature`

1. Add or update user/auth models in `app/models/`.
2. Add or update authentication controllers in `app/controllers/`.
3. Add or update views in `app/views/` (auth layouts, forms, settings, submissions).
4. Add or update CSS in `app/assets/stylesheets/components/`.
5. Add or update JS controllers for auth UI (e.g., password toggle).
6. Update or add fixtures in `test/fixtures/`.
7. Add or update tests in `test/controllers/` and `test/models/`.

### Add or Update Tests for Feature or Component
**Trigger:** When implementing or changing a feature/component and ensuring it is tested.
**Command:** `/add-test`

1. Add or update test files in `test/components/`, `test/controllers/`, `test/models/`, or `test/queries/`.
2. Update test fixtures if needed.

## Testing Patterns

- **Test Framework:** Not explicitly detected; standard Ruby test patterns are used.
- **Test File Naming:** Use `_test.rb` suffix (e.g., `user_test.rb`).
- **Test Organization:** Place tests in relevant subdirectories:
  - `test/components/` for UI/component tests
  - `test/controllers/` for controller tests
  - `test/models/` for model tests
  - `test/queries/` for query/service object tests
- **Fixtures:** Use YAML files in `test/fixtures/` to seed test data.
- **Example Test:**
    ```ruby
    # test/models/user_test.rb
    require 'test_helper'

    class UserTest < ActiveSupport::TestCase
      test "should not save user without email" do
        user = User.new
        assert_not user.save
      end
    end
    ```

## Commands

| Command            | Purpose                                                        |
|--------------------|----------------------------------------------------------------|
| /new-table         | Add or modify a database table or column                       |
| /new-screen        | Add or rebuild a feature screen                                |
| /new-component     | Add or update a UI component with test                         |
| /new-easter-egg    | Implement or update an interactive UI or easter egg            |
| /tick-todo         | Update TODO or design documentation                            |
| /move-backend-object | Refactor or move backend service/model/query objects         |
| /new-auth-feature  | Add or update authentication-related features                  |
| /add-test          | Add or update tests for a feature or component                 |
```
