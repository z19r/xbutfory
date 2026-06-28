require "test_helper"

class FormFieldComponentTest < ViewComponent::TestCase
  test "renders a labeled input" do
    render_inline(FormFieldComponent.new(label: "Email", name: "email", type: "email"))
    assert_selector ".c-field__label", text: "Email" # uppercased via CSS, not in the DOM
    assert_selector "input.c-field__input[name='email'][type='email']"
  end

  test "renders an error and drops the hint" do
    render_inline(FormFieldComponent.new(label: "Email", name: "email", error: "Already taken", hint: "Use your real one"))
    assert_selector ".c-field--error .c-field__error", text: "Already taken"
    assert_no_selector ".c-field__hint"
  end

  test "renders a hint when there is no error" do
    render_inline(FormFieldComponent.new(label: "Email", name: "email", hint: "Use your real one"))
    assert_selector ".c-field__hint", text: "Use your real one"
  end

  test "renders a prefix and marks the input prefixed" do
    render_inline(FormFieldComponent.new(label: "Handle", name: "handle", prefix: "@"))
    assert_selector ".c-field__prefix", text: "@"
    assert_selector "input.c-field__input--prefixed"
  end

  test "renders a textarea when as: :textarea" do
    render_inline(FormFieldComponent.new(label: "Bio", name: "bio", as: :textarea, value: "hi"))
    assert_selector "textarea.c-field__input[name='bio']", text: "hi"
  end

  test "renders trailing and label_aside slots" do
    render_inline(FormFieldComponent.new(label: "Password", name: "password")) do |f|
      f.with_trailing { "<button>SHOW</button>".html_safe }
      f.with_label_aside { "<a href='#'>Forgot?</a>".html_safe }
    end
    assert_selector ".c-field__trailing button", text: "SHOW"
    assert_selector ".c-field__aside a", text: "Forgot?"
    assert_selector "input.c-field__input--trailing"
  end

  test "mono adds the mono modifier" do
    render_inline(FormFieldComponent.new(label: "Handle", name: "handle", mono: true))
    assert_selector ".c-field--mono"
  end
end
