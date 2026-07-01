class EmptyStateComponent < ViewComponent::Base
  def initialize(title: 'Nothing here yet.', action: nil, action_url: nil)
    @title = title
    @action = action
    @action_url = action_url
  end
end
