# frozen_string_literal: true

require 'test_helper'

class PitchesControllerTest < ActionDispatch::IntegrationTest
  test 'requires authentication' do
    post pitch_path, params: { x: 'Notion', y: 'dentists' }
    assert_redirected_to sign_in_path
  end

  test 'returns a generated pitch as JSON' do
    sign_in_as(users(:member))
    stub_method(PitchGenerator, :call, 'Notes, but with a drill.') do
      post pitch_path, params: { x: 'Notion', y: 'dentists' }
    end
    assert_response :success
    assert_equal 'Notes, but with a drill.', response.parsed_body['pitch']
  end

  test 'reports a friendly error when generation is unconfigured' do
    sign_in_as(users(:member))
    raiser = ->(*) { raise PitchGenerator::NotConfigured }
    stub_method(PitchGenerator, :call, raiser) do
      post pitch_path, params: { x: 'Notion', y: 'dentists' }
    end
    assert_response :service_unavailable
    assert response.parsed_body['error'].present?
  end
end
