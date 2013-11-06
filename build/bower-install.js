require('bower').commands
  .install()
  .on('end', function (data) {
    if (data) {
      console.log(data);
    }

  });