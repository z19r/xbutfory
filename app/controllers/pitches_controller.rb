class PitchesController < ApplicationController
  before_action :require_authentication

  # POST /pitch — returns an AI-generated one-line pitch for { x, y } as JSON.
  def create
    pitch = PitchGenerator.call(x: params[:x], y: params[:y])
    render json: { pitch: pitch }
  rescue PitchGenerator::NotConfigured
    render json: {
             error: 'Auto-generate is off right now — write your own pitch.',
           },
           status: :service_unavailable
  rescue ArgumentError
    render json: { error: 'Fill in the X and the Y first.' },
           status: :unprocessable_entity
  rescue PitchGenerator::GenerationError => e
    Rails.logger.warn("[PitchGenerator] #{e.message}")
    render json: { error: 'Could not generate a pitch. Try again.' },
           status: :bad_gateway
  end
end
