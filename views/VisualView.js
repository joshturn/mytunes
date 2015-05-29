var VisualView = Backbone.View.extend({

  el: '<canvas class="canvas" width="512" height="512"></canvas>',

  initialize: function() {
  },

  display: function() {
    var audioctx = new window.AudioContext();
    var audioPlayer = document.getElementsByClassName("player");
    var audioSource = audioctx.createMediaElementSource($('audio')[0]);

    var analyser = audioctx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioctx.destination)

    analyser.fftSize = 256;
    var analyserBuffer = analyser.frequencyBinCount;
    var audioFreqData = new Uint8Array(analyserBuffer);
    var audioTimeData = new Uint8Array(analyserBuffer);

    var canvas = $('canvas')[0];
    var canvasctx = canvas.getContext("2d");


    var draw = function() {

      drawFrame = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(audioFreqData);
      analyser.getByteTimeDomainData(audioTimeData);

      // 'rgb(' + audioData[0] + ',' + audioData[50] + ',' + audioData[125] + ')';
      canvasctx.fillStyle = 'black';
      canvasctx.fillRect(0, 0, canvas.width, canvas.height);

      var rando = Math.floor(Math.random() * 10);
      var topLeft = 0;

      for (var i = 0; i < analyserBuffer; i++) {
        // var gradient = canvasctx.createRadialGradient(topLeft, canvas.height - audioFreqData[i] *2, 10,topLeft + 4, canvas.height, 10);
        var gradient = canvasctx.createLinearGradient(topLeft, canvas.height - audioFreqData[i] * 2,topLeft + 4, canvas.height);
        gradient.addColorStop(0, 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')');
        gradient.addColorStop(1, 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')');
        if (i % 4 === 0) {
          canvasctx.fillStyle = gradient;
          // canvasctx.fillStyle = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        }
        canvasctx.fillRect(topLeft, canvas.height - audioFreqData[i] *2, topLeft + 4, canvas.height);
        topLeft += 4;
      }
      // canvasctx.lineWidth = 2;
      // canvas.stroke = 'white';
      // canvasctx.beginPath();

      // var sliceWidth = canvas.width * 1.0 / analyserBuffer;
      // var x = 0;

      // for (var i = 0; i < analyserBuffer; i++) {
      //   var v = audioData[i] / 128.0;
      //   var y = v * canvas.height/2;

      //   if(i === 0) {
      //     canvasctx.moveTo(x, y);
      //   } else {
      //     canvasctx.lineTo(x, y);
      //   }

      //   x += sliceWidth;
      // }

      // canvasctx.lineTo(canvas.width, canvas.height/2);
      // canvasctx.stroke();
    }
    draw();
  },



  events: {

  },

  render: function() {
    return this.$el.html();
   }

});
