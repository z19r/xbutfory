require 'test_helper'

class VotesControllerTest < ActionDispatch::IntegrationTest
  test 'voting creates a vote and returns json' do
    sign_in_as(users(:apt_4b))
    entry = entries(:one)
    initial_count = entry.votes_count

    post entry_vote_path(entry_id: entry.id),
         headers: {
           'Accept' => 'application/json',
         }
    assert_response :success

    json = JSON.parse(response.body)
    assert_equal initial_count + 1, json['votes_count']
    assert json['voted']
  end

  test 'voting again removes the vote (toggle)' do
    sign_in_as(users(:apt_4b))
    entry = entries(:one)

    post entry_vote_path(entry_id: entry.id),
         headers: {
           'Accept' => 'application/json',
         }
    assert JSON.parse(response.body)['voted']

    post entry_vote_path(entry_id: entry.id),
         headers: {
           'Accept' => 'application/json',
         }
    json = JSON.parse(response.body)
    assert_not json['voted']
  end

  test 'voting requires a session' do
    post entry_vote_path(entry_id: entries(:one).id),
         headers: {
           'Accept' => 'application/json',
         }
    assert_response :unauthorized
  end
end
