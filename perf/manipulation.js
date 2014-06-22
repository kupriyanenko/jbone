suite("Remove Element", function(suite) {
  setup(function() {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function() {
    suite.jbEl.remove();
  });

  bench("jQuery", function() {
    suite.jqEl.remove();
  });
});
