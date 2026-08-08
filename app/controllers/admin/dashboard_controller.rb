# The front page of the back office: the numbers a CEO or a customer-service
# agent asks for before anything else, plus the freshest activity.
class Admin::DashboardController < Admin::BaseController
  RECENT_LIMIT = 8

  def show
    @entry_counts = Entry.group(:status).count
    @user_counts = User.group(:state).count
    @total_votes = Vote.count
    @new_today = Entry.live.where(created_at: Date.current.all_day).count

    @revenue_total_cents = Payment.settled.sum(:amount_cents)
    @revenue_month_cents =
      Payment
        .settled
        .where(created_at: Date.current.all_month)
        .sum(:amount_cents)
    @refunded_cents = Payment.where(status: 'refunded').sum(:amount_cents)

    @recent_entries =
      Entry.includes(:user).order(created_at: :desc).limit(RECENT_LIMIT)
    @recent_users = User.order(created_at: :desc).limit(RECENT_LIMIT)
    @recent_payments =
      Payment
        .includes(:entry, :user)
        .order(created_at: :desc)
        .limit(RECENT_LIMIT)
  end
end
