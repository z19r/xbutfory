class VotesController < ApplicationController
  skip_forgery_protection

  def create
    entry = Entry.find(params[:entry_id])
    voter_ip = request.remote_ip
    vote = entry.votes.find_by(voter_ip: voter_ip)

    if vote
      vote.destroy
      voted = false
    else
      entry.votes.create!(voter_ip: voter_ip)
      voted = true
    end

    render json: { votes_count: entry.reload.votes_count, voted: voted }
  end
end
