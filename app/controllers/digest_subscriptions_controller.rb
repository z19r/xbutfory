# Standalone (no account) signups for the weekly digest, plus tokenized unsubscribe.
class DigestSubscriptionsController < ApplicationController
  # Re-subscribing with a known address is a no-op success, not an error.
  def create
    subscription =
      DigestSubscription.find_or_initialize_by(email: normalized_email)

    if subscription.persisted? || subscription.save
      respond_to do |format|
        format.turbo_stream { head :no_content }
        format.html do
          redirect_back fallback_location: root_path,
                        notice: "You're on the list — digest lands Sundays."
        end
      end
    else
      respond_to do |format|
        format.turbo_stream { head :unprocessable_entity }
        format.html do
          redirect_back fallback_location: root_path,
                        alert: "That email didn't look right."
        end
      end
    end
  end

  def destroy
    subscription =
      DigestSubscription.find_by_token_for(:unsubscribe, params[:token])
    subscription&.destroy
    @unsubscribed = subscription.present?
  end

  private

  def normalized_email
    params[:email].to_s.strip.downcase
  end
end
