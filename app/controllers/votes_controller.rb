class VotesController < ApplicationController
  skip_forgery_protection

  # One vote per member per entry; clicking again toggles it off. Voting requires a
  # session — logged-out clicks get a 401 the Stimulus controller turns into a prompt.
  def create
    unless user_signed_in?
      return render json: { error: 'Sign in to vote.' }, status: :unauthorized
    end

    entry = Entry.find(params[:entry_id])
    vote = entry.votes.find_by(user: current_user)

    if vote
      vote.destroy
      voted = false
    else
      entry.votes.create!(user: current_user)
      voted = true
    end

    render json: { votes_count: entry.reload.votes_count, voted: voted }
  end
end
