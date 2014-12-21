###
# Page
###

# Per-page layout changes:
#
# With no layout
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Template
###

# ceaser-easing configuration
require 'ceaser-easing'

# Compass configuration
compass_config do |config|
  config.output_style = :nested
  config.relative_assets = true
  config.line_comments = false
  config.color_output = false
end

# Slim comfiguration
set :slim, {
  pretty: false,
  sort_attrs: false,
  format: :html5
}

###
# Configure
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
activate :livereload

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

###
# Environment
###

# Development-specific configuration
configure :development do
  # Google Analytics
  activate :google_analytics do |ga|
    ga.tracking_id = ''
  end
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Minify HTML
  activate :minify_html

  # Image compress
  # activate :imageoptim

  # Gzip
  # activate :gzip

  # Enable cache buster
  #activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"

  # Google Nalytics
  activate :google_analytics do |ga|
    ga.tracking_id = ''
  end
end

