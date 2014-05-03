var jbBackbone = Backbone.noConflict();
jbBackbone.$ = jBone;

var jqBackbone = Backbone.noConflict();
jqBackbone.$ = jQuery;

describe("Backbone View", function() {
  setup(function(suite) {
    suite.jbView = jbBackbone.View.extend({
      events: { click: function() {} }
    });

    suite.jqView = jqBackbone.View.extend({
      events: { click: function() {} }
    });
  });

  bench("jBone", function(suite) {
    (new suite.jbView()).remove();
  });

  bench("jQuery", function(suite) {
    (new suite.jqView()).remove();
  });
});
