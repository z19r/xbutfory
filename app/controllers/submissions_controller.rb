class SubmissionsController < ApplicationController
  before_action :require_authentication
  before_action :load_categories

  def new
    @entry = Entry.new
  end

  def create
    wants_featured = entry_params[:tier] == "featured"
    @entry = current_user.entries.new(entry_params)
    @entry.tier = "free" # Featured is only granted once paid (or via a coupon).
    @entry.status = :pending # new submissions await editorial review

    return render :new, status: :unprocessable_entity unless @entry.save

    if wants_featured
      checkout_featured(@entry)
    else
      redirect_to manage_submissions_path, notice: submission_notice(@entry)
    end
  end

  def edit
    @entry = own_entry
  end

  def update
    @entry = own_entry
    was_needs_edits = @entry.needs_edits?
    if @entry.update(entry_params)
      @entry.update(status: "pending") if was_needs_edits # "edit & resubmit"
      redirect_to manage_submissions_path, notice: "Listing updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # Status transitions from the manage screen (withdraw / cancel / restore).
  TRANSITIONS = {
    "withdrawn" => %w[live pending needs_edits],
    "live" => %w[withdrawn]
  }.freeze

  def transition
    entry = own_entry
    target = params[:to]
    if TRANSITIONS[target]&.include?(entry.status)
      entry.update!(status: target)
      redirect_to manage_submissions_path, notice: transition_notice(target)
    else
      redirect_to manage_submissions_path,
                  alert: "That status change isn't allowed."
    end
  end

  private

  def own_entry
    current_user.entries.find(params[:id])
  end

  def transition_notice(target)
    case target
    when "withdrawn"
      "Listing withdrawn."
    when "live"
      "Listing restored."
    else
      "Listing updated."
    end
  end

  def load_categories
    @categories = Category.order(:name)
  end

  def entry_params
    params.require(:entry).permit(
      :x,
      :y,
      :name,
      :description,
      :url,
      :category,
      :tier,
    )
  end

  def checkout_featured(entry)
    result =
      FeaturedPurchase.new(
        entry: entry,
        user: current_user,
        coupon: params[:coupon],
        success_url: "#{checkout_success_url}?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: checkout_cancel_url,
      ).call

    case result.outcome
    when :granted
      redirect_to manage_submissions_path,
                  notice: "Submitted — your free Featured promotion is applied. An editor will review it shortly."
    when :unconfigured
      redirect_to manage_submissions_path,
                  notice: "Submitted as a free listing — card payments aren't enabled in this environment yet."
    else # :checkout or :coupon_spent — send them to pay
      redirect_to result.checkout_url, allow_other_host: true
    end
  end

  def submission_notice(_entry)
    "Submitted — an editor will review it shortly."
  end
end
