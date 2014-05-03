describe("Set attribute", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function(suite) {
    suite.jbEl.attr('name', 'value');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.attr('name', 'value');
  });
});

describe("Get attribute", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>', {
      name: 'value'
    });
    suite.jqEl = jQuery('<span>', {
      name: 'value'
    });
  });

  bench("jBone", function(suite) {
    suite.jbEl.attr('name');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.attr('name');
  });
});

describe("Set value", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<input>');
    suite.jqEl = jQuery('<input>');
  });

  bench("jBone", function(suite) {
    suite.jbEl.val('name', 'value');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.val('name', 'value');
  });
});

describe("Get value", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<input>').val('name', 'value');
    suite.jqEl = jQuery('<input>').val('name', 'value');
  });

  bench("jBone", function(suite) {
    suite.jbEl.val('name');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.val('name');
  });
});

describe("Set css", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function(suite) {
    suite.jbEl.css('color', 'red');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.css('color', 'red');
  });
});

describe("Get css", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>').css('color', 'red').appendTo('#suite');
    suite.jqEl = jQuery('<span>').css('color', 'red').appendTo('#suite');
  });

  bench("jBone", function(suite) {
    suite.jbEl.css('color');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.css('color');
  });
});

describe("Set normal data", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function(suite) {
    suite.jbEl.data('key', 'value');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.data('key', 'value');
  });
});

describe("Set object data", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function(suite) {
    suite.jbEl.data('key', {});
  });

  bench("jQuery", function(suite) {
    suite.jqEl.data('key', {});
  });
});

describe("Get normal data", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>').data('key', 'value');
    suite.jqEl = jQuery('<span>').data('key', 'value');
  });

  bench("jBone", function(suite) {
    suite.jbEl.data('key');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.data('key');
  });
});

describe("Get object data", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>').data('key', {});
    suite.jqEl = jQuery('<span>').data('key', {});
  });

  bench("jBone", function(suite) {
    suite.jbEl.data('key');
  });

  bench("jQuery", function(suite) {
    suite.jqEl.data('key');
  });
});
