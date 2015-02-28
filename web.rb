require 'sinatra'
require 'rack/tracker'

class Web < Sinatra::Base

  configure do

    set :public_folder, 'public'

  end

  configure :production do
    use Rack::Tracker do
      handler :google_analytics, { tracker: 'U-XXXXX-Y' }
    end
  end

  get "/" do
    redirect '/index.html'
  end

end