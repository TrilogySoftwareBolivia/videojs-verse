import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Plugin = videojs.getPlugin('plugin');
const Button = videojs.getComponent('Button');
const Component = videojs.getComponent('Component');

// Default options for the plugin.
const defaults = {};


class VerseButton extends Button {

  constructor(player, options) {
    super(player, options);
    this.player = player;
    if(this.options_.icon) {
      this.createIcon(this.options_.icon);
    }
    if (this.options_.text) {
      this.controlText(this.options_.text);
      this.addClass('vjs-visible-text');
    }
  }

  createIcon(icon) {
    const iconEl = document.createElement('span');
    iconEl.className = 'material-icons';
    iconEl.textContent = icon;
    // this.el().appendChild(iconEl);
    this.el().insertBefore(iconEl, this.el().firstChild);
  }

  buildCSSClass() {
    return `vjs-verse-button vjs-verse-${this.options_.action} ${super.buildCSSClass()}`;
  }

  handleClick() {
    console.log(`verse.button.${this.options_.action}`);
    this.player.trigger(`verse.button.${this.options_.action}`);
  }
}
Component.registerComponent('VerseButton', VerseButton);



class VerseBottomBar extends Component {
  constructor(player, options = {}) {
    super(player, options);
  }
  createEl() {
    return videojs.dom.createEl('div', {
      className: 'vjs-verse-bottom-bar'
    });
  }
}
Component.registerComponent('VerseBottomBar', VerseBottomBar);




/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class Verse extends Plugin {
  /**
   * Create a Verse plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.options = videojs.mergeOptions(defaults, options);

    console.log(this.options);

    this.player.ready(() => {
      this.player.addClass('vjs-verse');

      if(this.options.buttons){
        player.addChild('VerseBottomBar', {}, player.controlBar.el());

        this.options.buttons.forEach(button => {
          var button = player.getChild('VerseBottomBar').addChild('VerseButton', {
            text: button.text,
            action: button.action,
            icon: button.icon
          });
          // button.addClass('vjs-visible-text');
        });

      }

    });
  }
}

// Define default values for the plugin's `state` object here.
Verse.defaultState = {};

// Include the version number.
Verse.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('verse', Verse);

export default Verse;
