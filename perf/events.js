describe("on/off events", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function(suite) {
    suite.jbEl.on('click', function() {}).off();
  });

  bench("jQuery", function(suite) {
    suite.jqEl.on('click', function() {}).off();
  });
});

describe("off with eventType", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function(suite) {
    suite.jbEl.on('click', function() {}).off('click');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.on('click', function() {}).off('click');
  });
});

describe("off with namespace", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function(suite) {
    suite.jbEl.on('click.space', function() {}).off('.space');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.on('click.space', function() {}).off('.space');
  });
});
