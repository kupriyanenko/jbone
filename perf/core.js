addSuite({
  name: 'Init'
}, [
  ['jBone', function() {
      jBone();
  }],
  ['jQuery', function() {
      jQuery();
  }]
]);

addSuite({
  name: 'Wrap DOM Node'
}, [
  ['jBone', function() {
    jBone(document.createElement('div'));
  }],
  ['jQuery', function() {
    jQuery(document.createElement('div'));
  }]
]);

addSuite({
  name: 'Create single Node'
}, [
  ['jBone', function() {
    jBone('<span>');
  }],
  ['jQuery', function() {
    jQuery('<span>');
  }]
]);

addSuite({
  name: 'Create multiple Nodes'
}, [
  ['jBone', function() {
    jBone('<p><span></span><span></span></p>');
  }],
  ['jQuery', function() {
    jQuery('<p><span></span><span></span></p>');
  }]
]);

addSuite({
  name: 'Create Node and define attributes'
}, [
  ['jBone', function() {
    jBone('<span>', {
      'class': 'test',
      'name': 'value'
    });
  }],
  ['jQuery', function() {
    jQuery('<span>', {
      'class': 'test',
      'name': 'value'
    });
  }]
]);

addSuite({
  name: 'Search by selector'
}, [
  ['jBone', function(suite) {
    jBone('div');
  }],
  ['jQuery', function(suite) {
    jQuery('div');
  }]
]);
