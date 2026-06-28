require "test_helper"

class EntryCardComponentTest < ViewComponent::TestCase
  test "renders title with x but for y" do
    render_inline(EntryCardComponent.new(
      x: "Tinder", y: "dogs", votes: 42, description: "Test.",
      submitter: "tester", ago: "2h ago"
    ))
    assert_selector ".c-entry-card__title", text: /Tinder.*but for.*dogs/
  end

  test "renders vote count" do
    render_inline(EntryCardComponent.new(
      x: "Slack", y: "cats", votes: 123, description: "Test.",
      submitter: "tester", ago: "1h ago"
    ))
    assert_selector ".c-entry-card__vote-count", text: "123"
  end

  test "renders stamp when provided" do
    render_inline(EntryCardComponent.new(
      x: "A", y: "B", votes: 0, description: "Test.",
      submitter: "tester", ago: "now", stamp: "new"
    ))
    assert_selector ".c-stamp--new", text: "NEW"
  end

  test "renders category tag when provided" do
    render_inline(EntryCardComponent.new(
      x: "A", y: "B", votes: 0, description: "Test.",
      submitter: "tester", ago: "now",
      category: "fintech", category_label: "Fintech"
    ))
    assert_selector ".c-tag", text: "Fintech"
  end

  test "adds sponsored class for pinned entries" do
    render_inline(EntryCardComponent.new(
      x: "A", y: "B", votes: 0, description: "Test.",
      submitter: "tester", ago: "now", sponsored: "pinned"
    ))
    assert_selector ".c-entry-card--pinned"
  end

  test "adds voted class when voted" do
    render_inline(EntryCardComponent.new(
      x: "A", y: "B", votes: 0, description: "Test.",
      submitter: "tester", ago: "now", voted: true
    ))
    assert_selector ".c-entry-card__vote-btn--voted"
  end

  test "links title to detail when slug provided" do
    render_inline(EntryCardComponent.new(
      x: "A", y: "B", votes: 0, description: "Test.",
      submitter: "tester", ago: "now", slug: "a-but-for-b"
    ))
    assert_selector "a.c-entry-card__title-link[href='/entry/a-but-for-b']"
  end
end
