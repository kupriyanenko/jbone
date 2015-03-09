suite("on event", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function() {
    suite.jbEl.on('click', function() {});
  });

  bench("jQuery", function() {
    suite.jqEl.on('click', function() {});
  });
});

suite("on event with namespace", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function() {
    suite.jbEl.on('click.space', function() {});
  });

  bench("jQuery", function() {
    suite.jqEl.on('click.space', function() {});
  });
});

suite("on/off events", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function() {
    suite.jbEl.on('click', function() {}).off();
  });

  bench("jQuery", function() {
    suite.jqEl.on('click', function() {}).off();
  });
});

suite("off with eventType", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function() {
    suite.jbEl.on('click', function() {}).off('click');
  });

  bench("jQuery", function() {
    suite.jqEl.on('click', function() {}).off('click');
  });
});

suite("off with namespace", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function() {
    suite.jbEl.on('click.space', function() {}).off('.space');
  });

  bench("jQuery", function() {
    suite.jqEl.on('click.space', function() {}).off('.space');
  });
});
