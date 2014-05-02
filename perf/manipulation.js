addSuite({
  name: 'Remove Element',
  setup: function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.remove();
  }],
  ['jQuery', function(suite) {
    suite.jqEl.remove();
  }]
]);