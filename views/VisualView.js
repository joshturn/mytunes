var VisualView = Backbone.View.extend({

  el: '<canvas class="canvas" width="256" height="256"></canvas>',

  intialize: function (){

  },

  events: {

  },

  render: function() {
    return this.$el.html();
   }

});
