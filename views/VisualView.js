var VisualView = Backbone.View.extend({

  el: '<canvas class="canvas" width="256" height="256"></canvas>',

  initialize: function() {
  },

  display: function() {
    var audioctx = new window.AudioContext();
    var audioPlayer = document.getElementsByClassName("player");
    console.log(audioPlayer);
    var audioSource = audioctx.createMediaElementSource($('audio')[0]);
    console.log(audioSource)

    var analyser = audioctx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioctx.destination)

    analyser.fftSize = 256;
    var analyserBuffer = analyser.frequencyBinCount;
    audioData = new Uint8Array(analyserBuffer);
    analyser.getByteFrequencyData(audioData);

    var canvas = $('canvas')[0];
    var canvasctx = canvas.getContext("2d");


    var draw = function() {

      drawFrame = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(audioData);

      canvasctx.fillStyle = 'black';
      canvasctx.fillRect(0, 0, canvas.width, canvas.height);
      canvasctx.lineWidth = 2;
      canvas.stroke = 'white';
      canvasctx.beginPath();

      var sliceWidth = canvas.width * 1.0 / analyserBuffer;
      var x = 0;

      for (var i = 0; i < analyserBuffer; i++) {
        console.log(audioData[i]);
        var v = audioData[i] / 128.0;
        var y = v * canvas.height/2;

        if(i === 0) {
          canvasctx.moveTo(x, y);
        } else {
          canvasctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasctx.lineTo(canvas.width, canvas.height/2);
      canvasctx.stroke();
    }
    draw();
  },



  events: {

  },

  render: function() {
    return this.$el.html();
   }

});
