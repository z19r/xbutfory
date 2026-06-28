class StatBlockComponent < ViewComponent::Base
  def initialize(new_today: 0, total_entries: 0, total_votes: 0)
    @new_today = new_today
    @total_entries = total_entries
    @total_votes = total_votes
  end
end
