# The signed-in session control for the ink utility bar — an avatar disc + @handle ▾
# that opens a paper dropdown (Account settings · Manage submissions · Sign out). This
# is the logged-in nav state. Mirrors design_system/components/chrome/AccountMenu.jsx.
class AccountMenuComponent < ViewComponent::Base
  def initialize(handle:, admin: false, avatar_thumb: nil)
    @handle = handle.to_s.delete("@")
    @admin = admin
    @avatar_thumb = avatar_thumb
  end

  attr_reader :handle, :admin, :avatar_thumb

  def initial
    handle[0].to_s.upcase
  end
end
