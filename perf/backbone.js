var jbBackbone = Backbone.noConflict();
jbBackbone.$ = jBone;

var jqBackbone = Backbone.noConflict();
jqBackbone.$ = jQuery;

suite("Backbone View", function(suite) {
  setup(function() {
    suite.jbView = jbBackbone.View.extend({
      events: { click: function() {} }
    });

    suite.jqView = jqBackbone.View.extend({
      events: { click: function() {} }
    });
  });

  bench("jBone", function() {
    (new suite.jbView()).remove();
  });

  bench("jQuery", function() {
    (new suite.jqView()).remove();
  });
});
