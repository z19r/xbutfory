require "test_helper"

class VotesControllerTest < ActionDispatch::IntegrationTest
  test "voting creates a vote and returns json" do
    entry = entries(:one)
    initial_count = entry.votes_count

    post entry_vote_path(entry_id: entry.id), headers: { "Accept" => "application/json" }
    assert_response :success

    json = JSON.parse(response.body)
    assert_equal initial_count + 1, json["votes_count"]
    assert json["voted"]
  end

  test "voting again removes the vote (toggle)" do
    entry = entries(:one)
    ip = "127.0.0.1"

    post entry_vote_path(entry_id: entry.id), headers: { "Accept" => "application/json" }
    assert JSON.parse(response.body)["voted"]

    post entry_vote_path(entry_id: entry.id), headers: { "Accept" => "application/json" }
    json = JSON.parse(response.body)
    assert_not json["voted"]
  end
end
