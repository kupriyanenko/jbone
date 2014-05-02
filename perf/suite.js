var addSuite = function(options, tests) {
  var suite = new Benchmark.Suite,
    space = {};

  if (options.setup) {
    options.setup(space);
  }

  tests.forEach(function(test) {
    suite.add(test[0], function() {
      test[1](space);
    });
  });

  suite
  // add listeners
  .on('start', function(event) {
    console.info(options.name);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function(event) {
    var fastest = this.filter('fastest'),
      delta;

    console.log('Fastest is ' + fastest.pluck('name'));

    this.forEach(function(suite) {
      if (fastest.indexOf(suite) !== -1) return;

      delta = (Math.abs(suite.hz - fastest.pluck('hz')) / fastest.pluck('hz') * 100).toFixed(2);
      console.log(suite.name + ' ' + delta + '% slower');
    });

    jBone('#suite').empty();
  })
  // run async
  .run({
    'async': false
  });
};
