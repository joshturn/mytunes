// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<div class="audioContainer"></div>',

  initialize: function() {
    this.visualizerView = new VisualView({model: this.model.get('currentSong')});
    this.audioView = new AudioView({model: this.model.get('currentSong')});
    this.model.on('change:currentSong', function(model){
      this.setSong(model.get('currentSong'));
    }, this);
    this.model.on('change:isPlaying', function(model){
      this.display();
    }, this);
    this.render();
  },

  events: {
  },

  display: function(){
    this.visualizerView.display();
  },

  setSong: function(song){
    this.audioView.setSong(song);
  },

  render: function(){
    // this.$el.append(this.visualizerView.$el);
    return this.$el.html([
      this.audioView.$el,
      this.visualizerView.$el
      ]);
  }

});
