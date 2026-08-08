require 'test_helper'

class SentryMetricsTest < ActiveSupport::TestCase
  # Temporarily point `Sentry.metrics` at a stand-in for one block, then
  # restore the real accessor. Avoids depending on minitest/mock, which
  # isn't loadable under this minitest build.
  def with_fake_metrics(fake)
    original = Sentry.method(:metrics)
    Sentry.define_singleton_method(:metrics) { fake }
    yield
  ensure
    Sentry.define_singleton_method(:metrics, original)
  end

  # Sentry is dormant in test (no DSN), so `Sentry.metrics` is a no-op hub.
  # The whole point of the wrapper is that instrumentation must never break
  # the request or job it rides on — every method swallows StandardError.

  test 'count never raises when Sentry is uninitialized' do
    assert_nothing_raised do
      SentryMetrics.count('test.count', voted: 'true')
    end
  end

  test 'distribution never raises when Sentry is uninitialized' do
    assert_nothing_raised do
      SentryMetrics.distribution(
        'test.duration',
        12.5,
        unit: 'millisecond',
        controller: 'pages',
      )
    end
  end

  test 'gauge never raises when Sentry is uninitialized' do
    assert_nothing_raised do
      SentryMetrics.gauge('test.depth', 3, unit: 'none')
    end
  end

  test 'timing returns the block value and never raises' do
    result = nil
    assert_nothing_raised do
      result = SentryMetrics.timing('test.timing', source: 'unit') { 42 }
    end
    assert_equal 42, result
  end

  test 'record_rescue never raises' do
    assert_nothing_raised do
      SentryMetrics.record_rescue(
        StandardError.new('boom'),
        source: 'test',
      )
    end
  end

  test 'count forwards name, value, and tags to Sentry.metrics' do
    captured = nil
    fake_metrics = Object.new
    fake_metrics.define_singleton_method(:count) do |key, value:, attributes:|
      captured = { key: key, value: value, attributes: attributes }
    end

    with_fake_metrics(fake_metrics) do
      SentryMetrics.count('vote.cast', value: 2, voted: 'true')
    end

    assert_equal 'vote.cast', captured[:key]
    assert_equal 2, captured[:value]
    assert_equal({ voted: 'true' }, captured[:attributes])
  end

  test 'distribution omits unit when not supplied' do
    captured = nil
    fake_metrics = Object.new
    fake_metrics.define_singleton_method(:distribution) do |key, value, **kw|
      captured = { key: key, value: value, kwargs: kw }
    end

    with_fake_metrics(fake_metrics) do
      SentryMetrics.distribution('purchase.amount', 1.99, currency: 'usd')
    end

    assert_equal 'purchase.amount', captured[:key]
    assert_equal 1.99, captured[:value]
    assert_not captured[:kwargs].key?(:unit)
    assert_equal({ currency: 'usd' }, captured[:kwargs][:attributes])
  end
end
