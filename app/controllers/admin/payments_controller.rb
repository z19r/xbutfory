# The money page: every Featured purchase with running totals. Reporting
# first; the only write is marking a payment refunded after the money has
# actually been returned in the Stripe dashboard.
class Admin::PaymentsController < Admin::BaseController
  def index
    @payments =
      Payment.includes(:entry, :user).order(created_at: :desc).limit(200)

    @revenue_total_cents = Payment.settled.sum(:amount_cents)
    @revenue_month_cents =
      Payment
        .settled
        .where(created_at: Date.current.all_month)
        .sum(:amount_cents)
    @refunded_cents = Payment.where(status: 'refunded').sum(:amount_cents)
    @counts = Payment.group(:status).count
  end

  # Bookkeeping only — refund the charge in Stripe first. This flips the
  # payment to refunded and drops the entry back to the free tier.
  def refund
    payment = Payment.find(params[:id])
    if payment.may_refund?
      payment.refund!
      notice =
        "Payment ##{payment.id} marked refunded; " \
          "“#{payment.entry.title}” is back on the free tier."
      redirect_to admin_payments_path, notice: notice
    else
      redirect_to admin_payments_path,
                  alert:
                    "Payment ##{payment.id} isn't refundable " \
                      "from #{payment.status}."
    end
  end
end
