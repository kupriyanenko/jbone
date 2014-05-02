addSuite({
  name: 'on/off events',
  setup: function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.on('click', function() {}).off();
  }],
  ['jQuery', function(suite) {
    suite.jqEl.on('click', function() {}).off();
  }]
]);

addSuite({
  name: 'off with eventType',
  setup: function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.on('click', function() {}).off('click');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.on('click', function() {}).off('click');
  }]
]);

addSuite({
  name: 'off with namespace',
  setup: function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.on('click.space', function() {}).off('.space');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.on('click.space', function() {}).off('.space');
  }]
]);
