class PitchesController < ApplicationController
  before_action :require_authentication

  # POST /pitch — returns an AI-generated one-line pitch for { x, y } as JSON.
  def create
    pitch =
      SentryMetrics.timing('pitch.duration') do
        PitchGenerator.call(x: params[:x], y: params[:y])
      end
    SentryMetrics.count('pitch.generated')
    render json: { pitch: pitch }
  rescue PitchGenerator::NotConfigured
    SentryMetrics.count('pitch.failed', reason: 'not_configured')
    render json: {
             error: 'Auto-generate is off right now — write your own pitch.',
           },
           status: :service_unavailable
  rescue ArgumentError
    SentryMetrics.count('pitch.failed', reason: 'invalid_input')
    render json: { error: 'Fill in the X and the Y first.' },
           status: :unprocessable_entity
  rescue PitchGenerator::GenerationError => e
    SentryMetrics.count('pitch.failed', reason: 'generation_error')
    SentryMetrics.record_rescue(e, source: 'PitchesController#create')
    Rails.logger.warn("[PitchGenerator] #{e.message}")
    render json: { error: 'Could not generate a pitch. Try again.' },
           status: :bad_gateway
  end
end
