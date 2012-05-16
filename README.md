# shareveal.js
Shareveal.js uses [reveal.js](https://github.com/hakimel/reveal.js) and [faye](https://github.com/faye/faye) to make it possible to share a presentation with all your attendees.

## Usage
Simply add all your slides to slides.html start the server with <em>node server.js</em> and point your browser to http://your.server.example.com:3015/master (as speaker) and http://your.server.example.com:3015 for your attendees.

Everytime you change the slide on the "master" all the slides on the machines of your attendees will automatically display the new slide.

If you call http://your.server.example.com:3015/remote you get an easy interface for usage on mobile devices like the iPhone to remote control your presentation.

## Todo
This is all just an experiment at the moment....

## License

MIT licensed

reveal.js is Copyright (C) 2012 Hakim El Hattab, http://hakim.se
faye is Copyright © 2009-2012 James Coglan and contributors