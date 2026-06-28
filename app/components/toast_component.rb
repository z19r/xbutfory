class ToastComponent < ViewComponent::Base
  def initialize(message: nil)
    @message = message
  end
end
