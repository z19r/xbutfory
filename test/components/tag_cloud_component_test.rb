require "test_helper"

class TagCloudComponentTest < ViewComponent::TestCase
  test "renders each tag as a link" do
    render_inline(TagCloudComponent.new(tags: [
      { label: "dating", weight: 5, href: "/?category=dating" },
      { label: "pets", weight: 2, href: "/?category=pets" }
    ]))
    assert_selector "a.c-tag-cloud__tag", count: 2
    assert_selector "a.c-tag-cloud__tag[href='/?category=dating']", text: "dating"
  end

  test "heavy tags (weight >= 4) get the heavy modifier" do
    render_inline(TagCloudComponent.new(tags: [
      { label: "loud", weight: 5 },
      { label: "quiet", weight: 2 }
    ]))
    assert_selector "a.c-tag-cloud__tag--heavy", text: "loud"
    assert_no_selector "a.c-tag-cloud__tag--heavy", text: "quiet"
  end

  test "size and opacity scale with weight" do
    render_inline(TagCloudComponent.new(tags: [{ label: "x", weight: 5 }]))
    # 11 + 5*2.6 = 24.0px ; 0.6 + 5*0.08 = 1.0
    assert_selector "a.c-tag-cloud__tag[style*='font-size: 24.0px']"
  end

  test "bare strings default to weight 3" do
    render_inline(TagCloudComponent.new(tags: [{ label: "mid" }]))
    # 11 + 3*2.6 = 18.8px
    assert_selector "a.c-tag-cloud__tag[style*='font-size: 18.8px']"
  end
end
