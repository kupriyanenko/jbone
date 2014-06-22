suite("Init", function() {
  bench("jBone", function() {
    jBone();
  });

  bench("jQuery", function() {
    jQuery();
  });
});

suite("Wrap DOM Node", function() {
  bench("jBone", function() {
    jBone(document.createElement('div'));
  });

  bench("jQuery", function() {
    jQuery(document.createElement('div'));
  });
});

suite("Create single Node", function() {
  bench("jBone", function() {
    jBone('<span>');
  });

  bench("jQuery", function() {
    jQuery('<span>');
  });
});

suite("Create multiple Nodes", function() {
  bench("jBone", function() {
    jBone('<p><span></span><span></span></p>');
  });

  bench("jQuery", function() {
    jQuery('<p><span></span><span></span></p>');
  });
});

suite("Create Node and define attributes", function() {
  bench("jBone", function() {
    jBone('<span>', {
      'class': 'test',
      'name': 'value'
    });
  });

  bench("jQuery", function() {
    jQuery('<span>', {
      'class': 'test',
      'name': 'value'
    });
  });
});

suite("Search by selector", function() {
  bench("jBone", function() {
    jBone('div');
  });

  bench("jQuery", function() {
    jQuery('div');
  });
});
