describe("Remove Element", function() {
  setup(function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  });

  bench("jBone", function(suite) {
    suite.jbEl.remove();
  });

  bench("jQuery", function(suite) {
    suite.jqEl.remove();
  });
});
