class StatBlockComponent < ViewComponent::Base
  def initialize(new_today: 0, total_entries: 0, categories_count: 7)
    @new_today = new_today
    @total_entries = total_entries
    @categories_count = categories_count
  end
end
