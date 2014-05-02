addSuite({
  name: 'Set attribute',
  setup: function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.attr('name', 'value');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.attr('name', 'value');
  }]
]);

addSuite({
  name: 'Get attribute',
  setup: function(suite) {
    suite.jbEl = jBone('<span>', {
      name: 'value'
    });
    suite.jqEl = jQuery('<span>', {
      name: 'value'
    });
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.attr('name');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.attr('name');
  }]
]);

addSuite({
  name: 'Set value',
  setup: function(suite) {
    suite.jbEl = jBone('<input>');
    suite.jqEl = jQuery('<input>');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.val('name', 'value');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.val('name', 'value');
  }]
]);

addSuite({
  name: 'Get value',
  setup: function(suite) {
    suite.jbEl = jBone('<input>').val('name', 'value');
    suite.jqEl = jQuery('<input>').val('name', 'value');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.val('name');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.val('name');
  }]
]);

addSuite({
  name: 'Set css',
  setup: function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.css('color', 'red');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.css('color', 'red');
  }]
]);

addSuite({
  name: 'Get css',
  setup: function(suite) {
    suite.jbEl = jBone('<span>').css('color', 'red').appendTo('#suite');
    suite.jqEl = jQuery('<span>').css('color', 'red').appendTo('#suite');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.css('color');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.css('color');
  }]
]);

addSuite({
  name: 'Set normal data',
  setup: function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.data('key', 'value');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.data('key', 'value');
  }]
]);

addSuite({
  name: 'Set object data',
  setup: function(suite) {
    suite.jbEl = jBone('<span>');
    suite.jqEl = jQuery('<span>');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.data('key', {});
  }],
  ['jQuery', function(suite) {
    suite.jqEl.data('key', {});
  }]
]);

addSuite({
  name: 'Get normal data',
  setup: function(suite) {
    suite.jbEl = jBone('<span>').data('key', 'value');
    suite.jqEl = jQuery('<span>').data('key', 'value');
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.data('key');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.data('key');
  }]
]);

addSuite({
  name: 'Get object data',
  setup: function(suite) {
    suite.jbEl = jBone('<span>').data('key', {});
    suite.jqEl = jQuery('<span>').data('key', {});
  }
}, [
  ['jBone', function(suite) {
    suite.jbEl.data('key');
  }],
  ['jQuery', function(suite) {
    suite.jqEl.data('key');
  }]
]);
