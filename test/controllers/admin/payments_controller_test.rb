require 'test_helper'

class Admin::PaymentsControllerTest < ActionDispatch::IntegrationTest
  def settled_payment
    entry =
      users(:member).entries.create!(x: 'Uber', y: 'goats', tier: 'featured')
    Payment.create!(
      entry: entry,
      user: users(:member),
      amount_cents: Payment::FEATURED_PRICE_CENTS,
      status: 'paid',
      stripe_session_id: "cs_#{SecureRandom.hex(8)}",
    )
  end

  test 'money page is 404 for anonymous visitors' do
    get admin_payments_path
    assert_response :not_found
  end

  test 'money page is 404 for non-admin members' do
    sign_in_as(users(:member))
    get admin_payments_path
    assert_response :not_found
  end

  test 'money page renders totals for admins' do
    settled_payment
    sign_in_as(users(:editor))
    get admin_payments_path
    assert_response :success
    assert_select '.l-admin__stat-num', text: '$1.99', count: 2
    assert_select '.c-sub', 1
  end

  test 'refund flips the ledger and unfeatures the listing' do
    payment = settled_payment
    sign_in_as(users(:editor))
    patch refund_admin_payment_path(payment)
    assert payment.reload.refunded?
    assert_equal 'free', payment.entry.reload.tier
  end

  test 'refund refuses payments that never settled' do
    payment = settled_payment
    payment.update!(status: 'pending')
    sign_in_as(users(:editor))
    patch refund_admin_payment_path(payment)
    assert_equal 'pending', payment.reload.status
  end
end
