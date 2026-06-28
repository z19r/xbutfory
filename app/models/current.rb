# Per-request global for the signed-in member. Set by the Authentication concern.
class Current < ActiveSupport::CurrentAttributes
  attribute :user
end
