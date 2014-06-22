suite("Set attribute", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function() {
    suite.jbEl.attr('name', 'value');
  });

  bench("jQuery", function() {
    suite.jqEl.attr('name', 'value');
  });
});

suite("Get attribute", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>', {
      name: 'value'
    });
    suite.jqEl = jQuery('<span>', {
      name: 'value'
    });
  });

  bench("jBone", function() {
    suite.jbEl.attr('name');
  });

  bench("jQuery", function() {
    suite.jqEl.attr('name');
  });
});

suite("Set value", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<input>');
    suite.jqEl = jQuery('<input>');
  });

  bench("jBone", function() {
    suite.jbEl.val('name', 'value');
  });

  bench("jQuery", function() {
    suite.jqEl.val('name', 'value');
  });
});

suite("Get value", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<input>').val('name', 'value');
    suite.jqEl = jQuery('<input>').val('name', 'value');
  });

  bench("jBone", function() {
    suite.jbEl.val('name');
  });

  bench("jQuery", function() {
    suite.jqEl.val('name');
  });
});

suite("Set css", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function() {
    suite.jbEl.css('color', 'red');
  });

  bench("jQuery", function() {
    suite.jqEl.css('color', 'red');
  });
});

suite("Get css", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>').css('color', 'red').appendTo('#suite');
    suite.jqEl = jQuery('<span>').css('color', 'red').appendTo('#suite');
  });

  bench("jBone", function() {
    suite.jbEl.css('color');
  });

  bench("jQuery", function() {
    suite.jqEl.css('color');
  });
});

suite("Set normal data", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function() {
    suite.jbEl.data('key', 'value');
  });

  bench("jQuery", function() {
    suite.jqEl.data('key', 'value');
  });
});

suite("Set object data", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function() {
    suite.jbEl.data('key', {});
  });

  bench("jQuery", function() {
    suite.jqEl.data('key', {});
  });
});

suite("Get normal data", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>').data('key', 'value');
    suite.jqEl = jQuery('<span>').data('key', 'value');
  });

  bench("jBone", function() {
    suite.jbEl.data('key');
  });

  bench("jQuery", function() {
    suite.jqEl.data('key');
  });
});

suite("Get object data", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>').data('key', {});
    suite.jqEl = jQuery('<span>').data('key', {});
  });

  bench("jBone", function() {
    suite.jbEl.data('key');
  });

  bench("jQuery", function() {
    suite.jqEl.data('key');
  });
});
