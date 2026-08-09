# The back office. Every admin controller inherits the 404-cloaked gate so
# the area stays undiscoverable to anyone without the admin bit.
class Admin::BaseController < ApplicationController
  before_action :require_admin
end
