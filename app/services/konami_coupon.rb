# The Konami-code Easter egg (see the layout's konami controller) hands out one
# free Featured promotion per member. Redemption is tracked as a `free` Payment
# carrying this code, so a member can only cash it once.
class KonamiCoupon
  CODE = 'XBUTFORY-K0N4M1'

  def self.matches?(code)
    code.to_s.strip.upcase == CODE
  end

  def self.available_to?(user)
    !user.payments.exists?(coupon_code: CODE)
  end
end
