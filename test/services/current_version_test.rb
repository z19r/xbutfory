# frozen_string_literal: true

require 'test_helper'

class CurrentVersionTest < ActiveSupport::TestCase
  test 'parses major, minor and patch from a semver string' do
    version = CurrentVersion.new('3.14.2')

    assert_equal 3, version.major
    assert_equal 14, version.minor
    assert_equal 2, version.patch
  end

  test 'defaults missing components to zero' do
    version = CurrentVersion.new('2')

    assert_equal 2, version.major
    assert_equal 0, version.minor
    assert_equal 0, version.patch
  end

  test 'tolerates surrounding whitespace' do
    assert_equal '4.5.6', CurrentVersion.new("  4.5.6\n").to_s
  end

  test 'masthead maps VOL to major and ISSUE to minor' do
    assert_equal(
      'est. 2026 — vol. 1, issue 26',
      CurrentVersion.new('1.26.0').masthead,
    )
  end

  test 'masthead hides COR when the patch is zero' do
    refute_includes CurrentVersion.new('1.26.0').masthead, 'cor.'
  end

  test 'masthead appends COR when the patch is greater than zero' do
    assert_equal(
      'est. 2026 — vol. 1, issue 26, cor. 2',
      CurrentVersion.new('1.26.2').masthead,
    )
  end

  test 'current reads the semver from the .current_version file' do
    assert_equal '1.26.0', CurrentVersion.current.to_s
  end
end
