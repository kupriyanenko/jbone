addSuite({
  name: 'Backbone View',
  setup: function(suite) {
    suite.jbView = jbBackbone.View.extend({
      events: { click: function() {} }
    });

    suite.jqView = jqBackbone.View.extend({
      events: { click: function() {} }
    });
  }
}, [
  ['jBone', function(suite) {
    (new suite.jbView()).remove();
  }],
  ['jQuery', function(suite) {
    (new suite.jqView()).remove();
  }]
]);
