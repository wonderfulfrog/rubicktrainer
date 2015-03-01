require 'sinatra'
require 'rack/tracker'

class Web < Sinatra::Base

  configure do
    set :public_folder, 'public'
  end

  configure :production do
    use Rack::Tracker do
      handler :google_analytics, { tracker: 'UA-38578697-1' }
    end
  end

  get '/' do
    File.read(File.join('public', 'index.html'))
  end

end