# frozen_string_literal: true

require 'net/http'
require 'json'

# Generates a deadpan one-line pitch for an "X but for Y" listing via the
# Anthropic Messages API. Degrades gracefully: raises NotConfigured when no
# ANTHROPIC_API_KEY is set so the UI can fall back to manual entry.
class PitchGenerator
  ENDPOINT = URI('https://api.anthropic.com/v1/messages')
  MODEL = 'claude-haiku-4-5-20251001'
  MAX_TOKENS = 120

  class NotConfigured < StandardError; end

  class GenerationError < StandardError; end

  def self.call(x:, y:)
    new(x, y).call
  end

  def initialize(x, y)
    @x = x.to_s.strip
    @y = y.to_s.strip
  end

  def call
    raise NotConfigured, 'ANTHROPIC_API_KEY is not set' if api_key.to_s.empty?
    raise ArgumentError, 'both X and Y are required' if @x.empty? || @y.empty?

    completion.presence ||
      raise(GenerationError, 'empty completion')
  end

  private

  def api_key
    ENV['ANTHROPIC_API_KEY']
  end

  def prompt
    <<~PROMPT.strip
      Write a single deadpan, editorial one-line pitch (max 18 words) for a
      website that is "#{@x} but for #{@y}". Sentence case. No emoji, no quotes,
      no surrounding markup. Return only the pitch text.
    PROMPT
  end

  def completion
    response = post
    unless response.code.to_i == 200
      raise GenerationError, "Anthropic API returned #{response.code}"
    end

    JSON.parse(response.body).dig('content', 0, 'text').to_s.strip
  end

  def post
    http = Net::HTTP.new(ENDPOINT.host, ENDPOINT.port)
    http.use_ssl = true
    http.open_timeout = 5
    http.read_timeout = 15

    request = Net::HTTP::Post.new(ENDPOINT)
    request['x-api-key'] = api_key
    request['anthropic-version'] = '2023-06-01'
    request['content-type'] = 'application/json'
    request.body = JSON.generate(
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: 'user', content: prompt }]
    )

    http.request(request)
  end
end
