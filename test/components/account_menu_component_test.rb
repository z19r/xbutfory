require "test_helper"

class AccountMenuComponentTest < ViewComponent::TestCase
  test "renders avatar initial, handle and dropdown items" do
    render_inline(AccountMenuComponent.new(handle: "apt_4b"))
    assert_selector ".c-account-menu__avatar", text: "A"
    assert_selector ".c-account-menu__handle", text: "@apt_4b"
    # The dropdown ships hidden (opened by the Stimulus controller), so match all.
    assert_selector ".c-account-menu__label", text: "SIGNED IN AS @apt_4b", visible: :all
    assert_selector "a.c-account-menu__item[href='/account']", text: "Account settings", visible: :all
    assert_selector "a.c-account-menu__item[href='/account/submissions']", text: "Manage submissions", visible: :all
    assert_selector "form[action='/sign_out'] button.c-account-menu__item--signout", text: "Sign out", visible: :all
  end

  test "strips a leading @ from the handle" do
    render_inline(AccountMenuComponent.new(handle: "@floor_four"))
    assert_selector ".c-account-menu__handle", text: "@floor_four"
    assert_selector ".c-account-menu__avatar", text: "F"
  end

  test "is wired to the account-menu controller and starts closed" do
    render_inline(AccountMenuComponent.new(handle: "x"))
    assert_selector ".c-account-menu[data-controller='account-menu']"
    assert_selector "[data-account-menu-target='dropdown'][hidden]", visible: :all
    assert_selector ".c-account-menu__trigger[aria-expanded='false']"
  end
end
