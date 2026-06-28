class MastheadComponent < ViewComponent::Base
  renders_one :search_slot
  renders_one :submit_slot

  def initialize(dek: "Your next 'why didn't I think of that' moment, delivered daily.")
    @dek = dek
  end
end
