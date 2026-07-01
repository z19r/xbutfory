# frozen_string_literal: true

require 'test_helper'

class PitchGeneratorTest < ActiveSupport::TestCase
  test 'raises NotConfigured when no API key is present' do
    with_env('ANTHROPIC_API_KEY', nil) do
      assert_raises(PitchGenerator::NotConfigured) do
        PitchGenerator.call(x: 'Notion', y: 'dentists')
      end
    end
  end

  test 'raises ArgumentError when X or Y is blank' do
    with_env('ANTHROPIC_API_KEY', 'sk-test') do
      assert_raises(ArgumentError) { PitchGenerator.call(x: 'Notion', y: '') }
    end
  end

  private

  def with_env(key, value)
    original = ENV[key]
    ENV[key] = value
    yield
  ensure
    ENV[key] = original
  end
end
