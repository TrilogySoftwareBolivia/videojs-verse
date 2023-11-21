# videojs-verse

VERSE plugin

## Installation

```sh
npm install --save videojs-verse
```

## Usage

To include videojs-verse on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-verse.min.js"></script>
<script>
  var player = videojs('my-video');

  player.verse(
        {
          buttons:[
            {
              text: 'Audio y subtítulos',
              action: 'subtitles',
              icon: 'subtitles'
            },
            {
              text: 'Bloquear',
              action: 'lock',
              icon: 'lock'
            },
            {
              text: 'Velocidad',
              action: 'speed',
              icon: 'speed'
            },
            {
              text: 'Episodios',
              action: 'episodes',
              icon: 'filter_none'
            },
            {
              text: 'Siguiente episodio',
              action: 'next',
              icon: 'skip_next'
            }
          ]
        }
      );

  player.on('verse.button.subtitles', function() {
    console.log('verse.button.subtitles fired');
  });

  player.on('verse.button.lock', function() {
    console.log('verse.button.lock fired');
  });

</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-verse via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-verse');

var player = videojs('my-video');

player.verse();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-verse'], function(videojs) {
  var player = videojs('my-video');

  player.verse();
});
```

## License

UNLICENSED. Copyright (c) Diego Olguin &lt;diego.olguin@salamancasolutions.com&gt;


[videojs]: http://videojs.com/
