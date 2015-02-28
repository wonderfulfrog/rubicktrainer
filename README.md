# Rubick Trainer

[![Build Status](https://travis-ci.org/devinwl/rubicktrainer.svg?branch=master)](https://travis-ci.org/devinwl/rubicktrainer)

Rubick Trainer is a quiz for Dota 2 that tests your knowledge of hero abilities!

## Installation

### Requirements
- [Bundler](http://bundler.io/)
- [dota2-json](https://github.com/devinwl/dota2-json) (if rebuilding `heroes.json`)

### Setup

1. Run `bundle install` to install the necessary gems.
2. Run `bundle exec rackup` to start the Rack server.
3. View the site at [http://localhost:9292](http://localhost:9292).

### Optional Setup

1. Generate a fresh version of `heroes.json`.  Follow the documentation provided on the [dota2-json](https://github.com/devinwl/dota2-json) page.

## Reporting bugs / feature requests / feedback

Please [create an issue on GitHub](https://github.com/devinwl/rubicktrainer/issues).  Thank you for helping improve Rubick Trainer!

## Contributing

If you wish to help contribute to the development of Rubick Trainer, here is a quick guide on how to do so:

1. Fork the repo
2. Create your feature branch (`git checkout -b my-great-feature`)
3. Commit your changes to your feature branch
4. Push your changes (`git push origin my-great-feature`)
5. [Create a new pull request on GitHub](https://github.com/devinwl/rubicktrainer/compare) with your branch

*Note*: When dealing with updates to game data, please try to avoid editing `heroes.json` directly.  Use [dota2-json](https://github.com/devinwl/dota2-json) to generate the `json` file automatically.

## Special Thanks

A special thanks to all of our contributors!

- [Ray Harris](https://github.com/raymondgh)

## License

```
Rubick Trainer quiz game
Copyright (C) 2014, 2015 Devin Lumley
Copyright (C) 2014 Anthony Grimaldi

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
```

## Legal

Rubick, Dota 2, and associated assets of Dota 2 are properties of Valve Corporation.
